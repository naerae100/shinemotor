import { BadgeCheck, Banknote, Scale, Truck } from 'lucide-react'
import { Reveal, RevealItem } from '../ui/Reveal'

/**
 * The professional-credibility strip.
 *
 * These four points are the substance behind "trust us": the yard is licensed
 * and compliant, the scales are its own, payment is traceable, and the trucks
 * are its own too. Icons earn their place here because each one labels a
 * distinct operational fact rather than decorating a slogan.
 */
const items = [
  {
    icon: BadgeCheck,
    title: 'Licensed & compliant',
    body: 'Operating under the NSW Scrap Metal Industry Regulations 2016. Photo ID on every transaction, records kept, nothing off the books.',
  },
  {
    icon: Scale,
    title: 'Our own weighbridge',
    body: 'Every load is weighed on our own calibrated scales while you watch. Nothing is assessed out of sight or estimated.',
  },
  {
    icon: Banknote,
    title: 'Instant EFT, no cash',
    body: 'Paid on completion, before you leave the site. Cash is prohibited for scrap metal in NSW — a traceable payment protects you as much as us.',
  },
  {
    icon: Truck,
    title: 'Our own trucks & bins',
    body: 'Pickups and bin drops across NSW and the ACT run from Ingleburn. No third-party subcontractors handling your load.',
  },
]

export function Credentials() {
  return (
    <section className="border-b border-hairline bg-ink">
      <div className="rail py-14 lg:py-20">
        <Reveal stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {items.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title} distance={16}>
              <span className="flex size-11 items-center justify-center rounded-xl border border-flame/25 bg-flame/10">
                <Icon aria-hidden className="size-5 text-amber" strokeWidth={2} />
              </span>
              <h3 className="mt-5 font-display text-lg text-bright">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
