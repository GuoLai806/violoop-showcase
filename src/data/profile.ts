import { asset } from '../lib/asset'

export const PORTRAIT_URL = asset('images/violoop/hero-product-cutout.png')

export type MarqueeItem = {
  image?: string
  caption?: string
  video?: string
  videoHd?: string
  videoPoster?: string
  videoPreload?: 'auto' | 'metadata' | 'none'
}

const workflows = [
  ['violoop-01', 'WhatsApp → CRM · Extract leads and create the record'],
  ['violoop-02', 'Shopify → QuickBooks · Review and reconcile orders'],
  ['violoop-03', 'OpenEMR → Authorization · Work inside legacy software'],
  ['violoop-04', 'Phone → Desktop · Command your computer from anywhere'],
] as const

export const MARQUEE_ITEMS: MarqueeItem[] = workflows.map(([name, caption]) => ({
  caption,
  video: asset(`images/marquee/${name}.mp4`),
  videoHd: asset(`images/marquee/${name}.mp4`),
  videoPoster: asset(`images/marquee/${name}.webp`),
  videoPreload: 'metadata',
}))

export const MARQUEE_VIDEO_PLAYBACK_RATE = 1

export const DECOR_IMAGES = {
  moon: asset('images/violoop/ports.png'),
  object: asset('images/violoop/package.jpg'),
  lego: asset('images/violoop/security.png'),
  group: asset('images/violoop/hero-product.png'),
}

export const profile = {
  displayName: 'VIOLOOP',
  fullName: 'Violoop',
  title: 'Desktop AI Operator',
  heroTagline: 'AUTOCOMPLETE FOR YOUR REAL COMPUTER\nIT PREPARES. YOU APPROVE.',
  aboutText:
    'Violoop is a desktop AI operator that sees any screen, runs any app, and keeps you in control. Two cables, one app, five minutes.',
  aboutTextZh:
    'VIOLOOP is not another computer. It is the second user of the computer you already own.\nIt sees the screen, understands context, and works across applications—\nthen gives the final decision back to you before anything irreversible happens.',
  contact: {
    email: 'hello@violoop.com',
    wechat: 'VIOLOOP',
    location: 'Desktop AI Operator · Product Demo',
  },
  services: [
    { number: '01', name: 'Sees every screen', description: 'OCR, interface recognition, and visual understanding let Violoop work even inside legacy systems with no API.' },
    { number: '02', name: 'Completes real workflows', description: 'It moves continuously across email, spreadsheets, CRM, ERP, finance, and specialist software—not just a chat window.' },
    { number: '03', name: 'Knows what is next', description: 'It organizes context, drafts the response, and completes reversible steps before waiting for your approval.' },
    { number: '04', name: 'Remembers how you work', description: 'It learns your tone, formats, file relationships, and the working methods you repeatedly validate.' },
    { number: '05', name: 'Physical approval', description: 'An independent security chip and a physical confirmation key create a clear boundary: intelligence grows, authority does not.' },
  ],
}
