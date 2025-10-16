

import Link from "next/link";

function AppHeader() {
  return (
    <header className="fixed top-0 z-10 w-full border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold">SMARTSCORE</Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/reservation/golf"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            예약
          </Link>
        </nav>
      </div>
    </header>
  )
}

export {AppHeader};