// import Link from "next/link"
// import data from "@/data/mock.json"
// import type { PRODUCT_TYPE } from "@/types/brands"

// import { ProductClient } from "./ProductClient"

// export default function ProductDetailPage({
//   params,
// }: {
//   params: { id: string }
// }) {
//   const { id } = params

//   const item: PRODUCT_TYPE | undefined = data.products.find(
//     (item) => item.id === id
//   )

//   return (
//     <main className="mx-auto w-full max-w-4xl px-4 md:px-6 py-10">
//       <nav className="mb-6 text-sm text-muted-foreground">
//         <Link href="#" className="hover:underline">
//           {item?.brandId.split("-")[1]}
//         </Link>
//         <span className="mx-2">/</span>
//         <Link href="#" className="hover:underline">
//           {item?.brandCategoryId.split("-")[1]}
//         </Link>
//         <span className="mx-2">/</span>
//         <span className="text-foreground">{item?.title}</span>
//       </nav>

//       <header className="mb-8">
//         <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
//           {item?.title}
//         </h1>
//         <p className="text-sm text-muted-foreground mt-1">{item?.brandId}</p>
//       </header>

//       <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="aspect-square w-full rounded-md border bg-card" />
//         <div>
//           <div className="text-xl font-semibold">
//             {item?.price.toLocaleString()}원
//           </div>
//           <p className="text-sm text-muted-foreground mt-2">상품 설명 영역</p>

//           <div className="mt-6 text-sm text-muted-foreground">
//             상품 정보 내용이 들어갑니다.
//           </div>

//           <div className="flex flex-col gap-4 mt-6">
//             <ProductClient options={item?.options || []} />
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }

function ProductDetailPage( ) {
  

  return (
    <div>
      <h1>ProductDetailPage</h1>
    </div>
  )
}

export default ProductDetailPage