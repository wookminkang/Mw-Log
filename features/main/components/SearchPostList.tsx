"use client";

import { useQuery } from "@tanstack/react-query";
import { getSearchPosts } from "../api/getSearchPosts";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";

export function SearchPostList({ keyWord }: { keyWord?: string }) {
  const [loading, setLoading] = useState(true);
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", keyWord],
    queryFn: () => getSearchPosts(keyWord),
    enabled: !!keyWord,
  });

  if (keyWord && (!data || data.length === 0))
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        {/* 아이콘 영역: 연한 회색으로 부담스럽지 않게 */}
        <div className="bg-gray-50 p-6 rounded-full mb-4">
          <SearchX className="size-12 text-gray-300" strokeWidth={1.5} />
        </div>

        {/* 메인 텍스트 */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          검색 결과가 없습니다
        </h3>

        {/* 서브 가이드 텍스트 */}
        <p className="text-gray-500 max-w-[260px] leading-relaxed">
          입력하신 <span className="text-black font-medium">"{keyWord}"</span>에
          대한 결과가 없어요. 다른 키워드로 다시 시도해보세요.
        </p>
      </div>
    );

  // useEffect(() => {
  //   setLoading(true);
  // }, [keyWord]);

  return (
    <>
      {data &&
        data.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 group transition"
          >
            {/* 썸네일 */}
            <div
              className="w-16 h-16 flex-shrink-0 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${post.thumbnail})` }}
            />

            {/* 정보 */}
            <div className="flex-1">
              <p className="font-bold text-lg group-hover:underline">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
    </>
  );
}
