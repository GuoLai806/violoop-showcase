import ContactButton from '../ui/ContactButton'

const channels = [
  ['KICKSTARTER', 'https://www.kickstarter.com/projects/bvio/violoop-plug-in-ai-for-your-computer'],
  ['INSTAGRAM', 'https://www.instagram.com/violoop_ai/'],
  ['DISCORD', 'https://discord.gg/pBQWBvhCaN'],
  ['YOUTUBE', 'https://www.youtube.com/@Bvio-Tech'],
  ['X / TWITTER', 'https://x.com/violoop'],
] as const

export default function ContactFooter() {
  return (
    <footer id="contact" className="overflow-hidden border-t border-mist/10 px-4 pb-12 pt-16 text-center sm:px-8 sm:pb-16 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#C084FC]">VIOLOOP · SCREEN-AWARE AI HARDWARE</p>
        <h2 className="mx-auto mt-5 max-w-4xl text-balance text-4xl font-black uppercase leading-[0.95] text-mist sm:text-6xl md:text-7xl">Your computer already has a user. Give it a second one.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-mist/45 sm:text-base">Point anywhere. Violoop reads the screen locally, prepares the work across applications, and waits for your physical approval.</p>
        <div className="mt-8"><ContactButton label="RESERVE EARLY ACCESS" /></div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-mist/10 pt-7">
          {channels.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-[0.2em] text-mist/35 transition hover:text-[#C084FC]">{label}</a>)}
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-[0.16em] text-mist/25">© 2026 BVIO Technology Limited · All rights reserved</p>
      </div>
    </footer>
  )
}
