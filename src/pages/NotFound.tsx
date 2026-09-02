import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { Glow } from '../components/ui/SectionHead'
import { useSeo } from '../lib/seo'

export function NotFound() {
  useSeo(
    'Page not found',
    'That page does not exist. Head back to the homepage or call the yard.',
    { noindex: true },
  )

  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-void">
      <Glow className="top-0 left-1/3 size-[520px]" from="rgba(255,122,24,0.16)" />
      <div className="rail relative py-20">
        <p className="eyebrow flex items-center gap-3 text-amber">
          <span aria-hidden className="grad-flame block h-px w-7 rounded-full" />
          404
        </p>
        <h1 className="mt-5 font-display text-dp text-bright">
          That page isn&rsquo;t here.
        </h1>
        <p className="measure mt-6 text-lead text-muted">
          It may have moved. Try the metals catalogue or our services — or just
          call the yard on{' '}
          <a href={site.phones[0].href} className="text-amber hover:underline">
            {site.phones[0].label}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="grad-flame inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-on-flame"
          >
            Back to the homepage
          </Link>
          <Link
            to="/metals"
            className="glass inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-semibold text-bright"
          >
            Metals we buy
          </Link>
        </div>
      </div>
    </section>
  )
}
