import { SkeletonPosts } from "./components/SkeletonPosts";

export default function MainLoading() {
  return (
    <div className="mx-auto">
      <div className="mb-10 space-y-3">
        <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
        <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-5 w-2/3 bg-muted rounded animate-pulse" />
      </div>
      <div className="border-b border-border mb-10" />
      <SkeletonPosts />
    </div>
  );
}
