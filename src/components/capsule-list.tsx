'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  LockKeyhole, 
  Unlock, 
  Radio, 
  Sparkles, 
  FileText, 
  Search, 
  PackagePlus, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import type { Capsule, CapsuleCategory } from '@/types/capsule';
import { useTemporal } from '@/context/temporal-context';
import { sfx } from '@/lib/synth-sfx';

interface CapsuleListProps {
  capsules: Capsule[];
}

export function CapsuleList({ capsules }: CapsuleListProps) {
  const { setSelectedCapsule, simulatedYear } = useTemporal();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'delivered' | 'predictions' | 'audio'>('all');
  const now = new Date();

  // Filter based on status, search, and category
  const filteredCapsules = capsules.filter((capsule) => {
    // Check delivery status taking into account simulatedYear if user scrubbed forward
    const capDate = new Date(capsule.deliveryDate);
    const isUnsealedAtSimulatedYear = capDate.getFullYear() <= simulatedYear || capDate <= now;

    if (selectedFilter === 'pending' && isUnsealedAtSimulatedYear) return false;
    if (selectedFilter === 'delivered' && !isUnsealedAtSimulatedYear) return false;
    if (selectedFilter === 'predictions' && capsule.category !== 'future_prediction') return false;
    if (selectedFilter === 'audio' && capsule.category !== 'audio_log') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = capsule.title.toLowerCase().includes(q);
      const matchContent = capsule.content.toLowerCase().includes(q);
      const matchCipher = capsule.cipherKey?.toLowerCase().includes(q);
      return matchTitle || matchContent || matchCipher;
    }

    return true;
  });

  const getCategoryIcon = (category?: CapsuleCategory) => {
    switch (category) {
      case 'audio_log':
        return <Radio className="h-4 w-4 text-amber-400" />;
      case 'future_prediction':
        return <Sparkles className="h-4 w-4 text-cyan-400" />;
      case 'quantum_imprint':
        return <Sparkles className="h-4 w-4 text-purple-400" />;
      default:
        return <FileText className="h-4 w-4 text-amber-300" />;
    }
  };

  if (capsules.length === 0) {
    return (
      <div className="glass-panel flex flex-col items-center justify-center rounded-2xl p-12 text-center h-[45vh] border border-white/5">
        <div className="p-4 rounded-full neo-recessed mb-4 text-slate-500">
          <PackagePlus className="h-12 w-12" />
        </div>
        <h3 className="text-xl font-bold font-mono tracking-tight text-slate-200">No Time Capsules In Stasis</h3>
        <p className="text-xs text-slate-400 font-mono mt-2 mb-6 max-w-md">
          Seal your memories, vocal transmissions, or predictions across the temporal stream.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control Deck: Search + Filter Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 neo-recessed rounded-xl border border-white/5 text-xs font-mono">
          <button
            onClick={() => { sfx.playClick(); setSelectedFilter('all'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'all' 
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Archive ({capsules.length})
          </button>
          <button
            onClick={() => { sfx.playClick(); setSelectedFilter('pending'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'pending' 
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            In Stasis
          </button>
          <button
            onClick={() => { sfx.playClick(); setSelectedFilter('delivered'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'delivered' 
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Decrypted
          </button>
          <button
            onClick={() => { sfx.playClick(); setSelectedFilter('predictions'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'predictions' 
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Predictions
          </button>
          <button
            onClick={() => { sfx.playClick(); setSelectedFilter('audio'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'audio' 
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Audio Tapes
          </button>
        </div>

        {/* Search input with neomorphic inset */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search payload or cipher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full neo-recessed pl-9 pr-3 py-2 text-xs font-mono rounded-xl border border-white/5 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Grid of Capsules */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredCapsules.map((capsule) => {
          let isDelivered = false;
          let formattedDate = 'Invalid date';
          try {
            const dateObj = new Date(capsule.deliveryDate);
            if (isNaN(dateObj.getTime())) {
              throw new Error(`Invalid date format for capsule ${capsule.id}`);
            }
            // Check delivery according to actual date or simulated scrubber year
            isDelivered = dateObj <= now || dateObj.getFullYear() <= simulatedYear;
            formattedDate = format(dateObj, 'PPP');
          } catch (error) {
            console.error('Failed to parse delivery date for capsule:', capsule.id, error);
          }

          return (
            <div
              key={capsule.id}
              onClick={() => {
                sfx.playClick();
                setSelectedCapsule(capsule);
              }}
              className="glass-card hover:border-amber-500/40 p-5 rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-200 group relative overflow-hidden"
            >
              {/* Subtle top indicator line */}
              <div 
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  isDelivered ? 'bg-emerald-500/60' : 'bg-amber-500/60'
                }`}
              />

              <div>
                {/* Header Metadata */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    {getCategoryIcon(capsule.category)}
                    <span className="capitalize">
                      {(capsule.category || 'personal_legacy').replace('_', ' ')}
                    </span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {capsule.cipherKey || `#${String(capsule.id).slice(-4)}`}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
                  {capsule.title}
                </h3>

                {/* Content Excerpt in Typewriter Monospace */}
                <p className="text-xs text-slate-400 font-mono italic line-clamp-3 leading-relaxed mb-4">
                  &ldquo;{capsule.content}&rdquo;
                </p>
              </div>

              {/* Card Footer: Telemetry & Status */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{formattedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isDelivered ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <Unlock className="w-3 h-3" /> Unsealed
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1 text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      <Clock className="w-3 h-3" /> In Stasis
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
