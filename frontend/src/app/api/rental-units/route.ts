import { NextResponse } from 'next/server';
import { supabase } from '@/server/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rental_units')
      .select('id, name, basePrice:base_price, status')
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to load rental units' }, { status: 500 });
  }
}
