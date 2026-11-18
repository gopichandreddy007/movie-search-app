import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { WatchlistProvider } from './context/WatchlistContext'
import './index.css'
import App from './App.jsx'

// HashRouter keeps the page in the URL after "#", so refreshing works on GitHub Pages
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </HashRouter>
  </StrictMode>,
)
