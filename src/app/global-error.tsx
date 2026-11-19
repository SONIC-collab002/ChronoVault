'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the caught error to console.error as required
    console.error('Captured critical application error in global error boundary:', error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-2xl font-bold">Critical Application Error</h2>
          <p className="text-muted-foreground text-sm">
            {error?.message || 'A critical error occurred in the application.'}
          </p>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
