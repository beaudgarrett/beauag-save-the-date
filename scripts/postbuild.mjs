/**
 * After `vite build`, write a real HTML file for every route so that direct
 * links and refreshes work on GitHub Pages (which has no SPA rewrites):
 *
 *   dist/our-story/index.html, dist/venue/index.html, ...
 *   dist/404.html  (renders the app's "page not found" view)
 *
 * Each copy gets its own <title>, canonical URL and og:url.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const site = 'https://beaudgarrett.github.io/beauag-save-the-date'

const routesSrc = readFileSync(join(root, 'src/config/routes.ts'), 'utf8')
const routes = [...routesSrc.matchAll(/path: '([^']+)',\s*label: '[^']+',\s*title: '([^']+)'/g)].map((m) => ({
  path: m[1],
  title: m[2],
}))
if (routes.length < 2) throw new Error('postbuild: could not read routes from src/config/routes.ts')

const html = readFileSync(join(dist, 'index.html'), 'utf8')
const escape = (s) => s.replace(/&/g, '&amp;')

function pageHtml(title, path) {
  const url = site + path
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(title)}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${escape(title)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
}

for (const r of routes) {
  if (r.path === '/') continue
  const dir = join(dist, r.path)
  mkdirSync(dir, { recursive: true })
  // Inner pages don't show the hero photograph, so drop its preload.
  const inner = pageHtml(r.title, r.path).replace(/<link\s+rel="preload"\s+as="image"\s+type="image\/webp"[\s\S]*?>/, '')
  writeFileSync(join(dir, 'index.html'), inner)
  console.log(`  route  ${r.path}`)
}
writeFileSync(join(dist, '404.html'), pageHtml('Page not found · Beau & AG', '/').replace(/<link rel="canonical"[^>]*>\s*/, ''))
writeFileSync(join(dist, '.nojekyll'), '')
console.log('  404.html + .nojekyll written')
