export interface Profile {
  user_id: string;
  role: 'athlete' | 'coach';
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
  steps: any[];
  created_at: string;
  updated_at: string;
}

export interface WorkoutAssignment {
  id: string;
  template_id: string;
  athlete_user_id: string;
  assigned_date: string;
  due_date?: string;
  notes?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  coach_id: string;
  athlete_user_id: string;
  date: string;
  kind: 'text' | 'audio';
  content_text?: string;
  content_audio_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  resource: string;
  details?: any;
  created_at: string;
}