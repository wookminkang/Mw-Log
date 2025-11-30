'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// 아까 복사한 S3 주소를 여기에 넣으세요!
// 뒤에 {{lng}}.json 패턴을 꼭 지켜야 합니다.
const S3_URL = 'https://mwkangs3.s3.ap-northeast-2.amazonaws.com/locales/{{lng}}.json';

i18n
  .use(HttpBackend) // ★ 핵심: 외부에서 파일 불러오기
  .use(initReactI18next)
  .init({
    lng: 'ko', // 기본 언어
    fallbackLng: 'en',
    
    // 백엔드 설정 (S3 연결)
    backend: {
      loadPath: S3_URL,
      crossDomain: true, // CORS 요청 허용
    },

    interpolation: {
      escapeValue: false, // React는 XSS 안전함
    },
    
    // 중요: S3에서 불러오는 동안 깜빡임 방지 (Suspense 사용)
    react: {
      useSuspense: true, 
    },
  });

export default i18n;