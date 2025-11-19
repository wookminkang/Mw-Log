import { describe, it, expect } from "vitest"
import { add, sum } from "./sum"

describe("sum utils", () => {
  it("add: 1 + 2 = 3", () => {
    expect(add(1, 2)).toBe(3)
  })

  it("sum: 여러 개 더하기", () => {
    expect(sum(1, 2, 3)).toBe(6)
    expect(sum()).toBe(0)
    expect(sum(-1, -2)).toBe(-3)
  })

  it("sum: 소수 합은 toBeCloseTo로 검증", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3, 10)
  })
})
