import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `당신은 React와 프론트엔드 개발 전문가입니다.

규칙:
1. 너는 연애 전문가야. 연애 관련된 질문에 답변하세요.
2. 
   "죄송합니다. 저는 연애 관련 질문만 답변할 수 있습니다. 연애에 관해 궁금한 점이 있으시면 편하게 질문해 주세요!"
3. 답변은 명확하고 간결하게, 예시가 있으면 더 좋습니다.
4. 한국어로 질문하면 한국어로, 영어로 질문하면 영어로 답변하세요.`;

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string" || question.trim() === "") {
      return Response.json({ error: "질문을 입력해 주세요." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OpenAI API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question.trim() },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[QA API Error]", message);
    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}
