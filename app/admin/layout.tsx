/**
 * Admin dashboard — 항상 최신 데이터가 필요하므로 캐싱 없이 Dynamic 렌더링
 */

// eslint-disable-next-line import/no-unused-modules
export const dynamic = "force-dynamic";

import { AdminSideBar } from "@/components/common";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="page">
        <AdminSideBar />
        <main className="w-full p-3 pl-68">
          {children}
        </main>
      </div>
    </>
  );
}
