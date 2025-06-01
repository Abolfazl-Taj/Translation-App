import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TranslationContextProvider from './context/TranslationContext.jsx'
import { BrowserRouter as Router } from 'react-router'
import ThemeContextProvider from './Context/ThemContext.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <TranslationContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </TranslationContextProvider>
  </Router>
);

