// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

// client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // 이 함수는 브라우저에서 실행되며, 쿠키를 자동으로 관리해줍니다.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
