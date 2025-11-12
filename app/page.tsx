import Image from "next/image"
import AboutPage from "./about/page"
import { Main } from "@/components/pages/Main"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  return <Main category={category} />
}
