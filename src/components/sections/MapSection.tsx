import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import FadeIn from '../ui/FadeIn'
import ChinaMapSvg, { CHINA_MAP_VB } from '../ui/ChinaMapSvg'
import {
  getProvinceLabel,
  getProvinceLabels,
  MAP_CITIES,
  type MapProjectItem,
  type MapProvinceId,
  type ProvinceLabel,
} from '../../data/mapProjects'

const MIN_ZOOM = 0.55
const MAX_ZOOM = 2.8
const ZOOM_STEP = 0.2
/** 默认镜头：聚焦东部/南部有项目区域（非整国全貌） */
const DEFAULT_ZOOM = 1.42
const DEFAULT_PAN = { x: -56, y: -32 }
const LONG_PRESS_MS = 280
const DRAG_MOVE_PX = 6

function isProvincePath(node: Element | null): node is SVGPathElement {
  return !!node && node instanceof SVGPathElement && /^CN[A-Z]{2}$/.test(node.id)
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

/** 省份标注：省名 + 项目数；字号随地图放大，避免缩放后过小 */
function ProvinceLabelMark({
  label,
  active,
  zoom,
  onSelect,
}: {
  label: ProvinceLabel
  active: boolean
  zoom: number
  onSelect: () => void
}) {
  const left = `${(label.x / CHINA_MAP_VB.width) * 100}%`
  const top = `${(label.y / CHINA_MAP_VB.height) * 100}%`
  // 轻微抑制极端放大，但仍随地图变大，保证可读
  const labelScale = clamp(Math.pow(zoom, -0.25), 0.72, 1.05)

  return (
    <button
      type="button"
      className="absolute z-10 focus:outline-none"
      style={{
        left,
        top,
        transform: `translate(-50%, -50%) scale(${labelScale})`,
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      aria-label={`${label.name}, Violoop workplace`}
    >
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border pl-2.5 pr-1.5 py-1 font-['Noto_Sans_SC','Kanit',sans-serif] text-[12px] leading-none tracking-[0.08em] backdrop-blur-[6px] transition duration-200 sm:text-[13px] ${
          active
            ? 'border-[#7CEBDD]/70 bg-[#2a1744]/92 text-[#E6FFFB] shadow-[0_0_16px_rgba(21,184,166,0.45)]'
            : 'border-white/10 bg-black/55 text-[#E8E4F0]/90 hover:border-[#5EEAD4]/45 hover:bg-[#1a1228]/85 hover:text-[#E6FFFB]'
        }`}
      >
        {label.name}
        <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-[#99F6E4] shadow-[0_0_10px_rgba(153,246,228,1)]' : 'bg-[#15B8A6]'}`} />
      </span>
    </button>
  )
}

const PAGE_SIZE = 5

function ProvincePanel({
  province,
  selectedProject,
  onSelectProject,
  onBackToList,
  onClose,
}: {
  province: ProvinceLabel
  selectedProject: MapProjectItem | null
  onSelectProject: (project: MapProjectItem) => void
  onBackToList: () => void
  onClose: () => void
}) {
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(province.projects.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages - 1)
  const pageItems = province.projects.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  )

  useEffect(() => {
    setPage(0)
  }, [province.provinceId])

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.22 }}
      className="flex min-h-[360px] w-full flex-col rounded-[24px] border border-mist/15 bg-[#0f0f14] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-6 lg:h-[min(72vh,720px)] lg:min-h-0 lg:max-w-[380px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.14em] text-[#5EEAD4]">
            {province.region} · VIOLOOP WORKPLACE
          </p>
          <h3 className="mt-2 text-2xl font-bold text-mist">{province.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-mist/15 text-mist/60 transition hover:border-mist/30 hover:text-mist"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div
            key={`list-${province.provinceId}-${safePage}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-5 flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
              {pageItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectProject(item)}
                  className="w-full rounded-2xl border border-mist/10 bg-[#14141a] px-4 py-3 text-left transition hover:border-[#15B8A6]/50 hover:bg-[#15B8A6]/8"
                >
                  <p className="text-[11px] tracking-[0.12em] text-mist/40">
                    {item.year} · {item.category}
                    {item.cityName ? ` · ${item.cityName}` : ''}
                  </p>
                  <p className="mt-1 text-sm font-medium text-mist">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-mist/45">
                    {item.blurb}
                  </p>
                </button>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between border-t border-mist/10 pt-3">
                <button
                  type="button"
                  disabled={safePage <= 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-mist/15 px-2.5 py-1.5 text-xs text-mist/60 transition hover:border-mist/30 hover:text-mist disabled:opacity-30"
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>
                <p className="text-[11px] tabular-nums tracking-wide text-mist/40">
                  {safePage + 1} / {totalPages}
                </p>
                <button
                  type="button"
                  disabled={safePage >= totalPages - 1}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-mist/15 px-2.5 py-1.5 text-xs text-mist/60 transition hover:border-mist/30 hover:text-mist disabled:opacity-30"
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-5 flex min-h-0 flex-1 flex-col"
          >
            <button
              type="button"
              onClick={onBackToList}
              className="mb-4 inline-flex items-center gap-1 text-xs text-mist/45 transition hover:text-mist/80"
            >
              <ChevronLeft size={14} />
              Back to {province.name} workplace
            </button>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#15B8A6]/50 bg-[#15B8A6]/10 px-3 py-1 text-xs text-[#CCFBF1]">
                {selectedProject.category}
              </span>
              <span className="rounded-full border border-mist/15 px-3 py-1 text-xs text-mist/55">
                {selectedProject.year}
              </span>
              {selectedProject.cityName && (
                <span className="rounded-full border border-mist/15 px-3 py-1 text-xs text-mist/55">
                  {selectedProject.cityName}
                </span>
              )}
            </div>

            <h4 className="mt-4 text-xl font-bold leading-snug text-mist">
              {selectedProject.title}
            </h4>
            <p className="mt-3 text-sm leading-7 text-mist/65">{selectedProject.blurb}</p>

            <ul className="mt-5 space-y-3 border-t border-mist/10 pt-5">
              {selectedProject.details.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-6 text-mist/55">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#7CEBDD]/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}

function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}) {
  return (
    <div className="pointer-events-auto absolute bottom-4 right-4 z-30 flex flex-col gap-1.5 sm:bottom-5 sm:right-5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onZoomIn()
        }}
        disabled={zoom >= MAX_ZOOM}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-mist/15 bg-black/55 text-mist/80 backdrop-blur-sm transition hover:border-[#15B8A6]/50 hover:text-mist disabled:opacity-35"
        aria-label="Zoom in"
      >
        <Plus size={16} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onZoomOut()
        }}
        disabled={zoom <= MIN_ZOOM}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-mist/15 bg-black/55 text-mist/80 backdrop-blur-sm transition hover:border-[#15B8A6]/50 hover:text-mist disabled:opacity-35"
        aria-label="Zoom out"
      >
        <Minus size={16} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onReset()
        }}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-mist/15 bg-black/55 text-mist/80 backdrop-blur-sm transition hover:border-[#15B8A6]/50 hover:text-mist"
        aria-label="Reset view"
      >
        <RotateCcw size={14} />
      </button>
      <p className="pt-0.5 text-center text-[10px] tabular-nums text-mist/35">
        {Math.round(zoom * 100)}%
      </p>
    </div>
  )
}

export default function MapSection() {
  const [hoveredProvinceId, setHoveredProvinceId] = useState<string | null>(null)
  const [selectedProvinceId, setSelectedProvinceId] = useState<MapProvinceId | null>('CNSZ')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [pan, setPan] = useState(DEFAULT_PAN)
  const [isPanning, setIsPanning] = useState(false)
  const [baseSize, setBaseSize] = useState({ w: 0, h: 0 })

  const viewportRef = useRef<HTMLDivElement>(null)
  const panRef = useRef(pan)
  const litProvinceIdsRef = useRef<Set<string>>(new Set())
  const selectProvinceRef = useRef<(id: MapProvinceId) => void>(() => {})
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
    armed: boolean
    moved: boolean
  } | null>(null)

  useEffect(() => {
    panRef.current = pan
  }, [pan])

  // 按视口实测宽高算 1x 地图尺寸，再乘 zoom，保证真正放大地图而非只缩放文字
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const update = () => {
      const width = el.clientWidth
      const height = el.clientHeight
      if (width <= 0 || height <= 0) return
      const mapAspect = CHINA_MAP_VB.width / CHINA_MAP_VB.height
      const boxAspect = width / height
      if (boxAspect > mapAspect) {
        setBaseSize({ w: height * mapAspect, h: height })
      } else {
        setBaseSize({ w: width, h: width / mapAspect })
      }
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }

  const armPan = (el: HTMLDivElement, pointerId: number) => {
    const drag = dragRef.current
    if (!drag || drag.armed) return
    drag.armed = true
    setIsPanning(true)
    try {
      el.setPointerCapture(pointerId)
    } catch {
      /* ignore */
    }
  }

  const litProvinceIds = useMemo(() => {
    const ids = new Set<string>()
    for (const city of MAP_CITIES) {
      if (city.projects.length > 0) ids.add(city.provinceId)
    }
    return ids
  }, [])

  useEffect(() => {
    litProvinceIdsRef.current = litProvinceIds
  }, [litProvinceIds])

  const provinceLabels = useMemo(() => getProvinceLabels(MAP_CITIES), [])

  const selectedProvince = selectedProvinceId
    ? getProvinceLabel(MAP_CITIES, selectedProvinceId)
    : null
  const selectedProject =
    selectedProvince?.projects.find((item) => item.id === selectedProjectId) ?? null

  const selectProvince = useCallback((provinceId: MapProvinceId) => {
    setSelectedProvinceId(provinceId)
    setSelectedProjectId(null)
  }, [])

  useEffect(() => {
    selectProvinceRef.current = selectProvince
  }, [selectProvince])

  const resetView = useCallback(() => {
    setZoom(DEFAULT_ZOOM)
    setPan(DEFAULT_PAN)
  }, [])

  const applyZoom = useCallback((nextZoom: number, originX?: number, originY?: number) => {
    setZoom((prevZoom) => {
      const z = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)
      if (z === prevZoom) return prevZoom

      const viewport = viewportRef.current
      if (viewport && originX != null && originY != null) {
        const rect = viewport.getBoundingClientRect()
        const cx = originX - rect.left - rect.width / 2
        const cy = originY - rect.top - rect.height / 2
        setPan((prev) => ({
          x: cx - ((cx - prev.x) * z) / prevZoom,
          y: cy - ((cy - prev.y) * z) / prevZoom,
        }))
      }
      return z
    })
  }, [])

  // 原生指针事件：短按选省；长按 / 拖动平移。捕获仅在进入拖拽后启用，避免吞掉省份点击。
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      const target = e.target as Element | null
      if (target?.closest?.('button')) return

      clearLongPressTimer()
      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        originX: panRef.current.x,
        originY: panRef.current.y,
        armed: false,
        moved: false,
      }

      longPressTimerRef.current = setTimeout(() => {
        armPan(el, e.pointerId)
      }, LONG_PRESS_MS)
    }

    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== e.pointerId) return

      const dx = e.clientX - drag.startX
      const dy = e.clientY - drag.startY
      const dist = Math.hypot(dx, dy)

      if (!drag.armed && dist > DRAG_MOVE_PX) {
        clearLongPressTimer()
        armPan(el, e.pointerId)
      }

      if (!drag.armed) return

      drag.moved = true
      setPan({ x: drag.originX + dx, y: drag.originY + dy })
    }

    const onPointerUp = (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== e.pointerId) return

      clearLongPressTimer()
      const panned = drag.armed || drag.moved
      dragRef.current = null
      setIsPanning(false)
      try {
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }

      if (panned) return

      // 短按：命中点亮省份路径 → 打开列表（不依赖 SVG click，兼容拖拽手势层）
      const stack = document.elementsFromPoint(e.clientX, e.clientY)
      for (const node of stack) {
        if (node instanceof HTMLElement && node.closest('button')) return
        if (isProvincePath(node) && litProvinceIdsRef.current.has(node.id)) {
          selectProvinceRef.current(node.id as MapProvinceId)
          return
        }
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)
    return () => {
      clearLongPressTimer()
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  // 非 passive 滚轮，避免页面跟着滚
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY > 0 ? 0.9 : 1.1
      setZoom((prevZoom) => {
        const z = clamp(prevZoom * factor, MIN_ZOOM, MAX_ZOOM)
        if (z === prevZoom) return prevZoom
        const rect = el.getBoundingClientRect()
        const cx = e.clientX - rect.left - rect.width / 2
        const cy = e.clientY - rect.top - rect.height / 2
        setPan((prev) => ({
          x: cx - ((cx - prev.x) * z) / prevZoom,
          y: cy - ((cy - prev.y) * z) / prevZoom,
        }))
        return z
      })
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <section
      id="map"
      className="relative z-10 overflow-x-clip bg-dark px-3 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1500px] px-2 sm:px-4 md:px-6">
        <FadeIn y={36} onMount>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 120px)' }}
          >
            Workplaces
          </h2>
        </FadeIn>

        <FadeIn delay={0.06} y={20} onMount>
          <div className="mx-auto mt-4 flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="h-1 w-16 rounded-full bg-gradient-to-r from-[#0B7F75] via-[#7CEBDD] to-[#5BCFC0]" />
            <p className="text-sm font-light tracking-[0.14em] text-mist/55 sm:text-base">
              VIOLOOP APAC WORKPLACES&nbsp;&nbsp;|&nbsp;&nbsp;SELECT A CITY · SCROLL TO ZOOM · DRAG TO EXPLORE
            </p>
            <p className="rounded-full border border-[#15B8A6]/35 bg-[#15B8A6]/10 px-4 py-1.5 text-sm tracking-wide text-[#CCFBF1]">
              <span className="font-semibold tabular-nums text-mist">3</span> COMPANY WORKPLACES ACROSS ASIA
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.14} y={28} onMount>
          <div className="mt-6 grid gap-5 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-stretch">
            <div
              ref={viewportRef}
              className={`relative h-[min(58vh,520px)] w-full overflow-hidden rounded-[28px] border border-mist/15 bg-[#06060a] select-none touch-none lg:h-[min(72vh,720px)] ${
                isPanning ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              {/* 布局尺寸 = 视口适配尺寸 × zoom，SVG 按像素重绘，真正放大地图 */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px)`,
                }}
              >
                <div
                  className="relative shrink-0"
                  style={{
                    width: baseSize.w > 0 ? baseSize.w * zoom : '100%',
                    height: baseSize.h > 0 ? baseSize.h * zoom : '100%',
                  }}
                >
                  <ChinaMapSvg
                    litProvinceIds={litProvinceIds}
                    hoveredProvinceId={hoveredProvinceId}
                    selectedProvinceId={selectedProvinceId}
                    onProvinceEnter={(id) => setHoveredProvinceId(id)}
                    onProvinceLeave={(id) =>
                      setHoveredProvinceId((cur) => (cur === id ? null : cur))
                    }
                    onProvinceClick={(id) => {
                      if (litProvinceIds.has(id)) selectProvince(id as MapProvinceId)
                    }}
                  />

                  {provinceLabels.map((label) => (
                    <ProvinceLabelMark
                      key={label.provinceId}
                      label={label}
                      active={selectedProvinceId === label.provinceId}
                      zoom={zoom}
                      onSelect={() => selectProvince(label.provinceId)}
                    />
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-2xl border border-mist/10 bg-black/50 px-3 py-2 text-[11px] text-mist/50 backdrop-blur-sm sm:left-5 sm:top-5 sm:text-xs">
                {litProvinceIds.size} COMPANY WORKPLACES · ONE GLOBAL TEAM
                {isPanning && (
                  <span className="ml-2 text-[#5EEAD4]">MOVING</span>
                )}
              </div>

              <p className="pointer-events-none absolute bottom-4 left-4 z-20 text-[10px] text-mist/25 sm:bottom-5 sm:left-5">
                SINGAPORE · SHANGHAI · SHENZHEN
              </p>

              <ZoomControls
                zoom={zoom}
                onZoomIn={() => applyZoom(zoom + ZOOM_STEP)}
                onZoomOut={() => applyZoom(zoom - ZOOM_STEP)}
                onReset={resetView}
              />
            </div>

            <AnimatePresence mode="wait">
              {selectedProvince ? (
                <ProvincePanel
                  key={selectedProvince.provinceId}
                  province={selectedProvince}
                  selectedProject={selectedProject}
                  onSelectProject={(item) => setSelectedProjectId(item.id)}
                  onBackToList={() => setSelectedProjectId(null)}
                  onClose={() => {
                    setSelectedProvinceId(null)
                    setSelectedProjectId(null)
                  }}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[220px] items-center justify-center rounded-[24px] border border-dashed border-mist/15 bg-[#0f0f14]/80 p-6 text-center text-sm text-mist/40 lg:h-[min(72vh,720px)] lg:min-h-0"
                >
                  Select a highlighted city to explore the workplace
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
