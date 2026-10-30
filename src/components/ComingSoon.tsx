import { COMING_SOON } from '../config/wedding'

export function ComingSoon({ label = COMING_SOON }: { label?: string }) {
  return (
    <p className="coming-soon">
      <span className="coming-soon__rule" aria-hidden="true" />
      <span>{label}</span>
      <span className="coming-soon__rule" aria-hidden="true" />
    </p>
  )
}
