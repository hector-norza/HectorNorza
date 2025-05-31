import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initGA } from './utils/analytics'

// Initialize Google Analytics (uncomment when you have your GA4 Measurement ID)
// initGA();

createRoot(document.getElementById('root')!).render(
  <App />
)
