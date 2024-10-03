import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'

export function MainNav() {
  const { pathname } = useLocation()

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <h1 className="font-bold text-4xl">Robots.battle</h1>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          to="/"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Lista de robôs
        </Link>
        <Link
          to="/arena-de-batalha"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/arena-de-batalha'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Arena de batalha
        </Link>
      </nav>
    </div>
  )
}
