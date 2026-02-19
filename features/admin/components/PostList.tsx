"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { adminPostQueryKey } from "@/utils/QueryKeyFactory";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function PostList() {
  const { data, isLoading } = useQuery({
    queryKey: adminPostQueryKey.lists(),
    queryFn: async () => {
      const { data, error } = await createClient()
        .from("topic")
        .select("*")
        .eq("status", "publish")
        .eq("isView", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-muted h-[220px] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.map((item) => (
          <Link href={`/admin/post/create/${item.id}`} key={item.id}>
            <Card className="overflow-hidden py-0 hover:opacity-80 transition-opacity">
              {/* 썸네일 */}
              <div className="aspect-video w-full bg-muted overflow-hidden">
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                )}
              </div>

              {/* 제목 */}
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-bold line-clamp-1">
                  {item.title}
                </CardTitle>
              </CardHeader>

              {/* 날짜 */}
              <CardFooter className="px-4 pb-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  {dayjs(item.created_at).format("YYYY.MM.DD")}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
