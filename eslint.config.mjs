// eslint.config.mjs
import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  // core-web-vitals -> next 로 완화
  ...compat.extends("next", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // 공통적으로 빌드 막는 룰 완화
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
    },
  },
]

export default eslintConfig
