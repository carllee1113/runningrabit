import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CoachAthleteLink } from '@/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const coachId = req.headers.get('x-coach-id') || '';
    if (!coachId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data: coachProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', coachId)
      .single();
    if (!coachProfile || coachProfile.role !== 'coach') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { data: links, error } = await supabase
      .from('coach_athlete_links')
      .select(`
        *,
        athlete:profiles!athlete_user_id(user_id, display_name, created_at)
      `)
      .eq('coach_id', coachId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const athletes = links.map((link: any) => ({
      link_id: link.id,
      athlete_id: link.athlete_user_id,
      status: link.status,
      display_name: link.athlete?.display_name || 'Unknown',
      created_at: link.created_at,
    }));

    return NextResponse.json({ athletes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}