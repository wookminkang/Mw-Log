import { createClient } from "@/utils/supabase/client";

export async function getSearchPosts(searchTerm: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("isView", true)
    .ilike("title", `%${searchTerm}%`)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
