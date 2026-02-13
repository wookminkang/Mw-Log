import { Skeleton } from "@/components/ui/skeleton";

function SkeletonPosts() {
  return (
    <div className="space-y-0">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="py-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            {/* Left: Text Content */}
            <div className="flex-1 min-w-0 w-full md:w-auto space-y-3">
              {/* Category Tag */}
              <Skeleton className="h-5 w-20 rounded-md" />

              {/* Title */}
              <Skeleton className="h-7 w-3/4 rounded-md" />
              <Skeleton className="h-7 w-1/2 rounded-md" />

              {/* Preview */}
              <Skeleton className="h-5 w-5/6 rounded-md" />
              <Skeleton className="h-5 w-2/3 rounded-md" />

              {/* Date */}
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>

            {/* Right: Thumbnail */}
            <div className="w-full md:w-[240px] md:h-[160px] shrink-0">
              <Skeleton className="w-full h-[190px] md:w-[240px] md:h-[160px] rounded-lg" />
            </div>
          </div>

          {/* Separator */}
          {index < 3 && <div className="border-b border-border mt-8" />}
        </div>
      ))}
    </div>
  );
}

export { SkeletonPosts };
