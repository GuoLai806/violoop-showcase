import { lazy, Suspense } from 'react'
import AboutSection from './components/sections/AboutSection'
import HeroSection from './components/sections/HeroSection'
import MarqueeSection from './components/sections/MarqueeSection'
import MapSection from './components/sections/MapSection'
import ProductsSection from './components/sections/ProductsSection'
import SiteNav from './components/ui/SiteNav'
import AmbientBackground from './components/ui/AmbientBackground'
import ContactFooter from './components/sections/ContactFooter'
import { ArchitectureSection, FaqSection, ModesSection, PricingSection } from './components/sections/ExperienceSections'

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
      <div className="ambient-stage relative isolate">
        <AmbientBackground />
        <div className="ambient-content relative z-10">
          <MarqueeSection />
          <AboutSection />
          <MapSection />
          <ProductsSection />
          <ModesSection />
          <ArchitectureSection />
          <PricingSection />
          <FaqSection />
          <ContactFooter />
        </div>
      </div>
    </div>
  )
}
