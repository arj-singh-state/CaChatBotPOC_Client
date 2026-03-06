import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from './index.css?inline' // Vite supports ?inline for raw CSS
import appStyles from './App.css?inline'
import chatStyles from './components/ChatWindow.css?inline'
import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


export function renderCaChatWidget() {
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
    // Inject styles
    const style = document.createElement('style')
    style.textContent = styles

    shadowRoot.appendChild(style)

    const style2 = document.createElement('style')
    style2.textContent = appStyles
    
    shadowRoot.appendChild(style2)

    const style3 = document.createElement('style')
    style3.textContent = chatStyles
    
    shadowRoot.appendChild(style3)
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

// Expose renderCaChatWidget globally
;(window as any).renderCaChatWidget = renderCaChatWidget();