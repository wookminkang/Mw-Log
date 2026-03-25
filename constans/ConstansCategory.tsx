import { Briefcase, BookOpenCheck, Palette } from "lucide-react"

export const TOPIC_CATEGORY = [
  { id: 1, label: "work Archive", category: "archive", icon: <BookOpenCheck /> },
  { id: 2, label: "Content",      category: "project", icon: <Briefcase /> },
  { id: 3, label: "UI/UX",        category: "uiux",    icon: <Palette /> },
]

export function getCategoryLabel(category: string | null | undefined): string {
  if (!category) return "post"
  const found = TOPIC_CATEGORY.find((cat) => cat.category === category)
  return found?.label.toLowerCase() ?? category.toLowerCase()
}
