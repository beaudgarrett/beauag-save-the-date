import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { photos } from '../config/images'
import { storyIntro } from '../config/story'
import { Link } from '../lib/router'

export function StoryIntro() {
  return (
    <section className="story-intro" aria-labelledby="story-intro-title">
      <Reveal className="story-intro__photo">
        <Photo photo={photos.story} sizes="(min-width: 960px) 48vw, 100vw" />
      </Reveal>
      <Reveal className="story-intro__text">
        <p className="eyebrow">Our Story</p>
        <h2 id="story-intro-title" className="display display--statement">
          {storyIntro.heading}
        </h2>
        {storyIntro.paragraphs.map((p) => (
          <p key={p} className="body-copy">
            {p}
          </p>
        ))}
        <Link to="/our-story/" className="button">
          Read Our Story
        </Link>
      </Reveal>
    </section>
  )
}
