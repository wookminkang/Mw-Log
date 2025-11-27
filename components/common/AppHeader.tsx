import Link from "next/link";
import Image from "next/image";

function AppHeader() {
  return (
    <header className="fixed top-0 z-10 w-full border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="mx-auto max-w-[960px] px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-bold flex items-center gap-2 text-xl"
        >
          <Image src="/logo.png" alt="logo" width={18} height={18} />
          <span>MINWOOK</span>
        </Link>
      </div>
    </header>
  );
}

export { AppHeader };
