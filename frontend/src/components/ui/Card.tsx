import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, children, action }) => {
  return (
    <div className="glass-card">
      {(title || action) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            {title && <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>{title}</h3>}
            {subtitle && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '2px' }}>{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
