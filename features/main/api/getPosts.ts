import { createClient } from '@/lib/supabase/server';

export async function getPosts(category?: string, pageParam: number = 0) {
  const LIMIT = 5;
  const from = pageParam * LIMIT;
  const to = from + LIMIT - 1;

  const supabase = await createClient();

  let query = supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("isView", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if(category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query


  if (error) {
    throw error;
  }

  return data;

}

export async function getPostsNoInfinity(category?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("isView", true)
    .order("created_at", { ascending: false });

  if(category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query

  if (error) {
    throw error;
  }

  return data;

}