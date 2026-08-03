'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ChevronDown, ChevronUp, Sparkles, Check, X, ShieldAlert, TrendingUp, Users, PieChart } from 'lucide-react';
import { AIAgentOutput } from '@/app/api/ai-agents/route';

interface AIAgentCardProps {
  recommendation: AIAgentOutput;
  onApply: (id: string, title: string) => void;
  onDismiss: (id: string) => void;
}

export function AIAgentCard({ recommendation, onApply, onDismiss }: AIAgentCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getAgentIcon = (name: string) => {
    switch (name) {
      case 'Customer Intelligence Agent':
        return Users;
      case 'Pricing Agent':
        return TrendingUp;
      case 'Occupancy Agent':
        return PieChart;
      case 'Risk Agent':
        return ShieldAlert;
      case 'Business Advisor Agent':
      default:
        return BrainCircuit;
    }
  };

  const AgentIcon = getAgentIcon(recommendation.agentName);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -15 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-300 hover:shadow-md transition-all relative overflow-hidden font-sans text-navy-900"
    >
      <div className="space-y-3">
        {/* Header: Agent Name Badge & Confidence Score */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900 text-amber-400">
              <AgentIcon className="h-4 w-4" />
            </div>
            <span className="text-[11px] font-bold text-navy-900 uppercase tracking-wider">
              {recommendation.agentName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${recommendation.agentBadgeColor}`}>
              CONFIDENCE: {recommendation.confidenceScore}%
            </span>
          </div>
        </div>

        {/* Title & Insight */}
        <div>
          <h3 className="text-base font-bold text-navy-900 font-serif">
            {recommendation.title}
          </h3>
          <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-medium">
            {recommendation.insight}
          </p>
        </div>

        {/* Supporting Data Point & Impact Badge */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="inline-flex items-center gap-1.5 text-stone-600 bg-stone-100 px-3 py-1 rounded-xl font-mono text-[11px]">
            <span>📊 Data: {recommendation.supportingDataPoint}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/80 font-bold">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Impact: {recommendation.impact}</span>
          </div>
        </div>

        {/* Collapsible Reasoning ("Why") Section */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-amber-700 transition cursor-pointer"
          >
            <span>{expanded ? 'Hide Analysis ("Why")' : 'Read AI Reasoning & Data ("Why")'}</span>
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2.5 p-3.5 rounded-xl bg-cream-50/80 border border-stone-200/80 text-xs text-stone-700 leading-relaxed font-medium"
              >
                {recommendation.reasoning}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Bar: Dismiss & Recommended Action Button */}
      <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onDismiss(recommendation.id)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-rose-700 transition cursor-pointer px-2 py-1"
        >
          <X className="h-3.5 w-3.5" />
          <span>Dismiss</span>
        </button>

        <button
          type="button"
          onClick={() => onApply(recommendation.id, recommendation.title)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-navy-800 active:scale-[0.98] transition cursor-pointer"
        >
          <Check className="h-3.5 w-3.5 text-amber-400" />
          <span>{recommendation.recommendedAction}</span>
        </button>
      </div>
    </motion.div>
  );
}
