import { Link } from 'react-router-dom'
import { Icons } from './icons'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { MainNav } from './main-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-2">
            <Link
              to="http://github.com/luancardosoti"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  })
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>

            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
