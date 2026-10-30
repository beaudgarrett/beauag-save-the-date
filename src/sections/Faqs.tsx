import { useId, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { faqs, type Faq } from '../config/faqs'

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <li className={`faq ${open ? 'is-open' : ''}`}>
      <h3 className="faq__q">
        <button type="button" aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={() => setOpen(!open)}>
          <span>{faq.question}</span>
          <span className="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div className="faq__a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} inert={!open}>
        <div className="faq__a-inner">
          <p>
            {faq.answer}
            {faq.phone && (
              <>
                {' '}
                <a className="text-link" href={faq.phone.href}>
                  {faq.phone.display}
                </a>
                .
              </>
            )}
          </p>
        </div>
      </div>
    </li>
  )
}

export function Faqs({ page = false }: { page?: boolean }) {
  return (
    <section className="info-section" aria-labelledby="faqs-title">
      <Reveal className="info-section__inner info-section__inner--wide">
        <SectionHeading id="faqs-title" level={page ? 'h1' : 'h2'}>
          Frequently Asked Questions
        </SectionHeading>
        <ul className="faq-list">
          {faqs.map((f) => (
            <FaqItem key={f.question} faq={f} />
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
