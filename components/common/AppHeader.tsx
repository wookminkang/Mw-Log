import Link from "next/link";
import Image from "next/image";

function AppHeader() {
  return (
    <header className="fixed top-0 z-10 w-full border-b bg-background/60 backdrop-blur supports-backdrop-filter:bg-background/40">
      <div className="mx-auto max-w-[960px] px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold flex items-center gap-2"
        >
          <Image src="/logo.png" alt="logo" width={18} height={18} />
          <span>MINWOOK</span>
        </Link>
        <nav className="flex items-center gap-6">
        
          <Link
            href="/uiux"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            UI/UX
          </Link>
        </nav>
      </div>
    </header>
  );
}

export { AppHeader };
