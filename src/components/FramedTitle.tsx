import type { CSSProperties, ReactNode } from 'react'
import type { SitePhoto } from '../config/images'
import { Photo } from './Photo'

interface FramedTitleProps {
  photo: SitePhoto
  sizes: string
  /** The heading, laid across the photograph like the reference's signature titles. */
  title: ReactNode
  titleId?: string
  level?: 'h1' | 'h2'
  /** Vertical position of the title's centre, as a fraction of the photo's height. */
  titleAt?: number
  priority?: boolean
  className?: string
}

/**
 * A centered photograph with a wide display title laid across it. The title is
 * drawn twice: once in the page colour around the photograph and once, clipped
 * to the photograph, in a contrasting colour, so it stays legible on both
 * without veiling or recolouring the photo.
 */
export function FramedTitle({ photo, sizes, title, titleId, level = 'h2', titleAt = 0.5, priority, className = '' }: FramedTitleProps) {
  const H = level
  const style = { '--title-at': `${titleAt * 100}%` } as CSSProperties
  return (
    <div className={`framed ${className}`} style={style}>
      <H id={titleId} className="framed__title framed__title--outer">
        {title}
      </H>
      <div className="framed__photo">
        <Photo photo={photo} sizes={sizes} priority={priority} />
        <span className="framed__title framed__title--inner" aria-hidden="true">
          {title}
        </span>
      </div>
    </div>
  )
}
