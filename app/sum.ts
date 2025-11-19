export function add(a: number, b: number): number {
  return a + b
}

export function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0)
}
