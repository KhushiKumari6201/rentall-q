'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/server/lib/supabaseClient';

export default function BusinessRegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<'self_storage' | 'warehouse' | 'hostel' | 'parking' | 'equipment'>('self_storage');

  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = name.trim();
      const cleanBizName = businessName.trim();

      // 1. Sign up user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            name: cleanName || 'Business Owner',
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError('Signup failed to initialize user.');
        setLoading(false);
        return;
      }

      const userId = authData.user.id;

      // 2. Create Business Record
      const { data: businessData, error: bizError } = await supabase
        .from('businesses')
        .insert({
          name: cleanBizName,
          business_type: businessType,
          owner_profile_id: userId,
        })
        .select('id')
        .single();

      if (bizError) {
        console.error('Error creating business row:', bizError);
        setError('Failed to create business profile: ' + bizError.message);
        setLoading(false);
        return;
      }

      // 3. Upsert Profile with BUSINESS_OWNER role and business_id
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          name: cleanName,
          role: 'BUSINESS_OWNER',
          business_id: businessData.id,
        });

      if (profileError) {
        console.error('Error setting profile role:', profileError);
      }

      if (authData.session) {
        router.push('/business/dashboard');
        router.refresh();
      } else {
        setInfoMessage(`Account & business created for ${cleanEmail}! Please check your email to confirm sign-in.`);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4 py-12 text-cream-100">
      <div className="w-full max-w-lg rounded-2xl border border-navy-700 bg-navy-800/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white font-serif">Register Business</h1>
          <p className="mt-1 text-sm text-stone-400">Start managing your rental operations with RentallQ</p>
        </div>

        {error ? (
          <div className="mb-4 rounded-lg border border-rose-800/50 bg-rose-950/40 p-3 text-xs text-rose-300">
            {error}
          </div>
        ) : null}

        {infoMessage ? (
          <div className="mb-4 rounded-lg border border-emerald-800/50 bg-emerald-950/40 p-3 text-xs text-emerald-300">
            {infoMessage}
          </div>
        ) : null}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Owner"
                className="mt-1 w-full rounded-lg border border-navy-600 bg-navy-950 px-3 py-2 text-sm text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-300">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@company.com"
                className="mt-1 w-full rounded-lg border border-navy-600 bg-navy-950 px-3 py-2 text-sm text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="mt-1 w-full rounded-lg border border-navy-600 bg-navy-950 px-3 py-2 text-sm text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300">Business Name</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Apex Self Storage"
                className="mt-1 w-full rounded-lg border border-navy-600 bg-navy-950 px-3 py-2 text-sm text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300">Business Type</label>
              <select
                value={businessType}
                onChange={(e: any) => setBusinessType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-navy-600 bg-navy-950 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="self_storage">Self Storage</option>
                <option value="warehouse">Warehouse</option>
                <option value="hostel">Hostel / Co-living</option>
                <option value="parking">Parking Lots</option>
                <option value="equipment">Equipment Rental</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-amber-400 disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating business account...' : 'Create Business Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-stone-400">
          Already registered?{' '}
          <Link href="/business/login" className="font-semibold text-amber-400 hover:underline">
            Sign in to Business Portal
          </Link>
        </p>
      </div>
    </div>
  );
}
