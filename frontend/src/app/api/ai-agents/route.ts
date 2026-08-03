import { NextResponse } from 'next/server';

export interface AIAgentOutput {
  id: string;
  agentName: 'Customer Intelligence Agent' | 'Pricing Agent' | 'Occupancy Agent' | 'Risk Agent' | 'Business Advisor Agent';
  agentBadgeColor: string;
  title: string;
  insight: string;
  reasoning: string;
  confidenceScore: number; // 0 - 100
  supportingDataPoint: string;
  recommendedAction: string;
  category: 'Churn Risk' | 'Pricing' | 'Occupancy Forecast' | 'Payment Risk' | 'Strategic Advisor';
  impact: string;
  entityId?: string;
  createdAt: string;
}

const mockAgentFeed: AIAgentOutput[] = [
  {
    id: 'ai-rec-1',
    agentName: 'Pricing Agent',
    agentBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    title: 'Dynamic Storage Unit Repricing',
    insight: 'Unit B12 has been vacant for 18 days. Local demand for 10x10 self-storage lockers increased 18% this month.',
    reasoning: 'Why this recommendation? Market velocity analysis shows 4 inquiries for 10x10 units this week. Adjusting unleased rates from ₹14,500/mo to ₹16,200/mo optimizes overall yield while maintaining strong conversion probability.',
    confidenceScore: 94,
    supportingDataPoint: '+18% Local Demand &bull; 4 Recent Inquiries',
    recommendedAction: 'Apply Repricing to ₹16,200/mo',
    category: 'Pricing',
    impact: '+₹1,15,000/yr Estimated Yield Gain',
    createdAt: '2026-08-04T00:00:00Z',
  },
  {
    id: 'ai-rec-2',
    agentName: 'Risk Agent',
    agentBadgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    title: 'Late-Payment Risk Flagged (Bay 4B)',
    insight: 'Apex Logistics invoice #INV-882 is 5 days past due. Historical risk score indicates high probability of default if not engaged within 48h.',
    reasoning: 'Why this recommendation? Apex Logistics experienced 2 overdue payment cycles last quarter. Triggering an automated 1-click WhatsApp checkout link increases recovery speed by 68%.',
    confidenceScore: 88,
    supportingDataPoint: '88% Default Risk &bull; 2 Past Overdue Cycles',
    recommendedAction: 'Send 1-Click WhatsApp Recovery',
    category: 'Payment Risk',
    impact: '₹2,50,000 Cashflow Recovery',
    createdAt: '2026-08-03T22:30:00Z',
  },
  {
    id: 'ai-rec-3',
    agentName: 'Customer Intelligence Agent',
    agentBadgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    title: 'High Churn Risk (Sarah Lin - Locker #102)',
    insight: 'Sarah Lin lease expires in 21 days with no renewal activity. Portal login activity dropped 40% over the last 30 days.',
    reasoning: 'Why this recommendation? Predictive tenant scoring identifies a 78% churn probability. Proactively issuing a 5% early-renewal loyalty discount secures a 12-month extension before vacancy occurs.',
    confidenceScore: 91,
    supportingDataPoint: '78% Churn Risk Score &bull; Lease Expires 21d',
    recommendedAction: 'Issue 5% Early Renewal Offer',
    category: 'Churn Risk',
    impact: '₹2,40,000 Annual Value Retained',
    createdAt: '2026-08-03T18:15:00Z',
  },
  {
    id: 'ai-rec-4',
    agentName: 'Occupancy Agent',
    agentBadgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    title: 'Zone C Vacancy Forecast & Conversion',
    insight: 'Parking Slots #12-#15 have 42% lower utilization than average. Forecast predicts continued under-occupancy for Q3.',
    reasoning: 'Why this recommendation? Converting 2 underutilized parking slots into EV-charging enabled bays will capture growing commercial EV fleet demand in your area.',
    confidenceScore: 82,
    supportingDataPoint: '42% Low Utilization &bull; EV Fleet Surge in Zone C',
    recommendedAction: 'Convert 2 Slots to EV Bays',
    category: 'Occupancy Forecast',
    impact: '+₹65,000/mo New Recurring Revenue',
    createdAt: '2026-08-03T15:00:00Z',
  },
  {
    id: 'ai-rec-5',
    agentName: 'Business Advisor Agent',
    agentBadgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    title: 'Comprehensive Portfolio Optimization Summary',
    insight: 'Overall portfolio health is strong at 85% occupancy. Implementing automated late recovery and repricing will elevate annual NOI by 11.2%.',
    reasoning: 'Why this recommendation? Combined agent telemetry synthesized across 184 active leases shows zero structural bottlenecks. Focus execution on automated collection and proactive renewals.',
    confidenceScore: 96,
    supportingDataPoint: '+11.2% Target NOI Increase &bull; 85% Occupancy',
    recommendedAction: 'Execute All Prioritized AI Actions',
    category: 'Strategic Advisor',
    impact: '+₹14,50,000 Total Portfolio Value',
    createdAt: '2026-08-03T12:00:00Z',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    agents: [
      { name: 'Customer Intelligence Agent', focus: 'Churn risk scoring per customer' },
      { name: 'Pricing Agent', focus: 'Suggested price adjustments per unit based on demand/occupancy' },
      { name: 'Occupancy Agent', focus: 'Vacancy forecasting & conversion' },
      { name: 'Risk Agent', focus: 'Late-payment & fraud risk flagging' },
      { name: 'Business Advisor Agent', focus: 'Prioritized overall business advisor feed' },
    ],
    recommendations: mockAgentFeed,
  });
}
