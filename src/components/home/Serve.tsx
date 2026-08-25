import { Link } from 'react-router-dom'
import { segments } from '../../content/sections'
import { gallery } from '../../content/gallery'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

/**
 * Who brings us metal, shown by what they actually bring.
 *
 * Each trade card leads with a photograph of that trade's typical load, so a
 * sparky recognises their own cable and a plumber recognises their own
 * fittings. Below it, a band of the yard itself as evidence the operation is
 * real — which is what that photography is genuinely good for.
 */
export function Serve() {
  return (
    <section className="border-y border-hairline bg-ink">
      <div className="rail section-y">
        <SectionHead
          eyebrow="Who we buy from"
          title="We know your trade."
          action={
            <Link
              to="/contact"
              className="-my-2 inline-block py-2 text-[15px] font-semibold text-amber transition-opacity hover:opacity-75"
            >
              Get a price →
            </Link>
          }
        >
          Whatever came off the job, it has a grade and it has a price.
        </SectionHead>

        <Reveal stagger as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((s) => (
            <RevealItem
              as="li"
              key={s.name}
              distance={16}
              className="ring-flame group relative overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(255,122,24,0.45)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={s.image.src}
                  alt={s.image.alt}
                  loading="lazy"
                  className="photo aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(13,17,24,0.1) 0%, rgba(20,26,36,0.94) 100%)',
                  }}
                />
                <h3 className="absolute inset-x-5 bottom-4 font-display text-xl text-white">
                  {s.name}
                </h3>
              </div>
              <p className="p-5 text-[14px] leading-relaxed text-muted">{s.brings}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* Full-bleed evidence band from the yard. */}
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-14 lg:pb-20">
        {gallery.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="photo h-44 w-64 shrink-0 rounded-xl border border-hairline object-cover lg:h-56 lg:w-80"
          />
        ))}
      </div>
    </section>
  )
}
