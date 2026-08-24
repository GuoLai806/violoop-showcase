import { lazy, Suspense } from 'react'
import AboutSection from './components/sections/AboutSection'
import HeroSection from './components/sections/HeroSection'
import MarqueeSection from './components/sections/MarqueeSection'
import MapSection from './components/sections/MapSection'
import ProductsSection from './components/sections/ProductsSection'
import SiteNav from './components/ui/SiteNav'
import ContactFooter from './components/sections/ContactFooter'

const ModelPreviewPage = lazy(() => import('./components/sections/ModelPreviewPage'))

export default function App() {
  if (window.location.pathname === '/model-preview') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0b0d10]" />}>
        <ModelPreviewPage />
      </Suspense>
    )
  }

  return (
    <div className="overflow-x-clip bg-dark font-kanit">
      <SiteNav />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <MapSection />
      <ProductsSection />
      <div className="relative z-10 bg-dark">
        <ContactFooter />
      </div>
    </div>
  )
}
