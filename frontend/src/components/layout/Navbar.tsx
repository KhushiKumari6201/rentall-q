'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/server/lib/supabaseClient';

interface UserProfile {
  name: string;
  role: string;
  email?: string;
}

export function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        // Fetch profile from public.profiles
        const { data, error } = await supabase
          .from('profiles')
          .select('name, role')
          .eq('id', user.id)
          .maybeSingle();

        if (data) {
          setProfile({
            name: data.name || user.user_metadata?.name || 'User',
            role: data.role || 'OWNER',
            email: user.email,
          });
        } else {
          setProfile({
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            role: 'OWNER',
            email: user.email,
          });
        }
      } catch (err) {
        console.error('Failed to load user profile', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/60 px-6 backdrop-blur-sm text-slate-100">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-300">Workspace Management</span>
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
        ) : profile ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-white">{profile.name}</div>
              <div className="text-[11px] text-slate-400">{profile.email}</div>
            </div>
            <span className="rounded bg-sky-950 px-2 py-0.5 text-xs font-semibold text-sky-400 border border-sky-800/40 uppercase">
              {profile.role}
            </span>
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-rose-900/40 hover:text-rose-300 hover:border-rose-700/50"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
