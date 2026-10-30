import { useEffect, useRef, useState } from 'react'
import { routes } from '../config/routes'
import { Link, useRouter } from '../lib/router'
import { Monogram } from './Monogram'
import { Vines } from './Vines'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { route } = useRouter()

  // Close the menu whenever the page changes.
  useEffect(() => setOpen(false), [route])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.classList.add('menu-open')
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && menuRef.current) {
        // Keep focus inside the open menu.
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button'))
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      root.classList.remove('menu-open')
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="site-header">
      <Vines />

      <Link to="/" className="site-header__brand" aria-label="Beau & AG, home">
        <Monogram decorative className="site-header__monogram" />
      </Link>

      <nav className="site-nav" aria-label="Primary">
        <ul>
          {routes.map((r) => (
            <li key={r.id}>
              <Link to={r.path}>{r.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <span className="menu-toggle__lines" aria-hidden="true" />
        <span className="visually-hidden">Open menu</span>
      </button>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <button
          type="button"
          className="mobile-menu__close"
          onClick={() => {
            setOpen(false)
            toggleRef.current?.focus()
          }}
        >
          <span className="mobile-menu__close-icon" aria-hidden="true" />
          <span className="visually-hidden">Close menu</span>
        </button>
        <Monogram decorative className="mobile-menu__monogram" />
        <nav aria-label="Site menu">
          <ul>
            {routes.map((r) => (
              <li key={r.id}>
                <Link to={r.path}>{r.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mobile-menu__date">August 7, 2027</p>
      </div>
    </header>
  )
}
