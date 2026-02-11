import "@/app/globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";



export const metadata = {
  title: "Mw Log",
  description:
    "프론트엔드 개발 경험과 기술적 문제 해결 과정을 기록하는 기술 블로그입니다. Next.js, React, Vue, 성능 최적화, 아키텍처 등 실무 중심 지식을 정리합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

