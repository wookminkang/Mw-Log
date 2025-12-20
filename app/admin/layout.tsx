/**
 * Admin dashboard
 */

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
