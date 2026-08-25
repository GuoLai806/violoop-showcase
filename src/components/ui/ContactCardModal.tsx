import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ShieldCheck, Sparkles, X } from 'lucide-react'
import { useEffect } from 'react'
import { PORTRAIT_URL } from '../../data/profile'
import BorderGlow from './BorderGlow'

type ContactCardModalProps = { open: boolean; onClose: () => void }

export default function ContactCardModal({ open, onClose }: ContactCardModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="early-access-title">
          <button type="button" className="absolute inset-0 bg-black/75 backdrop-blur-md" aria-label="Close" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 26, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }} className="relative w-full max-w-lg">
            <BorderGlow edgeSensitivity={30} glowColor="21 184 166" backgroundColor="#071412" borderRadius={30} glowRadius={46} glowIntensity={1} coneSpread={28} animated={false} colors={['#5eead4', '#2dd4bf', '#15b8a6']} className="w-full">
              <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full p-2 text-mist/60 transition hover:bg-white/5 hover:text-mist" aria-label="Close early access panel"><X className="h-5 w-5" /></button>

              <div className="grid gap-6 px-6 pb-7 pt-8 sm:grid-cols-[150px_1fr] sm:px-8 sm:pb-8">
                <div className="relative flex min-h-48 items-end justify-center overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(21,184,166,.35),transparent_58%),#06110f]">
                  <div className="absolute inset-x-4 bottom-3 h-9 rounded-full bg-[#15B8A6]/35 blur-2xl" />
                  <img src={PORTRAIT_URL} alt="Violoop device" className="relative z-10 max-h-44 w-full object-contain object-bottom" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#15B8A6]/35 bg-[#15B8A6]/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#CCFBF1]"><Sparkles size={12} /> Founder access</div>
                  <h2 id="early-access-title" className="mt-4 text-3xl font-black uppercase leading-none text-mist">Meet the second user of your computer.</h2>
                  <p className="mt-4 text-sm leading-6 text-mist/55">A screen-aware device that prepares cross-app actions and keeps every commitment behind your physical approval.</p>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/10 py-4 text-center">
                    <div><p className="text-xl font-bold text-mist">$10</p><p className="mt-1 text-[9px] uppercase tracking-wider text-mist/35">Refundable hold</p></div>
                    <div><p className="text-xl font-bold text-mist">$369</p><p className="mt-1 text-[9px] uppercase tracking-wider text-mist/35">Founder price</p></div>
                    <div><p className="text-xl font-bold text-[#5EEAD4]">$330</p><p className="mt-1 text-[9px] uppercase tracking-wider text-mist/35">Potential saving</p></div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2.5">
                    <a href="https://violoop.ai/reserve/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0B7F75] via-[#15B8A6] to-[#7CEBDD] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">Reserve early access <ArrowUpRight size={15} /></a>
                    <a href="https://www.kickstarter.com/projects/bvio/violoop-plug-in-ai-for-your-computer" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs uppercase tracking-[0.14em] text-mist/70 transition hover:border-[#15B8A6]/50 hover:text-mist">Follow on Kickstarter <ArrowUpRight size={15} /></a>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 border-t border-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.14em] text-mist/35"><ShieldCheck size={12} className="text-[#5EEAD4]" /> Refundable reservation · Campaign terms apply</div>
            </BorderGlow>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
