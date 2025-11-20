import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { Session } from '../database.types';

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('sessions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  const createSession = async (sessionData: {
    idea_name: string;
    idea_description: string;
    target_audience: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await (supabase as any)
        .from('sessions')
        .insert({
          ...sessionData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      await fetchSessions();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create session');
    }
  };

  const updateSession = async (id: string, updates: Partial<Session>) => {
    try {
      const { error } = await (supabase as any)
        .from('sessions')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await fetchSessions();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update session');
    }
  };

  return {
    sessions,
    loading,
    error,
    createSession,
    updateSession,
    refetch: fetchSessions,
  };
}
