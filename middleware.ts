import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. 응답 객체를 먼저 만듭니다 (쿠키를 실어 보내기 위해 필요)
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Supabase 클라이언트 생성 (이 부분 때문에 코드가 좀 길어 보입니다)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // 미들웨어에서 쿠키를 설정하는 필수 로직
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. 사용자 정보 확인 (여기서 DB 통신 혹은 토큰 검증이 일어남)
  // supabase.auth.getUser()는 보안상 가장 안전한 방법입니다.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. [핵심] /admin 경로인데 로그인이 안 되어 있다면? -> 로그인 페이지로 쫓아냄
  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    const loginUrl = new URL("/login", request.url);
    // (선택) 로그인 후 다시 돌아오게 하려면 아래 줄 주석 해제
    // loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. 검사 끝났으면 원래 가려던 곳으로 진행
  return response;
}

// 이미지나 정적 파일에는 미들웨어가 돌지 않게 설정 (성능 최적화)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
