import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initGA } from './utils/analytics'

// Initialize Google Analytics after the DOM is ready
setTimeout(() => {
  initGA();
}, 100);

createRoot(document.getElementById('root')!).render(
  <App />
)
