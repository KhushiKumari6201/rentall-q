'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { FreeTrialModal } from '@/components/landing/FreeTrialModal';

export function ContactPage() {
  const shouldReduceMotion = useReducedMotion();
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  // Status State
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate network submission & paper plane animation
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardLeftVariants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.5, ease: 'easeOut' },
    },
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-cream-100 text-navy-900 font-sans antialiased selection:bg-amber-200 selection:text-navy-900 flex flex-col justify-between">
      <FreeTrialModal isOpen={trialModalOpen} onClose={() => setTrialModalOpen(false)} />
      
      <Navbar onOpenTrialModal={() => setTrialModalOpen(true)} />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-navy-900 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column — Stacked Info Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 space-y-6"
            >
              <motion.div variants={cardLeftVariants} className="space-y-3">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-700 bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
                  Contact Us
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-900 leading-[1.15] font-serif">
                  We&apos;d love to hear from you.
                </h1>
                <p className="text-base text-stone-600 leading-relaxed font-normal">
                  Have questions about RentallQ, multi-unit onboarding, or custom enterprise setups? Reach out directly to our operations team.
                </p>
              </motion.div>

              {/* 3 Stacked Info Cards */}
              <div className="space-y-4 pt-2">
                
                {/* Email Card */}
                <motion.div
                  variants={cardLeftVariants}
                  className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs flex items-center gap-4 hover:border-amber-400 hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-amber-400 shadow-sm flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Email Us</h3>
                    <a href="mailto:support@rentallq.com" className="text-base font-bold text-navy-900 hover:text-amber-700 transition-colors font-serif">
                      support@rentallq.com
                    </a>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  variants={cardLeftVariants}
                  className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs flex items-center gap-4 hover:border-amber-400 hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-amber-400 shadow-sm flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Call Us</h3>
                    <a href="tel:+18005557368" className="text-base font-bold text-navy-900 hover:text-amber-700 transition-colors font-serif">
                      +1 (800) 555-RENT
                    </a>
                  </div>
                </motion.div>

                {/* Address Card */}
                <motion.div
                  variants={cardLeftVariants}
                  className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs flex items-center gap-4 hover:border-amber-400 hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-amber-400 shadow-sm flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Visit Us</h3>
                    <p className="text-sm font-bold text-navy-900 font-serif leading-snug">
                      100 Technology Plaza, Suite 400<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* Small Note Card */}
              <motion.div
                variants={cardLeftVariants}
                className="rounded-2xl border border-amber-300/80 bg-amber-50/70 p-4.5 flex items-center gap-3 text-xs text-amber-950 shadow-2xs"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-200 text-amber-900 flex-shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <p className="leading-relaxed font-medium">
                  <strong className="font-semibold">Quick Guarantee:</strong> Our team responds to all inquiries within 1 business day.
                </p>
              </motion.div>

            </motion.div>

            {/* Right Column — White rounded-2xl Form Card */}
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7"
            >
              <div className="rounded-2xl border border-stone-200/90 bg-white p-7 sm:p-10 shadow-lg shadow-stone-200/50 relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h2 className="text-2xl font-bold text-navy-900 font-serif">Message Sent!</h2>
                      <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out, <strong className="font-semibold text-navy-900">{fullName}</strong>. One of our operational specialists will contact you at <strong className="font-semibold text-navy-900">{email}</strong> within 1 business day.
                      </p>
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setFullName('');
                            setEmail('');
                            setPhone('');
                            setBusinessName('');
                            setCity('');
                            setMessage('');
                          }}
                          className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
                        >
                          Send another message &rarr;
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <h2 className="text-xl font-bold text-navy-900 font-serif">Send Us a Message</h2>
                        <p className="text-xs text-stone-500 mt-1">Fill in the details below and we will get back to you shortly.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy-800 mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder-stone-400 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-navy-800 mb-1.5">Work Email *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder-stone-400 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy-800 mb-1.5">Phone Number</label>
                          <div className="flex gap-2">
                            <select
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              className="rounded-xl border border-stone-300 bg-cream-50 px-2.5 py-2.5 text-xs font-semibold text-navy-900 focus:border-amber-500 focus:outline-none"
                            >
                              <option value="+1">US +1</option>
                              <option value="+91">IN +91</option>
                              <option value="+44">UK +44</option>
                              <option value="+61">AU +61</option>
                            </select>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="(555) 000-0000"
                              className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder-stone-400 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-navy-800 mb-1.5">Business / Shop Name</label>
                          <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Apex Self-Storage"
                            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder-stone-400 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-800 mb-1.5">City / Location</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="San Francisco, CA"
                          className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder-stone-400 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-800 mb-1.5">Your Message *</label>
                        <textarea
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your rental business, unit count, or any specific questions..."
                          className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder-stone-400 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-y"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy-900 py-3.5 text-sm font-bold text-white shadow-md hover:bg-navy-800 transition active:scale-[0.99] disabled:opacity-50 cursor-pointer overflow-hidden relative"
                        >
                          <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                          
                          {/* Paper-plane flight animation */}
                          <motion.div
                            animate={
                              submitting && !shouldReduceMotion
                                ? { x: [0, 40], y: [0, -40], opacity: [1, 0] }
                                : { x: 0, y: 0, opacity: 1 }
                            }
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          >
                            <Send className="h-4 w-4 text-amber-400" />
                          </motion.div>
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>

        </div>
      </main>

      <Footer onOpenTrialModal={() => setTrialModalOpen(true)} />
    </div>
  );
}
