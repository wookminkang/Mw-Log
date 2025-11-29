import { AppHeader } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";

export default function SubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="page">
        <AppHeader />
        <main className="mx-auto w-full max-w-3xl">
          {children}
        </main>
      </div>
      <Toaster />
    </>
  );
}
