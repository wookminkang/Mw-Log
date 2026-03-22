"use client";

import { useQa } from "../hooks/useQa";
import { SendHorizonal, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QaSection() {
  const {
    question,
    setQuestion,
    answer,
    isLoading,
    error,
    askQuestion,
    handleKeyDown,
    reset,
  } = useQa();

  return (
    <div className="flex flex-col gap-6 py-8">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold">Frontend Q&A</h1>
        <p className="mt-1 text-sm text-gray-500">
          React / 프론트엔드 관련 질문을 입력하세요.
        </p>
      </div>

      {/* 입력 영역 */}
      <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm focus-within:border-gray-400 transition-colors">
        <textarea
          className="w-full resize-none rounded-xl bg-transparent px-4 pt-4 pb-12 text-sm outline-none placeholder:text-gray-400"
          placeholder="예) React에서 useState와 useRef의 차이는 무엇인가요?"
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {(answer || error) && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
              onClick={reset}
              title="초기화"
            >
              <RotateCcw className="size-4" />
            </Button>
          )}
          <Button
            size="icon"
            className="h-8 w-8 cursor-pointer"
            onClick={askQuestion}
            disabled={isLoading || !question.trim()}
            title="질문하기 (Enter)"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <SendHorizonal className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 답변 영역 */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {(answer || isLoading) && !error && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            답변
          </p>
          {answer ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
              {answer}
            </p>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Loader2 className="size-4 animate-spin" />
              답변을 생성하고 있습니다...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
