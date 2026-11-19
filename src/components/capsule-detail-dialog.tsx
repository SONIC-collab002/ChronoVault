'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTemporal } from '@/context/temporal-context';
import { sfx } from '@/lib/synth-sfx';
import { 
  Lock, 
  Unlock, 
  Clock, 
  Radio, 
  Sparkles, 
  ShieldCheck, 
  Play, 
  Pause, 
  FileText, 
  Layers, 
  Terminal,
  CheckCircle2
} from 'lucide-react';
import Image from 'next/image';

export function CapsuleDetailDialog() {
  const { selectedCapsule, setSelectedCapsule } = useTemporal();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [sealVerified, setSealVerified] = useState(false);
  const [reflection, setReflection] = useState('');
  const [savedReflection, setSavedReflection] = useState('');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!selectedCapsule) {
      setIsPlayingAudio(false);
      setSealVerified(false);
      return;
    }

    setSavedReflection(selectedCapsule.reflection || '');
    setReflection(selectedCapsule.reflection || '');

    const calculateTime = () => {
      try {
        const target = new Date(selectedCapsule.deliveryDate).getTime();
        const now = Date.now();
        const diff = target - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          setTimeLeft(null);
        }
      } catch (err) {
        console.error('Error calculating countdown:', err);
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedCapsule]);

  if (!selectedCapsule) return null;

  const isDelivered = new Date(selectedCapsule.deliveryDate).getTime() <= Date.now();

  const handleVerifySeal = () => {
    sfx.playClick();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setSealVerified(true);
      sfx.playSeal();
    }, 900);
  };

  const handleToggleAudio = () => {
    sfx.playClick();
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleSaveReflection = () => {
    sfx.playClick();
    setSavedReflection(reflection);
    selectedCapsule.reflection = reflection;
  };

  return (
    <Dialog open={!!selectedCapsule} onOpenChange={(open) => {
      if (!open) {
        sfx.playClick();
        setSelectedCapsule(null);
      }
    }}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto glass-panel border border-amber-500/30 text-slate-100 p-0 overflow-hidden">
        {/* Retro Header with status banner */}
        <div className="bg-slate-950/90 border-b border-amber-500/20 p-6 relative">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                CHRONO-STASIS CHAMBER
              </span>
              <span className="font-mono text-xs text-slate-400">
                ID #{String(selectedCapsule.id).slice(-6)}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              {isDelivered ? (
                <span className="text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Unlock className="w-3.5 h-3.5" /> DECRYPTED & UNSEALED
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1.5 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Lock className="w-3.5 h-3.5" /> TIME-LOCKED IN STASIS
                </span>
              )}
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {selectedCapsule.title}
          </DialogTitle>
          <DialogDescription className="text-slate-400 font-mono text-xs mt-1">
            Target Delivery: {format(new Date(selectedCapsule.deliveryDate), "MMMM d, yyyy 'at' HH:mm:ss 'UTC'")}
          </DialogDescription>
        </div>

        <div className="p-6 space-y-6">
          {/* Live Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="neo-recessed p-3 rounded-lg border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Seal Protocol</div>
              <div className="text-xs font-semibold text-amber-300 mt-1 truncate">
                {selectedCapsule.stasisSeal || 'Cryo-Quantum Vault'}
              </div>
            </div>

            <div className="neo-recessed p-3 rounded-lg border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Temporal Sector</div>
              <div className="text-xs font-mono text-cyan-400 mt-1 truncate">
                {selectedCapsule.temporalCoordinates || 'SECTOR 04 // EARTH'}
              </div>
            </div>

            <div className="neo-recessed p-3 rounded-lg border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Cipher Hash</div>
              <div className="text-xs font-mono text-slate-300 mt-1 truncate">
                {selectedCapsule.cipherKey || `CV-${Math.abs(Number(selectedCapsule.id) % 9999)}-OMEGA`}
              </div>
            </div>

            <div className="neo-recessed p-3 rounded-lg border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Memory Class</div>
              <div className="text-xs font-semibold text-slate-200 mt-1 capitalize truncate">
                {(selectedCapsule.category || 'personal_legacy').replace('_', ' ')}
              </div>
            </div>
          </div>

          {/* Real-time Countdown Deck (if locked) */}
          {!isDelivered && timeLeft && (
            <div className="neo-recessed p-4 rounded-xl border border-amber-500/20 text-center">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5" /> Temporal Dilation Remaining
              </div>
              <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
                <div className="p-2 bg-slate-900/80 rounded border border-white/5">
                  <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">{timeLeft.days}</div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Days</div>
                </div>
                <div className="p-2 bg-slate-900/80 rounded border border-white/5">
                  <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">{timeLeft.hours}</div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Hours</div>
                </div>
                <div className="p-2 bg-slate-900/80 rounded border border-white/5">
                  <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">{timeLeft.minutes}</div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Mins</div>
                </div>
                <div className="p-2 bg-slate-900/80 rounded border border-white/5">
                  <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">{timeLeft.seconds}</div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Secs</div>
                </div>
              </div>
            </div>
          )}

          {/* Rich Content Viewers based on type */}
          {selectedCapsule.category === 'future_prediction' && (
            <div className="glass-card p-4 rounded-xl border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Predictive Horizon Simulation
                </span>
                <span className="font-mono text-xs text-slate-300">
                  Confidence: {selectedCapsule.predictionConfidence || 85}%
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-amber-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${selectedCapsule.predictionConfidence || 85}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                On the unlock date, you will compare reality against this prediction wager.
              </p>
            </div>
          )}

          {/* Audio Log Cassette player */}
          {selectedCapsule.category === 'audio_log' && (
            <div className="neo-extruded p-4 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs text-slate-300">Analog Magnetic Tape Dispatch</span>
                </div>
                <span className="font-mono text-xs text-amber-400 tabular-nums">
                  {selectedCapsule.audioDuration || '03:14'}
                </span>
              </div>

              {/* Tape Reel Simulation */}
              <div className="neo-recessed p-3 rounded-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border-2 border-dashed border-amber-400/60 flex items-center justify-center ${isPlayingAudio ? 'animate-spin' : ''}`}>
                    <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                  </div>
                  <div className="h-0.5 flex-1 bg-amber-500/20 w-16" />
                  <div className={`w-8 h-8 rounded-full border-2 border-dashed border-amber-400/60 flex items-center justify-center ${isPlayingAudio ? 'animate-spin' : ''}`}>
                    <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                  </div>
                </div>

                {/* Simulated Audio Equalizer Bars */}
                <div className="flex items-end gap-1 h-8 flex-1 justify-center px-4">
                  {[40, 75, 55, 90, 60, 80, 45, 95, 70, 50, 85, 60, 40].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${isPlayingAudio ? 'bg-amber-400' : 'bg-slate-700'}`}
                      style={{ height: isPlayingAudio ? `${Math.min(100, Math.max(15, h * (0.4 + Math.random() * 0.6)))}%` : '20%' }}
                    />
                  ))}
                </div>

                <Button 
                  size="sm" 
                  onClick={handleToggleAudio}
                  className="neo-button text-amber-300 hover:text-amber-200"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                  {isPlayingAudio ? 'Pause' : 'Play Transmission'}
                </Button>
              </div>
            </div>
          )}

          {/* Holographic Memory Core Preview */}
          {selectedCapsule.hologramUrl && (
            <div className="relative rounded-xl overflow-hidden border border-amber-500/30 glass-card">
              <div className="relative h-48 w-full">
                <Image
                  src={selectedCapsule.hologramUrl}
                  alt={selectedCapsule.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs font-mono text-amber-300">
                  <span>HOLOGRAPHIC STASIS ARTIFACT</span>
                  <span>100% INTEGRITY</span>
                </div>
              </div>
            </div>
          )}

          {/* The Primary Message Payload */}
          <div className="neo-recessed p-5 rounded-xl border border-white/5 relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" /> Sealed Narrative Payload
              </span>
              <span>CHAR-COUNT: {selectedCapsule.content.length}</span>
            </div>
            
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-mono selection:bg-amber-500/30">
              {selectedCapsule.content}
            </p>
          </div>

          {/* Post-Unlock Reflection Area */}
          {isDelivered && (
            <div className="glass-card p-4 rounded-xl border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Future Self Reflection Chamber
                </span>
                <span>OPENED ARCHIVE</span>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="How does reading this today make you feel? How has your reality diverged from what you once imagined?"
                className="w-full h-20 p-3 text-xs font-mono bg-slate-900/80 rounded-lg border border-white/10 text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  onClick={handleSaveReflection}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs"
                >
                  Record Reflection
                </Button>
              </div>
              {savedReflection && (
                <div className="text-xs text-slate-400 font-mono italic pt-2 border-t border-white/5">
                  Logged reflection: &ldquo;{savedReflection}&rdquo;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Verification Deck */}
        <div className="bg-slate-950/80 border-t border-white/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>
              {sealVerified ? 'Cryptographic Stasis Seal Verified' : 'Standard 256-Bit Temporal Integrity'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleVerifySeal}
              disabled={isVerifying || sealVerified}
              className="neo-button text-xs font-mono border-white/10 text-slate-300"
            >
              {isVerifying ? 'Checking Resonance...' : sealVerified ? 'Verified ✓' : 'Verify Integrity'}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                sfx.playClick();
                setSelectedCapsule(null);
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs px-4"
            >
              Close Chamber
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
