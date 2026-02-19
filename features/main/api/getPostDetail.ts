import { createClient } from "@/utils/supabase/client";

export async function getPostDetail(id: string | number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("id", id)
    .eq("status", "publish")
    .eq("isView", true)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
