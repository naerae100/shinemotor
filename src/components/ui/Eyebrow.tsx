import type { ReactNode } from 'react'

/** Small mono label with a gradient rule, sitting above a section heading. */
export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={`eyebrow flex items-center gap-3 text-amber ${className}`}>
      <span aria-hidden className="grad-flame block h-px w-7 rounded-full" />
      {children}
    </p>
  )
}
