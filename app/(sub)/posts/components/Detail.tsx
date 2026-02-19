"use client";

import { Editor } from "@/components/common/DynamicEditor";
import type { Block } from "@blocknote/core";

type DetailProps = {
  content: Block[];
};

export function Detail({ content }: DetailProps) {
  return (
    <article>
      <Editor content={content} readonly={true} />
    </article>
  );
}
