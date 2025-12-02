'use client';

import { useState } from 'react';

export default function DeployPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleDeploy = async () => {
    // 중복 클릭 방지
    if (isLoading) return;

    if (!confirm('구글 시트의 최신 내용을 반영하시겠습니까?')) return;

    setIsLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '알 수 없는 에러가 발생했습니다.');
      }

      setStatus({
        type: 'success',
        message: '배포 요청 성공! 약 1~2분 뒤에 적용됩니다.',
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : '알 수 없는 에러가 발생했습니다.';
      setStatus({
        type: 'error',
        message: `실패: ${message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <span className="bg-orange-500 rounded-full w-5 h-5"></span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">다국어 배포 관리자</h1>
          <p className="text-gray-500 mt-2 text-sm">
            구글 시트의 번역 내용을<br />서비스에 즉시 반영합니다.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-1">배포 프로세스</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>구글 시트 내용 가져오기</li>
              <li>JSON 파일 변환 및 S3 업로드</li>
            </ol>
          </div>

          {status && (
            <div
              className={`p-4 rounded-lg text-sm font-medium ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            onClick={handleDeploy}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all duration-200 flex items-center justify-center gap-2
              ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                배포 진행 중...
              </>
            ) : (
              '최신 번역 동기화 시작'
            )}
          </button>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-6">
          Powered by GitHub Actions & AWS S3
        </p>
      </div>
    </div>
  );
}
