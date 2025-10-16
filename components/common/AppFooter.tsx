


function AppFooter() {
  return (
    <footer className="fixed bottom-0 z-10 w-full border-t bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-foreground/80 flex items-center justify-between">
        <p className="font-medium">개발자정보: 강민욱</p>
        <a
          href="mailto:kangmu238@gmail.com"
          className="text-primary hover:underline underline-offset-4"
        >
          kangmu238@gmail.com
        </a>
      </div>
    </footer>
  )
}

export {AppFooter};