import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { wedding } from '../config/wedding'

export function Contact({ page = false }: { page?: boolean }) {
  return (
    <section className="info-section info-section--contact" aria-labelledby="contact-title">
      <Reveal className="info-section__inner">
        <SectionHeading id="contact-title" level={page ? 'h1' : 'h2'}>
          Contact
        </SectionHeading>
        <p className="body-copy">Have a question? Feel free to call or text us.</p>
        <a className="contact__phone" href={wedding.contact.phoneHref}>
          {wedding.contact.phoneDisplay}
        </a>
      </Reveal>
    </section>
  )
}
