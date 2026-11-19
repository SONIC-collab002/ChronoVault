'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, KeyRound, Sparkles, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sfx } from '@/lib/synth-sfx';

export function AuthForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fillDemoCredentials = () => {
    sfx.playClick();
    setLoginEmail('archivist@chronovault.space');
    setLoginPassword('quantum-stasis-2026');
    toast({
      title: 'Demo Identity Loaded',
      description: 'Archivist Level 1 credentials applied to terminal.',
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!loginEmail || !loginPassword) {
        throw new Error('Please enter both your archivist email and cipher password.');
      }
      setIsLoading(true);
      sfx.playSeal();
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Login attempt failed:', error);
      setIsLoading(false);
      toast({
        title: 'Authentication Error',
        description: error instanceof Error ? error.message : 'Failed to authenticate with stasis chamber.',
        variant: 'destructive',
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!registerEmail || !registerPassword) {
        throw new Error('Please fill in all identity registration fields.');
      }
      if (registerPassword !== confirmPassword) {
        throw new Error('Cipher passwords do not match.');
      }
      setIsLoading(true);
      sfx.playSeal();
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Registration attempt failed:', error);
      setIsLoading(false);
      toast({
        title: 'Registration Error',
        description: error instanceof Error ? error.message : 'Failed to register archivist identity.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      {/* Neomorphic Segmented Tabs */}
      <TabsList className="grid w-full grid-cols-2 neo-recessed p-1 border border-white/5 rounded-xl h-11 mb-4 text-xs font-mono">
        <TabsTrigger 
          value="login" 
          onClick={() => sfx.playClick()}
          className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 font-bold data-[state=active]:shadow-sm transition-all"
        >
          Station Login
        </TabsTrigger>
        <TabsTrigger 
          value="register" 
          onClick={() => sfx.playClick()}
          className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 font-bold data-[state=active]:shadow-sm transition-all"
        >
          New Identity
        </TabsTrigger>
      </TabsList>

      {/* Login Tab */}
      <TabsContent value="login">
        <form onSubmit={handleLogin}>
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 space-y-5 neo-extruded">
            <div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                Security Clearance
              </div>
              <h2 className="text-xl font-bold font-mono text-white">Archivist Login</h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Enter your terminal credentials to unlock your active capsules.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="login-email" className="text-xs font-mono text-slate-300">
                  Archivist Email
                </Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="archivist@chronovault.space"
                    className="pl-10 neo-recessed border-white/5 text-slate-100 font-mono text-xs h-10"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-password" className="text-xs font-mono text-slate-300">
                  Cipher Password
                </Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••••••"
                    className="pl-10 neo-recessed border-white/5 text-slate-100 font-mono text-xs h-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Quick Demo Fill button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full neo-recessed p-2 rounded-lg border border-amber-500/20 text-xs font-mono text-amber-400/90 hover:text-amber-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5" />
                Quick-Fill Demo Credentials
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs h-10 shadow-lg shadow-amber-500/20"
            >
              {isLoading ? 'Decrypting Vault Access...' : 'Connect to Stasis Chamber'}
            </Button>
          </div>
        </form>
      </TabsContent>

      {/* Registration Tab */}
      <TabsContent value="register">
        <form onSubmit={handleRegister}>
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 space-y-5 neo-extruded">
            <div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                Chrono-Registry
              </div>
              <h2 className="text-xl font-bold font-mono text-white">Create Identity</h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Establish a cryptographic keypair to seal your first time capsule.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="register-email" className="text-xs font-mono text-slate-300">
                  Archivist Email
                </Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="pioneer@chronovault.space"
                    className="pl-10 neo-recessed border-white/5 text-slate-100 font-mono text-xs h-10"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="register-password" className="text-xs font-mono text-slate-300">
                  New Cipher Key
                </Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••••••"
                    className="pl-10 neo-recessed border-white/5 text-slate-100 font-mono text-xs h-10"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm-password" className="text-xs font-mono text-slate-300">
                  Confirm Cipher Key
                </Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••••••"
                    className="pl-10 neo-recessed border-white/5 text-slate-100 font-mono text-xs h-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full neo-button bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs h-10 shadow-lg shadow-amber-500/20"
            >
              {isLoading ? 'Allocating Stasis Chamber...' : 'Generate Archivist Key'}
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
}
