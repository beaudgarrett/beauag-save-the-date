import { monogram } from '../config/images'

/** The couple's BA monogram artwork, exactly as supplied. */
export function Monogram({ className = '', decorative = false }: { className?: string; decorative?: boolean }) {
  return (
    <img
      className={`monogram ${className}`}
      src={monogram.src}
      width={monogram.width}
      height={monogram.height}
      alt={decorative ? '' : monogram.alt}
    />
  )
}
