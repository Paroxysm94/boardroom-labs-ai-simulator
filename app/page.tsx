'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import { LandingPage } from '@/components/landing-page';
import { AuthForm } from '@/components/auth-form';
import { Dashboard } from '@/components/dashboard';

export default function Home() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    if (showAuth) {
      return <AuthForm />;
    }
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  return <Dashboard />;
}
