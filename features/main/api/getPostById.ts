import { cache } from "react";
import { createServer } from "@/utils/supabase/server";

/**
 * React.cache로 래핑 → 같은 요청 내에서 id가 동일하면
 * generateMetadata / page 컴포넌트 두 곳에서 호출해도 DB는 1회만 조회됩니다.
 */
export const getPostById = cache(async (id: string) => {
  const supabase = await createServer();

  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("id", id)
    .eq("isView", true)
    .single();

  if (error || !data) return null;
  return data;
});
