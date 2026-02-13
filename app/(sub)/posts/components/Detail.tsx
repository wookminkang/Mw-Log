"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "@/features/main/api/getPostDetail";
import { SkeletonDetail } from "./Skeleton";
import { Editor } from "@/components/common/DynamicEditor";
import { Block } from "@blocknote/core";



export function Detail() {
  const { id } = useParams() ;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostDetail(id as string | number),
  });

  if (isLoading) return <SkeletonDetail />;

  
  return (
    <>
      <Editor content={JSON.parse(data?.content as string) as Block[]} readonly={true} />
    </>
  )
}
