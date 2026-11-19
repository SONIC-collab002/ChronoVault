'use client';

import React from 'react';
import { 
  Plus, 
  Sparkles, 
  FileText, 
  Radio, 
  Layers, 
  ArrowUpRight, 
  Lock, 
  Zap,
  ChevronRight,
  Compass
} from 'lucide-react';
import { sfx } from '@/lib/synth-sfx';
import type { CapsuleCategory } from '@/types/capsule';

interface GiantEntryButtonProps {
  onOpenWithCategory: (category: CapsuleCategory, defaultTitle?: string) => void;
}

export function GiantEntryButton({ onOpenWithCategory }: GiantEntryButtonProps) {
  const handlePrimaryClick = () => {
    sfx.playSeal();
    onOpenWithCategory('personal_legacy', '');
  };

  const handlePresetClick = (e: React.MouseEvent, category: CapsuleCategory, presetTitle: string) => {
    e.stopPropagation();
    sfx.playClick();
    onOpenWithCategory(category, presetTitle);
  };

  return (
    <div className="relative group my-2">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-cyan-500/10 to-amber-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      {/* Main Console Container */}
      <div className="relative glass-panel rounded-3xl border border-amber-500/40 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7)] neo-extruded">
        {/* Top Deck Telemetry Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-amber-500/20 text-xs font-mono">
          <div className="flex items-center gap-2 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold tracking-wider">PRIMARY TRANSMISSION PORTAL</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 hidden sm:inline">STASIS DECK 01 READY</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>256-BIT QUANTUM SEAL READY</span>
          </div>
        </div>

        {/* The Big Giant Button */}
        <button
          onClick={handlePrimaryClick}
          type="button"
          className="w-full text-left p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 hover:from-amber-500/30 hover:via-amber-500/20 hover:to-amber-500/30 border-2 border-amber-500/50 hover:border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_45px_rgba(245,158,11,0.35)] transition-all duration-300 transform active:scale-[0.99] flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
        >
          <div className="flex items-start sm:items-center gap-5">
            {/* Giant Glowing Mechanical Icon */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/50 shrink-0 transform group-hover:scale-105 transition-transform duration-300">
              <Plus className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
            </div>

            {/* Headline and Narrative Invitations */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-amber-300">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Instant Chrono-Vault Dispatch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                Encode New Entry To The Future
              </h2>
              <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-2xl leading-relaxed">
                Click here to pass your letters, predictions, or memories onto your future self. Suspended in stasis until your chosen target epoch.
              </p>
            </div>
          </div>

          {/* Action Callout Arrow */}
          <div className="shrink-0 flex items-center gap-2 self-end md:self-center font-mono text-xs font-bold text-amber-400 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-amber-500/40 shadow-sm group-hover:border-amber-300 transition-colors">
            <span>ENGAGE VAULT</span>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Quick-Launch Preset Buttons for Future Predictors & Writers */}
        <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick-Launch Stasis Chambers (1-Click Presets):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Preset 1: Future Predictor */}
            <button
              type="button"
              onClick={(e) => handlePresetClick(e, 'future_prediction', 'Predictions for the Year 2030 & Beyond')}
              className="p-3.5 rounded-xl neo-recessed hover:border-cyan-500/50 border border-white/5 text-left transition-all group/btn flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1.5">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-4 h-4" /> Future Prediction
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-cyan-400 transition-colors" />
              </div>
              <p className="text-[11px] font-mono text-slate-400 leading-tight">
                Lock in bold world or personal forecasts with a calibrated confidence wager meter.
              </p>
            </button>

            {/* Preset 2: Letter to Future Self */}
            <button
              type="button"
              onClick={(e) => handlePresetClick(e, 'personal_legacy', 'Letter to My Future Self · Decadal Stasis')}
              className="p-3.5 rounded-xl neo-recessed hover:border-amber-500/50 border border-white/5 text-left transition-all group/btn flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-1.5">
                <span className="flex items-center gap-1.5 font-bold">
                  <FileText className="w-4 h-4" /> Letter to Future Self
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-amber-400 transition-colors" />
              </div>
              <p className="text-[11px] font-mono text-slate-400 leading-tight">
                Pen an honest letter with advice, hopes, and memories for you to reopen years from today.
              </p>
            </button>

            {/* Preset 3: Vocal Transmission */}
            <button
              type="button"
              onClick={(e) => handlePresetClick(e, 'audio_log', 'Analog Vocal Dispatch · Current Reflections')}
              className="p-3.5 rounded-xl neo-recessed hover:border-amber-500/50 border border-white/5 text-left transition-all group/btn flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-1.5">
                <span className="flex items-center gap-1.5 font-bold">
                  <Radio className="w-4 h-4" /> Analog Vocal Tape
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-amber-400 transition-colors" />
              </div>
              <p className="text-[11px] font-mono text-slate-400 leading-tight">
                Record your voice, accent, and thoughts in a simulated magnetic audio tape stasis reel.
              </p>
            </button>

            {/* Preset 4: Quantum Memory Crystal */}
            <button
              type="button"
              onClick={(e) => handlePresetClick(e, 'quantum_imprint', 'Crystallographic Memory Imprint · Era Snapshot')}
              className="p-3.5 rounded-xl neo-recessed hover:border-purple-500/50 border border-white/5 text-left transition-all group/btn flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-1.5">
                <span className="flex items-center gap-1.5 font-bold">
                  <Layers className="w-4 h-4" /> Memory Crystal
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-purple-400 transition-colors" />
              </div>
              <p className="text-[11px] font-mono text-slate-400 leading-tight">
                Preserve a crystallized holographic optical snapshot with 100% quantum retention.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
