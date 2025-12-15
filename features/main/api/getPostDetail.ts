import { SupabaseClient } from '@supabase/supabase-js';

export async function getPostDetail(id: string) {
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const query = supabase.from("topic").select("*").eq("id", id).eq("status", "publish").eq("isView", true).single();

  const { data, error } = await query

  if (error) {
    throw error;
  }

  return data;

}