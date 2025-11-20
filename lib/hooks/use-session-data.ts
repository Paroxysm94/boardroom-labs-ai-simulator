import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { Session, AdvisorFeedback, MarketPersona, NextAction } from '../database.types';

export function useSessionData(sessionId: string | null) {
  const [session, setSession] = useState<Session | null>(null);
  const [advisorFeedback, setAdvisorFeedback] = useState<AdvisorFeedback[]>([]);
  const [marketPersonas, setMarketPersonas] = useState<MarketPersona[]>([]);
  const [nextActions, setNextActions] = useState<NextAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);

  const fetchSessionData = async () => {
    if (!sessionId) return;

    try {
      setLoading(true);

      const [sessionRes, feedbackRes, personasRes, actionsRes] = await Promise.all([
        (supabase as any).from('sessions').select('*').eq('id', sessionId).maybeSingle(),
        (supabase as any).from('advisor_feedback').select('*').eq('session_id', sessionId),
        (supabase as any).from('market_personas').select('*').eq('session_id', sessionId),
        (supabase as any).from('next_actions').select('*').eq('session_id', sessionId).order('order_index'),
      ]);

      if (sessionRes.error) throw sessionRes.error;
      if (feedbackRes.error) throw feedbackRes.error;
      if (personasRes.error) throw personasRes.error;
      if (actionsRes.error) throw actionsRes.error;

      setSession(sessionRes.data);
      setAdvisorFeedback(feedbackRes.data || []);
      setMarketPersonas(personasRes.data || []);
      setNextActions(actionsRes.data || []);
    } catch (err) {
      console.error('Failed to fetch session data:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveAdvisorFeedback = async (feedback: Omit<AdvisorFeedback, 'id' | 'created_at'>[]) => {
    try {
      const { error } = await (supabase as any).from('advisor_feedback').insert(feedback);
      if (error) throw error;
      await fetchSessionData();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to save feedback');
    }
  };

  const saveMarketPersonas = async (personas: Omit<MarketPersona, 'id' | 'created_at'>[]) => {
    try {
      const { error } = await (supabase as any).from('market_personas').insert(personas);
      if (error) throw error;
      await fetchSessionData();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to save personas');
    }
  };

  const saveNextActions = async (actions: Omit<NextAction, 'id' | 'created_at'>[]) => {
    try {
      const { error } = await (supabase as any).from('next_actions').insert(actions);
      if (error) throw error;
      await fetchSessionData();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to save actions');
    }
  };

  const toggleActionComplete = async (actionId: string, isCompleted: boolean) => {
    try {
      const { error } = await (supabase as any)
        .from('next_actions')
        .update({ is_completed: isCompleted })
        .eq('id', actionId);

      if (error) throw error;
      await fetchSessionData();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update action');
    }
  };

  return {
    session,
    advisorFeedback,
    marketPersonas,
    nextActions,
    loading,
    saveAdvisorFeedback,
    saveMarketPersonas,
    saveNextActions,
    toggleActionComplete,
    refetch: fetchSessionData,
  };
}
