/**
 * Geometry helpers for the jade botanical vines.
 *
 * Stems are chains of cubic Bézier segments. Leaves, berries and tendrils are
 * placed by arc length along a stem so their growth can be timed to the moment
 * the drawing stroke reaches them.
 */

export type Pt = readonly [number, number]
/** A stem: a start point followed by groups of three points (c1, c2, end). */
export type StemPoints = readonly Pt[]

interface Sample {
  x: number
  y: number
  angle: number // tangent, degrees
  len: number // cumulative arc length
}

function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): [number, number, number] {
  const mt = 1 - t
  const x = mt * mt * mt * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t * t * t * p3[0]
  const y = mt * mt * mt * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t * t * t * p3[1]
  const dx = 3 * mt * mt * (p1[0] - p0[0]) + 6 * mt * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0])
  const dy = 3 * mt * mt * (p1[1] - p0[1]) + 6 * mt * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1])
  return [x, y, (Math.atan2(dy, dx) * 180) / Math.PI]
}

export class Stem {
  readonly d: string
  readonly length: number
  private samples: Sample[] = []

  constructor(points: StemPoints) {
    const [start, ...rest] = points
    let d = `M${start[0]} ${start[1]}`
    let prev = start
    let len = 0
    let last: [number, number] = [start[0], start[1]]
    for (let i = 0; i + 2 < rest.length; i += 3) {
      const [c1, c2, end] = [rest[i], rest[i + 1], rest[i + 2]]
      d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${end[0]} ${end[1]}`
      for (let s = 0; s <= 60; s++) {
        const [x, y, angle] = cubic(prev, c1, c2, end, s / 60)
        len += Math.hypot(x - last[0], y - last[1])
        last = [x, y]
        this.samples.push({ x, y, angle, len })
      }
      prev = end
    }
    this.d = d
    this.length = len
  }

  /** Fraction of the stem's length closest to a point (used to time branches). */
  fractionNear(x: number, y: number): number {
    let best = this.samples[0]
    let bestD = Infinity
    for (const s of this.samples) {
      const d = (s.x - x) ** 2 + (s.y - y) ** 2
      if (d < bestD) {
        bestD = d
        best = s
      }
    }
    return best.len / this.length
  }

  /** Point and tangent at a fraction (0–1) of the stem's length. */
  at(f: number): Sample {
    const target = Math.min(Math.max(f, 0), 1) * this.length
    let lo = 0
    let hi = this.samples.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (this.samples[mid].len < target) lo = mid + 1
      else hi = mid
    }
    return this.samples[lo]
  }
}

/** Lanceolate, olive-like leaf with its base at the origin, pointing along +x. */
export function leafPath(len: number, width = 0.2): { blade: string; vein: string; petiole: string } {
  const p = len * 0.12
  const w = len * width
  const r = (n: number) => Math.round(n * 100) / 100
  return {
    petiole: `M0 0 L${r(p)} 0`,
    blade:
      `M${r(p)} 0 C${r(p + len * 0.22)} ${r(-w * 1.05)} ${r(len * 0.74)} ${r(-w * 0.95)} ${r(len)} 0 ` +
      `C${r(len * 0.72)} ${r(w * 0.8)} ${r(p + len * 0.2)} ${r(w * 0.95)} ${r(p)} 0Z`,
    vein: `M${r(p + len * 0.04)} 0 Q${r(len * 0.55)} ${r(-len * 0.025)} ${r(len * 0.9)} 0`,
  }
}

/** A small curling tendril beginning at the origin and heading along +x. */
export function tendrilPoints(size: number): StemPoints {
  const k = size / 20
  const raw: [number, number][] = [
    [0, 0], [6, 1], [14, 4], [17, 10],
    [20, 16], [16, 21], [11, 19],
    [7, 17], [8, 12], [12, 12.5],
    [14, 13], [14, 15], [12.5, 15.5],
  ]
  return raw.map(([x, y]) => [Math.round(x * k * 100) / 100, Math.round(y * k * 100) / 100] as const)
}

/** Deterministic pseudo-random sequence so the artwork renders identically every time. */
export function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}
