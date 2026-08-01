import { supabase } from '@/server/lib/supabaseClient';

export { supabase as prisma };
export const db = supabase;
