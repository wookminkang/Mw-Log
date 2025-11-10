import Link from "next/link"

export default function ProductDetailPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 md:px-6 py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="#" className="hover:underline">
          브랜드
        </Link>
        <span className="mx-2">/</span>
        <Link href="#" className="hover:underline">
          브랜드명
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">상품명</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          상품명
        </h1>
        <p className="text-sm text-muted-foreground mt-1">브랜드명</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square w-full rounded-md border bg-card" />
        <div>
          <div className="text-xl font-semibold">0원</div>
          <p className="text-sm text-muted-foreground mt-2">상품 설명 영역</p>
          <div className="mt-6 text-sm text-muted-foreground">
            옵션/버전 정보, 장바구니 버튼 등은 추후 추가
          </div>
        </div>
      </section>
    </main>
  )
}
