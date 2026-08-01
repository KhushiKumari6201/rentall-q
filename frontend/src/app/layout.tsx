import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rental Business Management',
  description: 'Booking operations reference implementation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0f172a', color: '#e2e8f0', fontFamily: 'Arial, sans-serif' }}>{children}</body>
    </html>
  );
}
