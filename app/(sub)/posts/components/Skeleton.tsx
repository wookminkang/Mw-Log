'use client';

import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDetail() {
  return (
    <div className="max-w-3xl mx-auto w-full space-y-8">
      {/* Category tag */}
      <div className="mb-2">
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>

      {/* Title */}
      <div className="space-y-3">
        <Skeleton className="h-9 w-4/5 rounded-md" />
        <Skeleton className="h-9 w-3/5 rounded-md" />
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>

      {/* Hero image */}
      <div className="relative w-full">
        <Skeleton className="w-full h-[220px] md:h-[360px] rounded-lg" />
      </div>

      {/* Content blocks */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-11/12 rounded" />
        <Skeleton className="h-5 w-10/12 rounded" />
        <Skeleton className="h-5 w-9/12 rounded" />
        <Skeleton className="h-5 w-5/12 rounded" />

        <div className="h-6" />

        <Skeleton className="h-5 w-11/12 rounded" />
        <Skeleton className="h-5 w-10/12 rounded" />
        <Skeleton className="h-5 w-9/12 rounded" />
        <Skeleton className="h-5 w-8/12 rounded" />
      </div>
    </div>
  )
}