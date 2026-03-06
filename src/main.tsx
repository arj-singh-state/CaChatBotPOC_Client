import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


export function renderWidget() {
  // Find or create a container for the widget
  let container = document.getElementById('widget-root')
  if (!container) {
    container = document.createElement('div')
    container.id = 'widget-root'
    document.body.appendChild(container)
  }

  // Attach a shadow root if not already present
  let shadowRoot = container.shadowRoot
  if (!shadowRoot) {
    shadowRoot = container.attachShadow({ mode: 'open' })
  }

  // Create a mount point inside the shadow root
  let mountPoint = shadowRoot.getElementById('shadow-app-root')
  if (!mountPoint) {
    mountPoint = document.createElement('div')
    mountPoint.id = 'shadow-app-root'
    shadowRoot.appendChild(mountPoint)
  }

  // Render the App into the shadow root
  createRoot(mountPoint).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
