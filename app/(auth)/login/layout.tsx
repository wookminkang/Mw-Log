import "@/app/globals.css";
import { AppHeader, AppFooter } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <AppHeader />
          <main className="mx-auto w-full max-w-5xl px-6">
            <div className="content">{children}</div>
          </main>
          <AppFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
