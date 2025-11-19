"use client"
import "@blocknote/core/fonts/inter.css"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"

import { ko } from "@blocknote/core/locales"
import type { Block } from "@blocknote/core"
import { nanoid } from "nanoid"
import { useEffect, useRef } from "react"

interface Props {
  content?: Block[]
  setContent?: (content: Block[]) => void
  readonly?: boolean
}

function AppEditor({ content, setContent, readonly }: Props) {
  const pendingFilesRef = useRef<Map<string, File>>(new Map())
  // Create a new editor instance
  const editor = useCreateBlockNote({
    initialContent:
      content && content.length > 0
        ? content
        : [
            {
              id: nanoid(),
              type: "paragraph",
              props: {
                textAlignment: "left",
                textColor: "default",
                backgroundColor: "default",
              },
              content: [
                {
                  type: "text",
                  text: "",
                  styles: {},
                },
              ],
              children: [],
            },
          ],
    dictionary: {
      ...ko,
      placeholders: {
        ...ko.placeholders,
        emptyDocument: "텍스트를 입력하거나 '/' 를 눌러 명령어를 실행하세요.",
      },
    },
    uploadFile: async (file: File) => {
      const blobUrl = URL.createObjectURL(file)
      pendingFilesRef.current.set(blobUrl, file)
      return blobUrl // BlockNote가 이 URL을 이미지 src로 사용
    },
  })

  useEffect(() => {
    if (content && content.length > 0) {
      const current = JSON.stringify(editor.document)
      const next = JSON.stringify(content)

      // current 값과 next 값이 같으면 교체를 안함 => 무한 루프를 방지하기 위함
      if (current !== next) {
        editor.replaceBlocks(editor.document, content)
      }
    }
  }, [content, editor])

  // Render the editor
  return (
    <div className="bn-editor">
      <BlockNoteView
        editor={editor}
        editable={!readonly}
        onChange={() => {
          if (!readonly) {
            setContent?.(editor.document)
          }
        }}
      />
    </div>
  )
}

export { AppEditor }
