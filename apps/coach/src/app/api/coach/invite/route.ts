import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Profile, CoachAthleteLink } from '@/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { athlete_email } = body;

    if (!athlete_email || typeof athlete_email !== 'string') {
      return NextResponse.json({ error: 'athlete_email required' }, { status: 400 });
    }

    // Find athlete by email
    const { data: athlete, error: athleteError } = await supabase
      .from('profiles')
      .select('user_id, role')
      .eq('email', athlete_email.toLowerCase())
      .single();

    if (athleteError || !athlete || athlete.role !== 'athlete') {
      return NextResponse.json({ error: 'Athlete not found' }, { status: 404 });
    }

    const coachId = req.headers.get('x-coach-id') || '';
    if (!coachId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: coachProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', coachId)
      .single();
    if (!coachProfile || coachProfile.role !== 'coach') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // Check if link already exists
    const { data: existingLink } = await supabase
      .from('coach_athlete_links')
      .select('id, status')
      .eq('coach_id', coachId)
      .eq('athlete_user_id', athlete.user_id)
      .single();

    if (existingLink) {
      if (existingLink.status === 'active') {
        return NextResponse.json({ error: 'Already connected' }, { status: 409 });
      }
      // Revived pending link
      const { data, error } = await supabase
        .from('coach_athlete_links')
        .update({ status: 'pending', updated_at: new Date().toISOString() })
        .eq('id', existingLink.id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ link: data });
    }

    // Create new link
    const { data: newLink, error: createError } = await supabase
      .from('coach_athlete_links')
      .insert({
        coach_id: coachId,
        athlete_user_id: athlete.user_id,
        status: 'pending',
      })
      .select()
      .single();

    if (createError) throw createError;

    // Audit log
    await supabase.from('audit_logs').insert({
      actor_id: coachId,
      action: 'invite',
      entity: 'coach_athlete_links',
      entity_id: newLink.id,
      metadata: { athlete_email },
    });

    return NextResponse.json({ link: newLink });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
