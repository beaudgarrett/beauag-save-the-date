import { useEffect, useId, useRef, useState } from 'react'
import { calendarLinks } from '../lib/calendar'

const OPTIONS = [
  { label: 'Apple Calendar', href: calendarLinks.ics, download: true },
  { label: 'Google Calendar', href: calendarLinks.google, download: false },
  { label: 'Outlook', href: calendarLinks.outlook, download: false },
] as const

/** A button that opens a small menu of calendar choices. */
export function AddToCalendar({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={`add-to-calendar ${open ? 'is-open' : ''} ${className}`}>
      <button
        type="button"
        className="button button--outline add-to-calendar__toggle"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={() => setOpen(!open)}
      >
        Add to Calendar
        <span className="add-to-calendar__chevron" aria-hidden="true" />
      </button>
      <ul className="add-to-calendar__menu" id={`${id}-menu`} hidden={!open}>
        {OPTIONS.map((o) => (
          <li key={o.label}>
            <a
              href={o.href}
              onClick={() => setOpen(false)}
              {...(o.download
                ? { download: 'beau-and-ag-wedding.ics' }
                : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {o.label}
              {!o.download && <span className="visually-hidden"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
