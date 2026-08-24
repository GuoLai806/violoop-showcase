import { PORTRAIT_URL } from '../data/profile'

/** Start fetching the hero portrait before React paints the first screen. */
export function preloadHeroAssets() {
  if (document.querySelector(`link[rel="preload"][href="${PORTRAIT_URL}"]`)) return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = PORTRAIT_URL
  link.setAttribute('fetchpriority', 'high')
  document.head.appendChild(link)

  const img = new Image()
  img.src = PORTRAIT_URL
}
