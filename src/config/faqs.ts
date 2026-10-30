import { wedding } from './wedding'

export interface Faq {
  question: string
  answer: string
  /** Optional phone link rendered after the answer text. */
  phone?: { display: string; href: string }
}

export const faqs: Faq[] = [
  {
    question: 'Can I bring a plus-one?',
    answer:
      'Yes! If you’d like to bring a plus-one, please indicate that on your RSVP once it opens. We’ll review requests and let you know if we’re able to accommodate an additional guest based on available space.',
  },
  {
    question: 'Are children invited to the celebration?',
    answer: 'Yes! Children are more than welcome to join us as we celebrate our special day.',
  },
  {
    question: 'What is the RSVP deadline?',
    answer: 'Our RSVP deadline will be announced soon. Please check back for updates.',
  },
  {
    question: 'What is the dress code?',
    answer:
      'Our wedding dress code will be announced soon. Please check back closer to the wedding date for more details.',
  },
  {
    question: 'How do I let you know about dietary requirements or allergies?',
    answer:
      'Please contact us directly to let us know about any dietary restrictions or food allergies. We’ll do our best to accommodate your needs.',
  },
  {
    question: 'If I can no longer attend, who should I contact?',
    answer:
      'If your plans change and you’re no longer able to attend, please let us know as soon as possible by calling or texting',
    phone: { display: wedding.contact.phoneDisplay, href: wedding.contact.phoneHref },
  },
]
