'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSessionData } from '@/lib/hooks/use-session-data';
import { useSessions } from '@/lib/hooks/use-sessions';
import {
  generateBoardFeedback,
  simulateMarket,
  analyzeEvidence,
  generateNextActions,
} from '@/lib/ai-service';
import { BoardView } from './board-view';
import { MarketSimulation } from './market-simulation';
import { EvidenceCheck } from './evidence-check';
import { NextActions } from './next-actions';
import { ProgressTimeline } from './progress-timeline';

interface SessionViewProps {
  sessionId: string;
  onBack: () => void;
}

export function SessionView({ sessionId, onBack }: SessionViewProps) {
  const {
    session,
    advisorFeedback,
    marketPersonas,
    nextActions,
    loading,
    saveAdvisorFeedback,
    saveMarketPersonas,
    saveNextActions,
    toggleActionComplete,
    refetch,
  } = useSessionData(sessionId);

  const { updateSession } = useSessions();

  const [isGeneratingBoard, setIsGeneratingBoard] = useState(false);
  const [isGeneratingMarket, setIsGeneratingMarket] = useState(false);
  const [isAnalyzingEvidence, setIsAnalyzingEvidence] = useState(false);

  const patternCheckFeedback = advisorFeedback.filter(f => f.phase === 'pattern_check');
  const evidenceCheckFeedback = advisorFeedback.filter(f => f.phase === 'evidence_check');

  const hasPatternCheck = patternCheckFeedback.length > 0;
  const hasMarketSim = marketPersonas.length > 0;
  const hasEvidenceCheck = evidenceCheckFeedback.length > 0;

  useEffect(() => {
    if (session && !hasPatternCheck && !isGeneratingBoard) {
      handleGenerateBoardFeedback();
    }
  }, [session, hasPatternCheck]);

  const handleGenerateBoardFeedback = async () => {
    if (!session) return;

    setIsGeneratingBoard(true);
    try {
      const result = await generateBoardFeedback({
        idea_name: session.idea_name,
        idea_description: session.idea_description,
        target_audience: session.target_audience,
      });

      const feedbackToSave = result.feedback.map(f => ({
        session_id: sessionId,
        advisor_type: f.advisor_type,
        phase: 'pattern_check',
        score: f.score,
        diagnosis: f.diagnosis,
        prescription: f.prescription,
      }));

      await saveAdvisorFeedback(feedbackToSave);

      const actions = generateNextActions(
        {
          idea_name: session.idea_name,
          idea_description: session.idea_description,
          target_audience: session.target_audience,
        },
        result.averageScore
      );

      const actionsToSave = actions.map((text, index) => ({
        session_id: sessionId,
        action_text: text,
        is_completed: false,
        order_index: index,
      }));

      await saveNextActions(actionsToSave);

      await updateSession(sessionId, {
        board_score: result.averageScore,
        last_verdict: result.verdict,
        current_stage: 'pattern_check',
      });
    } catch (err) {
      console.error('Failed to generate board feedback:', err);
    } finally {
      setIsGeneratingBoard(false);
    }
  };

  const handleRunMarketSim = async () => {
    if (!session) return;

    setIsGeneratingMarket(true);
    try {
      const personas = await simulateMarket({
        idea_name: session.idea_name,
        idea_description: session.idea_description,
        target_audience: session.target_audience,
      });

      const personasToSave = personas.map(p => ({
        session_id: sessionId,
        persona_name: p.persona_name,
        persona_description: p.persona_description,
        reaction_quote: p.reaction_quote,
        willingness_to_buy: p.willingness_to_buy,
      }));

      await saveMarketPersonas(personasToSave);

      await updateSession(sessionId, {
        current_stage: 'market_sim',
      });
    } catch (err) {
      console.error('Failed to simulate market:', err);
    } finally {
      setIsGeneratingMarket(false);
    }
  };

  const handleSubmitEvidence = async (evidenceData: string) => {
    if (!session) return;

    setIsAnalyzingEvidence(true);
    try {
      const result = await analyzeEvidence(
        {
          idea_name: session.idea_name,
          idea_description: session.idea_description,
          target_audience: session.target_audience,
        },
        evidenceData,
        patternCheckFeedback.map(f => ({
          advisor_type: f.advisor_type as 'operator' | 'growth' | 'finance' | 'product' | 'skeptic',
          score: f.score,
          diagnosis: f.diagnosis,
          prescription: f.prescription,
        }))
      );

      const updatedFeedbackToSave = result.updatedFeedback.map(f => ({
        session_id: sessionId,
        advisor_type: f.advisor_type,
        phase: 'evidence_check',
        score: f.score,
        diagnosis: f.diagnosis,
        prescription: f.prescription,
      }));

      await saveAdvisorFeedback(updatedFeedbackToSave);

      await updateSession(sessionId, {
        board_score: result.averageScore,
        last_verdict: result.verdict,
        current_stage: 'evidence_check',
      });

      await refetch();
    } catch (err) {
      console.error('Failed to analyze evidence:', err);
    } finally {
      setIsAnalyzingEvidence(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-slate-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4"
              >
                <Sparkles className="h-12 w-12 text-slate-400" />
              </motion.div>
              <p className="text-slate-600">Loading session...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-slate-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-600 mb-4">Session not found</p>
            <Button onClick={onBack}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentFeedback = hasEvidenceCheck ? evidenceCheckFeedback : patternCheckFeedback;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-slate-600 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {session.idea_name}
            </h1>
            <p className="text-slate-600 max-w-3xl">
              {session.idea_description}
            </p>
            {session.last_verdict && (
              <div className="mt-4 p-4 bg-slate-100 rounded-lg border border-slate-200">
                <p className="text-sm font-medium text-slate-900">
                  Latest Verdict: {session.last_verdict}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BoardView
              feedback={currentFeedback}
              isLoading={isGeneratingBoard}
              showOldScores={hasEvidenceCheck}
              oldFeedback={patternCheckFeedback}
            />

            {hasPatternCheck && (
              <MarketSimulation
                personas={marketPersonas}
                isLoading={isGeneratingMarket}
                onRunSimulation={hasMarketSim ? undefined : handleRunMarketSim}
              />
            )}

            {hasMarketSim && (
              <EvidenceCheck
                onSubmitEvidence={handleSubmitEvidence}
                isLoading={isAnalyzingEvidence}
                hasEvidence={hasEvidenceCheck}
              />
            )}
          </div>

          <div className="space-y-8">
            <ProgressTimeline
              currentStage={session.current_stage}
              hasPatternCheck={hasPatternCheck}
              hasMarketSim={hasMarketSim}
              hasEvidenceCheck={hasEvidenceCheck}
            />

            {nextActions.length > 0 && (
              <NextActions
                actions={nextActions}
                onToggle={toggleActionComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
