'use client';

import React from 'react';
import { useTemporal } from '@/context/temporal-context';
import { sfx } from '@/lib/synth-sfx';
import { FastForward, Clock, Compass, Zap } from 'lucide-react';
import type { Capsule } from '@/types/capsule';

interface TemporalScrubberProps {
  capsules: Capsule[];
}

const EPOCH_EVENTS: Record<number, string> = {
  2024: 'Genesis Vault Protocol Initialized · Initial Chrono-Anchor Set',
  2025: 'Autonomous Deep-Archive Cryo-Units Online · Sector 4 Calibration',
  2026: 'Current Present Nexus · Synchronized with Global Temporal Clock',
  2028: 'Projected Lunar Relay Terminal Activation · Sub-light Link Established',
  2030: 'Quantum Crystallographic Memory Arrays Replace Magnetic Tape Reels',
  2034: 'The First 10-Year Decadal Vaults Scheduled for Automatic Decompression',
  2040: 'Bicentennial Chrono-Archive Transmission to Orbital Deep Space Stations',
};

export function TemporalScrubber({ capsules }: TemporalScrubberProps) {
  const { simulatedYear, setSimulatedYear } = useTemporal();
  const currentActualYear = 2026;

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setSimulatedYear(newYear);
    sfx.playWarp();
  };

  // Calculate unlocked capsules under this simulated temporal horizon
  const unlockedCount = capsules.filter((c) => {
    const capYear = new Date(c.deliveryDate).getFullYear();
    return capYear <= simulatedYear;
  }).length;

  const totalCount = capsules.length;
  const isFutureJump = simulatedYear > currentActualYear;
  const yearDelta = simulatedYear - currentActualYear;

  const currentEvent = EPOCH_EVENTS[simulatedYear] || 
    (simulatedYear > 2035 
      ? 'Deep Era Archive in Continuous Cryo-Stasis · Telemetry Locked' 
      : 'Continuous Temporal Flow · Routine Epoch Observation');

  return (
    <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 mb-8 relative overflow-hidden">
      {/* Header telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg neo-recessed border border-amber-500/30 text-amber-400">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono tracking-wider text-slate-100 flex items-center gap-2">
              TEMPORAL HORIZON SCRUBBER
              {isFutureJump && (
                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                  +{yearDelta} YEARS DILATION
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Scrub the timeline rail to project future vault unlocks and world milestones
            </p>
          </div>
        </div>

        {/* Unlocked telemetry counter */}
        <div className="flex items-center gap-3 neo-recessed px-4 py-2 rounded-xl border border-white/5">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Unlocked At Horizon</div>
            <div className="text-sm font-mono font-bold text-amber-400 tabular-nums">
              {unlockedCount} / {totalCount} Capsules
            </div>
          </div>
          <Zap className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      {/* Slider Rail with Neomorphic track */}
      <div className="space-y-3 py-2">
        <div className="flex justify-between text-xs font-mono text-slate-400 px-1">
          <span>2024 (Past)</span>
          <span className="text-cyan-400 font-bold">2026 (Present Nexus)</span>
          <span>2030</span>
          <span>2035</span>
          <span>2040+ (Future)</span>
        </div>

        <div className="relative">
          <input
            type="range"
            min={2024}
            max={2040}
            step={1}
            value={simulatedYear}
            onChange={handleYearChange}
            className="w-full h-3 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500 neo-recessed"
          />
        </div>

        {/* Selected Horizon Readout */}
        <div className="neo-recessed p-3 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-amber-300">
            <Clock className="w-4 h-4" />
            <span className="font-bold">SIMULATED HORIZON: {simulatedYear} A.D.</span>
          </div>
          <div className="text-slate-400 text-xs truncate">
            {currentEvent}
          </div>
        </div>
      </div>
    </div>
  );
}
