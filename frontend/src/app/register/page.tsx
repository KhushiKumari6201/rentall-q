'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/server/lib/supabaseClient';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name.trim() || 'User',
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        // Auto-confirmed in Supabase settings
        router.push('/dashboard');
        router.refresh();
      } else {
        // Confirmation email required
        setInfoMessage('Account created! Please check your email to confirm registration or sign in below.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Create Account</h1>
          <p className="mt-1 text-sm text-slate-400">Register your owner profile for RentAll-Q</p>
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
          <div>
            <label className="block text-xs font-medium text-slate-300">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@rentall.com"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-sky-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
