import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Liuniipu Portfolio',
  description: 'Next.js + Tailwind reboot of the liuniipu.github.io site.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
