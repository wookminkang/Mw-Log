"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
            gcTime: 1000 * 60 * 30, // 30분간 캐시 유지 (기존 cacheTime)
            refetchOnWindowFocus: false, // 창 포커스 시 자동 refetch 비활성화
            refetchOnMount: false, // 마운트 시 자동 refetch 비활성화 (캐시 사용)
            refetchOnReconnect: true, // 네트워크 재연결 시 refetch
            retry: 1, // 실패 시 1번만 재시도
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
