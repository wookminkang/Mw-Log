"use client"
import { ProductOption } from "./ProductOption"
import { BuyButton } from "./BuyButton"
import type { PRODUCT_TYPE } from "@/types/brands"
import { useState } from "react"

type ResultOptionType = {
  [key: string]: string
}

function ProductClient({ options }: { options: PRODUCT_TYPE["options"] }) {
  const [selectedOption, setSelectedOption] = useState<
    { id: string; option: string } | undefined
  >(undefined)

  const [resultOption, setResultOption] = useState<ResultOptionType[]>([])

  const handleOptionChange = (option: string, optionId: string) => {
    const zz = {
      [optionId]: option,
    }
    setResultOption((prev) => {
      return [...prev, zz]
    })
  }

  return (
    <>
      <ProductOption options={options} onChange={handleOptionChange} />
      <BuyButton options={resultOption} requiredOption={options.length} />
    </>
  )
}

export { ProductClient }
