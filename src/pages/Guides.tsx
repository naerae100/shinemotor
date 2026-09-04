import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { guides } from '../content/guides'
import { PageHero } from '../components/layout/PageHero'
import { Reveal, RevealItem } from '../components/ui/Reveal'
import { useSeo } from '../lib/seo'
import { breadcrumbSchema } from '../lib/schema'

/** en-AU long date, e.g. "24 February 2025". */
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

/**
 * The index the old site's blog.php becomes.
 *
 * It is deliberately small: only one post on the old blog was ever given a real
 * URL, and inventing companions for it would be padding. It exists so the old
 * blog index has a true equivalent to redirect to, and so the article is not an
 * orphan page reachable from nowhere.
 */
export function Guides() {
  useSeo(
    'Scrap Metal Guides',
    'Guides to selling scrap metal in Sydney from Shine Motor Corporation — what we recycle, how grading works, and how to get the best price for your load.',
    { path: '/guides', schema: [breadcrumbSchema([{ label: 'Guides' }])] },
  )

  return (
    <>
      <PageHero
        title={<>Guides.</>}
        intro="Straight answers about selling scrap metal in Sydney — what gets recycled, why grade sets the price, and how to get the most for a load."
        trail={[{ label: 'Guides' }]}
        meta={[
          { label: 'Articles', value: String(guides.length) },
          { label: 'Yard', value: 'Ingleburn NSW' },
          { label: 'Coverage', value: 'NSW & ACT' },
        ]}
      />

      <section className="bg-void">
        <div className="rail section-y">
          <Reveal stagger as="ul" className="grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <RevealItem as="li" key={guide.slug} distance={16}>
                <Link
                  to={`/guides/${guide.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition-colors hover:border-flame/40"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={guide.image.src}
                    alt={guide.image.alt}
                    className="photo aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <p className="eyebrow text-muted">
                      {guide.category} · <time dateTime={guide.published}>{longDate(guide.published)}</time>
                    </p>
                    <h2 className="mt-3 font-display text-d3 text-bright">{guide.title}</h2>
                    <p className="measure mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                      {guide.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-amber">
                      Read the guide
                      <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
