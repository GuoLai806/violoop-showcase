export const SITE_SECTIONS = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About VIO', href: '#about' },
  { id: 'products', label: 'Violoop', href: '#products' },
  { id: 'modes', label: 'Modes', href: '#modes' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
] as const

export type SiteSectionId = (typeof SITE_SECTIONS)[number]['id']
