import { SupabaseClient } from '@supabase/supabase-js';

export async function getPosts(category?: string) {
  const LIMIT = 3
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  let query = supabase.from("topic").select("*").eq("status", "publish").eq("isView", true).order("created_at", { ascending: false });
  

  if(category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query


  if (error) {
    throw error;
  }

  return data;

}