import { Brain, Cable, Cpu, Eye, Keyboard, Monitor, ShieldCheck, Smartphone, Sparkles, type LucideIcon } from 'lucide-react'
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
  video?: string
  icon: LucideIcon
  summary: string
  tags: string[]
  responsibilities: { icon: LucideIcon; text: string }[]
  outcomes: ProductOutcome[]
  timelineBullets: string[]
}

export const PRODUCT_CASES: ProductCase[] = [
  {
    id: 'layer', title: 'The Agent Layer', period: '01', timelineYears: 'ORCHESTRATE', timelineOrder: 1,
    category: 'Cross-app intelligence', image: asset('images/editorial/agent-layer.webp'), video: asset('images/editorial/agent-layer.mp4'), icon: Sparkles,
    summary: 'Violoop creates one intelligent operating layer over the software you already use. It follows a task across apps instead of answering once and stopping.',
    tags: ['Every app', 'Cross-app actions', 'Plain language', 'Background work'],
    responsibilities: [{ icon: Eye, text: 'Read the active screen and task context' }, { icon: Brain, text: 'Plan the sequence across applications' }, { icon: Keyboard, text: 'Carry the work through to a review point' }],
    outcomes: [{ label: 'One continuous task', detail: 'Across disconnected software' }, { label: 'No workflow canvas', detail: 'Describe the outcome in words' }, { label: 'Keeps going', detail: 'Beyond a single response' }],
    timelineBullets: ['Understand', 'Orchestrate', 'Prepare'],
  },
  {
    id: 'vision', title: 'Screen-Aware Vision', period: '02', timelineYears: 'SEE', timelineOrder: 2,
    category: 'Local visual context', image: asset('images/editorial/local-vision.webp'), video: asset('images/editorial/local-vision.mp4'), icon: Eye,
    summary: 'A 4K HDMI input lets Violoop see the interface directly. Raw screen video stays on the device; only task-relevant context is prepared for the model when needed.',
    tags: ['4K capture', 'Local-first', 'No screen streaming', 'Legacy software'],
    responsibilities: [{ icon: Monitor, text: 'Capture the screen through HDMI' }, { icon: Eye, text: 'Interpret visible controls and context' }, { icon: Brain, text: 'Filter what is relevant to the task' }],
    outcomes: [{ label: 'Any visible interface', detail: 'Modern or legacy software' }, { label: 'Local visual processing', detail: 'Raw feed stays on device' }, { label: 'Less migration', detail: 'Keep the systems you know' }],
    timelineBullets: ['Capture', 'Interpret', 'Minimize'],
  },
  {
    id: 'connect', title: 'Plug In. Keep Everything.', period: '03', timelineYears: 'CONNECT', timelineOrder: 3,
    category: 'Zero-migration setup', image: asset('images/editorial/plug-play.webp'), video: asset('images/editorial/plug-play.mp4'), icon: Cable,
    summary: 'Connect HDMI for vision and USB-HID for action. Violoop works with your existing Windows, macOS, or Linux computer without forcing a new software stack.',
    tags: ['HDMI 2.0', 'USB-HID', 'Windows', 'macOS', 'Linux'],
    responsibilities: [{ icon: Cable, text: 'Connect to the existing computer' }, { icon: Monitor, text: 'See the interface without app integrations' }, { icon: Keyboard, text: 'Act as standard keyboard and mouse hardware' }],
    outcomes: [{ label: 'No driver dependency', detail: 'Standard hardware interfaces' }, { label: 'No app-by-app API', detail: 'Works at the interface layer' }, { label: 'Five-minute idea', detail: 'From box to first task quickly' }],
    timelineBullets: ['Plug in', 'Pair', 'Describe'],
  },
  {
    id: 'hardware', title: 'Purpose-Built Hardware', period: '04', timelineYears: 'COMPUTE', timelineOrder: 4,
    category: 'Agent-ready device', image: asset('images/editorial/hardware-anatomy.webp'), video: asset('images/editorial/hardware-anatomy.mp4'), icon: Cpu,
    summary: 'A compact 90 × 92 × 80 mm device combines screen capture, AI acceleration, local memory, wireless connectivity, and a dedicated approval control.',
    tags: ['26 TOPS', '13 GB memory', '128 GB storage', '450 g'],
    responsibilities: [{ icon: Cpu, text: 'Run dedicated on-device acceleration' }, { icon: Brain, text: 'Keep task history and memory local' }, { icon: Cable, text: 'Bridge perception and physical input' }],
    outcomes: [{ label: 'RK3576 octa-core', detail: 'Dedicated compute platform' }, { label: '13 GB total memory', detail: '8 GB LPDDR4X + 5 GB stacked DRAM' }, { label: '128 GB eMMC', detail: 'Local working storage' }],
    timelineBullets: ['See', 'Think', 'Act'],
  },
  {
    id: 'authority', title: 'It Prepares. You Approve.', period: '05', timelineYears: 'TRUST', timelineOrder: 5,
    category: 'Physical authority', image: asset('images/editorial/physical-approval.webp'), video: asset('images/editorial/physical-approval.mp4'), icon: ShieldCheck,
    summary: 'The AI can prepare the work, but the final commitment stays behind a physical confirmation key and a dedicated STM32H563 security MCU.',
    tags: ['Physical key', 'Security MCU', 'Human in control', 'Inspectable actions'],
    responsibilities: [{ icon: Brain, text: 'Prepare the requested action safely' }, { icon: ShieldCheck, text: 'Enforce the approval boundary in hardware' }, { icon: Keyboard, text: 'Release the final step only after confirmation' }],
    outcomes: [{ label: 'A boundary you can touch', detail: 'Not another hidden software policy' }, { label: 'Commitments stay human', detail: 'Payments, sends and destructive actions' }, { label: 'Clear mental model', detail: 'Prepare first, approve second' }],
    timelineBullets: ['Prepare', 'Pause', 'Approve'],
  },
  {
    id: 'memory', title: 'Memory That Stays Close', period: '06', timelineYears: 'REMEMBER', timelineOrder: 6,
    category: 'Personal operating context', image: asset('images/editorial/memory-bg.webp'), icon: Brain,
    summary: 'Files remain on your computer. Task history and memory are stored locally, allowing Violoop to learn useful patterns without becoming a second cloud drive.',
    tags: ['Local history', 'Personal context', 'File privacy', 'Data control'],
    responsibilities: [{ icon: Brain, text: 'Remember corrections and preferences' }, { icon: Eye, text: 'Use only the context a task requires' }, { icon: Smartphone, text: 'Stay useful when you step away' }],
    outcomes: [{ label: 'Your files stay yours', detail: 'No default file upload loop' }, { label: 'Useful continuity', detail: 'Tone, formats and task patterns' }, { label: 'Personal over time', detail: 'Learns from validated work' }],
    timelineBullets: ['Observe', 'Learn', 'Anticipate'],
  },
  {
    id: 'compute', title: 'Local Compute, Open Choice', period: '07', timelineYears: 'CHOOSE', timelineOrder: 7,
    category: 'Local-first architecture', image: asset('images/editorial/board.webp'), icon: Cpu,
    summary: 'On-device perception and storage handle the immediate computer context, while model access can be limited to the filtered information a task actually needs.',
    tags: ['On-device vision', 'Filtered context', 'Model choice', 'Wi-Fi 6 + BT 5.2'],
    responsibilities: [{ icon: Cpu, text: 'Process immediate visual context locally' }, { icon: ShieldCheck, text: 'Reduce unnecessary data movement' }, { icon: Brain, text: 'Use cloud intelligence only when the task calls for it' }],
    outcomes: [{ label: '26 TOPS accelerator', detail: 'Dedicated on-device AI compute' }, { label: 'Configurable direction', detail: 'Built toward stricter residency needs' }, { label: 'Connected when useful', detail: 'Dual-band Wi-Fi and Bluetooth' }],
    timelineBullets: ['Process', 'Filter', 'Decide'],
  },
]

export const PRODUCT_STATS = [
  { icon: Monitor, value: '4K', label: 'Screen capture', detail: 'HDMI 2.0 · 60 Hz' },
  { icon: Keyboard, value: 'USB-HID', label: 'Physical control', detail: 'Keyboard + mouse' },
  { icon: Cpu, value: '26 TOPS', label: 'AI accelerator', detail: 'On-device compute' },
  { icon: Brain, value: '13 GB', label: 'Total memory', detail: '8 GB + 5 GB stacked DRAM' },
] as const
