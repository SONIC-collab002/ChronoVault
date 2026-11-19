'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  PlusCircle, 
  Sparkles, 
  Radio, 
  FileText, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Clock 
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Capsule, CapsuleCategory, StasisSeal } from '@/types/capsule';
import { useToast } from '@/hooks/use-toast';
import { sfx } from '@/lib/synth-sfx';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
  deliveryDate: z.date({
    required_error: 'A delivery date is required.',
  }).min(new Date(new Date().setDate(new Date().getDate() + 1)), { message: 'Delivery date must be in the future.' }),
  category: z.enum(['personal_legacy', 'future_prediction', 'audio_log', 'quantum_imprint', 'world_chronicle']),
  stasisSeal: z.enum(['Standard Chrono-Lock', 'Cryo-Quantum Vault', 'Warp-Stasis Core', 'Sub-Light Magnetic']),
  predictionConfidence: z.number().min(10).max(100).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateCapsuleDialogProps {
  onCreateCapsule: (data: Omit<Capsule, 'id'>) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  initialCategory?: CapsuleCategory;
  initialTitle?: string;
}

export function CreateCapsuleDialog({ 
  onCreateCapsule,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  trigger,
  initialCategory,
  initialTitle,
}: CreateCapsuleDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  
  const setOpen = React.useCallback((val: boolean) => {
    if (isControlled && setControlledOpen) {
      setControlledOpen(val);
    } else {
      setInternalOpen(val);
    }
  }, [isControlled, setControlledOpen]);

  const [isSealing, setIsSealing] = React.useState(false);
  const { toast } = useToast();

  const [cipherKey, setCipherKey] = React.useState('CV-8420-OMEGA');

  const generateNewCipher = React.useCallback(() => {
    const letters = ['ALPHA', 'BETA', 'GAMMA', 'DELTA', 'EPSILON', 'SIGMA', 'OMEGA'];
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const num = Math.floor(1000 + Math.random() * 9000);
    const key = `CV-${num}-${letter}`;
    setCipherKey(key);
    return key;
  }, []);

  React.useEffect(() => {
    if (open) {
      generateNewCipher();
    }
  }, [open, generateNewCipher]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialTitle || '',
      content: '',
      deliveryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
      category: initialCategory || 'personal_legacy',
      stasisSeal: 'Cryo-Quantum Vault',
      predictionConfidence: 85,
    },
  });

  React.useEffect(() => {
    if (open && initialCategory) {
      form.setValue('category', initialCategory);
    }
    if (open && initialTitle) {
      form.setValue('title', initialTitle);
    }
  }, [open, initialCategory, initialTitle, form]);

  const selectedCategory = form.watch('category');

  function onSubmit(data: FormValues) {
    try {
      setIsSealing(true);
      sfx.playSeal();

      setTimeout(() => {
        const newCapsulePayload: Omit<Capsule, 'id'> = {
          title: data.title,
          content: data.content,
          deliveryDate: data.deliveryDate,
          category: data.category as CapsuleCategory,
          stasisSeal: data.stasisSeal as StasisSeal,
          cipherKey: cipherKey,
          predictionConfidence: data.category === 'future_prediction' ? data.predictionConfidence : undefined,
          audioDuration: data.category === 'audio_log' ? '02:30' : undefined,
          hologramUrl: data.category === 'quantum_imprint' ? '/assets/images/holographic_memory_crystal_1794235836080.jpg' : undefined,
          temporalCoordinates: `SECTOR 04 // REF ${Math.floor(Math.random() * 99)}`,
          opened: false,
        };

        onCreateCapsule(newCapsulePayload);
        setIsSealing(false);
        setOpen(false);
        form.reset({
          title: '',
          content: '',
          deliveryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
          category: 'personal_legacy',
          stasisSeal: 'Cryo-Quantum Vault',
          predictionConfidence: 85,
        });

        toast({
          title: 'Capsule Sealed into Stasis!',
          description: `Cipher hash ${cipherKey} locked for future delivery.`,
        });
      }, 700);
    } catch (error) {
      console.error('Error creating time capsule:', error);
      setIsSealing(false);
      toast({
        title: 'Sealing Sequence Failed',
        description: 'An unexpected error occurred while locking your capsule.',
        variant: 'destructive',
      });
    }
  }

  function onError(errors: unknown) {
    console.error('Capsule creation form validation failed:', errors);
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
      sfx.playClick();
      setOpen(val);
    }}>
      {trigger !== undefined ? (
        trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null
      ) : (
        <DialogTrigger asChild>
          <Button className="neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs sm:text-sm px-4 py-2 gap-2 shadow-lg shadow-amber-500/20">
            <PlusCircle className="h-4 w-4 text-slate-950" />
            Seal New Capsule
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto glass-panel border border-amber-500/30 text-slate-100 p-0 overflow-hidden">
        {/* Retro Dialog Header */}
        <div className="bg-slate-950/90 border-b border-amber-500/20 p-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="text-amber-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> TEMPORAL STASIS PROTOCOL
            </span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-white/5">
              {cipherKey}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-white">
            Construct Time Capsule
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-xs font-mono mt-1">
            Encode your payload into quantum cryo-stasis for decompression on your target date.
          </DialogDescription>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="p-6 space-y-5">
            {/* Category Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                Memory Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'personal_legacy', label: 'Legacy Letter', icon: FileText },
                  { id: 'future_prediction', label: 'Future Prediction', icon: Sparkles },
                  { id: 'audio_log', label: 'Vocal Tape', icon: Radio },
                  { id: 'quantum_imprint', label: 'Memory Crystal', icon: Layers },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedCategory === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        sfx.playClick();
                        form.setValue('category', item.id as CapsuleCategory);
                      }}
                      className={`p-2.5 rounded-xl text-left border transition-all text-xs font-mono flex flex-col gap-1.5 ${
                        isSelected 
                          ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 neo-recessed' 
                          : 'neo-extruded border-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono text-slate-300 uppercase">
                    Capsule Title / Designation
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Letter to My 2035 Self or Predictions for Space Travel"
                      {...field}
                      className="neo-recessed border-white/5 text-slate-100 placeholder:text-slate-600 font-mono text-xs py-2"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-400 font-mono" />
                </FormItem>
              )}
            />

            {/* Future Prediction Confidence Slider if selected */}
            {selectedCategory === 'future_prediction' && (
              <div className="neo-recessed p-4 rounded-xl border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Prediction Confidence Level
                  </span>
                  <span className="text-white font-bold tabular-nums">
                    {form.watch('predictionConfidence') || 85}%
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={form.watch('predictionConfidence') || 85}
                  onChange={(e) => form.setValue('predictionConfidence', parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            )}

            {/* Stasis Seal Grade & Delivery Date 2-col */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Delivery Date Picker */}
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1.5">
                    <FormLabel className="text-xs font-mono text-slate-300 uppercase">
                      Target Unlock Epoch
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'neo-recessed border-white/5 text-left font-mono text-xs justify-start text-slate-200 h-10',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-amber-400" />
                            {field.value ? format(field.value, 'PPP') : <span>Select Future Epoch</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 glass-panel border border-amber-500/30" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date <= new Date()}
                          initialFocus
                          className="text-slate-100"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs text-rose-400 font-mono" />
                  </FormItem>
                )}
              />

              {/* Stasis Seal Option */}
              <FormField
                control={form.control}
                name="stasisSeal"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1.5">
                    <FormLabel className="text-xs font-mono text-slate-300 uppercase">
                      Stasis Seal Protocol
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="neo-recessed border-white/5 text-slate-200 font-mono text-xs rounded-lg px-3 h-10 focus:outline-none focus:border-amber-500/50 bg-slate-950"
                      >
                        <option value="Cryo-Quantum Vault">Cryo-Quantum Vault (Recommended)</option>
                        <option value="Standard Chrono-Lock">Standard Chrono-Lock</option>
                        <option value="Warp-Stasis Core">Warp-Stasis Core</option>
                        <option value="Sub-Light Magnetic">Sub-Light Magnetic</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-xs text-rose-400 font-mono" />
                  </FormItem>
                )}
              />
            </div>

            {/* Content Textarea */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono text-slate-300 uppercase">
                    Message Payload
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your reflection, thoughts, secrets, or predictions for your future self..."
                      className="min-h-[140px] neo-recessed border-white/5 text-slate-100 placeholder:text-slate-600 font-mono text-xs leading-relaxed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-400 font-mono" />
                </FormItem>
              )}
            />

            {/* Footer buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-white/5">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                Zero-tamper quantum seal
              </span>

              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs text-slate-400 hover:text-slate-200"
                >
                  Abort
                </Button>
                <Button 
                  type="submit"
                  disabled={isSealing}
                  className="neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs px-5 shadow-lg shadow-amber-500/20"
                >
                  {isSealing ? 'Sealing Stasis Chamber...' : 'Engage & Seal Vault'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
