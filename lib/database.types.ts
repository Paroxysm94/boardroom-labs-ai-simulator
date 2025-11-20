export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sessions: {
        Row: {
          id: string
          user_id: string
          idea_name: string
          idea_description: string
          target_audience: string
          current_stage: string
          board_score: number
          last_verdict: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          idea_name: string
          idea_description: string
          target_audience: string
          current_stage?: string
          board_score?: number
          last_verdict?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          idea_name?: string
          idea_description?: string
          target_audience?: string
          current_stage?: string
          board_score?: number
          last_verdict?: string
          created_at?: string
          updated_at?: string
        }
      }
      advisor_feedback: {
        Row: {
          id: string
          session_id: string
          advisor_type: string
          phase: string
          score: number
          diagnosis: string
          prescription: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          advisor_type: string
          phase: string
          score: number
          diagnosis: string
          prescription: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          advisor_type?: string
          phase?: string
          score?: number
          diagnosis?: string
          prescription?: string
          created_at?: string
        }
      }
      market_personas: {
        Row: {
          id: string
          session_id: string
          persona_name: string
          persona_description: string
          reaction_quote: string
          willingness_to_buy: number
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          persona_name: string
          persona_description: string
          reaction_quote: string
          willingness_to_buy: number
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          persona_name?: string
          persona_description?: string
          reaction_quote?: string
          willingness_to_buy?: number
          created_at?: string
        }
      }
      next_actions: {
        Row: {
          id: string
          session_id: string
          action_text: string
          is_completed: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          action_text: string
          is_completed?: boolean
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          action_text?: string
          is_completed?: boolean
          order_index?: number
          created_at?: string
        }
      }
    }
  }
}

export type Session = Database['public']['Tables']['sessions']['Row'];
export type AdvisorFeedback = Database['public']['Tables']['advisor_feedback']['Row'];
export type MarketPersona = Database['public']['Tables']['market_personas']['Row'];
export type NextAction = Database['public']['Tables']['next_actions']['Row'];
