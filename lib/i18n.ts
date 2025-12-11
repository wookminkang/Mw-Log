'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// 1. S3 버킷의 기본 주소 (파일이 있는 폴더까지)
const S3_BASE_URL = 'https://mwkangs3.s3.ap-northeast-2.amazonaws.com/locales';
// 2. 매니페스트(지도) 파일 주소
const MANIFEST_URL = `${S3_BASE_URL}/version.json`;

// 매니페스트를 메모리에 잠깐 담아둘 변수 (중복 요청 방지)
let manifestPromise = null;

// 3. 매니페스트를 가져오는 함수 (Promise)
const loadManifest = () => {
  if (!manifestPromise) {
    manifestPromise = fetch(MANIFEST_URL, { cache: 'no-store' }) // 캐시 끄고 최신본 가져오기
      .then((res) => {
        if (!res.ok) throw new Error('Manifest 로딩 실패');
        return res.json();
      })
      .catch((err) => {
        console.error(err);
        return null; // 실패 시 null 반환
      });
  }
  return manifestPromise;
};

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'ko', // 기본 언어 설정
    fallbackLng: 'en',
    
    // 디버그 모드 (개발 중에만 true로 하면 콘솔에 로그가 찍혀서 편해요)
    debug: process.env.NODE_ENV === 'development',

    backend: {
      // loadPath는 custom request를 쓸 때 무시되지만, 형식상 남겨둡니다.
      loadPath: `${S3_BASE_URL}/{{lng}}.json`,

      // ★ 핵심: i18next가 파일을 요청하는 방식을 우리가 가로챕니다.
      request: async (options, url, payload, callback) => {
        try {
          // 1단계: 어떤 언어를 원하니? (url에서 언어 코드를 추측하거나 인자로 받음)
          // url은 loadPath 패턴을 따르므로, 여기서 단순히 언어 코드만 발라내기보단
          // i18next가 넘겨주는 lng를 쓰는 게 좋지만, request 함수 스펙상 url을 파싱하는 게 일반적입니다.
          // 여기서는 간단히 options(언어정보)가 넘어오지 않으므로, loadPath 구조를 이용합니다.
          
          // 하지만 더 쉬운 방법!
          // 우리는 그냥 "지도"를 먼저 봅니다.
          const manifest = await loadManifest();
          
          // i18next가 요청하려는 'ko', 'en' 등의 언어 코드를 추출합니다.
          // loadPath가 ".../{{lng}}.json" 이므로 url 끝부분에서 언어를 유추하거나
          // 더 정확하게는 i18next 내부 로직을 따르지만, 
          // 여기서는 간단하게 URL 파싱으로 처리합니다.
          const langMatch = url.match(/\/([a-zA-Z-]+)\.json$/);
          const lang = langMatch ? langMatch[1] : 'en';

          // 2단계: 지도(Manifest)에서 진짜 파일 경로 찾기
          // manifest.files['ko'] -> "locales/ko-20251211-120000.json"
          let realFilePath = manifest?.files?.[lang];

          // 만약 지도에 없거나 실패했으면? -> 에라 모르겠다, 기본 고정 파일명으로 시도 (안전장치)
          if (!realFilePath) {
            console.warn(`[i18n] 매니페스트에서 ${lang}을 못 찾았습니다. 기본 경로로 시도합니다.`);
            realFilePath = `locales/${lang}.json`;
          }

          // 참고: manifest에 "locales/"가 이미 포함되어 있다면 경로 조심
          // 스크립트에서 "locales/filename.json"으로 저장했으므로,
          // S3_BASE_URL은 "https://.../locales"가 아니라 "https://.../" 여야 맞을 수도 있습니다.
          // 아까 스크립트 로직: newConfigFile.files[lang] = `locales/${fileName}`;
          // 따라서 S3_BASE_URL은 버킷 루트여야 합니다. 
          
          // 경로 조립 (버킷 루트 + 매니페스트에 적힌 경로)
          const bucketRoot = 'https://mwkangs3.s3.ap-northeast-2.amazonaws.com';
          const realUrl = `${bucketRoot}/${realFilePath}`;

          // 3단계: 진짜 파일 fetch
          const res = await fetch(realUrl);
          if (!res.ok) throw new Error(`Translation fetch failed: ${res.status}`);
          
          const data = await res.json();
          
          // 성공! i18next에게 데이터를 넘겨줍니다.
          callback(null, { status: 200, data });

        } catch (err) {
          console.error('[i18n Load Error]', err);
          // 실패 시 i18next에게 에러 전달
          callback(err, null); 
        }
      },
    },

    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: true, 
    },
  });

export default i18n;