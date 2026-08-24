import { Brain, Cable, Eye, Keyboard, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react'
import { asset } from '../lib/asset'

export type ProductOutcome = { label: string; detail: string }
export type ProductCase = {
  id: string
  title: string
  period: string
  timelineYears: string
  timelineOrder: number
  category: string
  image: string
  sceneId?: string
  sceneDemoNotice?: string
  icon: LucideIcon
  summary: string
  tags: string[]
  responsibilities: { icon: LucideIcon; text: string }[]
  outcomes: ProductOutcome[]
  timelineBullets: string[]
}

export const PRODUCT_CASES: ProductCase[] = [
  {
    id: 'operator', title: 'Desktop AI Operator', period: '01', timelineYears: 'SEE', timelineOrder: 1,
    category: 'Screen Intelligence', image: asset('images/violoop/hero-product.png'), icon: Eye,
    summary: 'A dedicated desktop operator that sees the interface you see and acts across the software you already use—without waiting for every app to expose an API.',
    tags: ['Any screen', 'Any app', 'No API', 'Cross-platform'],
    responsibilities: [{ icon: Eye, text: 'Read on-screen context' }, { icon: Brain, text: 'Understand the next action' }, { icon: Keyboard, text: 'Execute through real input' }],
    outcomes: [{ label: 'Real software', detail: 'Works beyond the browser' }, { label: 'One operator', detail: 'Across many applications' }, { label: 'No migration', detail: 'Keep your current computer' }],
    timelineBullets: ['Sees the screen', 'Understands context', 'Completes the work'],
  },
  {
    id: 'setup', title: 'Two Cables. Five Minutes.', period: '02', timelineYears: 'CONNECT', timelineOrder: 2,
    category: 'Zero-friction setup', image: asset('images/violoop/ports.png'), icon: Cable,
    summary: 'Connect HDMI for vision and USB for action. Install one app, describe the outcome, and Violoop handles the sequence.',
    tags: ['HDMI', 'USB HID', 'No admin rights', 'No workflow canvas'],
    responsibilities: [{ icon: Cable, text: 'Connect to the existing computer' }, { icon: Keyboard, text: 'Appear as standard input hardware' }, { icon: Sparkles, text: 'Turn natural language into action' }],
    outcomes: [{ label: '2 cables', detail: 'Physical, understandable setup' }, { label: '5 minutes', detail: 'From box to first workflow' }, { label: '0 code', detail: 'Describe the result in words' }],
    timelineBullets: ['Plug in HDMI + USB', 'Install the app', 'Describe what you want'],
  },
  {
    id: 'trust', title: 'It Prepares. You Approve.', period: '03', timelineYears: 'TRUST', timelineOrder: 3,
    category: 'Physical approval', image: asset('images/violoop/security.png'), icon: ShieldCheck,
    summary: 'The AI prepares the action, but an independent security layer keeps irreversible decisions behind a physical human confirmation.',
    tags: ['Dual chip', 'Physical key', 'Audit trail', 'Human in control'],
    responsibilities: [{ icon: Brain, text: 'AI prepares the requested action' }, { icon: ShieldCheck, text: 'Security chip enforces the boundary' }, { icon: Keyboard, text: 'Your hand releases the final step' }],
    outcomes: [{ label: 'Physical boundary', detail: 'Not another software policy' }, { label: 'Every action logged', detail: 'Inspectable execution history' }, { label: 'BYOK', detail: 'Choose your model provider' }],
    timelineBullets: ['Prepare safely', 'Request approval', 'Execute after confirmation'],
  },
  {
    id: 'memory', title: 'Starts as an Intern. Becomes Yours.', period: '04', timelineYears: 'LEARN', timelineOrder: 4,
    category: 'Personal memory', image: asset('images/violoop/package.jpg'), icon: Brain,
    summary: 'Violoop learns your tone, your formats, your files and your verified working methods. Day one begins the relationship; month one feels personal.',
    tags: ['Long-term memory', 'Workflow learning', 'Personal context', 'On-device'],
    responsibilities: [{ icon: Eye, text: 'Observe authorized work context' }, { icon: Brain, text: 'Remember corrections and preferences' }, { icon: Sparkles, text: 'Prepare before you need to ask' }],
    outcomes: [{ label: 'Day 1', detail: 'You explain' }, { label: 'Week 1', detail: 'It learns your patterns' }, { label: 'Month 1', detail: 'The work is ready sooner' }],
    timelineBullets: ['Remember context', 'Learn the workflow', 'Anticipate the next step'],
  },
]

export const PRODUCT_STATS = [
  { icon: Cable, value: '2', label: 'Cables', detail: 'HDMI + USB' },
  { icon: Eye, value: 'Any', label: 'Screen', detail: 'Legacy or modern software' },
  { icon: ShieldCheck, value: '1 Key', label: 'Final authority', detail: 'Physical human approval' },
  { icon: Brain, value: 'Day 1→30', label: 'Personal growth', detail: 'Learns how you work' },
] as const
