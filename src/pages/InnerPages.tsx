import { NextPage } from '../components/NextPage'
import { Faqs } from '../sections/Faqs'
import { RegistrySection } from '../sections/RegistrySection'
import { Rsvp } from '../sections/Rsvp'
import { Venue } from '../sections/Venue'

export function VenuePage() {
  return (
    <div className="inner-page inner-page--venue">
      <Venue page />
      <NextPage to="registry" />
    </div>
  )
}

export function RegistryPage() {
  return (
    <div className="inner-page">
      <RegistrySection page />
      <NextPage to="faqs" />
    </div>
  )
}

export function FaqPage() {
  return (
    <div className="inner-page">
      <Faqs page />
      <NextPage to="rsvp" />
    </div>
  )
}

export function RsvpPage() {
  return (
    <div className="inner-page">
      <Rsvp page />
      <NextPage to="home" />
    </div>
  )
}
