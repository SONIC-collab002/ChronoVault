export type CapsuleCategory = 
  | 'personal_legacy' 
  | 'future_prediction' 
  | 'audio_log' 
  | 'quantum_imprint' 
  | 'world_chronicle';

export type StasisSeal = 
  | 'Standard Chrono-Lock' 
  | 'Cryo-Quantum Vault' 
  | 'Warp-Stasis Core' 
  | 'Sub-Light Magnetic';

export interface Capsule {
  id: number | string;
  title: string;
  content: string;
  deliveryDate: Date;
  category?: CapsuleCategory;
  stasisSeal?: StasisSeal;
  cipherKey?: string;
  predictionConfidence?: number; // 0 - 100%
  audioDuration?: string;
  hologramUrl?: string;
  tags?: string[];
  temporalCoordinates?: string;
  opened?: boolean;
  reflection?: string;
}
