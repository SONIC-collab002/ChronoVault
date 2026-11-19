
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ErrorMonitor } from '@/components/error-monitor';
import { TemporalProvider } from '@/context/temporal-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChronoVault · Temporal Archive & Stasis Chambers',
  description: 'Retro-futuristic personal time vault service. Seal reflections, vocal transmissions, and predictive wagers across time.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[#080a10] text-slate-100`}>
        <ErrorMonitor />
        <TemporalProvider>
          {children}
          <Toaster />
        </TemporalProvider>
      </body>
    </html>
  );
}
