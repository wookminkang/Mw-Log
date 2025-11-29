import { AppHeader } from "@/components/common";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page">
      <AppHeader />
      <main className="mx-auto w-full max-w-3xl">{children}</main>
    </div>
  );
}
