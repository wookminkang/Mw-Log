import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // 이 catch 블록은 'Server Component'에서 set을 호출했을 때 에러를 무시하기 위함입니다.
            // Server Component는 쿠키를 읽을 수만 있고 쓸 수는 없기 때문입니다.
            // 실제 쿠키 갱신(로그인 유지)은 Middleware나 Server Action에서 일어납니다.
          }
        },
      },
    }
  )
}