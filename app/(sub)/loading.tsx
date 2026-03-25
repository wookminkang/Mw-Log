export default function SubLoading() {
  return (
    <div className="mx-auto space-y-6 py-4">
      <div className="h-9 w-48 bg-muted rounded-md animate-pulse" />
      <div className="h-5 w-2/3 bg-muted rounded animate-pulse" />
      <div className="border-b border-border" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-5 bg-muted rounded animate-pulse" style={{ width: `${85 - i * 8}%` }} />
        ))}
      </div>
    </div>
  );
}
