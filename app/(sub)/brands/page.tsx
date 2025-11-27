import Link from "next/link"
import data from "@/data/mock.json"
import type { BRAND_TYPE } from "@/types/brands"

export default function BrandsPage() {
  const brands: BRAND_TYPE[] = data.brands

  return (
    <main className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          브랜드
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          브랜드를 선택해 상품을 둘러보세요.
        </p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {brands.map((brand) => {
          return (
            <Link
              href={`/brands/${brand.slug}`}
              key={brand.id}
              className="block rounded-md border bg-card hover:bg-accent transition-colors p-4"
            >
              <div className="font-semibold">{brand.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {brand.categories.map((item) => item.name).join(" · ")}
              </div>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
