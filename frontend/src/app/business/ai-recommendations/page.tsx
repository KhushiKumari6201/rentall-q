'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIAgentCard } from '@/features/ai-advisor/components/AIAgentCard';
import { AIAgentOutput } from '@/app/api/ai-agents/route';
import { BrainCircuit, Filter, RefreshCw, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AIRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<AIAgentOutput[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<string>('ALL');
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  const fetchAIRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-agents');
      const data = await res.json();
      if (data.success) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.error('Failed to load AI recommendations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIRecommendations();
  }, []);

  const handleApply = (id: string, title: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
    setAppliedToast(`Applied AI Action: "${title}" successfully.`);
    setTimeout(() => setAppliedToast(null), 3500);
  };

  const handleDismiss = (id: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredRecommendations = recommendations.filter((r) =>
    selectedAgent === 'ALL' ? true : r.agentName === selectedAgent
  );

  return (
    <div className="space-y-6 text-navy-900 font-sans antialiased">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-900 text-amber-400">
              <BrainCircuit className="h-3.5 w-3.5" />
              RentallQ AI Multi-Agent Service
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy-900 font-serif">
            Autonomous Business Advisor Feed
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time telemetry and decision recommendations aggregated across 5 specialized AI agents.
          </p>
        </div>

        <button
          onClick={fetchAIRecommendations}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 bg-cream-50 text-xs font-semibold text-navy-900 hover:bg-cream-100 transition cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-stone-500 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync AI Agents</span>
        </button>
      </div>

      {/* Applied Toast */}
      <AnimatePresence>
        {appliedToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-2 shadow-xs"
          >
            <Check className="h-4 w-4 text-emerald-600" />
            <span>{appliedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5 Specialized Agents Status Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {[
          { name: 'Pricing Agent', desc: 'Yield & Demand', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
          { name: 'Risk Agent', desc: 'Late Payment & Fraud', color: 'bg-rose-50 text-rose-800 border-rose-200' },
          { name: 'Customer Intelligence', desc: 'Churn Scoring', color: 'bg-purple-50 text-purple-800 border-purple-200' },
          { name: 'Occupancy Agent', desc: 'Vacancy Forecasting', color: 'bg-sky-50 text-sky-800 border-sky-200' },
          { name: 'Business Advisor', desc: 'NOI Optimization', color: 'bg-amber-50 text-amber-900 border-amber-200' },
        ].map((agent) => (
          <div key={agent.name} className={`p-3.5 rounded-2xl border text-xs ${agent.color}`}>
            <div className="font-bold font-serif">{agent.name}</div>
            <div className="text-[10px] opacity-80 mt-0.5">{agent.desc}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] mr-2">Filter Agent:</span>
        {[
          { id: 'ALL', label: 'All AI Feed' },
          { id: 'Pricing Agent', label: 'Pricing Agent' },
          { id: 'Risk Agent', label: 'Risk Agent' },
          { id: 'Customer Intelligence Agent', label: 'Customer Intelligence' },
          { id: 'Occupancy Agent', label: 'Occupancy Agent' },
          { id: 'Business Advisor Agent', label: 'Business Advisor' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedAgent(tab.id)}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
              selectedAgent === tab.id
                ? 'bg-navy-900 text-white font-bold shadow-2xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-cream-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* AI Recommendation Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-sm text-stone-500 font-medium">
          Synchronizing multi-agent intelligence feed...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredRecommendations.map((rec) => (
              <AIAgentCard
                key={rec.id}
                recommendation={rec}
                onApply={handleApply}
                onDismiss={handleDismiss}
              />
            ))}
          </AnimatePresence>

          {filteredRecommendations.length === 0 && (
            <div className="col-span-full rounded-2xl border border-stone-200 bg-white p-12 text-center space-y-3">
              <ShieldCheck className="h-10 w-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-navy-900 font-serif">All Agent Recommendations Executed!</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No active recommendations for this agent category. Your operations are currently 100% optimized.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
