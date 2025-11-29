"use client"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

type ResultOptionType = {
  [key: string]: string
}

/* 구매하기 버튼 */
function BuyButton({
  options,
  requiredOption,
}: {
  options: ResultOptionType[] | undefined
  requiredOption: number
}) {
  const router = useRouter()
  console.log(`options`, options)
  const handleBuyButtonClick = () => {
    router.push(`/checkout`)
  }

  return (
    <Button
      className="w-full"
      variant="default"
      size="lg"
      onClick={handleBuyButtonClick}
      disabled={options?.length !== requiredOption}
    >
      <ShoppingCart />
      <span>구매하기</span>
    </Button>
  )
}

export { BuyButton }
