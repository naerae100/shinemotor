import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { Reveal, RevealItem } from './Reveal'

export function SectionHead({
  eyebrow,
  title,
  children,
  action,
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  action?: ReactNode
  align?: 'left' | 'center'
}) {
  const centred = align === 'center'
  return (
    <Reveal
      stagger
      className={
        centred
          ? 'flex flex-col items-center text-center'
          : 'flex flex-col gap-8 md:flex-row md:items-end md:justify-between'
      }
    >
      <div className={centred ? 'max-w-2xl' : ''}>
        <RevealItem>
          <Eyebrow className={centred ? 'justify-center' : ''}>{eyebrow}</Eyebrow>
        </RevealItem>
        <RevealItem>
          <h2 className="mt-5 font-display text-d2 text-bright">{title}</h2>
        </RevealItem>
        {children && (
          <RevealItem>
            <p className={`mt-5 text-lead text-muted ${centred ? '' : 'measure'}`}>
              {children}
            </p>
          </RevealItem>
        )}
      </div>
      {action && <RevealItem className="shrink-0">{action}</RevealItem>}
    </Reveal>
  )
}

/** Ambient colour wash used behind sections to keep the page from going flat. */
export function Glow({
  className = '',
  from = 'rgba(255,122,24,0.20)',
}: {
  className?: string
  from?: string
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
      style={{ background: from }}
    />
  )
}
