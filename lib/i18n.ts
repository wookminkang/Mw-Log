import ko from "@/locales/ko.json"
import en from "@/locales/en.json"
import ja from "@/locales/ja.json"
import zh from "@/locales/zh.json"

type Messages = Record<string, string>
type Locale = "ko" | "en" | "ja" | "zh"

const table: Record<Locale, Messages> = {
  ko,
  en,
  ja,
  zh,
}

export function getMessages(locale: string | undefined): Messages {
  if (!locale) return table.ko
  return table[(locale as Locale) || "ko"] ?? table.ko
}

export function t(locale: string | undefined, key: string): string {
  const msg = getMessages(locale)
  return msg[key] ?? key
}
