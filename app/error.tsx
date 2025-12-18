"use client"; //

import { useEffect } from "react";
import Link from "next/link";

// Props 타입 정의 (TypeScript니까요!)
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  // 컴포넌트가 마운트될 때 에러를 콘솔에 로깅 (추후 Sentry 같은 에러 로깅 툴 연동 가능)
  useEffect(() => {
    console.error("페이지 에러 발생:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-12 mx-auto text-center bg-white dark:bg-gray-900">
      {/* 2. 메인 타이틀 */}
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        시스템 오류가 발생했습니다
      </h1>

      {/* 3. 설명 텍스트 */}
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
        죄송합니다. 페이지를 불러오는 중에 예상치 못한 문제가 생겼습니다.
        <br className="hidden sm:block" />
        일시적인 오류일 수 있으니 다시 시도해 보시거나 홈으로 이동해 주세요.
      </p>

      {/* 4. 에러 메시지 (개발 환경에서만 보이게 하거나, 흐리게 처리) */}
      <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-lg dark:bg-orange-900/20 dark:border-orange-800">
        <p className="text-sm font-mono text-orange-600 dark:text-orange-300 break-all">
          Error: {error.message || "Unknown Error"}
        </p>
      </div>

      {/* 5. 버튼 그룹 (다시 시도 & 홈으로) */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        {/* 다시 시도 버튼 (reset 함수 실행) */}
        <button
          onClick={
            // 다시 시도 버튼을 누르면 페이지를 다시 렌더링 시도합니다.
            () => reset()
          }
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white transition-all duration-300 bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
        >
          다시 시도하기
        </button>

        {/* 홈으로 가기 버튼 */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-orange-700 transition-all duration-300 bg-orange-100 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
