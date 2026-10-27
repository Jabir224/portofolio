import { useEffect, useState } from 'react'
import '../../styles/navbar.css'

const navItems = [
  { labelFR: 'À propos', labelEN: 'About', href: '#about' },
  { labelFR: 'Expertise', labelEN: 'Expertise', href: '#expertise' },
  { labelFR: 'Projets', labelEN: 'Projects', href: '#projects' },
  { labelFR: 'Parcours', labelEN: 'Journey', href: '#journey' },
  { labelFR: 'Contacts', labelEN: 'Contact', href: '#contact' },
]

const socials = [
  {
    id: 'mail',
    icon: 'bi bi-envelope',
    label: 'E-mail',
    href: 'mailto:mamadoudianbah365@gmail.com',
    external: false,
  },
  {
    id: 'whatsapp',
    icon: 'bi bi-whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/224626969454',
    external: true,
  },
  {
    id: 'linkedin',
    icon: 'bi bi-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mamadou-dian-bah-109987206',
    external: true,
  },
  {
    id: 'github',
    icon: 'bi bi-github',
    label: 'GitHub',
    href: 'https://github.com/Jabir224',
    external: true,
  },
]

/* Toggle FR / EN : même rendu qu'avant, utilisé sur desktop et sur mobile */
function LangSwitch({ language, onToggle }) {
  const isEN = language === 'EN'

  return (
    <button
      type="button"
      className="lang-switch"
      data-lang={language}
      onClick={onToggle}
      role="switch"
      aria-checked={isEN}
      aria-label={isEN ? 'Switch to French' : 'Passer en anglais'}
    >
      <span className="lang-switch__knob" aria-hidden="true" />
      <span className="lang-switch__label lang-switch__label--fr">FR</span>
      <span className="lang-switch__label lang-switch__label--en">EN</span>
    </button>
  )
}

export function NavBar() {
  const [language, setLanguage] = useState('FR')
  const [menuOpen, setMenuOpen] = useState(false)
  const isEN = language === 'EN'

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'FR' ? 'EN' : 'FR'))
  }

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  // Bloque le scroll de la page quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Échap ferme le menu, et on le ferme si l'écran repasse en desktop
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const media = window.matchMedia('(min-width: 992px)')
    const handleChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    media.addEventListener('change', handleChange)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      media.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <nav
      className="container-fluid sticky-top navbar-container"
      data-open={menuOpen}
    >
      {/* ===== Desktop (inchangé) ===== */}
      <div className="row align-items-center d-none d-lg-flex">
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
          <LangSwitch language={language} onToggle={handleToggleLanguage} />
        </div>
      </div>

      {/* ===== Mobile : barre ===== */}
      <div className="d-flex d-lg-none align-items-center justify-content-between navbar-mobile">
        <h2 className="navbar-title navbar-mobile-title">Portfolio</h2>

        <div className="d-flex align-items-center gap-3">
          <LangSwitch language={language} onToggle={handleToggleLanguage} />

          <button
            type="button"
            className="navbar-burger"
            data-open={menuOpen}
            aria-expanded={menuOpen}
            aria-controls="navbar-menu"
            aria-label={
              menuOpen
                ? isEN
                  ? 'Close the menu'
                  : 'Fermer le menu'
                : isEN
                  ? 'Open the menu'
                  : 'Ouvrir le menu'
            }
            onClick={toggleMenu}
          >
            <span className="navbar-burger-line"></span>
            <span className="navbar-burger-line"></span>
          </button>
        </div>
      </div>

      {/* ===== Mobile : menu plein écran ===== */}
      <div
        id="navbar-menu"
        className="d-lg-none navbar-menu"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div className="d-flex flex-column navbar-menu-inner">
          <p className="navbar-menu-label">{'// navigation'}</p>

          <ul className="list-unstyled mb-0 navbar-menu-list">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className="navbar-menu-item"
                style={{ '--d': `${index * 70}ms` }}
              >
                <a
                  className="d-flex align-items-center navbar-menu-link"
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className="navbar-menu-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-grow-1 navbar-menu-text">
                    {isEN ? item.labelEN : item.labelFR}
                  </span>
                  <i className="bi bi-arrow-up-right navbar-menu-arrow"></i>
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-menu-footer" style={{ '--d': '420ms' }}>
            <p className="navbar-menu-label">
              {isEN ? '// find me' : '// me trouver'}
            </p>

            <div className="d-flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.id}
                  className="d-flex align-items-center justify-content-center navbar-menu-social"
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noreferrer' : undefined}
                  aria-label={social.label}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>

            <p className="d-inline-flex align-items-center gap-2 navbar-menu-place">
              <span className="navbar-menu-dot"></span>
              {isEN ? 'Based in Conakry, Guinea' : 'Basé à Conakry, Guinée'}
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}