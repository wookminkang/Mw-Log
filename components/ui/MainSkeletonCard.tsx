import { Skeleton } from "@/components/ui"

function SkeletonMainCard() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-[220px] p-4 gap-4 cursor-pointer" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-[50%] h-4" />
    </div>
  )
}

export { SkeletonMainCard }
