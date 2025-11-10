import Image from "next/image"
import AboutPage from "./about/page"
import { Main } from "@/components/pages/Main"

export default function Home({
  searchParams,
}: {
  searchParams?: { category?: string }
}) {
  const category = searchParams?.category
  return <Main category={category} />
}
