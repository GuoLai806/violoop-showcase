import type { MapProvinceId } from '../../data/mapProjects'

export const CHINA_MAP_VB = { width: 1000, height: 738 } as const

type MapNetworkProps = {
  litProvinceIds: Set<string>
  hoveredProvinceId: string | null
  selectedProvinceId: string | null
  onProvinceEnter: (provinceId: string) => void
  onProvinceLeave: (provinceId: string) => void
  onProvinceClick: (provinceId: string) => void
}

const nodes: Array<{ id: MapProvinceId; x: number; y: number }> = [
  { id: 'CNSH', x: 720, y: 245 },
  { id: 'CNSZ', x: 655, y: 420 },
  { id: 'SGSIN', x: 505, y: 615 },
]

function lineStyle(from: (typeof nodes)[number], to: (typeof nodes)[number]) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  return {
    left: `${(from.x / CHINA_MAP_VB.width) * 100}%`,
    top: `${(from.y / CHINA_MAP_VB.height) * 100}%`,
    width: `${(Math.hypot(dx, dy) / CHINA_MAP_VB.width) * 100}%`,
    transform: `rotate(${Math.atan2(dy, dx) * (180 / Math.PI)}deg)`,
    transformOrigin: '0 50%',
  }
}

export default function ChinaMapSvg({ litProvinceIds, hoveredProvinceId, selectedProvinceId, onProvinceEnter, onProvinceLeave, onProvinceClick }: MapNetworkProps) {
  const connections: Array<[(typeof nodes)[number], (typeof nodes)[number]]> = [[nodes[0], nodes[1]], [nodes[1], nodes[2]], [nodes[0], nodes[2]]]

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#08060d]" aria-label="Violoop APAC workplaces">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(168,85,247,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.08)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="absolute left-[28%] top-[8%] h-[70%] w-[52%] rounded-[45%] bg-[#7c3aed]/10 blur-[90px]" />
      <div className="absolute left-[45%] top-[54%] h-[38%] w-[38%] rounded-full bg-[#d946ef]/10 blur-[80px]" />

      {connections.map(([from, to]) => (
        <div key={`${from.id}-${to.id}`} className="absolute h-px bg-gradient-to-r from-[#7C3AED]/35 via-[#D946EF]/90 to-[#A855F7]/35 shadow-[0_0_16px_rgba(168,85,247,.8)]" style={lineStyle(from, to)} />
      ))}

      {nodes.map((node) => {
        const active = selectedProvinceId === node.id
        const hovered = hoveredProvinceId === node.id
        return (
          <button
            key={node.id}
            id={node.id}
            type="button"
            className="absolute z-[2] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none"
            style={{ left: `${(node.x / CHINA_MAP_VB.width) * 100}%`, top: `${(node.y / CHINA_MAP_VB.height) * 100}%` }}
            onMouseEnter={() => onProvinceEnter(node.id)}
            onMouseLeave={() => onProvinceLeave(node.id)}
            onClick={(event) => { event.stopPropagation(); if (litProvinceIds.has(node.id)) onProvinceClick(node.id) }}
            aria-label={`${node.id}, Violoop workplace`}
          >
            <span className={`absolute inset-4 rounded-full border transition duration-300 ${active ? 'border-[#F0ABFC] bg-[#7C3AED]/35 shadow-[0_0_42px_rgba(168,85,247,.95)]' : hovered ? 'border-[#D8B4FE] bg-[#A855F7]/25 shadow-[0_0_32px_rgba(168,85,247,.75)]' : 'border-[#A855F7]/70 bg-[#4C1D95]/30 shadow-[0_0_22px_rgba(168,85,247,.45)]'}`} />
            <span className="absolute inset-[38px] rounded-full bg-[#F5D0FE] shadow-[0_0_18px_rgba(240,171,252,1)]" />
            <span className="absolute inset-0 animate-ping rounded-full border border-[#A855F7]/20 [animation-duration:2.8s]" />
          </button>
        )
      })}

      <div className="pointer-events-none absolute left-[7%] top-[10%] text-[10px] uppercase tracking-[0.34em] text-[#C4B5FD]/35">Asia-Pacific / Company Network</div>
      <div className="pointer-events-none absolute bottom-[9%] right-[7%] text-right text-[10px] uppercase tracking-[0.3em] text-[#C4B5FD]/30">3 workplaces<br />1 global team</div>
    </div>
  )
}
