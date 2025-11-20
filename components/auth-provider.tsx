'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if Supabase is configured
  if (!supabase) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Configuration Error
          </h2>
          <p className="text-gray-300 mb-4">
            Supabase credentials are not configured. Please add the following
            environment variables:
          </p>
          <div className="text-left bg-gray-800 p-4 rounded text-sm font-mono text-gray-300">
            <p>NEXT_PUBLIC_SUPABASE_URL</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    supabase.auth.getSession().then((response: any) => {
      const { data: { session } } = response;      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      (() => {
        setUser(session?.user ?? null);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
