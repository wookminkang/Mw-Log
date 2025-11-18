"use client"

import { useMemo, useState } from "react"
import { t, getMessages } from "@/lib/i18n"

export default function I18nPreview() {
  const [locale, setLocale] = useState<string>("ko")
  const [keyInput, setKeyInput] = useState<string>("hello")

  const messages = useMemo(() => getMessages(locale), [locale])
  const keys = useMemo(() => Object.keys(messages), [messages])

  return (
    <div className="flex flex-col gap-3 p-4 border rounded-md">
      <div className="flex gap-2 items-center">
        <label className="text-sm">Locale</label>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="ko">ko</option>
          <option value="en">en</option>
          <option value="ja">ja</option>
          <option value="zh">zh</option>
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <input
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="translation key"
          className="border rounded px-2 py-1 text-sm w-full"
        />
        <span className="text-sm">= {t(locale, keyInput)}</span>
      </div>

      <div className="text-xs text-muted-foreground">
        총 {keys.length}개 키. 예: {keys.slice(0, 5).join(", ")}
      </div>
      <div>{t(locale, "common.submit")}</div>
    </div>
  )
}
