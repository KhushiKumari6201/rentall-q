'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/server/lib/supabaseClient';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FreeTrialModal({ isOpen, onClose }: FreeTrialModalProps) {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [cityAddress, setCityAddress] = useState('');
  const [businessType, setBusinessType] = useState<'self_storage' | 'warehouse' | 'hostel' | 'parking' | 'equipment'>('self_storage');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = fullName.trim();
      const cleanBizName = businessName.trim();

      // 1. Sign up user via Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            name: cleanName || 'Business Owner',
            phone: `${countryCode} ${phone}`,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError('Signup failed. Please check your credentials.');
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
        console.error('Error creating business:', bizError);
      }

      // 3. Upsert Profile with BUSINESS_OWNER role
      await supabase.from('profiles').upsert({
        id: userId,
        name: cleanName,
        role: 'BUSINESS_OWNER',
        business_id: businessData?.id || null,
      });

      router.push('/business/dashboard');
      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to start free trial.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 shadow-2xl transition-all my-8 text-navy-900">
        
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 text-stone-400 hover:text-navy-900 transition-colors p-1"
          aria-label="Close Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
            14-DAY FREE TRIAL
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-navy-900 font-serif">
            Get started with RentallQ
          </h2>
        </div>

        {error ? (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                FULL NAME <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ramesh Shah"
                className="mt-1 w-full rounded-lg border border-stone-300 bg-cream-50/60 px-3.5 py-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                PHONE <span className="text-rose-500">*</span>
              </label>
              <div className="mt-1 flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="rounded-lg border border-stone-300 bg-cream-50/60 px-2 py-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none"
                >
                  <option value="+1">US +1</option>
                  <option value="+91">IN +91</option>
                  <option value="+44">UK +44</option>
                  <option value="+61">AU +61</option>
                </select>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full rounded-lg border border-stone-300 bg-cream-50/60 px-3.5 py-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                EMAIL <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-stone-300 bg-cream-50/60 px-3.5 py-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                PASSWORD <span className="text-rose-500">*</span>
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="mt-1 w-full rounded-lg border border-stone-300 bg-cream-50/60 px-3.5 py-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                SHOP / BUSINESS NAME <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Shah Bridal House"
                className="mt-1 w-full rounded-lg border border-stone-300 bg-cream-50/60 px-3.5 py-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                CITY / ADDRESS <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={cityAddress}
                onChange={(e) => setCityAddress(e.target.value)}
                placeholder="Surat, Gujarat"
                className="mt-1 w-full rounded-lg border border-stone-300 bg-cream-50/60 px-3.5 py-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
              BUSINESS TYPE / PLAN
            </label>
            <select
              value={businessType}
              onChange={(e: any) => setBusinessType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-cream-50/60 px-3.5 py-2 text-sm text-navy-900 focus:border-navy-900 focus:outline-none"
            >
              <option value="self_storage">Free Trial — Self-Storage</option>
              <option value="warehouse">Free Trial — Warehouse</option>
              <option value="hostel">Free Trial — Hostel / Co-living</option>
              <option value="parking">Free Trial — Parking Lots</option>
              <option value="equipment">Free Trial — Equipment Rental</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
              ANYTHING YOU&apos;D LIKE US TO KNOW?
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. I manage 200 items and need help with bookings..."
              className="mt-1 w-full rounded-lg border border-stone-300 bg-cream-50/60 p-3 text-sm text-navy-900 focus:border-navy-900 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-50 mt-2 shadow-md"
          >
            <span>{loading ? 'Setting up trial...' : 'Start my free trial'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-stone-500 font-medium">
          No credit card required &bull; Our team will contact you within 1 business day
        </div>
      </div>
    </div>
  );
}
