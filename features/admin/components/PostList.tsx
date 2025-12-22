"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { postQueryKey } from "@/utils/QueryKeyFactory";
import { getPostsNoInfinity } from "@/features/main/api/getPosts";
import dayjs from "dayjs";
import Link from "next/link";

export function PostList() {
  const { data } = useQuery({
    queryKey: postQueryKey.lists(),
    queryFn: () => getPostsNoInfinity("archive"),
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
      {data.map((item) => (
        <Link href={`/admin/post/create/${item.id}`} key={item.id}>
          <Card className="overflow-hidden py-0">
            {/* 썸네일 영역 */}
            <div className="aspect-video w-full bg-muted overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* 제목 영역 */}
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-bold line-clamp-1">
                {item.title}
              </CardTitle>
            </CardHeader>

            {/* 날짜 영역 */}
            <CardFooter className="px-4 pb-4 pt-0">
              <p className="text-sm text-muted-foreground">
                {dayjs(item.created_at).format("YYYY.MM.DD")}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
