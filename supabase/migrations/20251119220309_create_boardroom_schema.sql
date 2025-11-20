/*
  # BoardRoom Labs Database Schema

  ## Overview
  This migration creates the complete database structure for BoardRoom Labs,
  an AI startup boardroom simulator for idea validation and coaching.

  ## New Tables

  ### `sessions`
  Stores user startup idea validation sessions
  - `id` (uuid, primary key) - Unique session identifier
  - `user_id` (uuid, references auth.users) - Session owner
  - `idea_name` (text) - Name of the startup idea
  - `idea_description` (text) - Detailed description
  - `target_audience` (text) - Who the product is for
  - `current_stage` (text) - Current phase (pattern_check, market_sim, evidence_check, completed)
  - `board_score` (numeric) - Average score from advisors (0-10)
  - `last_verdict` (text) - Latest overall verdict
  - `created_at` (timestamptz) - Session creation time
  - `updated_at` (timestamptz) - Last update time

  ### `advisor_feedback`
  Stores individual advisor feedback for each session
  - `id` (uuid, primary key) - Unique feedback identifier
  - `session_id` (uuid, references sessions) - Associated session
  - `advisor_type` (text) - Type: operator, growth, finance, product, skeptic
  - `phase` (text) - Phase: pattern_check or evidence_check
  - `score` (numeric) - Advisor's score (0-10)
  - `diagnosis` (text) - The "Why" - reason for the score
  - `prescription` (text) - The "Fix" - actionable improvement step
  - `created_at` (timestamptz) - Feedback creation time

  ### `market_personas`
  Stores generated user personas from market simulation
  - `id` (uuid, primary key) - Unique persona identifier
  - `session_id` (uuid, references sessions) - Associated session
  - `persona_name` (text) - e.g., "Sarah, Busy Mom"
  - `persona_description` (text) - Background/context
  - `reaction_quote` (text) - Realistic reaction to the product
  - `willingness_to_buy` (numeric) - Percentage (0-100)
  - `created_at` (timestamptz) - Persona creation time

  ### `next_actions`
  Stores actionable next steps for each session
  - `id` (uuid, primary key) - Unique action identifier
  - `session_id` (uuid, references sessions) - Associated session
  - `action_text` (text) - Clear, concrete action item
  - `is_completed` (boolean) - Completion status
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Action creation time

  ## Security
  - RLS enabled on all tables
  - Users can only access their own sessions and related data
  - Authenticated access required for all operations
*/

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  idea_name text NOT NULL,
  idea_description text NOT NULL,
  target_audience text NOT NULL,
  current_stage text DEFAULT 'pattern_check' NOT NULL,
  board_score numeric(3,1) DEFAULT 0,
  last_verdict text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create advisor_feedback table
CREATE TABLE IF NOT EXISTS advisor_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  advisor_type text NOT NULL,
  phase text NOT NULL,
  score numeric(3,1) NOT NULL,
  diagnosis text NOT NULL,
  prescription text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create market_personas table
CREATE TABLE IF NOT EXISTS market_personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  persona_name text NOT NULL,
  persona_description text NOT NULL,
  reaction_quote text NOT NULL,
  willingness_to_buy numeric(3,0) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create next_actions table
CREATE TABLE IF NOT EXISTS next_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  action_text text NOT NULL,
  is_completed boolean DEFAULT false,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_actions ENABLE ROW LEVEL SECURITY;

-- Sessions policies
CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
  ON sessions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Advisor feedback policies
CREATE POLICY "Users can view own session feedback"
  ON advisor_feedback FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = advisor_feedback.session_id
      AND sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert feedback for own sessions"
  ON advisor_feedback FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = advisor_feedback.session_id
      AND sessions.user_id = auth.uid()
    )
  );

-- Market personas policies
CREATE POLICY "Users can view own session personas"
  ON market_personas FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = market_personas.session_id
      AND sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert personas for own sessions"
  ON market_personas FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = market_personas.session_id
      AND sessions.user_id = auth.uid()
    )
  );

-- Next actions policies
CREATE POLICY "Users can view own session actions"
  ON next_actions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = next_actions.session_id
      AND sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert actions for own sessions"
  ON next_actions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = next_actions.session_id
      AND sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own session actions"
  ON next_actions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = next_actions.session_id
      AND sessions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = next_actions.session_id
      AND sessions.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_advisor_feedback_session_id ON advisor_feedback(session_id);
CREATE INDEX IF NOT EXISTS idx_market_personas_session_id ON market_personas(session_id);
CREATE INDEX IF NOT EXISTS idx_next_actions_session_id ON next_actions(session_id);