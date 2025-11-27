"use client"
import { useState } from "react"
import { Separator, Label } from "@/components/ui"
import { Button } from "@/components/ui"
import type { PRODUCT_TYPE } from "@/types/brands"

function ProductOption({
  options,
  onChange,
}: {
  options: PRODUCT_TYPE["options"]
  onChange: (option: string, optionId: string) => void
}) {
  // const handleOptionChange = (value: string, optionId: string) => {
  //   console.log(`value`, value)
  //   console.log(`optionId`, optionId)
  // }

  return (
    <>
      {options.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`flex flex-col gap-3 ${index === 0 ? "mt-0" : "mt-3"}`}
          >
            <div className="text-sm font-medium">{item.name}</div>
            <Separator />
            <div className="flex flex-wrap gap-2">
              {item.values?.map((option) => {
                const valueId = `${item.id}-${option}`
                return (
                  <div key={valueId} className="relative">
                    <input
                      id={valueId}
                      name={`option-${item.id}`}
                      type="radio"
                      className="peer sr-only"
                      onChange={() => onChange(option, item.id)}
                    />
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary"
                    >
                      <Label htmlFor={valueId} className="cursor-pointer">
                        {option}
                      </Label>
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

export { ProductOption }
