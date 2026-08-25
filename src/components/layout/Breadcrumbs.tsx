import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Breadcrumbs({
  trail,
}: {
  trail: { label: string; to?: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="eyebrow -my-1.5 py-1.5 text-muted transition-colors hover:text-amber">
            Home
          </Link>
          <ChevronRight aria-hidden className="size-3 text-muted/50" strokeWidth={2.5} />
        </li>
        {trail.map((item, i) => {
          const last = i === trail.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.to && !last ? (
                <Link
                  to={item.to}
                  className="eyebrow -my-1.5 py-1.5 text-muted transition-colors hover:text-amber"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="eyebrow text-amber" aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight aria-hidden className="size-3 text-muted/50" strokeWidth={2.5} />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
