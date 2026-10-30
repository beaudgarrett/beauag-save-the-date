import { memo, type CSSProperties } from 'react'
import { Stem, leafPath, seeded, tendrilPoints, type StemPoints } from '../lib/botanical'

/**
 * Signature jade vines. Two mirrored olive-like branches that grow inward from
 * the upper corners on first load, then stay in place to frame the top of
 * every page. Pure SVG, drawn with stroke-dash animation (see vines.css).
 */

interface StemSpec {
  id: string
  points: StemPoints
  /** Parent stem id; growth starts when the parent's stroke reaches this stem's first point. */
  parent?: string
  delay?: number
  duration: number
  width: number
  leaves: { count: number; from: number; to: number; size: number; sides: number[] }
  terminal?: 'leaf' | 'tendril'
  berries?: { at: number; side: number }[]
  tendrils?: { at: number; side: number }[]
}

const STEMS: StemSpec[] = [
  {
    // Main branch along the top edge, drooping as it reaches inward.
    id: 'a',
    points: [[-12, 30], [70, 18], [128, 58], [205, 54], [280, 50], [332, 20], [402, 30], [452, 37], [490, 62], [500, 96]],
    delay: 0.25,
    duration: 2.7,
    width: 1.5,
    leaves: { count: 12, from: 0.05, to: 0.94, size: 36, sides: [1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1] },
    terminal: 'tendril',
    berries: [{ at: 0.42, side: 1 }, { at: 0.8, side: -1 }],
  },
  {
    // Branch falling down the outer edge.
    id: 'b',
    points: [[28, -12], [20, 60], [56, 112], [48, 172], [40, 232], [16, 272], [30, 330], [36, 356], [50, 372], [66, 378]],
    delay: 0.35,
    duration: 2.5,
    width: 1.5,
    leaves: { count: 10, from: 0.06, to: 0.92, size: 34, sides: [1, -1, -1, 1, -1, 1, -1, -1, 1, -1] },
    terminal: 'leaf',
    berries: [{ at: 0.66, side: 1 }],
    tendrils: [{ at: 0.48, side: -1 }],
  },
  {
    id: 'c',
    parent: 'a',
    points: [[140, 57], [160, 96], [196, 122], [238, 128], [262, 131], [282, 124], [294, 114]],
    duration: 1.5,
    width: 1.1,
    leaves: { count: 6, from: 0.12, to: 0.9, size: 26, sides: [1, -1, 1, -1, 1, -1] },
    terminal: 'leaf',
    berries: [{ at: 0.55, side: 1 }],
  },
  {
    id: 'd',
    parent: 'b',
    points: [[47, 152], [80, 162], [102, 190], [108, 226]],
    duration: 1.1,
    width: 1.1,
    leaves: { count: 4, from: 0.2, to: 0.85, size: 24, sides: [-1, 1, -1, 1] },
    terminal: 'tendril',
  },
  {
    id: 'e',
    parent: 'a',
    points: [[334, 31], [346, 12], [366, 6], [388, 10]],
    duration: 0.8,
    width: 1,
    leaves: { count: 2, from: 0.35, to: 0.8, size: 18, sides: [-1, 1] },
    terminal: 'leaf',
  },
  {
    id: 'f',
    parent: 'b',
    points: [[33, 300], [56, 300], [76, 312], [84, 332]],
    duration: 0.9,
    width: 1,
    leaves: { count: 3, from: 0.25, to: 0.85, size: 20, sides: [1, -1, 1] },
    terminal: 'leaf',
  },
]

const LEAF_GROW = 0.9

type Timed = { style: CSSProperties }
const timing = (delay: number, duration?: number, length?: number): Timed => ({
  style: {
    '--d': `${delay.toFixed(2)}s`,
    ...(duration ? { '--t': `${duration.toFixed(2)}s` } : {}),
    ...(length ? { '--len': length.toFixed(1) } : {}),
  } as CSSProperties,
})

const TENDRILS = new Map<number, Stem>()
function tendril(size: number): Stem {
  if (!TENDRILS.has(size)) TENDRILS.set(size, new Stem(tendrilPoints(size)))
  return TENDRILS.get(size)!
}

function buildArtwork() {
  const rand = seeded(7)
  const stems = new Map<string, Stem>()
  const starts = new Map<string, number>()
  const out = {
    stems: [] as { d: string; length: number; width: number; delay: number; duration: number }[],
    leaves: [] as { x: number; y: number; angle: number; size: number; delay: number; tone: number }[],
    berries: [] as { x: number; y: number; angle: number; delay: number }[],
    tendrils: [] as { x: number; y: number; angle: number; size: number; flip: boolean; delay: number }[],
  }

  for (const spec of STEMS) {
    let points = spec.points
    let delay = spec.delay ?? 0
    if (spec.parent) {
      // Snap the branch onto its parent stem and start growing when the parent reaches it.
      const parent = stems.get(spec.parent)!
      const parentSpec = STEMS.find((s) => s.id === spec.parent)!
      const f = parent.fractionNear(...spec.points[0])
      const join = parent.at(f)
      points = [[join.x, join.y], ...spec.points.slice(1)]
      delay = starts.get(spec.parent)! + f * parentSpec.duration
    }
    const stem = new Stem(points)
    stems.set(spec.id, stem)
    starts.set(spec.id, delay)
    out.stems.push({ d: stem.d, length: stem.length, width: spec.width, delay, duration: spec.duration })

    const reach = (f: number) => delay + f * spec.duration
    const { count, from, to, size, sides } = spec.leaves
    for (let i = 0; i < count; i++) {
      const f = from + ((to - from) * i) / Math.max(count - 1, 1) + (rand() - 0.5) * 0.03
      const s = stem.at(f)
      const side = sides[i % sides.length]
      out.leaves.push({
        x: s.x,
        y: s.y,
        angle: s.angle + side * (38 + rand() * 18),
        size: size * (1 - 0.38 * f) * (0.86 + rand() * 0.28),
        delay: reach(f),
        tone: 0.78 + rand() * 0.22,
      })
    }

    const end = stem.at(1)
    if (spec.terminal === 'leaf') {
      out.leaves.push({ x: end.x, y: end.y, angle: end.angle, size: size * 0.62, delay: reach(0.97), tone: 0.9 })
    } else if (spec.terminal === 'tendril') {
      out.tendrils.push({ x: end.x, y: end.y, angle: end.angle, size: 22, flip: false, delay: reach(0.98) })
    }

    for (const b of spec.berries ?? []) {
      const s = stem.at(b.at)
      out.berries.push({ x: s.x, y: s.y, angle: s.angle + b.side * 70, delay: reach(b.at) + 0.15 })
    }
    for (const t of spec.tendrils ?? []) {
      const s = stem.at(t.at)
      out.tendrils.push({ x: s.x, y: s.y, angle: s.angle + t.side * 50, size: 18, flip: t.side < 0, delay: reach(t.at) })
    }
  }
  return out
}

const ART = buildArtwork()
const r2 = (n: number) => Math.round(n * 100) / 100

function VineArtwork() {
  return (
    <svg className="vine__svg" viewBox="0 0 560 420" focusable="false" aria-hidden="true">
      <g className="vine__stems" fill="none" stroke="currentColor" strokeLinecap="round">
        {ART.stems.map((s, i) => (
          <path key={i} className="vine__stem" d={s.d} strokeWidth={s.width} {...timing(s.delay, s.duration, s.length)} />
        ))}
        {ART.tendrils.map((t, i) => (
          <g key={i} transform={`translate(${r2(t.x)} ${r2(t.y)}) rotate(${r2(t.angle)})${t.flip ? ' scale(1 -1)' : ''}`}>
            <path className="vine__tendril" d={tendril(t.size).d} strokeWidth={0.9} {...timing(t.delay, 0.8, tendril(t.size).length)} />
          </g>
        ))}
      </g>

      {ART.berries.map((b, i) => (
        <g key={i} transform={`translate(${r2(b.x)} ${r2(b.y)}) rotate(${r2(b.angle)})`}>
          <g className="vine__bud" {...timing(b.delay)}>
            <path d="M0 0 L9 0 M9 0 L15 -4 M9 0 L15 4" fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
            <ellipse cx={18} cy={-5} rx={3.2} ry={2.6} fill="currentColor" />
            <ellipse cx={18.5} cy={5} rx={3} ry={2.5} fill="currentColor" opacity={0.85} />
            <ellipse cx={11} cy={0} rx={2.4} ry={2} fill="currentColor" opacity={0.7} transform="translate(2 0)" />
          </g>
        </g>
      ))}

      {ART.leaves.map((l, i) => {
        const p = leafPath(l.size)
        return (
          <g key={i} transform={`translate(${r2(l.x)} ${r2(l.y)}) rotate(${r2(l.angle)})`}>
            <g className="vine__leaf" {...timing(l.delay, LEAF_GROW)}>
              <path d={p.petiole} stroke="currentColor" strokeWidth={0.9} strokeLinecap="round" fill="none" />
              <path d={p.blade} fill="currentColor" fillOpacity={r2(l.tone)} />
              <path d={p.vein} className="vine__vein" fill="none" strokeWidth={0.55} strokeLinecap="round" />
            </g>
          </g>
        )
      })}
    </svg>
  )
}

const Artwork = memo(VineArtwork)

export function Vines() {
  return (
    <div className="vines" aria-hidden="true">
      <div className="vine vine--left">
        <Artwork />
      </div>
      <div className="vine vine--right">
        <Artwork />
      </div>
    </div>
  )
}

/** A small horizontal jade laurel sprig used as a section ornament. */
export function Sprig({ className = '' }: { className?: string }) {
  const leaf = leafPath(13, 0.24)
  const pairs = [20, 33, 46, 59]
  return (
    <svg className={`sprig ${className}`} viewBox="0 0 96 24" width="96" height="24" aria-hidden="true" focusable="false">
      <path d="M10 12 C34 12.4 58 12.4 82 12" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {pairs.map((x, i) => {
        const scale = 0.82 + i * 0.06
        return (
          <g key={x}>
            <path d={leaf.blade} fill="currentColor" transform={`translate(${x} 12) rotate(-34) scale(${scale})`} />
            <path d={leaf.blade} fill="currentColor" transform={`translate(${x + 3} 12) rotate(34) scale(${scale})`} />
          </g>
        )
      })}
      <path d={leaf.blade} fill="currentColor" transform="translate(80 12) rotate(-4) scale(0.95)" />
    </svg>
  )
}
