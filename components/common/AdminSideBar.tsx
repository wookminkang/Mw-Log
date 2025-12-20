import Link from "next/link"

export function AdminSideBar () {
  return (
    <aside className="fixed left-0 top-0 bottom-[68px] w-64 border-r bg-background">
      <div className="h-full overflow-y-auto p-4">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Navigation
        </h2>
        <nav className="space-y-1">
          <Link
            href="/admin/post/create"
            className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            포스트 작성하기
          </Link>

          <Link
            href="/admin/post"
            className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            포스트
          </Link>
        </nav>
      </div>
    </aside>
  )
}