import { Link, Navigate, useParams } from 'react-router-dom'
import { MessageCircle, Phone } from 'lucide-react'
import { guideBySlug } from '../content/guides'
import { site } from '../content/site'
import { PageHero } from '../components/layout/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { useSeo } from '../lib/seo'
import { articleSchema, breadcrumbSchema } from '../lib/schema'
import { WA_GENERAL } from '../lib/whatsapp'

const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

export function GuideDetail() {
  const { slug = '' } = useParams()
  const guide = guideBySlug(slug)

  useSeo(
    guide ? guide.title : 'Guide',
    guide ? guide.summary : '',
    {
      path: guide ? `/guides/${guide.slug}` : undefined,
      type: 'article',
      image: guide?.image.src,
      preloadImage: guide?.image.src,
      schema: guide
        ? [
            articleSchema({
              title: guide.title,
              description: guide.summary,
              path: `/guides/${guide.slug}`,
              published: guide.published,
              image: guide.image.src,
            }),
            breadcrumbSchema([
              { label: 'Guides', path: '/guides' },
              { label: guide.title },
            ]),
          ]
        : [],
      noindex: !guide,
    },
  )

  if (!guide) return <Navigate to="/guides" replace />

  return (
    <>
      <PageHero
        title={<>{guide.title}</>}
        trail={[{ label: 'Guides', to: '/guides' }, { label: guide.title }]}
        meta={[
          { label: 'Published', value: longDate(guide.published) },
          { label: 'Topic', value: guide.category },
          { label: 'Yard', value: 'Ingleburn NSW' },
        ]}
      />

      <section className="bg-void">
        <div className="rail section-y">
          <Reveal distance={20} className="mx-auto max-w-3xl">
            <img
              loading="eager"
              fetchPriority="high"
              decoding="async"
              src={guide.image.src}
              alt={guide.image.alt}
              width={1200}
              height={675}
              className="photo aspect-[16/9] w-full rounded-3xl border border-hairline object-cover"
            />

            <div className="mt-12 space-y-6">
              {guide.blocks.map((block, i) => {
                if (block.kind === 'h2') {
                  return (
                    <h2
                      key={i}
                      className="pt-4 font-display text-d2 text-bright first:pt-0"
                    >
                      {block.text}
                    </h2>
                  )
                }
                if (block.kind === 'list') {
                  return (
                    <ul key={i} className="space-y-3">
                      {block.items?.map((item) => (
                        <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-muted">
                          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={i} className="text-[17px] leading-relaxed text-muted">
                    {block.text}
                  </p>
                )
              })}
            </div>

            {/* The article's own closing ask, made actionable. */}
            <div className="mt-14 rounded-3xl border border-hairline bg-surface p-8 sm:p-10">
              <h2 className="font-display text-d3 text-bright">
                Turn your metal into cash.
              </h2>
              <p className="measure mt-3 text-muted">
                Send a photo of the load and we will price it on the grade, or
                drive into the yard at {site.address.street}, {site.address.suburb} and
                leave paid.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={WA_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#0d1b14] transition-opacity hover:opacity-90"
                >
                  <MessageCircle aria-hidden className="size-4" strokeWidth={2.5} />
                  WhatsApp a photo
                </a>
                <a
                  href={site.phones[0].href}
                  className="glass inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
                >
                  <Phone aria-hidden className="size-4 text-amber" strokeWidth={2.25} />
                  {site.phones[0].label}
                </a>
                <Link
                  to="/metals"
                  className="inline-flex items-center rounded-full border border-hairline px-7 py-3.5 text-[15px] font-semibold text-bright transition-colors hover:border-flame"
                >
                  See every grade we buy
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
