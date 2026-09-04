import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { ServiceDetail } from './pages/ServiceDetail'
import { Metals } from './pages/Metals'
import { MetalDetail } from './pages/MetalDetail'
import { Contact } from './pages/Contact'
import { Prices } from './pages/Prices'
import { About } from './pages/About'
import { ServiceAreas } from './pages/ServiceAreas'
import { Guides } from './pages/Guides'
import { GuideDetail } from './pages/GuideDetail'
import { NotFound } from './pages/NotFound'
import { Admin, Card } from './pages/lazy'

/** Held for the moment a split chunk is in flight. Deliberately blank: a
 *  spinner that flashes for 80ms reads as jank, an empty dark panel does not. */
const Loading = <div className="min-h-screen bg-void" />

/**
 * The route table, and the animation features the whole tree runs on.
 *
 * Deliberately router-free: `main.tsx` wraps this in a BrowserRouter and the
 * prerenderer wraps the same component in a StaticRouter, so the routes the
 * static HTML is generated from cannot drift from the routes the browser
 * actually serves.
 *
 * On `LazyMotion`: the site uses entrance animations, AnimatePresence and
 * hover/tap gestures, all of which live in `domAnimation`. It uses no layout
 * projection and no drag, which are the expensive half of the library.
 * Importing the full `motion` component pulls both in regardless of use; the
 * `m` component ships only what is declared here, roughly halving the animation
 * payload. `strict` makes that a build-time guarantee rather than a convention:
 * using the full `motion` component anywhere below throws. Every call site
 * imports `m as motion`, so the JSX reads unchanged.
 */
export function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <Routes>
        <Route path="/admin" element={<Suspense fallback={Loading}><Admin /></Suspense>} />
        <Route path="/card/:slug" element={<Suspense fallback={Loading}><Card /></Suspense>} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/metals" element={<Metals />} />
          <Route path="/metals/:slug" element={<MetalDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<GuideDetail />} />

          {/* The old .php URLs. On Vercel these never reach the router —
              vercel.json answers them with a real 301, which is what passes
              link equity on and what search engines want to see. These are the
              fallback for any host that does not do the redirect itself. */}
          <Route path="/sell-your-scrap.php" element={<Navigate to="/services/sell-your-scrap" replace />} />
          <Route path="/buy-from-us.php" element={<Navigate to="/services/buy-from-us" replace />} />
          <Route path="/cash-for-cars-trucks.php" element={<Navigate to="/services/sell-your-scrap" replace />} />
          <Route path="/about.php" element={<Navigate to="/about" replace />} />
          <Route path="/contact.php" element={<Navigate to="/contact" replace />} />
          <Route path="/branches.php" element={<Navigate to="/about" replace />} />
          <Route path="/gallery.php" element={<Navigate to="/about" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LazyMotion>
  )
}
