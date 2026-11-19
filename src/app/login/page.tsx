'use client';

import { AuthForm } from '@/components/auth-form';
import { Vault, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AuthenticationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-[#080a10] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.06)_0%,_transparent_70%)] pointer-events-none" />

      {/* Brand Header */}
      <div className="flex flex-col items-center space-y-3 mb-8 text-center relative z-10">
        <Link href="/" className="p-3 rounded-2xl neo-recessed border border-amber-500/30 text-amber-400 mb-1 hover:border-amber-400 transition-colors">
          <Vault className="h-8 w-8" />
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>STATION GATEWAY · AUTHENTICATION CONSOLE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-wider">
          CHRONO<span className="text-amber-400">VAULT</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono max-w-sm">
          Access your cryo-stasis memory chambers and historical transmissions.
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md relative z-10">
        <AuthForm />
      </div>

      {/* Footer footnote */}
      <div className="mt-8 text-center text-[11px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
        <span>End-to-End Encrypted Quantum Tunnel</span>
      </div>
    </main>
  );
}
