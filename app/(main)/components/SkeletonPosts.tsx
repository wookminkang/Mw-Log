import { Skeleton } from "@/components/ui";

function SkeletonPosts() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-[200px] p-4 gap-4 cursor-pointer hover:bg-muted/95 transition-all duration-200" />
      <Skeleton className="w-full h-[200px] p-4 gap-4 cursor-pointer hover:bg-muted/95 transition-all duration-200" />
      <Skeleton className="w-full h-[200px] p-4 gap-4 cursor-pointer hover:bg-muted/95 transition-all duration-200" />
      <Skeleton className="w-full h-[200px] p-4 gap-4 cursor-pointer hover:bg-muted/95 transition-all duration-200" />
    </div>
  );
}

export { SkeletonPosts };
