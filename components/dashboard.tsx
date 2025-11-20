'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, AlertCircle, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSessions } from '@/lib/hooks/use-sessions';
import { useAuth } from '@/components/auth-provider';
import { ChatInterface } from './chat-interface';
import { SessionView } from './session-view';
import type { Session } from '@/lib/database.types';
import Link from 'next/link';

const stageLabels: Record<string, string> = {
  pattern_check: 'Pattern Check',
  market_sim: 'Market Simulation',
  evidence_check: 'Evidence Check',
  completed: 'Completed',
};

const stageColors: Record<string, string> = {
  pattern_check: 'bg-blue-500/10 text-blue-600 border-blue-200',
  market_sim: 'bg-purple-500/10 text-purple-600 border-purple-200',
  evidence_check: 'bg-amber-500/10 text-amber-600 border-amber-200',
  completed: 'bg-green-500/10 text-green-600 border-green-200',
};

export function Dashboard() {
  const { sessions, loading, error } = useSessions();
  const { signOut } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  if (!loading && sessions.length === 0 && !showChat && !selectedSession) {
    return (
      <ChatInterface
        onSessionCreated={(session) => {
          setSelectedSession(session);
        }}
        onBack={() => {}}
      />
    );
  }

  if (showChat) {
    return (
      <ChatInterface
        onSessionCreated={(session) => {
          setShowChat(false);
          setSelectedSession(session);
        }}
        onBack={() => setShowChat(false)}
      />
    );
  }

  if (selectedSession) {
    return (
      <SessionView
        sessionId={selectedSession.id}
        onBack={() => setSelectedSession(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Your Validation Sessions</h1>
              <p className="text-slate-400">Track and manage your startup ideas</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/account">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={signOut}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
              <Button
                size="lg"
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                New Validation
              </Button>
            </div>
          </div>

          {error && (
            <Card className="mb-6 border-red-500/50 bg-red-950/50">
              <CardContent className="pt-6">
                <div className="flex items-center text-red-300">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  <span>{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <Card key={i} className="animate-pulse bg-slate-800/50 border-slate-700">
                  <CardHeader className="space-y-2">
                    <div className="h-4 bg-slate-700 rounded w-3/4" />
                    <div className="h-3 bg-slate-800 rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-800 rounded" />
                      <div className="h-3 bg-slate-800 rounded w-5/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <Card className="border-2 border-dashed border-slate-700 bg-slate-900/50">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-6 mb-4">
                  <TrendingUp className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No sessions yet
                </h3>
                <p className="text-slate-400 mb-6 max-w-md">
                  Start your first validation session to get expert feedback on your startup idea
                </p>
                <Button
                  size="lg"
                  onClick={() => setShowChat(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your First Session
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500/50"
                    onClick={() => setSelectedSession(session)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg font-semibold text-white line-clamp-2">
                          {session.idea_name}
                        </CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className={stageColors[session.current_stage] || stageColors.pattern_check}
                      >
                        {stageLabels[session.current_stage] || 'Unknown Stage'}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium text-slate-400 mb-1">
                            Board Score
                          </div>
                          <div className="flex items-center">
                            <div className="text-3xl font-bold text-white">
                              {session.board_score.toFixed(1)}
                            </div>
                            <div className="text-slate-500 ml-1">/10</div>
                          </div>
                        </div>
                        {session.last_verdict && (
                          <div>
                            <div className="text-sm font-medium text-slate-400 mb-1">
                              Latest Verdict
                            </div>
                            <p className="text-sm text-slate-300 line-clamp-2">
                              {session.last_verdict}
                            </p>
                          </div>
                        )}
                        <div className="text-xs text-slate-500 pt-2 border-t border-slate-700">
                          Updated {new Date(session.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
