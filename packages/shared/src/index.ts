export type UserRole = 'athlete' | 'coach';

export interface Profile {
  user_id: string;
  role: UserRole;
  display_name?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface CoachAthleteLink {
  id: string;
  coach_id: string;
  athlete_user_id: string;
  status: 'pending' | 'active' | 'revoked';
  created_at: string;
  updated_at: string;
}

export interface WorkoutTemplate {
  id: string;
  coach_id: string;
  name: string;
  description?: string;
  steps: WorkoutStep[];
  tags?: string[];
  created_at: string;
}

export interface WorkoutStep {
  type: 'warmup' | 'work' | 'recovery' | 'cooldown';
  duration?: number; // seconds
  distance?: number; // meters
  description: string;
}

export interface WorkoutAssignment {
  id: string;
  template_id: string;
  athlete_user_id: string;
  week_start: string; // ISO date
  status: 'scheduled' | 'completed' | 'skipped';
  completed_at?: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  coach_id: string;
  athlete_user_id: string;
  activity_id?: number;
  date: string; // ISO date
  kind: 'text' | 'audio';
  content_text?: string;
  content_url?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  action: 'invite' | 'accept' | 'revoke' | 'assign' | 'feedback';
  entity: 'coach_athlete_links' | 'workout_assignments' | 'feedback';
  entity_id: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}