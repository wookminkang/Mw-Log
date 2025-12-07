'use client';

// 1. 방금 만든 설정 파일 import (초기화)
import '../../lib/i18n'; 
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

// 데이터를 불러올 때까지 보여줄 로딩 컴포넌트
function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div className="p-10">
      {/* 구글 시트에 있는 key 값을 적어보세요 */}
      <h1 className="text-2xl font-bold">{t('common.greeting')}</h1> 
      
      <div className="mt-4 gap-2 flex">
        <button 
          className="border p-2 rounded hover:bg-gray-100"
          onClick={() => i18n.changeLanguage('ko')}
        >
          한국어 🇰🇷
        </button>
        <button 
          className="border p-2 rounded hover:bg-gray-100"
          onClick={() => i18n.changeLanguage('en')}
        >
          English 🇺🇸
        </button>
      </div>
      
      <p className="mt-4 text-gray-500">
        현재 언어: {i18n.language} <br/>
        데이터 출처: S3 (새로고침 해보세요 네트워크 탭에 json 요청이 뜰겁니다!)
      </p>

      <p>
        {t('auth.login.desc')}
      </p>
    </div>
  );
}

export default function Page() {
  return (
    // S3에서 JSON 다운로드 받는 동안 에러 안 나게 Suspense로 감싸기
    <Suspense fallback={<div>번역 로딩중...</div>}>
      <MyComponent />
    </Suspense>
  );
}