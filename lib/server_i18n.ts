import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';

// 1. S3 버킷 루트 주소 (끝에 / 빼고 입력)
// 주의: 'locales' 폴더 경로가 아니라 '버킷 루트'입니다.
// 이유: 매니페스트 파일 안에 이미 "locales/ko-xxx.json"이라고 경로가 들어있기 때문입니다.
const S3_BUCKET_ROOT = 'https://mwkangs3.s3.ap-northeast-2.amazonaws.com';

const fallbackLng = 'en';
const defaultNS = 'translation';

/**
 * 매니페스트(version.json) 타입 정의
 */
type Manifest = {
  version: string;
  updatedAt: string;
  files: Record<string, string>; // { ko: "locales/ko-2025....json" }
};

/**
 * 1단계: 매니페스트(지도) 가져오기
 * 중요: 이 파일은 항상 최신이어야 하므로 캐시를 안 씁니다 (no-store).
 */
async function fetchManifest(): Promise<Manifest | null> {
  try {
    const res = await fetch(`${S3_BUCKET_ROOT}/locales/version.json`, {
      cache: 'no-store', // 매번 최신 버전을 확인
      next: { revalidate: 0 }, // Next.js ISR/Data Cache 무효화
    });
    
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('[i18n] Failed to fetch manifest:', e);
    return null;
  }
}

/**
 * 2단계: 실제 번역 리소스 가져오기
 */
async function loadResourceFromS3(lng: string): Promise<Record<string, any>> {
  // 1. 지도(Manifest) 확인
  const manifest = await fetchManifest();
  
  // 2. 경로 찾기 (매니페스트가 없거나 해당 언어가 없으면 기본 경로 시도)
  // manifest.files[lng] 예시: "locales/ko-20251211-120000.json"
  const filePath = manifest?.files?.[lng] || `locales/${lng}.json`;
  
  const url = `${S3_BUCKET_ROOT}/${filePath}`;

  try {
    const response = await fetch(url, {
      // 3. 캐싱 전략: 번역 파일 자체는 불변(Immutable)이므로 강력하게 캐싱
      // 한번 받아오면 서버 재배포 전까지(혹은 매니페스트가 바뀌기 전까지) 다시 안 받음
      cache: 'force-cache', 
    });
    
    if (!response.ok) {
      // 파일이 없을 경우 빈 객체 반환 (에러 방지)
      console.warn(`[i18n] Translation file not found: ${url}`);
      return {};
    }
    
    return await response.json();
  } catch (error) {
    console.error(`[i18n] Load Error for ${lng}:`, error);
    return {};
  }
}

/**
 * 서버 컴포넌트용 번역 훅 (async/await 필수)
 */
export async function getTranslation(lng?: string, ns = defaultNS) {
  const i18nInstance = createInstance();
  const effectiveLng = lng || fallbackLng;
  
  // 실제 S3 데이터 로딩
  const resources = await loadResourceFromS3(effectiveLng);

  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: effectiveLng,
      ns,
      fallbackLng,
      defaultNS,
      resources: {
        // 서버에서 받아온 JSON 데이터를 바로 꽂아줍니다.
        [effectiveLng]: {
          [ns]: resources,
        },
      },
      interpolation: {
        escapeValue: false,
      },
    });

  return {
    t: i18nInstance.getFixedT(effectiveLng, ns),
    i18n: i18nInstance,
  };
}