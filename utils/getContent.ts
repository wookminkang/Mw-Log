import type { Block } from "@blocknote/core";

const getContent = (content: Block[]) => {
  const count = 30;

  let result = "";
  content.forEach((item, index) => {
    if (Array.isArray(item.content)) {
      if (index < count) {
        item.content.forEach((content) => {
          // console.log(`content`, content);
          if (content.type === "text") {
            result += content.text;
          }
        });
      }
    }
  });

  return result;
};

export { getContent };
