import { useState } from 'react'
import '../../styles/navbar.css'

const navItems = [
  { labelFR: 'À propos', labelEN: 'About', href: '#about' },
  { labelFR: 'Expertise', labelEN: 'Expertise', href: '#expertise' },
  { labelFR: 'Projets', labelEN: 'Projects', href: '#projects' },
  { labelFR: 'Parcours', labelEN: 'Journey', href: '#journey' },
  { labelFR: 'Contacts', labelEN: 'Contact', href: '#contact' },
]

export function NavBar() {
  const [language, setLanguage] = useState('FR')
  const isEN = language === 'EN'

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'FR' ? 'EN' : 'FR'))
  }

  return (
    <nav className="container-fluid sticky-top navbar-container">
      <div className="row align-items-center">
        <div className="col-3">
          <h2 className="navbar-title">Portfolio</h2>
        </div>

        <div className="col-2"></div>

        <div className="col-5 d-flex justify-content-between navbar-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {isEN ? item.labelEN : item.labelFR}
            </a>
          ))}
        </div>

        {/* Toggle de langue */}
        <div className="col-2 d-flex justify-content-end align-items-center">
          <button
            type="button"
            className="lang-switch"
            data-lang={language}
            onClick={handleToggleLanguage}
            role="switch"
            aria-checked={isEN}
            aria-label={isEN ? 'Switch to French' : 'Passer en anglais'}
          >
            <span className="lang-switch__knob" aria-hidden="true" />
            <span className="lang-switch__label lang-switch__label--fr">FR</span>
            <span className="lang-switch__label lang-switch__label--en">EN</span>
          </button>
        </div>
      </div>
    </nav>
  )
}