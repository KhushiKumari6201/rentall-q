-- ============================================================================
-- RentAll-Q Multi-Tenancy Database Migration
-- Supporting 3 Roles: CLIENT, BUSINESS_OWNER, ADMIN
-- ============================================================================

-- 1. Create businesses table if not exists
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  business_type TEXT NOT NULL CHECK (business_type IN ('self_storage', 'warehouse', 'hostel', 'parking', 'equipment')),
  owner_profile_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Ensure profiles table has role and business_id columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'CLIENT';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'business_id'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add check constraint to profiles role if not present
DO $$
BEGIN
  ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
  ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('CLIENT', 'BUSINESS_OWNER', 'MANAGER', 'STAFF', 'ADMIN'));
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- 3. Add business_id foreign key column to entity tables
DO $$
BEGIN
  -- rental_units
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'rental_units' AND column_name = 'business_id'
  ) THEN
    ALTER TABLE public.rental_units ADD COLUMN business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE;
  END IF;

  -- bookings
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'bookings' AND column_name = 'business_id'
  ) THEN
    ALTER TABLE public.bookings ADD COLUMN business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE;
  END IF;

  -- payments
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'payments' AND column_name = 'business_id'
  ) THEN
    ALTER TABLE public.payments ADD COLUMN business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE;
  END IF;

  -- customers (conceptually representing "Clients")
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'customers' AND column_name = 'business_id'
  ) THEN
    ALTER TABLE public.customers ADD COLUMN business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE;
  END IF;
END $$;

-- 4. Create default business & backfill existing rows
DO $$
DECLARE
  default_biz_id UUID;
BEGIN
  -- Insert or fetch default business
  SELECT id INTO default_biz_id FROM public.businesses WHERE name = 'Default Business' LIMIT 1;
  
  IF default_biz_id IS NULL THEN
    INSERT INTO public.businesses (name, business_type)
    VALUES ('Default Business', 'self_storage')
    RETURNING id INTO default_biz_id;
  END IF;

  -- Backfill business_id for existing rows
  UPDATE public.profiles SET business_id = default_biz_id WHERE business_id IS NULL AND role != 'ADMIN';
  UPDATE public.rental_units SET business_id = default_biz_id WHERE business_id IS NULL;
  UPDATE public.bookings SET business_id = default_biz_id WHERE business_id IS NULL;
  UPDATE public.payments SET business_id = default_biz_id WHERE business_id IS NULL;
  UPDATE public.customers SET business_id = default_biz_id WHERE business_id IS NULL;
END $$;

-- 5. Enable Row Level Security (RLS) and define access policies
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Helper policy function or inline RLS policies:

-- Businesses Policies
DROP POLICY IF EXISTS "Admin full access to businesses" ON public.businesses;
CREATE POLICY "Admin full access to businesses" ON public.businesses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

DROP POLICY IF EXISTS "Owners access their own business" ON public.businesses;
CREATE POLICY "Owners access their own business" ON public.businesses
  FOR ALL USING (
    owner_profile_id = auth.uid() OR
    id = (SELECT business_id FROM public.profiles WHERE id = auth.uid())
  );

-- Profiles Policies
DROP POLICY IF EXISTS "Users can read/update own profile" ON public.profiles;
CREATE POLICY "Users can read/update own profile" ON public.profiles
  FOR ALL USING (id = auth.uid());

DROP POLICY IF EXISTS "Admin full access to profiles" ON public.profiles;
CREATE POLICY "Admin full access to profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- Entity Tables Scoped Policies (Business Owners & Admin)
-- Rental Units
DROP POLICY IF EXISTS "Business Owner rental units policy" ON public.rental_units;
CREATE POLICY "Business Owner rental units policy" ON public.rental_units
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
    OR
    business_id = (SELECT business_id FROM public.profiles WHERE id = auth.uid())
  );

-- Customers / Clients
DROP POLICY IF EXISTS "Business Owner clients policy" ON public.customers;
CREATE POLICY "Business Owner clients policy" ON public.customers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
    OR
    business_id = (SELECT business_id FROM public.profiles WHERE id = auth.uid())
  );

-- Bookings
DROP POLICY IF EXISTS "Multi-tenant bookings policy" ON public.bookings;
CREATE POLICY "Multi-tenant bookings policy" ON public.bookings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
    OR
    business_id = (SELECT business_id FROM public.profiles WHERE id = auth.uid())
    OR
    (
      EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'CLIENT')
      AND
      customer_id IN (
        SELECT id FROM public.customers WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  );

-- Payments
DROP POLICY IF EXISTS "Multi-tenant payments policy" ON public.payments;
CREATE POLICY "Multi-tenant payments policy" ON public.payments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
    OR
    business_id = (SELECT business_id FROM public.profiles WHERE id = auth.uid())
    OR
    (
      EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'CLIENT')
      AND
      booking_id IN (
        SELECT id FROM public.bookings WHERE customer_id IN (
          SELECT id FROM public.customers WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
      )
    )
  );
