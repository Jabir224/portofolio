import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider, ContentProvider } from './hooks/providers'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/styles.css'
import './styles/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
    </LanguageProvider>
  </StrictMode>,
)