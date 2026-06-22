import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App.jsx'

// Render the main React application
createRoot(document.getElementById('root')).render(
  
    // Enable additional React checks during development
  <StrictMode>
    <App />
  </StrictMode>,
)