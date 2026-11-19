'use client';

import { useState } from 'react';
import { CapsuleList } from '@/components/capsule-list';
import { CreateCapsuleDialog } from '@/components/create-capsule-dialog';
import { CapsuleDetailDialog } from '@/components/capsule-detail-dialog';
import { TemporalScrubber } from '@/components/temporal-scrubber';
import { GiantEntryButton } from '@/components/giant-entry-button';
import type { Capsule, CapsuleCategory } from '@/types/capsule';
import { Vault, ShieldCheck, Clock, Sparkles } from 'lucide-react';

const initialCapsules: Capsule[] = [
  {
    id: 1,
    title: 'Letter to My Future Self · Decadal Stasis',
    deliveryDate: new Date('2034-01-01T12:00:00Z'),
    content: "Hey, it's me from 10 years ago. Did we finally construct the modular synthesizers and learn to play the guitar? Are orbital habitats thriving? I hope life has granted you wisdom, warmth, and peace.",
    category: 'personal_legacy',
    stasisSeal: 'Cryo-Quantum Vault',
    cipherKey: 'CV-1049-OMEGA',
    temporalCoordinates: 'SECTOR 04 // TERRA-PRIME',
  },
  {
    id: 2,
    title: 'Predictions for Deep Space & Machine Synthesis',
    deliveryDate: new Date('2028-06-01T12:00:00Z'),
    content: 'I predict that commercial lunar orbital stations will be permanently inhabited by at least 150 researchers. Synthetic intelligence will compose award-winning ambient symphonies.',
    category: 'future_prediction',
    stasisSeal: 'Warp-Stasis Core',
    cipherKey: 'CV-4092-BETA',
    predictionConfidence: 90,
    temporalCoordinates: 'SECTOR 09 // LUNAR RELAY',
  },
  {
    id: 3,
    title: 'Analog Vocal Dispatch from Station Zeta-9',
    deliveryDate: new Date('2025-01-01T12:00:00Z'),
    content: 'Audio log recorded late at night during a severe thunderstorm. The sound of rain against the observation glass reminds me that moments are fleeting. Listen to the analog hum of the past.',
    category: 'audio_log',
    stasisSeal: 'Sub-Light Magnetic',
    cipherKey: 'CV-8821-SIGMA',
    audioDuration: '03:14',
    temporalCoordinates: 'OBSERVATORY DECK // ZETA-9',
    opened: true,
    reflection: 'Listening back to this storm audio log in the future feels like an echo from a different lifetime.',
  },
  {
    id: 4,
    title: 'First Quantum Crystallographic Memory Imprint',
    deliveryDate: new Date('2024-03-15T00:00:00Z'),
    content: 'Encoded in vacuum tube memory matrix MEM-043. The tactile warmth of brass dials, illuminated nixie tubes, and the optimism of building something that outlives today.',
    category: 'quantum_imprint',
    stasisSeal: 'Cryo-Quantum Vault',
    cipherKey: 'CV-2204-ALPHA',
    hologramUrl: '/assets/images/holographic_memory_crystal_1794235836080.jpg',
    temporalCoordinates: 'CORE CHAMBER // SECTOR 1',
    opened: true,
    reflection: 'The crystal imprint integrity has held at 100% precision.',
  },
];

export default function DashboardPage() {
  const [capsules, setCapsules] = useState<Capsule[]>(initialCapsules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogCategory, setDialogCategory] = useState<CapsuleCategory>('personal_legacy');
  const [dialogTitle, setDialogTitle] = useState('');

  const handleCreateCapsule = (newCapsuleData: Omit<Capsule, 'id'>) => {
    try {
      const newCapsule: Capsule = {
        id: Date.now(),
        ...newCapsuleData,
      };
      setCapsules((prevCapsules) => [newCapsule, ...prevCapsules]);
    } catch (error) {
      console.error('Failed to add new capsule:', error);
    }
  };

  const handleOpenWithPreset = (category: CapsuleCategory, defaultTitle?: string) => {
    setDialogCategory(category);
    setDialogTitle(defaultTitle || '');
    setIsDialogOpen(true);
  };

  const activeStasisCount = capsules.filter((c) => new Date(c.deliveryDate) > new Date()).length;
  const unsealedCount = capsules.length - activeStasisCount;

  return (
    <div className="container mx-auto space-y-8">
      {/* Top Telemetry Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-amber-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            STATION ARCHIVE · SECTOR 04 CONSOLE
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white flex items-center gap-3">
            Active Chrono-Chambers
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-1">
            Quantum-sealed messages, voice dispatches, and predictive wagers suspended across time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => handleOpenWithPreset('personal_legacy')}
            className="neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs sm:text-sm px-4 py-2 gap-2 shadow-lg shadow-amber-500/20 rounded-xl"
          >
            + Quick Seal
          </button>
        </div>
      </div>

      {/* THE BIG GIANT BUTTON: Hero Entry Console for Future Predictors & Writers */}
      <GiantEntryButton onOpenWithCategory={handleOpenWithPreset} />

      {/* Retro-Futuristic Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-white/5 neo-extruded">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>TOTAL ENCODED</span>
            <Vault className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
            {capsules.length}
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">Archival Capsules</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/5 neo-extruded">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>IN CRYO-STASIS</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-400 tabular-nums">
            {activeStasisCount}
          </div>
          <div className="text-[10px] font-mono text-amber-500/80 mt-1">Locked in Future Horizon</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/5 neo-extruded">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>DECRYPTED</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tabular-nums">
            {unsealedCount}
          </div>
          <div className="text-[10px] font-mono text-emerald-500/80 mt-1">Unlocked & Available</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/5 neo-extruded">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>ENTROPY STABILITY</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 tabular-nums">
            99.98%
          </div>
          <div className="text-[10px] font-mono text-cyan-500/80 mt-1">Zero-Drift Invariance</div>
        </div>
      </div>

      {/* Interactive Temporal Horizon Scrubber */}
      <TemporalScrubber capsules={capsules} />

      {/* Primary Capsules List Grid */}
      <CapsuleList capsules={capsules} />

      {/* Holographic Detail Inspection Modal */}
      <CapsuleDetailDialog />

      {/* Controlled Creation Dialog */}
      <CreateCapsuleDialog
        onCreateCapsule={handleCreateCapsule}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialCategory={dialogCategory}
        initialTitle={dialogTitle}
        trigger={null}
      />
    </div>
  );
}
