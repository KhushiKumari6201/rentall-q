'use client';

import Link from 'next/link';
import { Building2, UserCheck, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ClientRegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4 text-cream-100">
      <div className="w-full max-w-md rounded-2xl border border-navy-700 bg-navy-800/80 p-8 shadow-2xl text-center backdrop-blur-md space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <UserCheck className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white font-serif">Client Registration</h1>
          <p className="text-sm text-stone-300 leading-relaxed">
            Client accounts are managed directly by your rental provider.
          </p>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 leading-relaxed font-medium">
          Ask your rental provider for an invite link or login credentials to access your client portal.
        </div>

        <div className="pt-2 space-y-3">
          <Link href="/login">
            <Button variant="primary" size="lg" className="w-full justify-center bg-amber-500 text-navy-900 hover:bg-amber-400 font-semibold border-amber-500">
              <span>Go to Client Sign In</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          <Link href="/business/login">
            <Button variant="ghost" size="md" className="w-full justify-center text-stone-400 hover:text-white">
              Are you a Business Owner? Login Here
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
