import { Building2, Container, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../content/site'
import { waForService } from '../../lib/whatsapp'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

/**
 * How the metal actually gets to us — the practical question that follows
 * "what's it worth?". Three routes, each with the action that starts it.
 */
const routes = [
  {
    icon: Building2,
    title: 'Drive into the yard',
    body: 'No appointment needed. Pull in during opening hours, we weigh and grade it in front of you, and you leave paid.',
    detail: 'Best for anything up to a ute or trailer load.',
    action: { label: 'Get directions', href: site.address.mapUrl },
    image: { src: '/img/home/home-slider-1.webp', alt: 'Scrap metal in the open yard at Ingleburn' },
  },
  {
    icon: Truck,
    title: 'We collect it',
    body: 'Our own trucks run out of Ingleburn across all of NSW and the ACT. Send a photo and we will tell you straight away whether it is worth a run.',
    detail: 'Best for site strip-outs and loads too heavy to move.',
    action: { label: 'Book a pickup', href: waForService('a scrap metal pickup') },
    image: { src: '/img/home/home-slider-3.webp', alt: 'A Shine Motor tipper loaded with collected scrap metal' },
  },
  {
    icon: Container,
    title: 'Bin on site',
    body: 'We drop a bin, you fill it, we swap it out. Sized to the job, with regular collection for ongoing production scrap.',
    detail: 'Best for demolition, fabrication and manufacturing.',
    action: { label: 'Arrange a bin', href: waForService('a bin on site') },
    image: { src: '/img/sell/sell-your-scrap-inner-2.webp', alt: 'Baled and prepared scrap ready for collection' },
  },
]

export function Logistics() {
  return (
    <section className="plate-top bg-void">
      <div className="rail section-y">
        <SectionHead eyebrow="Getting it to us" index="03" title="Three ways, whichever suits.">
          Bring it in yourself, have us collect it, or keep a bin on site. All
          three end the same way — weighed, graded and paid.
        </SectionHead>

        <Reveal stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {routes.map(({ icon: Icon, title, body, detail, action, image }) => (
            <RevealItem
              key={title}
              distance={20}
              className="ring-flame group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface"
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="photo aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(13,17,24,0.2) 0%, rgba(20,26,36,0.95) 100%)',
                  }}
                />
                <span className="grad-flame absolute bottom-4 left-5 flex size-11 items-center justify-center rounded-xl">
                  <Icon aria-hidden className="size-5 text-on-flame" strokeWidth={2} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
              <h3 className="font-display text-d3 text-bright">{title}</h3>
              <p className="mt-3 flex-1 text-[15px] text-muted">{body}</p>
              <p className="mt-4 border-t border-hairline pt-4 text-[13px] text-amber">
                {detail}
              </p>
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full border border-hairline bg-void/60 py-3 text-[14px] font-semibold text-bright transition-colors hover:border-flame hover:text-amber"
              >
                {action.label}
              </a>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-hairline bg-surface px-7 py-6">
          <div>
            <p className="font-display text-lg text-bright">
              Not sure which applies to you?
            </p>
            <p className="mt-1 text-[15px] text-muted">
              Describe the load and we will tell you the quickest way to turn it
              into money.
            </p>
          </div>
          <Link
            to="/contact"
            className="grad-flame inline-flex shrink-0 items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-on-flame shadow-[0_10px_30px_-10px_rgba(255,122,24,0.7)]"
          >
            Ask the yard
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
