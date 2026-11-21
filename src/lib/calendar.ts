import { venueAddress, wedding } from '../config/wedding'

/**
 * "Add to Calendar" links. The wedding is an all-day event until ceremony and
 * reception times are announced. The Apple / .ics file lives in
 * `public/beau-and-ag-wedding.ics`; keep it in step with these details.
 */
const title = `${wedding.couple.display}’s Wedding`
const location = `${wedding.venue.name}, ${venueAddress}`
const details = `Join us at ${wedding.venue.name} in ${wedding.venue.city}, ${wedding.venue.stateShort}. More details at https://beaudgarrett.github.io/beauag-save-the-date/`

const start = wedding.date.iso // 2027-08-07
const endDate = new Date(`${start}T12:00:00Z`)
endDate.setUTCDate(endDate.getUTCDate() + 1)
const end = endDate.toISOString().slice(0, 10) // all-day events end the next day

const compact = (d: string) => d.replace(/-/g, '')

export const calendarLinks = {
  google:
    'https://calendar.google.com/calendar/render?' +
    new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${compact(start)}/${compact(end)}`,
      location,
      details,
    }).toString(),
  outlook:
    'https://outlook.live.com/calendar/0/action/compose?' +
    new URLSearchParams({
      subject: title,
      startdt: start,
      enddt: end,
      allday: 'true',
      location,
      body: details,
    }).toString(),
  ics: `${import.meta.env.BASE_URL}beau-and-ag-wedding.ics`,
}
