import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/marcellus/latin-400.css'
import '@fontsource-variable/karla/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/vines.css'
import './styles/layout.css'
import './styles/sections.css'
import { App } from './App'
import { startIntro } from './lib/intro'
import { RouterProvider } from './lib/router'

// Decide on the opening animation before the first paint.
startIntro()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>,
)
