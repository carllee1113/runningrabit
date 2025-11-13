import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { WorkoutTemplate } from '@/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const coachId = '00000000-0000-0000-0000-000000000000'; // TODO: Get from auth

    const { data, error } = await supabase
      .from('workout_templates')
      .select('*')
      .eq('coach_id', coachId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ templates: data as WorkoutTemplate[] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const coachId = '00000000-0000-0000-0000-000000000000'; // TODO: Get from auth
    const body = await req.json();
    const { name, description, steps, tags } = body;

    if (!name || !Array.isArray(steps)) {
      return NextResponse.json({ error: 'name and steps required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('workout_templates')
      .insert({
        coach_id: coachId,
        name,
        description,
        steps,
        tags: tags || [],
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ template: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
