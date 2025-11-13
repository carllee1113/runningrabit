import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CoachAthleteLink } from '@/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    // TODO: Get coach ID from auth session
    const coachId = '00000000-0000-0000-0000-000000000000';

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