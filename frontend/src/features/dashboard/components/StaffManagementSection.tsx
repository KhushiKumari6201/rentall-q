'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Shield, Trash2, Mail, CheckCircle, Crown, Briefcase, Wrench, X } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'BUSINESS_OWNER' | 'MANAGER' | 'STAFF';
  status: 'ACTIVE' | 'PENDING';
  lastActive: string;
  activityCount: number;
}

const initialTeam: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'You (Owner)',
    email: 'admin@rentallq.com',
    role: 'BUSINESS_OWNER',
    status: 'ACTIVE',
    lastActive: 'Now online',
    activityCount: 142,
  },
  {
    id: 'tm-2',
    name: 'Alex Turner',
    email: 'alex.t@rentallq.com',
    role: 'MANAGER',
    status: 'ACTIVE',
    lastActive: '12 mins ago',
    activityCount: 89,
  },
  {
    id: 'tm-3',
    name: 'David Miller',
    email: 'david.m@rentallq.com',
    role: 'STAFF',
    status: 'ACTIVE',
    lastActive: '1 hour ago',
    activityCount: 45,
  },
  {
    id: 'tm-4',
    name: 'Priya Sharma',
    email: 'priya.s@rentallq.com',
    role: 'STAFF',
    status: 'PENDING',
    lastActive: 'Invite Sent',
    activityCount: 0,
  },
];

interface StaffManagementSectionProps {
  onNotify: (msg: string) => void;
}

export function StaffManagementSection({ onNotify }: StaffManagementSectionProps) {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'MANAGER' | 'STAFF'>('STAFF');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'PENDING',
      lastActive: 'Invite Sent',
      activityCount: 0,
    };

    setTeam((prev) => [...prev, newMember]);
    onNotify(`Invitation sent to ${inviteEmail} as ${inviteRole}.`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleRemove = (id: string, name: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
    onNotify(`Removed ${name} from team access.`);
  };

  const getRoleBadge = (role: TeamMember['role']) => {
    switch (role) {
      case 'BUSINESS_OWNER':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Crown className="h-3 w-3" /> Owner
          </span>
        );
      case 'MANAGER':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
            <Briefcase className="h-3 w-3" /> Manager
          </span>
        );
      case 'STAFF':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <Wrench className="h-3 w-3" /> Staff
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-5 font-sans">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900 text-white">
              <Users className="h-4 w-4 text-amber-400" />
            </div>
            <h2 className="text-lg font-bold text-navy-900 font-serif">Manager &amp; Staff Management</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage team seats, assign operational roles, and audit member activity logs.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-navy-800 transition cursor-pointer"
        >
          <UserPlus className="h-3.5 w-3.5 text-amber-400" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Member Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-navy-900">
          <thead>
            <tr className="border-b border-stone-200 bg-cream-50/70 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 rounded-l-xl">Team Member</th>
              <th className="py-3 px-4">Assigned Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Last Activity</th>
              <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {team.map((member) => (
              <tr key={member.id} className="hover:bg-cream-50/40 transition">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-100 text-navy-800 font-bold text-xs">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-navy-900">{member.name}</div>
                      <div className="text-[11px] text-stone-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">{getRoleBadge(member.role)}</td>
                <td className="py-3.5 px-4">
                  {member.status === 'ACTIVE' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle className="h-3 w-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Mail className="h-3 w-3" /> Pending Invite
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-stone-500 font-medium">{member.lastActive}</td>
                <td className="py-3.5 px-4 text-right">
                  {member.role !== 'BUSINESS_OWNER' && (
                    <button
                      onClick={() => handleRemove(member.id, member.name)}
                      className="p-1.5 rounded-lg text-stone-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                      title="Remove Access"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 font-sans space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-navy-900 font-serif">Invite Team Member</h3>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-navy-900 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@rentallq.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">Role Assignment</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                >
                  <option value="MANAGER">Manager — Operational access + AI reports (No Billing)</option>
                  <option value="STAFF">Staff Member — Daily check-ins &amp; payment logging only</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="rounded-xl border border-stone-200 px-4 py-2 font-semibold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-navy-900 px-5 py-2 font-bold text-white shadow-md hover:bg-navy-800 transition cursor-pointer"
                >
                  Send Team Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
