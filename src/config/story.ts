/** The couple's story, exactly as written by Beau & AG. */

export const storyIntro = {
  heading: 'Some love stories begin in unexpected places.',
  paragraphs: [
    'Ours began in a place that already meant so much.',
    'In the summer of 2025, Beau and AG met at Clemson Presbyterian Church. Looking back, it’s hard to imagine a more beautiful place for our story to begin.',
  ],
}

export const scripture = {
  text: '“We love because He first loved us.”',
  reference: '1 John 4:19',
}

export type StoryBlock =
  | { kind: 'lead'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'reflection'; text: string }
  | { kind: 'milestone'; label: string; text: string }
  | { kind: 'scripture' }
  | { kind: 'closing'; text: string }

export const story: StoryBlock[] = [
  {
    kind: 'lead',
    text: 'Some love stories begin in unexpected places. Ours began in a place that already meant so much.',
  },
  {
    kind: 'milestone',
    label: 'Summer 2025',
    text: 'In the summer of 2025, Beau and AG met at Clemson Presbyterian Church. Looking back, it’s hard to imagine a more beautiful place for our story to begin.',
  },
  {
    kind: 'reflection',
    text: 'Scripture describes the Church as the bride of Christ, loved faithfully and sacrificially by her Savior. What a beautiful reminder that the love we share is meant to reflect something far greater than ourselves.',
  },
  {
    kind: 'p',
    text: 'What began with a meeting at church grew into a friendship, a love, and the joyful realization that we wanted to spend our lives together.',
  },
  {
    kind: 'milestone',
    label: 'October 17, 2026',
    text: 'On October 17, 2026, Beau asked AG to marry him.',
  },
  {
    kind: 'milestone',
    label: 'August 7, 2027',
    text: 'And within just two weeks, we had chosen the day we would become husband and wife: August 7, 2027.',
  },
  {
    kind: 'p',
    text: 'As we look toward that day, we’re reminded that marriage is not merely the joining of two lives, but a covenant before God. It is a lifelong promise to love, serve, and remain faithful to one another.',
  },
  { kind: 'scripture' },
  {
    kind: 'closing',
    text: 'We cannot wait to celebrate the beginning of this new chapter with the people we love.',
  },
]
