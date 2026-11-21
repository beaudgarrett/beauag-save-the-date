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
      'Some invitations will include the option to bring a plus-one. If yours does, please let us know on your RSVP once it opens. If your invitation does not mention a plus-one, the invitation is for you alone.',
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
      'Our dress code is semi-formal.',
  },
  {
    question: 'If I can no longer attend, who should I contact?',
    answer:
      'If your plans change and you’re no longer able to attend, please let us know as soon as possible by calling or texting',
    phone: { display: wedding.contact.phoneDisplay, href: wedding.contact.phoneHref },
  },
]
