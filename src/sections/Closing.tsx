import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { photos } from '../config/images'
import { wedding } from '../config/wedding'

/** The final photographic moment before the footer. */
export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <Reveal className="closing__lead">
        <h2 id="closing-title" className="display display--statement">
          We can’t wait to celebrate with you.
        </h2>
      </Reveal>
      <Reveal as="figure" className="closing__figure">
        <Photo photo={photos.closing} sizes="(min-width: 960px) 620px, 100vw" />
        <figcaption className="closing__overlay">
          <span className="closing__family">{wedding.couple.familyName}</span>
          <span className="closing__verse">
            “{wedding.closing.verse}”
            <cite>{wedding.closing.verseReference}</cite>
          </span>
        </figcaption>
      </Reveal>
      <Reveal className="closing__signoff">
        <p>With love,</p>
        <p className="closing__names">{wedding.couple.display}</p>
      </Reveal>
    </section>
  )
}
