import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-kitchen/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/20 text-lg ring-1 ring-copper/40"
            aria-hidden
          >
            🍲
          </span>
          <div>
            <h1 className="text-base font-semibold tracking-wide text-cream group-hover:text-copper-glow sm:text-lg">
              Mihriban&apos;ın Mutfağı
            </h1>
            <p className="hidden text-xs text-cream-muted sm:block">
              Geleneksel ev yemekleri
            </p>
          </div>
        </Link>
      </div>
    </header>
  )
}
