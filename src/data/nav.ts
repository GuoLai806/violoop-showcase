export const SITE_SECTIONS = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About VIO', href: '#about' },
  { id: 'map', label: 'Workplaces', href: '#map' },
  { id: 'products', label: 'Violoop', href: '#products' },
] as const

export type SiteSectionId = (typeof SITE_SECTIONS)[number]['id']
