"use client";

import { useState, useRef } from "react";

export function useQa() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const askQuestion = async () => {
    if (!question.trim() || isLoading) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setAnswer("");
    setError(null);

    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "오류가 발생했습니다.");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("스트리밍을 지원하지 않는 환경입니다.");

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setAnswer((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "알 수 없는 오류입니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  const reset = () => {
    abortControllerRef.current?.abort();
    setQuestion("");
    setAnswer("");
    setError(null);
    setIsLoading(false);
  };

  return {
    question,
    setQuestion,
    answer,
    isLoading,
    error,
    askQuestion,
    handleKeyDown,
    reset,
  };
}
