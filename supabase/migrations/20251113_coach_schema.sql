# Supabase Coach Schema Migration

-- Add coach/athlete roles and separation tables

-- 1. Profiles with role
CREATE TYPE user_role AS ENUM ('athlete', 'coach');

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'athlete';

-- 2. Coach-athlete links
CREATE TYPE link_status AS ENUM ('pending', 'active', 'revoked');

CREATE TABLE public.coach_athlete_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  athlete_user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  status link_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (coach_id, athlete_user_id)
);

-- 3. Workout templates (coach-owned)
CREATE TABLE public.workout_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  steps JSONB NOT NULL DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Workout assignments
CREATE TABLE public.workout_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES public.workout_templates(id) ON DELETE CASCADE,
  athlete_user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Feedback
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  athlete_user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  activity_id BIGINT,
  date DATE NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('text', 'audio')),
  content_text TEXT,
  content_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Audit logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id UUID NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.coach_athlete_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: users can read/write own profile
CREATE POLICY own_profile_read ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY own_profile_write ON public.profiles FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Coach-athlete links: both parties can read; coach can insert; either can update
CREATE POLICY link_read ON public.coach_athlete_links FOR SELECT USING (
  auth.uid() = coach_id OR auth.uid() = athlete_user_id
);
CREATE POLICY link_insert_coach ON public.coach_athlete_links FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.role = 'coach')
);
CREATE POLICY link_update_party ON public.coach_athlete_links FOR UPDATE USING (
  auth.uid() = coach_id OR auth.uid() = athlete_user_id
);

-- Workout templates: coach-only CRUD
CREATE POLICY coach_templates_access ON public.workout_templates FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.role = 'coach')
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.role = 'coach')
);
CREATE POLICY coach_templates_owner ON public.workout_templates FOR ALL USING (auth.uid() = coach_id) WITH CHECK (auth.uid() = coach_id);

-- Workout assignments: coach can read/write for linked athletes; athlete can read own
CREATE POLICY assignment_coach_read ON public.workout_assignments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.workout_templates t
    WHERE t.id = workout_assignments.template_id AND t.coach_id = auth.uid()
  )
);
CREATE POLICY assignment_athlete_read ON public.workout_assignments FOR SELECT USING (auth.uid() = athlete_user_id);
CREATE POLICY assignment_coach_write ON public.workout_assignments FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.workout_templates t
    WHERE t.id = workout_assignments.template_id AND t.coach_id = auth.uid()
  )
);

-- Feedback: both parties can read; coach can insert
CREATE POLICY feedback_read ON public.feedback FOR SELECT USING (auth.uid() = coach_id OR auth.uid() = athlete_user_id);
CREATE POLICY feedback_insert_coach ON public.feedback FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.role = 'coach')
);

-- Audit logs: only service role can write; no user reads
CREATE POLICY audit_write_service ON public.audit_logs FOR INSERT WITH CHECK (
  auth.jwt() ->> 'role' = 'service_role'
);

-- Grant permissions
GRANT SELECT ON public.coach_athlete_links TO authenticated;
GRANT INSERT ON public.coach_athlete_links TO authenticated;
GRANT UPDATE ON public.coach_athlete_links TO authenticated;

GRANT SELECT ON public.workout_templates TO authenticated;
GRANT INSERT ON public.workout_templates TO authenticated;
GRANT UPDATE ON public.workout_templates TO authenticated;
GRANT DELETE ON public.workout_templates TO authenticated;

GRANT SELECT ON public.workout_assignments TO authenticated;
GRANT INSERT ON public.workout_assignments TO authenticated;
GRANT UPDATE ON public.workout_assignments TO authenticated;

GRANT SELECT ON public.feedback TO authenticated;
GRANT INSERT ON public.feedback TO authenticated;

GRANT INSERT ON public.audit_logs TO authenticated;