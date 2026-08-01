import React from 'react';

interface BadgeProps {
  status: string;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  let badgeClass = 'badge-purple';
  const s = status.toUpperCase();
  if (['CONFIRMED', 'COMPLETED', 'SUCCESS', 'ACTIVE'].includes(s)) badgeClass = 'badge-success';
  if (['PENDING', 'MEDIUM', 'QUEUED'].includes(s)) badgeClass = 'badge-warning';

  return <span className={`badge ${badgeClass}`}>{status}</span>;
};
