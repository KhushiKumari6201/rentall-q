import './globals.css';
import React from 'react';

export const metadata = {
  title: 'RentAll-Q | Next.js Multi-Agent Rental System',
  description: 'Clean Architecture Next.js platform with Python AI Agents Microservice',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout-container">
          <aside className="sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white' }}>
                Q
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'white' }}>
                RentAll-Q
              </span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', color: 'white', background: 'rgba(99, 102, 241, 0.15)', borderLeft: '3px solid var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                <span>🏠 Dashboard</span>
              </a>
              <a href="/bookings" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
                <span>📅 Bookings</span>
              </a>
            </nav>
          </aside>
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
