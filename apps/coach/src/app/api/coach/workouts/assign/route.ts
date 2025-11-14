import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { WorkoutAssignment } from '@/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const coachId = req.headers.get('x-coach-id') || '';
    if (!coachId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data: coachProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', coachId)
      .single();
    if (!coachProfile || coachProfile.role !== 'coach') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const body = await req.json();
    const { template_id, athlete_user_id, week_start } = body;

    if (!template_id || !athlete_user_id || !week_start) {
      return NextResponse.json({ error: 'template_id, athlete_user_id, week_start required' }, { status: 400 });
    }

    // Verify coach owns template
    const { data: template } = await supabase
      .from('workout_templates')
      .select('id')
      .eq('id', template_id)
      .eq('coach_id', coachId)
      .single();

    if (!template) {
      return NextResponse.json({ error: 'Template not found or access denied' }, { status: 403 });
    }

    // Verify active link
    const { data: link } = await supabase
      .from('coach_athlete_links')
      .select('id')
      .eq('coach_id', coachId)
      .eq('athlete_user_id', athlete_user_id)
      .eq('status', 'active')
      .single();

    if (!link) {
      return NextResponse.json({ error: 'No active link with athlete' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('workout_assignments')
      .insert({
        template_id,
        athlete_user_id,
        week_start,
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) throw error;

    // Audit log
    await supabase.from('audit_logs').insert({
      actor_id: coachId,
      action: 'assign',
      entity: 'workout_assignments',
      entity_id: data.id,
      metadata: { template_id, athlete_user_id, week_start },
    });

    return NextResponse.json({ assignment: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
