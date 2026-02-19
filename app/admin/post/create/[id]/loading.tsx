export default function PostDetailLoading() {
  return (
    <section className="flex flex-col gap-8">
      <div className="h-10 w-48 bg-muted rounded animate-pulse" />
      <div className="h-[600px] bg-muted rounded-lg animate-pulse" />
    </section>
  );
}
