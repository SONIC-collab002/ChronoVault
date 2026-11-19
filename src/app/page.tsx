'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Vault, 
  Sparkles, 
  Clock, 
  Radio, 
  ShieldCheck, 
  Layers, 
  Compass, 
  ArrowRight, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Terminal,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useTemporal } from '@/context/temporal-context';
import { sfx } from '@/lib/synth-sfx';

const ARCHIVAL_DISPATCHES = [
  {
    id: 1,
    title: 'The Spark of the Temporal Anchor',
    epoch: 'Epoch 2024.01 // Foundation Dispatch',
    author: 'Archivist Thorne · Station Zeta-9',
    content:
      'What if we could truly speak to the future without the erosion of digital decay? Not just fading status updates, but raw hopes, voice recordings, and honest fears sealed in cryptographic stasis. That was the dawn of ChronoVault.',
  },
  {
    id: 2,
    title: 'To the Vanguard of the Decadal Stasis',
    epoch: 'Epoch 2024.03 // Station Directive',
    author: 'Director Sarah Vance · Deep Vault Prime',
    content:
      'To the pioneers who sealed their first letters and memory crystals into our cryo-chambers: you are constructing an unbroken bridge to the person you have not yet met—your future self. Guard your moments.',
  },
  {
    id: 3,
    title: 'On the Preservation of Human Continuity',
    epoch: 'Epoch 2025.06 // Temporal Telemetry',
    author: 'Chief Engineer Kaelen · Orbital Relay 01',
    content:
      'ChronoVault is not merely a service; it is an epochal legacy archive. As the decades advance and worlds transform, these sealed chambers will unlock on schedule, delivering the authentic voice of who you were.',
  },
];

export default function HomePage() {
  const { crtMode, setCrtMode, soundEnabled, toggleSound } = useTemporal();
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC CHRONO-TIME'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#080a10] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* 3-Zone Retro-Futuristic Top Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between gap-8 px-4 sm:px-6">
          {/* Zone 1: Single element Brand Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-amber-400 shrink-0">
            <div className="p-2 rounded-xl neo-recessed border border-amber-500/30 text-amber-400">
              <Vault className="h-5 w-5" />
            </div>
            <span className="text-lg font-mono tracking-wider text-slate-100 whitespace-nowrap">
              CHRONO<span className="text-amber-400">VAULT</span>
            </span>
          </Link>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-400">
            <a href="#features" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
              Chamber Features
            </a>
            <a href="#artifacts" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
              Memory Crystals
            </a>
            <a href="#lore" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
              Archival Dispatches
            </a>
            <a href="#observatory" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
              Observatory Telemetry
            </a>
          </nav>

          {/* Zone 3: CRT/SFX toggles + 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCrtMode((prev) => !prev)}
              className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                crtMode 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' 
                  : 'bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-bold">CRT</span>
            </button>

            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                soundEnabled 
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' 
                  : 'bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px] font-bold">SFX</span>
            </button>

            <Button asChild className="neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs px-4 py-2 whitespace-nowrap shrink-0 shadow-lg shadow-amber-500/20">
              <Link href="/dashboard">
                Open Stasis Vault
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Subterranean Vault Imagery */}
        <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 overflow-hidden border-b border-amber-500/20">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/assets/images/hero_retrofuturistic_vault_1794235835517.jpg"
              alt="Subterranean Retro-Futuristic Chrono-Vault"
              fill
              priority
              className="object-cover opacity-35"
              referrerPolicy="no-referrer"
            />
            {/* Measured Glassmorphic Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/70 to-[#080a10]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
          </div>

          <div className="container relative mx-auto max-w-4xl text-center space-y-6">
            {/* Telemetry Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full neo-recessed border border-amber-500/30 text-xs font-mono text-amber-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>SUBTERRANEAN STATION 04 · EPOCH 2026 NEXUS</span>
            </div>

            {/* Dominant Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-mono tracking-tight text-white leading-tight">
              Preserve the Present <br className="hidden sm:inline" />
              <span className="text-amber-400 amber-glow">Across the Streams of Time</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-lg text-slate-300 font-mono max-w-2xl mx-auto leading-relaxed">
              Seal your memories, predictive wagers, and analog vocal transmissions today. Locked with zero-tamper cryptographic stasis until your chosen future epoch.
            </p>

            {/* Live UTC Chrono-Clock Readout */}
            <div className="p-3 max-w-md mx-auto rounded-xl neo-recessed border border-white/5 font-mono text-xs text-cyan-400 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="tabular-nums">{utcTime || 'SYNCHRONIZING CHRONO-CLOCK...'}</span>
            </div>

            {/* Tactile Neomorphic Hero Action: Big Giant Entry Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-sm sm:text-base px-8 py-4 shadow-2xl shadow-amber-500/30 gap-2.5 sm:scale-105 transition-all">
                <Link href="/dashboard" onClick={() => sfx.playSeal()}>
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                  Encode Entry for Your Future Self
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="neo-button border-white/10 text-slate-300 hover:text-white font-mono text-sm px-6 py-4">
                <a href="#features">
                  Explore Chambers
                </a>
              </Button>
            </div>

            {/* Quick-dispatch presets for Future Predictors & Writers */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Quick dispatch:</span>
              <Link href="/dashboard" className="px-3 py-1 rounded-lg neo-recessed border border-white/5 hover:border-amber-500/40 text-amber-300 hover:text-amber-200 transition-colors">
                📜 Letter to Future Self
              </Link>
              <Link href="/dashboard" className="px-3 py-1 rounded-lg neo-recessed border border-white/5 hover:border-cyan-500/40 text-cyan-300 hover:text-cyan-200 transition-colors">
                🔮 2030 World Prediction
              </Link>
              <Link href="/dashboard" className="px-3 py-1 rounded-lg neo-recessed border border-white/5 hover:border-amber-500/40 text-slate-300 hover:text-white transition-colors">
                🎙️ Analog Voice Tape
              </Link>
            </div>
          </div>
        </section>

        {/* Features Matrix: Neomorphism & Glassmorphism Bento */}
        <section id="features" className="py-24 border-b border-amber-500/20 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <div className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                Temporal Stasis Protocols
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">
                Engineered for Decadal Longevity
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Four specialized stasis chambers calibrated to prevent memory degradation and temporal drift.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between neo-extruded group hover:border-amber-500/30 transition-all">
                <div>
                  <div className="p-3 rounded-xl neo-recessed text-amber-400 w-fit mb-4">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold font-mono text-white mb-2 group-hover:text-amber-300 transition-colors">
                    01. Crystallographic Memory
                  </h3>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    Store high-definition holographic photo memories preserved inside synthetic vacuum-tube matrix crystals.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  SECTOR 01 PROTOCOL · 100% RETENTION
                </div>
              </div>

              {/* Feature 2 */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between neo-extruded group hover:border-amber-500/30 transition-all">
                <div>
                  <div className="p-3 rounded-xl neo-recessed text-amber-400 w-fit mb-4">
                    <Radio className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold font-mono text-white mb-2 group-hover:text-amber-300 transition-colors">
                    02. Analog Vocal Tapes
                  </h3>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    Record your raw voice tone, acoustic resonance, and verbal transmissions with real-time audio waveform synthesis.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  MAGNETIC REEL EMULATION · 96KHZ
                </div>
              </div>

              {/* Feature 3 */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between neo-extruded group hover:border-cyan-500/30 transition-all">
                <div>
                  <div className="p-3 rounded-xl neo-recessed text-cyan-400 w-fit mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold font-mono text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    03. Predictive Horizon Wagers
                  </h3>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    Lock bold world or personal forecasts with confidence sliders. Compare your bets against future reality on unlock day.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  CALIBRATED WAGER METER · 0–100%
                </div>
              </div>

              {/* Feature 4 */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between neo-extruded group hover:border-amber-500/30 transition-all">
                <div>
                  <div className="p-3 rounded-xl neo-recessed text-amber-400 w-fit mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold font-mono text-white mb-2 group-hover:text-amber-300 transition-colors">
                    04. Cryptographic Stasis
                  </h3>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    Each payload is assigned a unique alphanumeric cipher key (`CV-XXXX-GREEK`) ensuring mathematical anti-tamper security.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  QUANTUM TIME LOCK · ZERO DRIFT
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Memory Crystal Spotlight Showcase */}
        <section id="artifacts" className="py-24 border-b border-amber-500/20 bg-slate-950/40">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Macro Artifact Image */}
              <div className="relative rounded-2xl overflow-hidden neo-extruded border border-amber-500/30 aspect-[4/3] group">
                <Image
                  src="/assets/images/holographic_memory_crystal_1794235836080.jpg"
                  alt="Quantum Vacuum Tube Memory Core Artifact"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-amber-300">
                  <span>MEMORY CORE MEM-043</span>
                  <span className="text-cyan-400">CHRONOFLUX STABILITY: 100%</span>
                </div>
              </div>

              {/* Right Column: Narrative Explanations */}
              <div className="space-y-6">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  Physical World Building Artifact
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white leading-tight">
                  Tactile Brass Dials Meet Quantum Optical Prisms
                </h2>
                <p className="text-sm text-slate-300 font-mono leading-relaxed">
                  In our world, time capsules are not mere text strings stored on fragile cloud servers. They are engineered as physical-digital constructs—suspended in brass vacuum tube arrays with calibrated resonance circuits.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="neo-recessed p-3 rounded-xl border border-white/5 flex items-center gap-3 font-mono text-xs text-slate-300">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 font-bold">01</span>
                    <span>Sub-light laser excitation reads trapped photon coordinates without decay.</span>
                  </div>
                  <div className="neo-recessed p-3 rounded-xl border border-white/5 flex items-center gap-3 font-mono text-xs text-slate-300">
                    <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold">02</span>
                    <span>Hermetic inert gas sealing prevents atmospheric oxidation across centuries.</span>
                  </div>
                  <div className="neo-recessed p-3 rounded-xl border border-white/5 flex items-center gap-3 font-mono text-xs text-slate-300">
                    <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">03</span>
                    <span>Decompression sequence executes automatically when the target epoch arrives.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild className="neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs px-6 py-2">
                    <Link href="/dashboard">
                      Seal Your First Crystal Memory
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Archival Dispatches / Lore Section */}
        <section id="lore" className="py-24 border-b border-amber-500/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <div className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                Bureau of Temporal Continuity
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">
                Archival Station Dispatches
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Historical transmissions from the architects of the deep subterranean chambers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ARCHIVAL_DISPATCHES.map((dispatch) => (
                <div
                  key={dispatch.id}
                  className="glass-card p-6 rounded-2xl border border-white/5 neo-extruded flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-mono text-amber-400 mb-2">
                      {dispatch.epoch}
                    </div>
                    <h3 className="text-base font-bold font-mono text-slate-100 mb-4">
                      {dispatch.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono italic leading-relaxed">
                      &ldquo;{dispatch.content}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500">
                    {dispatch.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Space Observatory Showcase */}
        <section id="observatory" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 neo-extruded">
              <div className="relative min-h-[460px] w-full flex items-center p-8 sm:p-14">
                <Image
                  src="/assets/images/deep_space_chronostation_1794235836747.jpg"
                  alt="Deep Space Chrono Station"
                  fill
                  className="object-cover opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

                <div className="relative max-w-xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neo-recessed border border-amber-500/40 text-xs font-mono text-amber-400">
                    <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    <span>ORBITAL CONTINUITY ARRAY</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-bold font-mono text-white leading-tight">
                    Synchronized with Planetary Relays
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                    Even during localized network disruptions or catastrophic power events, your locked messages are mirror-propagated to high-orbit archival buoys. Your reflections are eternal.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button asChild className="neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs px-6 py-2.5">
                      <Link href="/dashboard" onClick={() => sfx.playSeal()}>
                        Access Station Console
                      </Link>
                    </Button>
                    <span className="text-xs font-mono text-slate-400">
                      Zero subscription fees · Perpetual vault allocation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean 1-Zone Terminal Footer */}
      <footer className="py-8 border-t border-amber-500/20 bg-slate-950 text-xs font-mono text-slate-400">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>SYS-STATUS: NOMINAL · CONTINUITY BUFFER ONLINE</span>
          </div>
          <div className="text-slate-500">
            &copy; {new Date().getFullYear()} ChronoVault Observatory. All temporal rights preserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
