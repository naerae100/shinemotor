import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { ServiceDetail } from './pages/ServiceDetail'
import { Metals } from './pages/Metals'
import { MetalDetail } from './pages/MetalDetail'
import { Contact } from './pages/Contact'
import { Prices } from './pages/Prices'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import { Admin } from './pages/Admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/metals" element={<Metals />} />
          <Route path="/metals/:slug" element={<MetalDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/contact" element={<Contact />} />

          {/* The old .php URLs, kept alive so existing links and search
              results land somewhere sensible instead of a 404. */}
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
    </BrowserRouter>
  </StrictMode>,
)
