import Link from "next/link"
import data from "@/data/mock.json"
import type { PRODUCT_TYPE, BRAND_TYPE } from "@/types/brands"

export default function BrandCatalogPage({
  params,
  searchParams,
}: {
  params: { brand?: string }
  searchParams?: { category?: string }
}) {
  const { brand } = params
  const category = searchParams?.category

  let products: PRODUCT_TYPE[] = []
  if (category) {
    products = data.products.filter(
      (item) =>
        item.brandId.includes(brand ?? "") &&
        item.brandCategoryId.includes(category)
    )
  } else {
    products = data.products.filter((product) =>
      product.brandId.includes(brand ?? "")
    )
  }

  const brandCategory: BRAND_TYPE["categories"] | undefined = data.brands.find(
    (item) => item.slug === brand
  )?.categories

  return (
    <main className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          브랜드명
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          브랜드 상품을 카테고리로 빠르게 찾아보세요.
        </p>
      </header>

      <nav className="mb-6 flex items-center gap-2">
        <Link
          href={`/brands/${brand}`}
          className="px-3 py-1 rounded-md border bg-accent text-sm"
        >
          전체
        </Link>

        {brandCategory?.map((item, index) => {
          return (
            <Link
              className={`px-3 py-1 rounded-md border bg-card text-sm ${
                category === item.slug ? "bg-orange-500 text-white" : ""
              }`}
              href={`/brands/${brand}?category=${item.slug}`}
              key={index}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => {
          return (
            <Link
              href={`/brands/${brand}/products/${product.id}`}
              key={product.id}
              className="block rounded-md border bg-card hover:bg-accent transition-colors p-4"
            >
              <div className="text-sm text-muted-foreground">
                {product.title}
              </div>
              <div className="font-semibold mt-1">{product.title}</div>
              <div className="text-sm mt-2">
                {product.price.toLocaleString()}원
              </div>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
