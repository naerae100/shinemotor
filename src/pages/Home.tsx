import { useSeo } from '../lib/seo'
import { faqSchema, webSiteSchema } from '../lib/schema'
import { faqs } from '../content/sections'
import { HeroVisual } from '../components/home/HeroVisual'
import { Credentials } from '../components/home/Credentials'
import { ServicesIndex } from '../components/home/ServicesIndex'
import { MetalsIndex } from '../components/home/MetalsIndex'
import { Logistics } from '../components/home/Logistics'
import { Serve } from '../components/home/Serve'
import { Safety } from '../components/home/Safety'
import { Reviews } from '../components/home/Reviews'
import { HomeFaq } from '../components/home/HomeFaq'
import { ContactCta } from '../components/home/ContactCta'

/**
 * Homepage information architecture.
 *
 * Deliberately not the old site's running order. That opened with a photo
 * carousel and worked down through "about → services → gallery"; this opens
 * with the visitor's own question and a way to answer it, then works outward:
 * can I trust you → what do you do → what do you buy → how do I get it to you →
 * who else uses you → what do I need to know → talk to us.
 */
export function Home() {
  useSeo(
    'Scrap Metal Buyers Sydney — Top Prices, Paid on the Spot',
    'Shine Motor Corporation buys copper, brass, aluminium, stainless and steel by grade at Ingleburn, NSW. A huge variety of ferrous and non-ferrous metals, instant EFT, free pickup across NSW & ACT. WhatsApp us a photo for a price.',
    {
      path: '/',
      // Only the questions actually rendered by <HomeFaq /> are marked up.
      schema: [webSiteSchema(), faqSchema(faqs)],
    },
  )

  return (
    <>
      <HeroVisual />
      <Credentials />
      <ServicesIndex />
      <MetalsIndex />
      <Logistics />
      <Serve />
      <Safety />
      <Reviews />
      <HomeFaq />
      <ContactCta />
    </>
  )
}
