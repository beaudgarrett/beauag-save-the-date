import { Reveal } from '../components/Reveal'
import { Sprig } from '../components/Vines'
import { scripture } from '../config/story'

export function Interlude() {
  return (
    <Reveal as="section" className="interlude" aria-label="Scripture">
      <Sprig className="interlude__sprig" />
      <figure>
        <blockquote>
          <p>{scripture.text}</p>
        </blockquote>
        <figcaption>{scripture.reference}</figcaption>
      </figure>
    </Reveal>
  )
}
