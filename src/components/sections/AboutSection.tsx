import ContactButton from '../ui/ContactButton'
import FadeIn from '../ui/FadeIn'
import SplitText from '../ui/SplitText'
import { profile } from '../../data/profile'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-dark px-5 py-20 sm:px-8 md:px-10 md:py-28"
    >
      <div className="relative z-10 flex w-full flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About VIO
          </h2>
        </FadeIn>

        <SplitText
          text={profile.aboutTextZh}
          className="about-copy mx-auto max-w-[42rem] px-4 font-normal text-mist/90"
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
            lineHeight: 1.95,
            letterSpacing: '0.04em',
            whiteSpace: 'pre-line',
          }}
          delay={12}
          duration={0.45}
          ease="power2.out"
          splitType="lines, chars"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.15}
          rootMargin="-80px"
          textAlign="center"
        />

        <FadeIn delay={0.2} y={20}>
          <ContactButton label="EXPLORE THE PRODUCT" />
        </FadeIn>

        <div className="mt-10 w-full max-w-5xl sm:mt-14 md:mt-16">
          <FadeIn delay={0.05} y={24}>
            <h3
              className="mb-10 text-center font-black uppercase tracking-tight text-mist/90 sm:mb-14"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
            >
              Capabilities
            </h3>
          </FadeIn>

          {profile.services.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.08} y={28}>
              <article className="flex flex-col gap-4 border-t border-mist/15 py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:py-12">
                <span
                  className="shrink-0 font-black text-mist/90"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 96px)', lineHeight: 1 }}
                >
                  {service.number}
                </span>
                <div className="flex flex-col gap-3 pt-1">
                  <h4
                    className="font-medium uppercase text-mist"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.75rem)' }}
                  >
                    {service.name}
                  </h4>
                  <p
                    className="max-w-2xl font-light leading-relaxed text-mist/55"
                    style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
          <div className="border-t border-mist/15" />
        </div>
      </div>
    </section>
  )
}
