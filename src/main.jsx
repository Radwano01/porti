import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StarModeProvider } from './context/StarModeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StarModeProvider>
      <App />
    </StarModeProvider>
  </StrictMode>,
)
