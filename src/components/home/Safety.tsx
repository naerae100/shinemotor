import { useState } from 'react'
import { ShieldCheck, HardHat, AlertTriangle, Play } from 'lucide-react'
import { Reveal, RevealItem } from '../ui/Reveal'
import { Glow, SectionHead } from '../ui/SectionHead'

const YOUTUBE_ID = 'spIRKIBZoAA'
const START_SECONDS = 7

const safetyCulture = [
  {
    icon: ShieldCheck,
    title: 'SafeWork Compliant',
    body: 'Full SafeWork NSW compliance — every procedure, every day.',
  },
  {
    icon: HardHat,
    title: 'PPE On-Site',
    body: 'Hard hats, steel caps, high-vis and safety glasses — mandatory for everyone.',
  },
  {
    icon: AlertTriangle,
    title: 'What we cannot accept',
    body: 'Sealed cylinders, gas bottles and hazardous materials are not allowed on site. Please degas and make safe before you come.',
  },
]

/**
 * Safety section — cinematic YouTube embed with key safety commitments.
 * Uses the same SectionHead pattern as other homepage sections.
 */
export function Safety() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="plate-top relative overflow-hidden border-y border-hairline bg-ink">
      <Glow className="bottom-0 left-0 size-[520px]" from="rgba(255,176,32,0.08)" />
      <div className="rail section-y relative">
        {/* Left-aligned header — same style as other sections */}
        <SectionHead
          eyebrow="Safety first" index="05"
          title="Your safety is our standard."
        >
          Scrap metal yards are high-risk environments. We follow strict SafeWork
          protocols to keep our crew, our customers, and every visitor safe.
        </SectionHead>

        {/* Full-width video */}
        <Reveal className="mt-14">
          <div
            className="group relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-hairline bg-void shadow-2xl shadow-black/30"
            style={{ aspectRatio: '16/9' }}
          >
            {!playing ? (
              <>
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                  alt="Safety at Shine Motor Corporation"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(13,17,24,0.15) 0%, rgba(13,17,24,0.6) 100%)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play safety video"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex size-[72px] items-center justify-center rounded-full bg-amber/90 text-void shadow-lg shadow-amber/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber">
                    <Play className="ml-1 size-7" fill="currentColor" />
                  </span>
                </button>
                {/* Corner badge */}
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-void/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber backdrop-blur-md">
                  <ShieldCheck className="size-3.5" />
                  Watch
                </span>
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&start=${START_SECONDS}&rel=0&modestbranding=1`}
                title="Safety at Shine Motor Corporation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            )}
          </div>
        </Reveal>

        {/* Safety points — horizontal row beneath the video */}
        <Reveal stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-3">
          {safetyCulture.map((item) => (
            <RevealItem
              as="li"
              key={item.title}
              distance={12}
              className="group/card rounded-2xl border border-hairline bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-flame/30 hover:shadow-[0_12px_30px_-12px_rgba(255,122,24,0.2)]"
            >
              <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-flame/10 text-amber transition-colors duration-300 group-hover/card:bg-flame/20">
                <item.icon className="size-5" strokeWidth={2} />
              </div>
              <h3 className="font-display text-[16px] text-bright">{item.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
