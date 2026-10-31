import { Closing } from '../sections/Closing'
import { Faqs } from '../sections/Faqs'
import { Hero } from '../sections/Hero'
import { Interlude } from '../sections/Interlude'
import { RegistrySection } from '../sections/RegistrySection'
import { Rsvp } from '../sections/Rsvp'
import { StoryIntro } from '../sections/StoryIntro'
import { Venue } from '../sections/Venue'

/** The full editorial scroll, photographs in their intended order: 1, 2, 3, 5. */
export function HomePage() {
  return (
    <>
      <Hero />
      <StoryIntro />
      <Interlude />
      <Venue />
      <RegistrySection />
      <Faqs />
      <Rsvp />
      <Closing />
    </>
  )
}
