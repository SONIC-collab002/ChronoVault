'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Capsule } from '@/types/capsule';
import { sfx } from '@/lib/synth-sfx';

interface TemporalContextType {
  crtMode: boolean;
  setCrtMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  selectedCapsule: Capsule | null;
  setSelectedCapsule: (capsule: Capsule | null) => void;
  simulatedYear: number;
  setSimulatedYear: (year: number) => void;
}

const TemporalContext = createContext<TemporalContextType | null>(null);

export function TemporalProvider({ children }: { children: React.ReactNode }) {
  const [crtMode, setCrtMode] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [simulatedYear, setSimulatedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    // Check saved preferences
    try {
      const savedCrt = localStorage.getItem('chronovault_crt');
      if (savedCrt !== null) setCrtMode(savedCrt === 'true');
      const savedSfx = localStorage.getItem('chronovault_sfx');
      if (savedSfx !== null) {
        const enabled = savedSfx === 'true';
        setSoundEnabled(enabled);
      }
    } catch (e) {
      console.error('Failed to read temporal preferences:', e);
    }
  }, []);

  const handleToggleCrt = (val: boolean | ((prev: boolean) => boolean)) => {
    setCrtMode((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      try {
        localStorage.setItem('chronovault_crt', String(next));
      } catch (e) {
        console.error('Failed to save CRT preference:', e);
      }
      sfx.playClick();
      return next;
    });
  };

  const handleToggleSound = () => {
    const next = sfx.toggleSound();
    setSoundEnabled(next);
    try {
      localStorage.setItem('chronovault_sfx', String(next));
    } catch (e) {
      console.error('Failed to save sound preference:', e);
    }
    if (next) sfx.playClick();
  };

  return (
    <TemporalContext.Provider
      value={{
        crtMode,
        setCrtMode: handleToggleCrt,
        soundEnabled,
        toggleSound: handleToggleSound,
        selectedCapsule,
        setSelectedCapsule,
        simulatedYear,
        setSimulatedYear,
      }}
    >
      <div className={crtMode ? 'crt-scanlines min-h-screen relative' : 'min-h-screen relative'}>
        {children}
      </div>
    </TemporalContext.Provider>
  );
}

export function useTemporal() {
  const context = useContext(TemporalContext);
  if (!context) {
    throw new Error('useTemporal must be used within a TemporalProvider');
  }
  return context;
}
