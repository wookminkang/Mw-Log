// i18n/server.ts (수정된 버전)

import { createInstance } from 'i18next';

// 아까 복사한 S3 주소 템플릿
const S3_BASE_URL = 'https://mwkangs3.s3.ap-northeast-2.amazonaws.com/locales/';

// 기본 설정 (i18n/settings.ts 파일로 분리하여 공유하는 것이 더 좋습니다.)
const fallbackLng = 'en';
const defaultNS = 'translation'; 

/**
 * 지정된 언어(lng)의 번역 파일을 S3에서 불러오는 함수
 */
async function loadResourceFromS3(lng: string): Promise<Record<string, any>> {
  const url = `${S3_BASE_URL}${lng}.json`;
  
  try {
    const response = await fetch(url, {
      // Node.js 환경에서 S3 요청 시 캐싱 정책을 명확히 하는 것이 좋습니다.
      // Next.js 13+에서는 기본적으로 캐싱되므로 필요에 따라 'force-cache'나 'no-store'를 사용합니다.
      cache: 'force-cache', // 서버에서 영구 캐시하도록 설정
    });
    
    if (!response.ok) {
      console.warn(`[i18n] Failed to load translation for ${lng}: ${response.statusText}`);
      return {};
    }
    
    // JSON 데이터 반환
    return await response.json();
  } catch (error) {
    console.error(`[i18n Server Error] Could not load ${url}:`, error);
    return {};
  }
}

/**
 * 서버 컴포넌트에서 사용할 t 함수를 생성하고 반환하는 헬퍼 함수
 */
export async function useTranslation(lng?: string, ns = defaultNS) {
  // 요청마다 독립적인 인스턴스 생성
  const i18nInstance = createInstance();
  const effectiveLng = lng || fallbackLng;
  
  // S3에서 데이터 로드 (await 필요)
  const resource = await loadResourceFromS3(effectiveLng);

  await i18nInstance.init({
    lng: effectiveLng,
    ns,
    fallbackLng,
    defaultNS,
    resources: {
      // 서버에서 로드한 리소스를 직접 주입
      [effectiveLng]: {
        [ns]: resource,
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return {
    // t 함수 반환
    t: i18nInstance.getFixedT(effectiveLng, ns),
    i18n: i18nInstance,
  };
}