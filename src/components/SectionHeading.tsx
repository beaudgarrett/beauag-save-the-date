import type { ReactNode } from 'react'
import { Sprig } from './Vines'

interface SectionHeadingProps {
  id?: string
  /** Use "h1" when the section is the main subject of its own page. */
  level?: 'h1' | 'h2'
  eyebrow?: string
  children: ReactNode
  ornament?: boolean
}

export function SectionHeading({ id, level = 'h2', eyebrow, children, ornament = true }: SectionHeadingProps) {
  const H = level
  return (
    <header className="section-heading">
      {ornament && <Sprig className="section-heading__sprig" />}
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id} className="display">
        {children}
      </H>
    </header>
  )
}
