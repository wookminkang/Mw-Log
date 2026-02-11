# Copilot 안내 — Next-supabase

요약
- 이 리포는 Next.js 16(App Router), Supabase(@supabase/ssr + @supabase/supabase-js), Tailwind CSS 기반입니다.
- 패키지 매니저: pnpm (루트에 `pnpm-lock.yaml`)

핵심 개발 워크플로
- 개발 서버: `pnpm run dev` (기본 스크립트는 `next dev --turbopack -p 1004`)
- 빌드: `pnpm run build` → 프로덕션 시작: `pnpm run start`
- 테스트: `pnpm run test` (Vitest)
- 린트: `pnpm run lint`

아키텍처 요약 (바로 사용할 핵심 지식)
- App Router: 모든 페이지/레이아웃은 `app/` 아래에서 구성됩니다. 레이아웃 그룹(예: `(auth)`, `(main)`, `(sub)`)을 적극 사용합니다.
- 기능별 모듈: `features/` 디렉토리에서 도메인 단위 로직(예: `features/admin`, `features/main`)을 찾으세요.
- 공통 컴포넌트: `components/` 및 `components/ui/`에 UI primitives와 재사용 컴포넌트가 있습니다.
- 상태관리: 전역 상태는 `stores/` (Zustand)에서 관리됩니다.

Supabase 통합 패턴 (중요)
- 브라우저용 클라이언트: `lib/supabase/client.ts` → `createBrowserClient` 사용.
- 서버용 클라이언트: `lib/supabase/server.ts` → `createServerClient` + `next/headers`의 `cookies()` 사용. 서버에서 쿠키를 읽고, `set` 호출은 일부 컨텍스트에서 무시됩니다(파일에 설명 있음).
- 변경 시 주의: 인증/세션 변경 작업은 Middleware, Server Action, 또는 API route에서 처리될 가능성이 높습니다. 브라우저/서버 클라이언트 둘 다 업데이트해야 합니다.

테스트 및 개발 편의성
- MSW 모의: `app/(main)/mocks/handlers.ts` 및 `worker.ts`를 확인하세요. 로컬 개발 시 모킹이 사용됩니다.
- i18n 동기화: `scripts/sync-i18n.js` 및 `pnpm run i18n:sync` 스크립트 존재.

프로젝트 규칙·관례 (발견 가능한 것만)
- 파일 그룹화: 라우트 그룹(괄호 사용)으로 레이아웃 경계 표현 — 변경 시 레이아웃 상속을 의식하세요.
- API 위치: `app/api/` 또는 `api/` 폴더(루트) 둘 다 존재하니, 새 API 엔드포인트를 추가할 때 기존 패턴을 따르세요.
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 사용합니다.

수정·PR 가이드라인(에이전트가 직접 변경할 때)
- 작은 단위로 변경: 한 PR에 한 관심사(예: 하나의 컴포넌트 리팩터, 하나의 API 변경) 권장.
- Supabase 관련 변경은 `lib/supabase/client.ts`와 `lib/supabase/server.ts`를 모두 검토하세요.
- 로컬 실행 확인: `pnpm run dev`로 빌드/런, 필요시 `pnpm run test`로 빠른 단위 테스트 실행.

참조 파일(즉시 열어볼 것)
- `package.json` (스크립트 및 의존성)
- `lib/supabase/client.ts` 및 `lib/supabase/server.ts` (인증/세션 패턴)
- `app/layout.tsx` (전역 Providers, Toaster 등)
- `app/(main)/mocks/handlers.ts`, `worker.ts` (MSW 모킹)
- `features/*` (도메인별 로직 관찰)

질문
- 이 초안에 빠진 세부사항이나 더 강조할 부분이 있으면 알려주세요. 원하면 예시 PR 템플릿이나 구체적 코드 스니펫으로 보강하겠습니다.
