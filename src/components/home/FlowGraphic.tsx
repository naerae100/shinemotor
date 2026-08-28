import { animate, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
import { SETTLE, useSettle } from '../../hooks/useSettle'

/**
 * The hero graphic: metal in, weight taken, money out.
 *
 * One projection system, held to throughout. Anything physical — the copper
 * billets, the weighbridge deck, the load cells — is drawn isometrically as a
 * solid with a lit top face and two shaded sides. Anything digital — the
 * indicator, the payment advice — is a flat panel facing the reader, because
 * that is how a screen actually presents itself. Mixing the two on purpose is
 * what stops it reading as clip art.
 *
 * The sequence loops: the load settles onto the deck, the deck takes it, the
 * indicator counts, the advice is stamped. Every animated element is
 * initialised at its finished value, so reduced motion — or a stalled frame
 * loop — leaves a complete graphic rather than an empty stage.
 */

const NET_KG = 1450
const LOOP = 8.4

const au = (n: number) => Math.round(n).toLocaleString('en-AU')

const STATIONS = [
  { n: '01', title: 'Bring your metal', note: 'Any grade, any volume' },
  { n: '02', title: 'Weighed in front of you', note: 'Our own calibrated scales' },
  { n: '03', title: 'Instant EFT', note: 'Before you drive out' },
]

/* ── Isometric plumbing ──────────────────────────────────────────────────── */

/** Screen position of the scene's ground origin. Everything solid hangs off it,
    so the stack, the deck and the floor all stand on the same plane. */
const WORLD: [number, number] = [400, 158]

type Pt = [number, number]

/** Standard 2:1 isometric. +x runs down-right, +y down-left, +z straight up. */
const project = (x: number, y: number, z: number, ox: number, oy: number): Pt => [
  ox + (x - y) * 0.866,
  oy + (x + y) * 0.5 - z,
]

const poly = (points: Pt[]) => points.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ')

interface BoxProps {
  o: Pt
  x: number
  y: number
  z: number
  w: number
  d: number
  h: number
  top: string
  right: string
  left: string
  /** Hairline along the lit edges. Reads as a machined arris. */
  edge?: string
}

/** A rectangular solid: lit top, shaded right and left. */
function IsoBox({ o, x, y, z, w, d, h, top, right, left, edge }: BoxProps) {
  const p = (X: number, Y: number, Z: number) => project(X, Y, Z, o[0], o[1])
  const topFace: Pt[] = [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)]
  const rightFace: Pt[] = [p(x + w, y, z + h), p(x + w, y + d, z + h), p(x + w, y + d, z), p(x + w, y, z)]
  const leftFace: Pt[] = [p(x, y + d, z + h), p(x + w, y + d, z + h), p(x + w, y + d, z), p(x, y + d, z)]
  return (
    <g shapeRendering="geometricPrecision">
      <polygon points={poly(leftFace)} fill={left} />
      <polygon points={poly(rightFace)} fill={right} />
      <polygon points={poly(topFace)} fill={top} />
      {edge && <polygon points={poly(topFace)} fill="none" stroke={edge} strokeWidth={0.9} />}
    </g>
  )
}

/* Copper and steel as material, not as colour swatches: every face carries its
   own gradient, and only the top face is turned toward the light. */
const CU = {
  top: 'url(#fg-cu-top)',
  right: 'url(#fg-cu-right)',
  left: 'url(#fg-cu-left)',
  edge: 'rgba(255,226,190,0.5)',
}
const CU_DIM = {
  top: 'url(#fg-cu2-top)',
  right: 'url(#fg-cu2-right)',
  left: 'url(#fg-cu2-left)',
  edge: 'rgba(255,226,190,0.28)',
}
const STEEL = {
  top: 'url(#fg-st-top)',
  right: 'url(#fg-st-right)',
  left: 'url(#fg-st-left)',
  edge: 'rgba(226,236,250,0.34)',
}
const PLINTH = { top: '#2a323d', right: '#1d232b', left: '#141920' }

/**
 * Small screens crop the scene rather than shrink it: the same drawing, seen
 * through a tighter window, so the type inside stays readable instead of
 * collapsing to a smudge.
 */
function useWideView() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia('(min-width: 640px)')
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia('(min-width: 640px)').matches,
    () => true,
  )
}

export function FlowGraphic() {
  const wide = useWideView()
  const { reduced: prefersReduced } = useSettle()
  const reduced = Boolean(prefersReduced)
  const stage = useRef<HTMLDivElement>(null)

  /* Pointer parallax: the near layer travels further than the far one. */
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const soft = { stiffness: 70, damping: 18, mass: 0.9 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-3.5, 3.5]), soft)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [2, -2]), soft)
  const far = useSpring(useTransform(px, [-0.5, 0.5], [7, -7]), soft)
  const near = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), soft)

  const track = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced) return
      const box = stage.current?.getBoundingClientRect()
      if (!box) return
      px.set((e.clientX - box.left) / box.width - 0.5)
      py.set((e.clientY - box.top) / box.height - 0.5)
    },
    [px, py, reduced],
  )

  /** The indicator. Starts at the settled figure and is taken down by the loop. */
  const kg = useMotionValue(NET_KG)
  const kgText = useTransform(kg, au)

  useEffect(() => {
    if (reduced) return
    const run = animate(kg, [0, 0, NET_KG, NET_KG, NET_KG], {
      duration: LOOP,
      times: [0, 0.3, 0.56, 0.95, 1],
      ease: [0.16, 1, 0.3, 1],
      repeat: Infinity,
    })
    return () => run.stop()
  }, [kg, reduced])

  const cycle = (y: number[], times: number[]) =>
    reduced
      ? {}
      : {
          animate: { y },
          transition: { duration: LOOP, times, repeat: Infinity, ease: 'easeInOut' as const },
        }

  /** The load coming down onto the deck, and the deck giving under it. */
  const load = cycle([-46, -46, 0, 0, 0, -46], [0, 0.16, 0.3, 0.86, 0.94, 1])
  const deck = cycle([0, 0, 2.5, 2.5, 0, 0], [0, 0.28, 0.36, 0.86, 0.94, 1])
  const advice = cycle([6, 6, 0, 0, 6], [0, 0.56, 0.64, 0.94, 1])

  return (
    <div
      ref={stage}
      onPointerMove={track}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
      className="relative w-full max-w-[720px]"
      style={{ perspective: '1800px' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-[20px] border border-hairline"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(110% 80% at 46% 110%, rgba(255,122,24,0.15) 0%, rgba(255,122,24,0.035) 40%, transparent 70%), linear-gradient(165deg, #141b26 0%, #0c1119 54%, #080b11 100%)',
          }}
        />

        <div className="relative px-2 pt-3 sm:px-4 sm:pt-5">
          <svg
            viewBox={wide ? '0 0 760 300' : '286 14 474 292'}
            className="block h-auto w-full"
            role="img"
            aria-label="Copper stock is brought in, weighed at 1,450 kilograms on the yard weighbridge, and paid by EFT before you leave"
          >
            <defs>
              <linearGradient id="fg-cu-top" x1="0" y1="0" x2="0.35" y2="1">
                <stop offset="0" stopColor="#ffbe80" />
                <stop offset="0.55" stopColor="#e79350" />
                <stop offset="1" stopColor="#c4712f" />
              </linearGradient>
              <linearGradient id="fg-cu-right" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#b0611f" />
                <stop offset="1" stopColor="#7d4014" />
              </linearGradient>
              <linearGradient id="fg-cu-left" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#763a12" />
                <stop offset="1" stopColor="#4d240a" />
              </linearGradient>
              <linearGradient id="fg-cu2-top" x1="0" y1="0" x2="0.35" y2="1">
                <stop offset="0" stopColor="#e0a068" />
                <stop offset="0.55" stopColor="#c87c3f" />
                <stop offset="1" stopColor="#a55f26" />
              </linearGradient>
              <linearGradient id="fg-cu2-right" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#95511a" />
                <stop offset="1" stopColor="#693410" />
              </linearGradient>
              <linearGradient id="fg-cu2-left" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#63300e" />
                <stop offset="1" stopColor="#411d07" />
              </linearGradient>
              <linearGradient id="fg-st-top" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0" stopColor="#a3b1c2" />
                <stop offset="0.5" stopColor="#7b8899" />
                <stop offset="1" stopColor="#5c6878" />
              </linearGradient>
              <linearGradient id="fg-st-right" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#525e6d" />
                <stop offset="1" stopColor="#3a434f" />
              </linearGradient>
              <linearGradient id="fg-st-left" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3a434f" />
                <stop offset="1" stopColor="#252c35" />
              </linearGradient>
              <linearGradient id="fg-panel" x1="0" y1="0" x2="0.55" y2="1">
                <stop offset="0" stopColor="#1e2937" />
                <stop offset="1" stopColor="#0b1017" />
              </linearGradient>
              <linearGradient id="fg-sheen" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="fg-pool" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#000" stopOpacity="0.62" />
                <stop offset="1" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <filter id="fg-lift" x="-40%" y="-40%" width="180%" height="200%">
                <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.55" />
              </filter>
              <radialGradient id="fg-fade" cx="46%" cy="72%" r="58%">
                <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
                <stop offset="0.6" stopColor="#fff" stopOpacity="0.22" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="fg-m-floor">
                <rect x="0" y="0" width="760" height="300" fill="url(#fg-fade)" />
              </mask>
              <mask id="fg-m-stack">
                <BilletStack maskMode />
              </mask>
            </defs>

            {/* The floor. Faint, but it is what puts the objects in a place
                rather than on a background. */}
            <motion.g style={reduced ? undefined : { x: far }} mask="url(#fg-m-floor)">
              <IsoFloor o={WORLD} />
            </motion.g>

            {/* ── 01 · The metal, as it stacks ─────────────────────────────── */}
            <motion.g style={reduced ? undefined : { x: near }}>
              <ellipse cx={180} cy={210} rx={98} ry={21} fill="url(#fg-pool)" />
              <BilletStack />
              {/* Light travelling across the top faces, clipped to the stack. */}
              {!reduced && (
                <g mask="url(#fg-m-stack)" style={{ animation: 'fg-sweep 5.5s ease-in-out infinite' }}>
                  <rect x={-140} y={60} width={120} height={220} fill="url(#fg-sheen)" opacity={0.5} />
                </g>
              )}
            </motion.g>

            {/* ── 02 · The weighbridge ─────────────────────────────────────── */}
            <g>
              <ellipse cx={416} cy={232} rx={128} ry={26} fill="url(#fg-pool)" />
              {/* Load cells: the deck stands on them, not on the ground. */}
              <IsoBox o={WORLD} x={12} y={12} z={-18} w={22} d={22} h={18} {...PLINTH} />
              <IsoBox o={WORLD} x={116} y={12} z={-18} w={22} d={22} h={18} {...PLINTH} />
              <IsoBox o={WORLD} x={12} y={78} z={-18} w={22} d={22} h={18} {...PLINTH} />
              <IsoBox o={WORLD} x={116} y={78} z={-18} w={22} d={22} h={18} {...PLINTH} />
              <motion.g {...deck}>
                {/* Deck: one broad machined slab. */}
                <IsoBox o={WORLD} x={0} y={0} z={0} w={150} d={112} h={17} {...STEEL} />
                <DeckGroove o={WORLD} />
                <motion.g {...load}>
                  <IsoBox o={WORLD} x={26} y={24} z={17} w={100} d={26} h={18} {...CU} />
                  <IsoBox o={WORLD} x={26} y={60} z={17} w={100} d={26} h={18} {...CU_DIM} />
                  <IsoBox o={WORLD} x={26} y={42} z={35} w={100} d={26} h={18} {...CU} />
                </motion.g>
              </motion.g>
            </g>

            {/* ── The indicator: the one number in the transaction ──────────── */}
            <motion.g
              style={reduced ? undefined : { x: near }}
              filter="url(#fg-lift)"
              animate={reduced ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            >
              <rect x={286} y={28} width={196} height={86} rx={14} fill="url(#fg-panel)" />
              <rect
                x={286}
                y={28}
                width={196}
                height={86}
                rx={14}
                fill="none"
                stroke="rgba(255,255,255,0.13)"
                strokeWidth={1}
              />
              <rect x={302} y={29} width={164} height={1} fill="rgba(255,255,255,0.18)" />
              <text x={308} y={57} className="font-mono" fontSize={10} letterSpacing={1.9} fill="#8fa0b6">
                NET WEIGHT
              </text>
              <motion.text
                x={308}
                y={95}
                className="font-display"
                fontSize={36}
                fill="#f2f6fb"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {kgText}
              </motion.text>
              <text x={432} y={95} className="font-mono" fontSize={15} fill="#ffb020">
                kg
              </text>
              <circle cx={460} cy={51} r={4} fill="#ffb020">
                {!reduced && (
                  <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
                )}
              </circle>
            </motion.g>

            {/* ── 03 · The payment advice ──────────────────────────────────── */}
            <motion.g style={reduced ? undefined : { x: near }}>
              <ellipse cx={638} cy={250} rx={92} ry={19} fill="url(#fg-pool)" />
              <motion.g {...advice} filter="url(#fg-lift)">
                <rect x={548} y={104} width={180} height={132} rx={14} fill="url(#fg-panel)" />
                <rect
                  x={548}
                  y={104}
                  width={180}
                  height={132}
                  rx={14}
                  fill="none"
                  stroke="rgba(255,255,255,0.13)"
                  strokeWidth={1}
                />
                <rect x={564} y={105} width={148} height={1} fill="rgba(255,255,255,0.18)" />

                <text x={568} y={131} className="font-mono" fontSize={10} letterSpacing={1.7} fill="#8fa0b6">
                  EFT PAYMENT
                </text>
                <line x1={568} y1={143} x2={708} y2={143} stroke="rgba(255,255,255,0.10)" strokeWidth={1} />

                <text x={568} y={166} className="font-mono" fontSize={11} fill="#8fa0b6">
                  NET
                </text>
                <text
                  x={708}
                  y={166}
                  textAnchor="end"
                  className="font-mono"
                  fontSize={11.5}
                  fill="#f2f6fb"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  1,450 kg
                </text>

                <text x={568} y={188} className="font-mono" fontSize={11} fill="#8fa0b6">
                  CLEARED
                </text>
                <text x={708} y={188} textAnchor="end" className="font-mono" fontSize={11.5} fill="#f2f6fb">
                  ON THE SPOT
                </text>

                <rect x={568} y={200} width={96} height={24} rx={7} fill="#ffb020" />
                <text
                  x={616}
                  y={216}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize={11}
                  fontWeight={600}
                  letterSpacing={1.8}
                  fill="#07090d"
                >
                  PAID
                </text>
                <circle cx={694} cy={212} r={13} fill="none" stroke="#ffb020" strokeWidth={1.4} opacity={0.45} />
                <motion.path
                  d="M687 212 L692 217 L702 206"
                  fill="none"
                  stroke="#ffb020"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 1.3, ease: SETTLE }}
                />
              </motion.g>
            </motion.g>

            {/* The run, tying the three together underneath. */}
            <motion.g style={reduced ? undefined : { x: far }}>
              <line
                x1={70}
                y1={276}
                x2={700}
                y2={276}
                stroke="rgba(232,240,252,0.10)"
                strokeWidth={1}
                strokeDasharray="2 8"
              />
              {!reduced && (
                <motion.rect
                  y={274.5}
                  width={70}
                  height={3}
                  rx={1.5}
                  fill="#ffb020"
                  opacity={0.55}
                  animate={{ x: [90, 90, 360, 360, 600, 600] }}
                  transition={{
                    duration: LOOP,
                    times: [0, 0.16, 0.3, 0.58, 0.72, 1],
                    repeat: Infinity,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              )}
            </motion.g>
          </svg>
        </div>

        <ol className="relative grid grid-cols-3 border-t border-hairline">
          {STATIONS.map((s) => (
            <li key={s.n} className="border-hairline px-3 py-4 [&:not(:first-child)]:border-l sm:px-5">
              <span className="font-mono text-[10px] tracking-[0.18em] text-amber">{s.n}</span>
              <p className="mt-1.5 text-[13px] text-bright sm:text-[14.5px]">{s.title}</p>
              <p className="mt-0.5 text-[11.5px] text-muted sm:text-[12.5px]">{s.note}</p>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  )
}

/** A ground plane in the same projection, drawn as a lattice of hairlines. */
function IsoFloor({ o }: { o: Pt }) {
  const span = 460
  const step = 46
  const lines: string[] = []
  for (let i = -span; i <= span; i += step) {
    const a = project(i, -span, 0, o[0], o[1])
    const b = project(i, span, 0, o[0], o[1])
    lines.push(`M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`)
    const c = project(-span, i, 0, o[0], o[1])
    const d = project(span, i, 0, o[0], o[1])
    lines.push(`M${c[0].toFixed(1)} ${c[1].toFixed(1)} L${d[0].toFixed(1)} ${d[1].toFixed(1)}`)
  }
  return (
    <path
      d={lines.join(' ')}
      fill="none"
      stroke="rgba(232,240,252,0.16)"
      strokeWidth={0.75}
      vectorEffect="non-scaling-stroke"
    />
  )
}

/** Two machined grooves across the deck — they give the slab its scale. */
function DeckGroove({ o }: { o: Pt }) {
  const line = (y: number) => {
    const a = project(8, y, 17, o[0], o[1])
    const b = project(142, y, 17, o[0], o[1])
    return `M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`
  }
  return (
    <g fill="none" strokeWidth={1}>
      <path d={line(13)} stroke="rgba(12,16,22,0.45)" />
      <path d={line(14.4)} stroke="rgba(226,236,250,0.16)" />
      <path d={line(98)} stroke="rgba(12,16,22,0.45)" />
      <path d={line(99.4)} stroke="rgba(226,236,250,0.16)" />
    </g>
  )
}

/**
 * Six billets stacked three-two-one, the way bar stock is actually racked.
 * In mask mode the faces are drawn white so the stack can clip the travelling
 * highlight to its own silhouette.
 */
function BilletStack({ maskMode = false }: { maskMode?: boolean }) {
  const flat = { top: '#fff', right: '#fff', left: '#fff' }
  const bar = (i: number) => (maskMode ? flat : i % 2 === 0 ? CU : CU_DIM)
  /* Offset in world units. x and y are shifted equally so the stack lands to
     the left of the deck without leaving the ground plane. */
  const bx = -132
  const by = 132
  const W = 100
  const D = 24
  const H = 19
  return (
    <g>
      {[0, 28, 56].map((y, i) => (
        <IsoBox key={`b${y}`} o={WORLD} x={bx} y={by + y} z={0} w={W} d={D} h={H} {...bar(i)} />
      ))}
      {[14, 42].map((y, i) => (
        <IsoBox key={`m${y}`} o={WORLD} x={bx} y={by + y} z={21} w={W} d={D} h={H} {...bar(i + 1)} />
      ))}
      <IsoBox o={WORLD} x={bx} y={by + 28} z={42} w={W} d={D} h={H} {...bar(0)} />
    </g>
  )
}
