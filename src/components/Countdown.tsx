import { useEffect, useState } from 'react'
import { wedding } from '../config/wedding'

// Midnight on the wedding day, Eastern Daylight Time (Travelers Rest, SC).
const TARGET = new Date(`${wedding.date.iso}T00:00:00-04:00`).getTime()

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
] as const

function remaining(now: number) {
  const ms = Math.max(0, TARGET - now)
  const s = Math.floor(ms / 1000)
  return {
    done: ms === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

/** Live countdown to the wedding day, in butter yellow to match the wedding party. */
export function Countdown() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const t = remaining(now)

  if (t.done) {
    return (
      <div className="countdown countdown--done">
        <p className="countdown__done">The day is here!</p>
      </div>
    )
  }

  return (
    <div className="countdown" role="timer" aria-label={`${t.days} days until ${wedding.date.long}`}>
      <p className="countdown__eyebrow" aria-hidden="true">
        Counting down
      </p>
      <ol className="countdown__units" aria-hidden="true">
        {UNITS.map(({ key, label }) => (
          <li key={key} className="countdown__unit">
            <span className="countdown__value">{key === 'days' ? t[key] : String(t[key]).padStart(2, '0')}</span>
            <span className="countdown__label">{label}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
