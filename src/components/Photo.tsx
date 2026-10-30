import type { SitePhoto } from '../config/images'

interface PhotoProps {
  photo: SitePhoto
  /** CSS `sizes` hint describing the rendered width. */
  sizes: string
  className?: string
  priority?: boolean
}

/** A photograph at its natural aspect ratio. Never cropped. */
export function Photo({ photo, sizes, className, priority = false }: PhotoProps) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${photo.webpSmall} 720w, ${photo.webp} ${photo.width}w`} sizes={sizes} />
      <img
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
