"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import type { Theme } from "@blocknote/mantine";

import { ko } from "@blocknote/core/locales";
import type { Block } from "@blocknote/core";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";

interface Props {
  content?: Block[];
  setContent?: (content: Block[]) => void;
  readonly?: boolean;
}

function AppEditor({ content, setContent, readonly }: Props) {
  const pendingFilesRef = useRef<Map<string, File>>(new Map());
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
      
      const blobUrl = URL.createObjectURL(file);
      pendingFilesRef.current.set(blobUrl, file);
      return blobUrl; // BlockNote가 이 URL을 이미지 src로 사용
    },
  });

  useEffect(() => {
    if (content && content.length > 0) {
      const current = JSON.stringify(editor.document);
      const next = JSON.stringify(content);

      // current 값과 next 값이 같으면 교체를 안함 => 무한 루프를 방지하기 위함
      if (current !== next) {
        editor.replaceBlocks(editor.document, content);
      }
    }
  }, [content, editor]);

  const lightTheme: Theme = {
    colors: {
      editor: {
        text: "#374151",
        background: "transparent",
      },
      menu: {
        text: "#1e293b",
        background: "#ffffff",
      },
      tooltip: {
        text: "#ffffff",
        background: "#1e293b",
      },
      hovered: {
        text: "#1e293b",
        background: "#f1f5f9",
      },
      selected: {
        text: "#ffffff",
        background: "#6366f1",
      },
      disabled: {
        text: "#94a3b8",
        background: "#f8fafc",
      },
      shadow: "rgba(0,0,0,0.08)",
      border: "#e2e8f0",
      sideMenu: "#94a3b8",
      highlights: {
        gray: { text: "#374151", background: "#f3f4f6" },
        brown: { text: "#92400e", background: "#fef3c7" },
        red: { text: "#991b1b", background: "#fee2e2" },
        orange: { text: "#9a3412", background: "#ffedd5" },
        yellow: { text: "#854d0e", background: "#fef9c3" },
        green: { text: "#166534", background: "#dcfce7" },
        blue: { text: "#1e40af", background: "#dbeafe" },
        purple: { text: "#6b21a8", background: "#f3e8ff" },
        pink: { text: "#9d174d", background: "#fce7f3" },
      },
    },
    borderRadius: 8,
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif',
  };

  // Render the editor
  return (
    <div className="mw-editor">
      <BlockNoteView
        editor={editor}
        editable={!readonly}
        theme={lightTheme}
        onChange={() => {
          if (!readonly) {
            setContent?.(editor.document);
          }
        }}
      />
    </div>
  );
}

export { AppEditor };
