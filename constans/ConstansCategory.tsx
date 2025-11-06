import { Briefcase, BookOpenCheck, Palette } from "lucide-react"

export const CLASS_CATEGORY = [
  // { id: 1, label: "전체", category: "", icon: <List /> },
  // { id: 2, label: "인문학", category: "humanity", icon: <Lightbulb /> },
  // { id: 3, label: "스타트업", category: "start-up", icon: <Rocket /> },
  // { id: 4, label: "IT·프로그래밍", category: "programming", icon: <CodeXml /> },
  // { id: 5, label: "서비스·전략 기획", category: "planning", icon: <Goal /> },
  // { id: 6, label: "마케팅", category: "marketing", icon: <ChartNoAxesCombined /> },
  // { id: 7, label: "디자인·일러스트", category: "design", icon: <DraftingCompass /> },
  // { id: 1, label: "성장 일기", category: "self-development", icon: <Footprints /> },
  {
    id: 1,
    label: "work Archive",
    category: "archive",
    icon: <BookOpenCheck />,
  },
  { id: 2, label: "Content", category: "project", icon: <Briefcase /> },
  { id: 3, label: "UI/UX", category: "uiux", icon: <Palette /> },
]

export const TOPIC_CATEGORY = [
  // { id: 1, label: "인문학", category: "humanity" },
  // { id: 2, label: "스타트업", category: "start-up" },
  // { id: 3, label: "IT·프로그래밍", category: "programming" },
  // { id: 4, label: "서비스·전략 기획", category: "planning" },
  // { id: 5, label: "마케팅", category: "marketing" },
  // { id: 6, label: "디자인·일러스트", category: "design" },
  // { id: 1, label: "내 맘대로", category: "self-development" },
  { id: 1, label: "work Archive", category: "archive" },
  { id: 2, label: "Content", category: "project" },
  { id: 3, label: "UI/UX", category: "uiux" },
]
