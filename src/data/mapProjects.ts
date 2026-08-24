export type MapProjectItem = { id: string; title: string; year: string; category: string; blurb: string; details: string[]; productId?: string; status: 'delivered' | 'placeholder'; cityName?: string }
export type MapProvinceId = 'SGSIN' | 'CNSH' | 'CNSZ'
export type MapRegion = 'Southeast Asia' | 'East China' | 'Greater Bay Area'
export type MapCity = { id: string; name: string; region: MapRegion; provinceId: MapProvinceId; x: number; y: number; projects: MapProjectItem[] }

const workflow = (id: string, title: string, category: string, blurb: string, details: string[], productId: string, cityName: string): MapProjectItem => ({ id, title, year: 'LIVE DEMO', category, blurb, details, productId, status: 'delivered', cityName })

export const MAP_CITIES: MapCity[] = [
  { id: 'singapore', name: 'Singapore', region: 'Southeast Asia', provinceId: 'SGSIN', x: 505, y: 615, projects: [
    workflow('whatsapp-crm', 'WhatsApp → CRM', 'Customer Operations', 'Violoop reads a customer conversation, structures the context, updates the CRM, and prepares the next reply.', ['Understands the live WhatsApp context', 'Structures customer details automatically', 'Prepares the CRM update for approval'], 'operator', 'Singapore'),
    workflow('remote-file', 'Phone → Desktop File', 'Away Mode', 'Send a request from your phone and let the office computer locate, prepare, and stage the exact file you need.', ['Natural-language request from mobile', 'Searches files on the office computer', 'Keeps the final send behind approval'], 'operator', 'Singapore'),
  ]},
  { id: 'shanghai', name: 'Shanghai', region: 'East China', provinceId: 'CNSH', x: 720, y: 245, projects: [
    workflow('shopify-books', 'Shopify → QuickBooks', 'Commerce Operations', 'Violoop checks Shopify orders and prepares matched reconciliation entries in QuickBooks.', ['Reads order data from Shopify', 'Cross-checks totals across systems', 'Prepares the accounting entry'], 'setup', 'Shanghai'),
    workflow('email-sort', 'Inbox → Priority Queue', 'Reactive Autocomplete', 'New messages are classified by urgency, enriched with context, and turned into ready-to-review actions.', ['Finds messages that need attention', 'Extracts the decisive context', 'Prepares drafts and next actions'], 'memory', 'Shanghai'),
  ]},
  { id: 'shenzhen', name: 'Shenzhen', region: 'Greater Bay Area', provinceId: 'CNSZ', x: 655, y: 420, projects: [
    workflow('bill-approval', 'Bill Verification → Approval', 'Human Control', 'Violoop validates payment details and pauses before the irreversible action until you press the physical approval key.', ['Checks the invoice and beneficiary', 'Stages the payment action', 'Waits for physical confirmation'], 'trust', 'Shenzhen'),
    workflow('legacy-erp', 'Legacy ERP → Sales Report', 'Business Operations', 'Violoop operates legacy software, exports the data, organizes the analysis, and prepares the reporting email.', ['Works without a dedicated API', 'Analyzes the export in a spreadsheet', 'Prepares the report and email'], 'memory', 'Shenzhen'),
  ]},
]

export const MAP_REGIONS = ['All', 'Southeast Asia', 'East China', 'Greater Bay Area'] as const
export const PROVINCE_SHORT_NAMES: Record<MapProvinceId, string> = { SGSIN: 'Singapore', CNSH: 'Shanghai', CNSZ: 'Shenzhen' }
export const PROVINCE_CENTROIDS: Record<MapProvinceId, { x: number; y: number }> = { SGSIN: { x: 505, y: 615 }, CNSH: { x: 720, y: 245 }, CNSZ: { x: 655, y: 420 } }
export type ProvinceLabel = { provinceId: MapProvinceId; name: string; region: MapCity['region']; count: number; x: number; y: number; projects: MapProjectItem[] }

export function getProvinceLabels(cities: MapCity[]): ProvinceLabel[] {
  const grouped = new Map<MapProvinceId, { count: number; region: MapCity['region']; projects: MapProjectItem[] }>()
  for (const city of cities) {
    const current = grouped.get(city.provinceId) ?? { count: 0, region: city.region, projects: [] }
    current.count += city.projects.length
    current.projects.push(...city.projects)
    grouped.set(city.provinceId, current)
  }
  return [...grouped.entries()].map(([provinceId, data]) => ({ provinceId, name: PROVINCE_SHORT_NAMES[provinceId], region: data.region, count: data.count, ...PROVINCE_CENTROIDS[provinceId], projects: data.projects }))
}

export function getPrimaryCityForProvince(cities: MapCity[], provinceId: string) { return cities.find((city) => city.provinceId === provinceId) ?? null }
export function getProvinceLabel(cities: MapCity[], provinceId: string) { return getProvinceLabels(cities).find((item) => item.provinceId === provinceId) ?? null }
