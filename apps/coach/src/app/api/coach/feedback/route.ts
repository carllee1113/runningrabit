import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Feedback } from '@/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const coachId = '00000000-0000-0000-0000-000000000000'; // TODO: Get from auth
    const body = await req.json();
    const { athlete_user_id, activity_id, date, kind, content_text, content_url } = body;

    if (!athlete_user_id || !date || !kind || (!content_text && !content_url)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
      .from('feedback')
      .insert({
        coach_id: coachId,
        athlete_user_id,
        activity_id,
        date,
        kind,
        content_text,
        content_url,
      })
      .select()
      .single();

    if (error) throw error;

    // Audit log
    await supabase.from('audit_logs').insert({
      actor_id: coachId,
      action: 'feedback',
      entity: 'feedback',
      entity_id: data.id,
      metadata: { athlete_user_id, activity_id, kind },
    });

    return NextResponse.json({ feedback: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
