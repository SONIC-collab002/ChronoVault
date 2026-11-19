'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Vault, LogOut, Home, Monitor, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useTemporal } from '@/context/temporal-context';

export function DashboardHeader() {
  const { crtMode, setCrtMode, soundEnabled, toggleSound } = useTemporal();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single element Brand Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-amber-400 group">
          <div className="p-2 rounded-xl neo-recessed border border-amber-500/30 text-amber-400 group-hover:border-amber-400 transition-colors">
            <Vault className="h-5 w-5" />
          </div>
          <span className="text-lg font-mono tracking-wider text-slate-100">
            CHRONO<span className="text-amber-400">VAULT</span>
          </span>
        </Link>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
          <Link href="/dashboard" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Active Vault
          </Link>
          <Link href="/#timeline" className="hover:text-slate-200 transition-colors">
            Timeline Rail
          </Link>
          <Link href="/#lore" className="hover:text-slate-200 transition-colors">
            Station Lore
          </Link>
        </nav>

        {/* Zone 3: Tactile Controls + User Profile */}
        <div className="flex items-center gap-3">
          {/* CRT Scanline Toggle */}
          <button
            onClick={() => setCrtMode((prev) => !prev)}
            title={crtMode ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
            className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
              crtMode 
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-sm' 
                : 'bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] font-bold">CRT {crtMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
              soundEnabled 
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-sm' 
                : 'bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px] font-bold">SFX</span>
          </button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-xl neo-extruded p-0 border border-white/10">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage 
                    src="/assets/images/holographic_memory_crystal_1794235836080.jpg" 
                    alt="Chrono-Archivist" 
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-amber-500 text-slate-950 font-bold font-mono text-xs">
                    CV
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 glass-panel border border-amber-500/20 text-slate-200" align="end" forceMount>
              <DropdownMenuLabel className="font-mono text-xs">
                <div className="flex flex-col space-y-1">
                  <p className="font-bold text-amber-400">Chrono-Archivist 01</p>
                  <p className="text-[11px] text-slate-400">archivist@chronovault.space</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="cursor-pointer font-mono text-xs hover:bg-amber-500/10">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4 text-amber-400" />
                  <span>Station Terminal</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer font-mono text-xs hover:bg-amber-500/10">
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4 text-slate-400" />
                  <span>Disconnect Vault</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
