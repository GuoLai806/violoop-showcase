import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Brain, Cable, Check, ChevronDown, Cpu, Eye, Keyboard, LockKeyhole, Monitor, ShieldCheck, Smartphone, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { asset } from '../../lib/asset'
import ContactButton from '../ui/ContactButton'
import FadeIn from '../ui/FadeIn'

const modes = [
  {
    id: 'autocomplete', label: '01 / AUTOCOMPLETE', title: 'Point anywhere. Press Tab. Move on.',
    copy: 'Violoop reads the active screen, understands what you are trying to finish, and prepares the next useful action across the software already open.',
    media: asset('images/editorial/agent-layer.mp4'), poster: asset('images/editorial/agent-layer.webp'),
    facts: ['Works at the interface layer', 'No app-by-app workflow setup', 'Stops at a reviewable result'],
  },
  {
    id: 'proactive', label: '02 / PROACTIVE', title: 'The work can be ready before you ask.',
    copy: 'With scheduled tasks, local history, and learned preferences, Violoop can prepare repeatable work in the background and bring you a result instead of another blank prompt.',
    image: asset('images/editorial/memory-bg.webp'),
    facts: ['Local task history and memory', 'Scheduled background work', 'Learns from validated corrections'],
  },
  {
    id: 'away', label: '03 / AWAY MODE', title: 'Your computer keeps working when you step away.',
    copy: 'Send the request from your phone. Violoop works on the computer in front of it, prepares the result, and keeps sensitive commitments behind approval.',
    media: asset('images/editorial/plug-play.mp4'), poster: asset('images/editorial/plug-play.webp'),
    facts: ['Mobile request, desktop execution', 'Uses the files and apps on your machine', 'Human authority remains in the loop'],
  },
] as const

const architecture = [
  { number: '01', icon: Eye, label: 'SEE', title: '4K screen awareness', copy: 'HDMI 2.0 gives Violoop a direct view of the active interface. Raw screen video is processed on the device.' },
  { number: '02', icon: Brain, label: 'PREPARE', title: 'Context becomes action', copy: 'On-device perception, local history, and model intelligence turn visible context into a cross-app plan.' },
  { number: '03', icon: ShieldCheck, label: 'APPROVE', title: 'Authority stays physical', copy: 'USB-HID carries out keyboard and mouse actions, while the final commitment waits behind a hardware key.' },
] as const

const specs = [
  [Monitor, 'HDMI 2.0', '4K · 60 Hz capture'], [Keyboard, 'USB-HID', 'Keyboard + mouse control'], [Cpu, '26 TOPS', 'Dedicated AI accelerator'], [Brain, '13 GB', '8 GB + 5 GB stacked DRAM'],
  [LockKeyhole, 'STM32H563', 'Dedicated security MCU'], [Cable, '128 GB', 'eMMC 5.1 storage'], [Smartphone, 'Wi-Fi + BT', 'Dual-band Wi-Fi · Bluetooth 5.2'], [Sparkles, '450 g', '90 × 92 × 80 mm'],
] as const

const pricing = [
  { label: 'FOUNDER RESERVATION', price: '$10', suffix: 'due today', headline: 'Hold founder access', copy: 'A fully refundable reservation that secures launch access and founder pricing from $369.', highlight: true, points: ['Founder price from $369', 'Up to $330 below retail', 'Refunded after the campaign'] },
  { label: 'KICKSTARTER', price: '$599', suffix: 'reference tier', headline: 'Back at launch', copy: 'Join the public campaign without the early reservation benefits.', highlight: false, points: ['Campaign pledge', 'Public launch access', 'Final campaign terms apply'] },
  { label: 'RETAIL', price: '$699', suffix: 'reference price', headline: 'Buy after launch', copy: 'The reference retail position once founder and campaign allocation closes.', highlight: false, points: ['Standard availability', 'No founder reservation perks', 'Reference retail pricing'] },
] as const

const faqs = [
  ['How is Violoop different from a chatbot?', 'A chatbot responds to a prompt. Violoop is plug-in hardware that can open apps, manage files, browse, execute computer actions, run scheduled tasks, and keep working until it reaches a review or approval point.'],
  ['Does it continuously upload my screen or files?', 'No. Raw screen video is interpreted on the device. For tasks that need a large model, only task-relevant context is prepared for the service; files remain on your machine unless a task explicitly requires otherwise.'],
  ['Which computers does it support?', 'Violoop is designed for Windows, macOS, and Linux computers through standard HDMI and USB-HID connections.'],
  ['Do I need technical knowledge?', 'No. You can describe an outcome in plain language. The depth of the result can scale from simple organization to multi-application work and code execution.'],
  ['What does the $10 reservation do?', 'It holds a founder unit and launch-day pricing. It is a reservation, not the full purchase price, and is described as fully refundable under the campaign terms.'],
] as const

export function ModesSection() {
  const [active, setActive] = useState(0)
  const mode = modes[active]
  return (
    <section id="modes" className="relative z-10 bg-dark px-3 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1500px] px-2 sm:px-4 md:px-6">
        <FadeIn y={30}><div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between"><div><p className="text-[10px] uppercase tracking-[0.35em] text-[#C084FC]">THREE WAYS TO WORK</p><h2 className="mt-3 text-4xl font-black uppercase leading-none text-mist sm:text-6xl md:text-7xl">Not another app.<br />A new operating mode.</h2></div><p className="max-w-md text-sm leading-7 text-mist/45">Violoop meets the computer where the work already happens—then changes how much of that work needs your hands.</p></div></FadeIn>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col gap-2">{modes.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} className={`rounded-2xl border px-5 py-5 text-left transition ${active === index ? 'border-[#A855F7]/60 bg-[#A855F7]/12 text-mist shadow-[0_0_36px_rgba(168,85,247,.16)]' : 'border-white/10 bg-white/[0.02] text-mist/40 hover:border-white/20 hover:text-mist/70'}`}><p className="text-[10px] tracking-[0.2em]">{item.label}</p><p className="mt-2 text-lg font-semibold leading-tight">{item.title}</p></button>)}</div>

          <AnimatePresence mode="wait">
            <motion.article key={mode.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }} className="grid overflow-hidden rounded-[28px] border border-white/10 bg-[#08070b] md:grid-cols-[1.15fr_.85fr]">
              <div className="relative min-h-[300px] overflow-hidden md:min-h-[480px]">
                {'media' in mode && mode.media ? <video key={mode.media} src={mode.media} poster={mode.poster} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" /> : <img src={'image' in mode ? mode.image : ''} alt="" className="absolute inset-0 h-full w-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070b] via-transparent to-[#5227FF]/10" />
                <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-mist/60 backdrop-blur">LIVE CONCEPT / {String(active + 1).padStart(2, '0')}</div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C084FC]">{mode.label}</p><h3 className="mt-4 text-3xl font-black uppercase leading-[1.02] text-mist">{mode.title}</h3><p className="mt-5 text-sm leading-7 text-mist/50">{mode.copy}</p>
                <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">{mode.facts.map((fact) => <li key={fact} className="flex items-center gap-3 text-sm text-mist/65"><span className="h-1.5 w-1.5 rounded-full bg-[#C084FC] shadow-[0_0_10px_#C084FC]" />{fact}</li>)}</ul>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export function ArchitectureSection() {
  return (
    <section id="architecture" className="relative z-10 bg-dark px-3 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1500px] px-2 sm:px-4 md:px-6">
        <FadeIn y={30}><div className="text-center"><p className="text-[10px] uppercase tracking-[0.35em] text-[#C084FC]">THE TRUST ARCHITECTURE</p><h2 className="mt-4 text-5xl font-black uppercase leading-none text-mist sm:text-7xl md:text-8xl">See. Prepare. Approve.</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mist/45">Intelligence can expand. Authority does not have to move with it.</p></div></FadeIn>
        <div className="mt-10 grid gap-3 lg:grid-cols-3">{architecture.map((item) => { const Icon = item.icon; return <article key={item.number} className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-black/25 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#A855F7]/45 hover:bg-[#A855F7]/[0.07] sm:p-8"><p className="absolute right-5 top-3 text-7xl font-black text-white/[0.035]">{item.number}</p><Icon className="text-[#C084FC]" size={28} strokeWidth={1.5} /><p className="mt-10 text-[10px] tracking-[0.24em] text-[#C084FC]">{item.label}</p><h3 className="mt-3 text-2xl font-bold text-mist">{item.title}</h3><p className="mt-4 text-sm leading-7 text-mist/45">{item.copy}</p><ArrowRight className="mt-7 text-mist/25 transition group-hover:translate-x-2 group-hover:text-[#C084FC]" size={20} /></article>})}</div>
        <div className="mt-5 grid overflow-hidden rounded-[26px] border border-white/10 sm:grid-cols-2 lg:grid-cols-4">{specs.map(([Icon, value, detail]) => <div key={value} className="flex items-center gap-4 border-b border-white/10 p-5 last:border-b-0 sm:border-r lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-last-child(-n+4)]:border-b-0"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A855F7]/10 text-[#C084FC]"><Icon size={18} /></span><div><p className="text-sm font-semibold text-mist">{value}</p><p className="mt-1 text-[11px] text-mist/35">{detail}</p></div></div>)}</div>
      </div>
    </section>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 bg-dark px-3 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1500px] px-2 sm:px-4 md:px-6">
        <FadeIn y={30}><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-[10px] uppercase tracking-[0.35em] text-[#C084FC]">EARLY ACCESS STRATEGY</p><h2 className="mt-4 text-5xl font-black uppercase leading-none text-mist sm:text-7xl">Enter early.<br />Keep the advantage.</h2></div><p className="max-w-sm text-sm leading-7 text-mist/45">The reservation is designed to hold founder access without charging the full product price today.</p></div></FadeIn>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">{pricing.map((tier) => <article key={tier.label} className={`relative flex flex-col overflow-hidden rounded-[28px] border p-6 sm:p-8 ${tier.highlight ? 'border-[#A855F7]/65 bg-[radial-gradient(circle_at_80%_0%,rgba(244,114,182,.2),transparent_35%),linear-gradient(145deg,rgba(82,39,255,.22),rgba(168,85,247,.08))] shadow-[0_0_50px_rgba(124,58,237,.18)]' : 'border-white/10 bg-white/[0.02]'}`}>{tier.highlight && <span className="absolute right-5 top-5 rounded-full bg-[#A855F7] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white">BEST ENTRY</span>}<p className="text-[10px] uppercase tracking-[0.24em] text-[#C084FC]">{tier.label}</p><div className="mt-8 flex items-end gap-3"><span className="text-6xl font-black leading-none text-mist">{tier.price}</span><span className="pb-1 text-[10px] uppercase tracking-wider text-mist/30">{tier.suffix}</span></div><h3 className="mt-6 text-2xl font-bold text-mist">{tier.headline}</h3><p className="mt-3 min-h-16 text-sm leading-6 text-mist/45">{tier.copy}</p><ul className="mt-6 space-y-3 border-t border-white/10 pt-6">{tier.points.map((point) => <li key={point} className="flex items-center gap-3 text-sm text-mist/60"><Check size={15} className="text-[#C084FC]" />{point}</li>)}</ul>{tier.highlight && <div className="mt-8"><ContactButton label="RESERVE FOR $10" className="w-full" /></div>}</article>)}</div>
        <p className="mt-6 text-center text-[10px] leading-5 tracking-[0.08em] text-mist/25">Pricing reflects the current public Violoop reservation strategy. Campaign availability, refunds, shipping and final pledge terms are governed by the latest terms on violoop.ai.</p>
      </div>
    </section>
  )
}

export function FaqSection() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="relative z-10 bg-dark px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-16">
        <FadeIn y={24}><div className="md:sticky md:top-24"><p className="text-[10px] uppercase tracking-[0.35em] text-[#C084FC]">QUESTIONS, ANSWERED</p><h2 className="mt-4 text-5xl font-black uppercase leading-none text-mist sm:text-6xl">Before you give your computer a second user.</h2><p className="mt-6 text-sm leading-7 text-mist/40">The essentials on operation, privacy, compatibility, and early access.</p></div></FadeIn>
        <div className="border-t border-white/10">{faqs.map(([question, answer], index) => <article key={question} className="border-b border-white/10"><button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-start justify-between gap-5 py-6 text-left"><span className="text-base font-semibold text-mist/80 sm:text-lg">{question}</span><ChevronDown size={19} className={`mt-1 shrink-0 text-[#C084FC] transition ${open === index ? 'rotate-180' : ''}`} /></button><div className={`grid transition-[grid-template-rows] duration-300 ${open === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="pb-6 pr-10 text-sm leading-7 text-mist/45">{answer}</p></div></div></article>)}</div>
      </div>
    </section>
  )
}
