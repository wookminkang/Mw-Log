# Mw-log 프로젝트

이 프로젝트는 **Next.js 16**, **Supabase**, **Tailwind CSS 4**를 기반으로 구축된 최신 웹 애플리케이션입니다.

## 기술 스택 (Tech Stack)

### Core

- **Next.js 16**: 최신 App Router 아키텍처 사용
- **React 19**: 최신 리액트 기능 활용
- **TypeScript**: 정적 타입 안정성 보장

### Backend & Database

- **Supabase**: 인증(Auth), 데이터베이스(DB), 실시간 구독(Realtime) 등 백엔드 서비스 활용
- **@supabase/ssr**: Next.js 서버 사이드 렌더링(SSR) 환경에서의 Supabase 통합

### Styling

- **Tailwind CSS 4**: 유틸리티 퍼스트 CSS 프레임워크
- **Lucide React**: 아이콘 라이브러리
- **shadcn/ui** (추정): Radix UI 기반의 컴포넌트 (`@radix-ui/*` 의존성 기반)

### State Management & Data Fetching

- **Zustand**: 전역 상태 관리
- **TanStack Query (React Query)**: 서버 상태 관리 및 데이터 패칭 최적화

### Forms & Validation

- **React Hook Form**: 폼 상태 관리
- **Zod**: 스키마 유효성 검사

### Internationalization

- **i18next**, **react-i18next**: 다국어 지원

### ETC

- **BlockNote**: WYSIWYG 에디터
- **Vitest**: 테스팅 프레임워크

---

## 폴더 구조 (Folder Structure)

프로젝트의 주요 디렉토리 구조는 다음과 같습니다:

```
├── app/                  # Next.js App Router 페이지 및 레이아웃
│   ├── (auth)/           # 로그인, 회원가입 등 인증 관련 라우트 그룹
│   ├── (main)/           # 메인 레이아웃 적용 페이지
│   ├── (sub)/            # 서브 레이아웃 적용 페이지
│   ├── admin/            # 관리자 페이지 및 기능
│   └── api/              # API 라우트
├── components/           # 공통 UI 컴포넌트
├── features/             # 기능 단위 모듈 (Admin, Main 등)
│   ├── admin/            # 관리자 기능 관련 컴포넌트 및 로직
│   └── main/             # 메인 기능 관련 컴포넌트 및 로직
├── lib/                  # 외부 라이브러리 설정 (Supabase 등)
├── stores/               # Zustand 스토어 (전역 상태)
├── hooks/                # 커스텀 React Hooks
├── types/                # TypeScript 타입 정의
├── utils/                # 유틸리티 함수
├── public/               # 정적 파일 (이미지, 아이콘 등)
└── scripts/              # 프로젝트 유틸리티 스크립트
```

---

## 시작하기 (Getting Started)

### 1. 필수 요구사항 (Prerequisites)

- **Node.js**: 최신 LTS 버전 권장
- **pnpm**: 패키지 매니저 (프로젝트가 `pnpm-lock.yaml`을 사용 중)

### 2. 설치 (Installation)

프로젝트를 클론하고 의존성을 설치합니다.

```bash
git clone <repository-url>
cd next-supabase
pnpm install
```

### 3. 환경 변수 설정 (Environment Variables)

프로젝트 루트에 `.env.local` 파일을 생성하고 Supabase 관련 키를 설정해야 합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. 실행 (Run)

개발 서버를 실행합니다.

```bash
pnpm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) (또는 설정된 포트, 예: 1004)으로 접속하여 확인합니다.

---

## 스크립트 (Scripts)

- `pnpm run dev`: 개발 서버 실행 (Turbopack 사용)
- `pnpm run build`: 프로덕션 빌드
- `pnpm run start`: 프로덕션 서버 실행
- `pnpm run lint`: 린트 검사
- `pnpm test`: 테스트 실행 (Vitest)
