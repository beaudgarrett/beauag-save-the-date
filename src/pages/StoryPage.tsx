import { NextPage } from '../components/NextPage'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { Sprig } from '../components/Vines'
import { photos } from '../config/images'
import { scripture, story, type StoryBlock } from '../config/story'

function Block({ block }: { block: StoryBlock }) {
  switch (block.kind) {
    case 'lead':
      return <p className="story__lead">{block.text}</p>
    case 'milestone':
      return (
        <div className="story__milestone">
          <p className="story__marker">{block.label}</p>
          <p className="body-copy">{block.text}</p>
        </div>
      )
    case 'reflection':
      return <p className="story__reflection">{block.text}</p>
    case 'scripture':
      return (
        <figure className="story__scripture">
          <Sprig />
          <blockquote>
            <p>{scripture.text}</p>
          </blockquote>
          <figcaption>{scripture.reference}</figcaption>
        </figure>
      )
    case 'closing':
      return <p className="story__closing">{block.text}</p>
    default:
      return <p className="body-copy">{block.text}</p>
  }
}

export function StoryPage() {
  return (
    <article className="story" aria-labelledby="story-title">
      <header className="page-heading">
        <p className="eyebrow">Beau &amp; AG</p>
        <h1 id="story-title" className="display display--page">
          Our Story
        </h1>
      </header>

      <div className="story__layout">
        <div className="story__photo">
          <Photo photo={photos.story} sizes="(min-width: 960px) 44vw, 100vw" priority />
        </div>
        <div className="story__text">
          {story.map((b, i) => (
            <Reveal key={i}>
              <Block block={b} />
            </Reveal>
          ))}
        </div>
      </div>

      <NextPage to="venue" />
    </article>
  )
}
