/**
 * The opening vine animation plays once per browser session. It never replays
 * on client-side navigation, and is skipped entirely for visitors who prefer
 * reduced motion.
 */

const KEY = 'ba-intro-played'
/** Total length of the opening sequence in ms (see intro timings in CSS). */
export const INTRO_DURATION = 5200

function readFlag(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

function writeFlag() {
  try {
    window.sessionStorage.setItem(KEY, '1')
  } catch {
    /* private mode: the intro may simply play again next load */
  }
}

export function startIntro() {
  const root = document.documentElement
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce || readFlag()) return

  writeFlag()
  root.classList.add('intro')
  window.setTimeout(() => root.classList.remove('intro'), INTRO_DURATION)
}
