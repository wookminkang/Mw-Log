// /app/mocks/handlers.ts
import { http, HttpResponse } from "msw"

const todos = ["먹기", "자기", "놀기"]

export const handlers = [
  // 할일 목록
  http.get("/todos", () => {
    return HttpResponse.json(todos)
  }),

  // 할일 추가

  http.post("/todos", () => {
    return HttpResponse.json(todos)
  }),
]
