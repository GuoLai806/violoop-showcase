import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import FadeIn from '../ui/FadeIn'
import Web3dSceneViewer from '../ui/Web3dSceneViewer'
import { PRODUCT_CASES, PRODUCT_STATS } from '../../data/products'

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProduct = PRODUCT_CASES[activeIndex]
  const progress = useMemo(
    () => `${((activeIndex + 1) / PRODUCT_CASES.length) * 100}%`,
    [activeIndex],
  )

  useEffect(() => {
    PRODUCT_CASES.forEach((product) => {
      if (product.sceneId) return
      const img = new Image()
      img.src = product.image
    })
  }, [])

  const goToProduct = (index: number) => {
    setActiveIndex((index + PRODUCT_CASES.length) % PRODUCT_CASES.length)
  }

  return (
    <section
      id="products"
      className="relative z-10 -mt-10 overflow-x-clip rounded-t-[40px] bg-dark px-3 pb-8 pt-0 sm:-mt-12 sm:rounded-t-[50px] sm:px-5 sm:pb-10 md:-mt-14 md:rounded-t-[60px] md:px-6 md:pb-12"
    >
      <div className="mx-auto w-full max-w-[1500px] overflow-hidden rounded-[34px] border border-mist/15 bg-[#0b0b0b] px-5 py-8 shadow-[0_28px_110px_rgba(0,0,0,0.38)] sm:rounded-[44px] sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-14">
        <FadeIn y={40} onMount>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 152px)' }}
          >
            Violoop
          </h2>
        </FadeIn>

        <FadeIn delay={0.08} y={24} onMount>
          <div className="mx-auto mt-4 flex max-w-3xl flex-col items-center gap-4 text-center sm:mt-5">
            <span className="h-1 w-16 rounded-full bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B497CF]" />
            <p className="text-sm font-light tracking-[0.14em] text-mist/55 sm:text-base">
              HARDWARE, CAPABILITIES &amp; TRUST&nbsp;&nbsp;|&nbsp;&nbsp;AUTOCOMPLETE FOR YOUR REAL COMPUTER
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-8 w-full min-w-0 max-w-[1400px] sm:mt-10 md:mt-12">
          <FadeIn delay={0.12} y={34} onMount>
            <div className="w-full min-w-0 overflow-hidden rounded-[28px] border border-mist/15 bg-[#0f0f0f] shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:rounded-[34px]">
              <div className="projects-feature-grid grid w-full min-w-0 grid-cols-1">
                <div className="relative min-h-[250px] min-w-0 overflow-hidden bg-[#070707] sm:min-h-[340px] lg:min-h-[520px] lg:border-r lg:border-mist/10">
                  {activeProduct.sceneId ? (
                    <Web3dSceneViewer
                      key={activeProduct.sceneId}
                      sceneId={activeProduct.sceneId}
                      fallbackImage={activeProduct.image}
                      demoNotice={activeProduct.sceneDemoNotice}
                      className="absolute inset-0"
                    />
                  ) : (
                    <>
                      <img
                        key={activeProduct.image}
                        src={activeProduct.image}
                        alt={activeProduct.title}
                        width={1536}
                        height={1024}
                        decoding="async"
                        fetchPriority="high"
                        className="block h-full w-full max-w-full bg-[#070707] object-contain object-center transition-opacity duration-300"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-dark/20 via-transparent to-dark/10" />
                    </>
                  )}
                </div>

                <div className="flex min-w-0 flex-col justify-center gap-6 p-6 sm:p-8 md:p-10 lg:p-12">
                  <div>
                    <p className="mb-4 text-sm font-medium text-[#C084FC]">Featured Capability</p>
                    <h3 className="text-[1.75rem] font-bold leading-tight text-mist sm:text-4xl lg:text-[2.75rem]">
                      {activeProduct.title}
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {activeProduct.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#A855F7]/70 bg-[#A855F7]/10 px-4 py-1.5 text-xs tracking-wide text-[#E9D5FF]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-5 text-sm font-light leading-7 text-mist/65 sm:text-[15px] sm:leading-8">
                      {activeProduct.summary}
                    </p>
                  </div>

                  <div className="grid gap-6 border-y border-mist/10 py-6 sm:grid-cols-2 sm:gap-8">
                    <div>
                      <p className="mb-4 text-sm font-medium text-[#C084FC]">How it works</p>
                      <ul className="space-y-4">
                        {activeProduct.responsibilities.map((item) => {
                          const RoleIcon = item.icon

                          return (
                            <li key={item.text} className="flex items-start gap-3">
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A855F7]/12 text-[#C084FC]">
                                <RoleIcon size={16} strokeWidth={1.8} />
                              </span>
                              <span className="pt-1 text-sm leading-6 text-mist/80">
                                {item.text}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    <div className="sm:border-l sm:border-mist/10 sm:pl-8">
                      <p className="mb-4 text-sm font-medium text-[#C084FC]">What you get</p>
                      <ul className="space-y-4">
                        {activeProduct.outcomes.map((outcome) => (
                          <li key={outcome.label} className="flex gap-3">
                            <ShieldCheck
                              className="mt-0.5 shrink-0 text-[#C084FC]"
                              size={20}
                              strokeWidth={1.7}
                            />
                            <div>
                              <p className="text-base font-semibold text-mist">{outcome.label}</p>
                              <p className="mt-0.5 text-xs leading-5 text-mist/45">
                                {outcome.detail}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-5 sm:px-8 sm:py-6">
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 sm:gap-6">
                  <button
                    type="button"
                    aria-label="View previous capability"
                    onClick={() => goToProduct(activeIndex - 1)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-mist/15 text-mist/70 transition hover:border-mist/30 hover:bg-mist/5 hover:text-mist sm:h-11 sm:w-11"
                  >
                    <ChevronLeft size={18} strokeWidth={1.8} />
                  </button>

                  <div className="mx-auto flex w-full max-w-md min-w-0 items-center gap-4">
                    <span className="shrink-0 text-sm font-medium tracking-[0.08em] text-mist sm:text-base">
                      {String(activeIndex + 1).padStart(2, '0')}{' '}
                      <span className="text-mist/40">/ {String(PRODUCT_CASES.length).padStart(2, '0')}</span>
                    </span>
                    <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-mist/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B497CF] transition-all duration-300"
                        style={{ width: progress }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="View next capability"
                    onClick={() => goToProduct(activeIndex + 1)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-mist/15 text-mist/70 transition hover:border-mist/30 hover:bg-mist/5 hover:text-mist sm:h-11 sm:w-11"
                  >
                    <ChevronRight size={18} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.16} y={28} onMount>
            <div className="mt-4 grid w-full min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCT_CASES.map((product, index) => {
                const isActive = index === activeIndex
                const ProductIcon = product.icon

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => goToProduct(index)}
                    className={`group flex min-h-[86px] items-center gap-3.5 rounded-2xl border px-4 py-4 text-left transition ${
                      isActive
                        ? 'border-[#A855F7] bg-[#A855F7]/10 shadow-[0_0_28px_rgba(168,85,247,0.22)]'
                        : 'border-mist/10 bg-[#111]/60 hover:border-mist/25 hover:bg-[#141414]'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        isActive
                          ? 'bg-[#A855F7]/20 text-[#D8B4FE]'
                          : 'bg-[#A855F7]/10 text-[#C084FC]/80'
                      }`}
                    >
                      <ProductIcon size={20} strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs tracking-[0.16em] text-mist/45">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-1 block text-sm font-medium leading-snug text-mist sm:text-[15px]">
                        {product.title}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={24} onMount>
            <div className="mt-12 grid w-full min-w-0 overflow-hidden rounded-[24px] border border-mist/10 bg-[#101010] sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCT_STATS.map((stat, index) => {
                const StatIcon = stat.icon

                return (
                  <div
                    key={stat.value}
                    className={`flex items-center gap-4 px-6 py-7 ${
                      index < PRODUCT_STATS.length - 1 ? 'border-b border-mist/10 lg:border-b-0' : ''
                    } ${index % 2 === 0 ? 'sm:border-r sm:border-mist/10' : ''} ${
                      index < 3 ? 'lg:border-r lg:border-mist/10' : ''
                    }`}
                  >
                    <StatIcon
                      className="shrink-0 text-[#C084FC]"
                      size={36}
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-3xl font-black leading-none text-mist sm:text-[2rem]">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm font-medium text-mist/80">{stat.label}</p>
                      <p className="mt-1 text-xs leading-5 text-mist/45">{stat.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
