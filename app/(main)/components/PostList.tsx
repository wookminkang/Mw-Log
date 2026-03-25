"use client";

import { useEffect, useRef, useMemo } from "react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { postQueryKey } from "@/utils/QueryKeyFactory";
import { PostCard } from "@/features/main/components/PostCard";
import { SkeletonPosts } from "./SkeletonPosts";
import type { PostItem } from "@/types";

const PAGE_SIZE = 2;

type PostListProps = {
  category?: string;
};

function PostList({ category }: PostListProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error } =
    useInfiniteQuery<PostItem[], Error, InfiniteData<PostItem[], number>, readonly unknown[], number>({
      queryKey: category ? postQueryKey.list(category) : postQueryKey.lists(),
      initialPageParam: 0,
      queryFn: async ({ pageParam }) => {
        const from = pageParam as number;
        const to = from + PAGE_SIZE - 1;

        let query = createClient()
          .from("topic")
          .select("*")
          .eq("status", "publish")
          .eq("isView", true);

        if (category) {
          query = query.eq("category", category);
        }

        const { data: list, error } = await query
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        return (list || []) as PostItem[];
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < PAGE_SIZE) return undefined;
        return allPages.length * PAGE_SIZE;
      },
    });

  const posts = useMemo(() => data?.pages.flat() ?? [], [data?.pages]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage();
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <SkeletonPosts />;

  if (isError) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        에러가 발생했습니다: {error?.message}
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {posts.map((post, index) => (
        <div key={post.id}>
          <PostCard post={post} index={index} />
          {index < posts.length - 1 && <div className="border-b border-border" />}
        </div>
      ))}

      {hasNextPage && (
        <div ref={loadMoreRef} className="py-4">
          {isFetchingNextPage && (
            <p className="text-center text-sm text-muted-foreground">불러오는 중...</p>
          )}
        </div>
      )}
    </div>
  );
}

export { PostList };
