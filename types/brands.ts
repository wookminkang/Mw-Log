type BRAND_TYPE = {
  id: string
  name: string
  slug: string
  categories: {
    id: string
    name: string
    slug: string
  }[]
}

export type PRODUCT_TYPE = {
  id: string
  brandId: string
  brandCategoryId: string
  title: string
  slug: string
  description: string
  price: number
  currency: string
  images: {
    url: string
    alt?: string
  }[]
  options: {
    id: string
    name?: string
    values?: string[]
  }[]
  variants: {
    sku: string
    attributes: Record<string, string>
    price: number
    stock: number
  }[]
  rating: {
    average: number
    count: number
  }
  createdAt: string
  status: string
  isView: boolean
}

export type { BRAND_TYPE }
