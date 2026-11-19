'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { sfx } from '@/lib/synth-sfx';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured application error in route error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-2xl neo-recessed border border-rose-500/30 mb-4 text-rose-400">
        <AlertCircle className="h-10 w-10" />
      </div>
      <div className="text-xs font-mono text-rose-400 mb-1">
        TELEMETRY EXCEPTION DETECTED
      </div>
      <h2 className="text-2xl font-bold font-mono text-white mb-2">
        Temporal Stasis Fault
      </h2>
      <p className="text-slate-400 max-w-md mb-6 text-xs font-mono">
        {error?.message || 'An unexpected anomaly interrupted communication with the vault.'}
      </p>
      <Button 
        onClick={() => {
          sfx.playClick();
          reset();
        }} 
        className="neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Re-synchronize Chamber
      </Button>
    </div>
  );
}
