"use client"
import { CLASS_CATEGORY } from "@/constans/ConstansCategory"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "../ui"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

function AppSidebar() {
  const searchParams = useSearchParams()
  const getCategory = searchParams.get("category")
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside className="w-full lg:min-w-60 lg:w-60 lg:max-w-60 flex flex-col gap-6">
      {/* 모바일: 접을 수 있는 헤더, 데스크톱: 고정 헤더 */}
      <div
        className="flex items-center gap-2 cursor-pointer lg:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          카테고리
        </h4>
        <div className="lg:hidden">
          {isExpanded ? (
            <ChevronUp className="mt-1" />
          ) : (
            <ChevronDown className="mt-1" />
          )}
        </div>
        <div className="hidden lg:block">
          <ChevronDown className="mt-1" />
        </div>
      </div>

      {/* 모바일: 조건부 표시, 데스크톱: 항상 표시 */}
      <ul
        className={`w-full flex flex-col gap-2 ${
          isExpanded ? "block" : "hidden"
        } lg:block`}
      >
        {CLASS_CATEGORY.map((menu) => {
          return (
            <Link key={menu.id} href={`/?category=${menu.category}`}>
              <li>
                <Button
                  variant={"ghost"}
                  className={`flex-1 w-full justify-start cursor-pointer hover:pl-6 hover:text-orange-500 transition-all duration-500 ${
                    getCategory === menu.category && "text-orange-500"
                  }`}
                >
                  {menu.icon} {menu.label}
                </Button>
              </li>
            </Link>
          )
        })}
      </ul>
    </aside>
  )
}

export { AppSidebar }
