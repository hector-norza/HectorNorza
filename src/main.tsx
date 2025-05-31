import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Google Analytics is initialized directly in index.html for better performance
createRoot(document.getElementById('root')!).render(
  <App />
)
