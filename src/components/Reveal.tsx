import { useEffect, useRef, useState, type ElementType, type HTMLAttributes, type ReactNode } from 'react'

/** Fades content gently into place as it scrolls into view. */
export function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}: {
  as?: ElementType
  className?: string
  children: ReactNode
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
