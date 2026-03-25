# Next.js 프로젝트 구조
- `app/`: App Router 기반 페이지들
- `components/`: 재사용 컴포넌트
- `lib/`: 유틸리티와 설정
- `styles/`: 전역 스타일

# 개발 환경 설정
npm run dev로 개발 서버 시작
Tailwind CSS 사용 중
TypeScript 엄격 모드 적용

# 코딩 규칙
- 함수형 컴포넌트만 사용
- async/await 패턴 선호
- 에러 바운더리 필수 적용
- 데이타 패칭은 최대한 서버컴포넌트를 활용하고, 정말 필요한 부분에서 클라이언트 컴포넌트를 사용
- 데이타를 불러오는 부분은 로딩스피너를 필수 적용해
- SEO최적화도 필수 적용
