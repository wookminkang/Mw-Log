import { AppHeader } from "@/components/common";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page">
      <AppHeader />
      <main className="mx-auto w-full max-w-3xl px-3">{children}</main>
    </div>
  );
}
