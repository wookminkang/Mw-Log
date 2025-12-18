import { SupabaseClient } from "@supabase/supabase-js";

export async function getSearchPosts(searchTerm: string) {
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  let query = supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("isView", true)
    // 'title' 컬럼에서 검색어를 포함하는지 확인 (%검색어% 방식)
    .ilike("title", `${searchTerm}%`)
    .order("created_at", { ascending: false }); // 최신순 정렬 추가 예시

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
