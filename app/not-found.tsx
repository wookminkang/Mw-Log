import Link from "next/link";

// 💡 팁: 아이콘을 쓰면 훨씬 직관적이에요.
// 터미널에 `npm install react-icons` 를 입력해서 설치해주세요!
// 만약 설치하기 싫으시다면 아래 아이콘 import와 사용 부분을 지우고 😢 이모지로 대체해도 됩니다.

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-12 mx-auto text-center bg-white dark:bg-gray-900">
      {/* 2. 404 큰 텍스트 (그라데이션 효과 포인트!) */}
      <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 dark:from-orange-300 dark:to-orange-400">
        404
      </h1>
      {/* 3. 안내 메시지 영역 */}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        앗! 길을 잃으셨나요?
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-md">
        죄송하지만 찾으시는 페이지가 존재하지 않습니다.
        <br className="hidden sm:block" />
        입력하신 주소가 정확한지 다시 한번 확인해 주세요.
      </p>
      {/* 4. 홈으로 가기 버튼 (호버 애니메이션 추가) */}
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white transition-all duration-300 transform bg-orange-500 rounded-lg shadow-md hover:bg-orange-700 hover:scale-102 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
