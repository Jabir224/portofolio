import { useContent } from '../../hooks/contexts'
import '../../styles/about.css'

// Une icône par rôle, dans le même ordre que la liste "roles" de la base
const roleIcons = ['bi bi-code-slash', 'bi bi-kanban', 'bi bi-diagram-3', 'bi bi-people']

export function About() {
  const content = useContent('about')
  const roles = content.roles ?? []
  const stats = content.stats ?? []

  return (
    <section id="about" className="m-3 p-3 about">
      <div className="row g-4 align-items-center">
        {/* Côté gauche : liste des rôles sur une ligne verticale */}
        <div className="col-12 col-lg-5">
          <ul className="list-unstyled mb-0 about-roles">
            {roles.map((role, index) => (
              <li key={index} className="d-flex align-items-center about-role">
                <span className="about-role-dot" aria-hidden="true"></span>
                <span className="d-flex align-items-center justify-content-center about-role-icon-box">
                  <i className={roleIcons[index]} aria-hidden="true"></i>
                </span>
                <span className="fw-bold about-role-title">{role.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Côté droit : label, titre, texte, chiffres */}
        <div className="col-12 col-lg-7 px-lg-4">
          <p className="mb-3 about-eyebrow">{content.eyebrow}</p>

          <h2 className="fw-bold mb-4 about-title">
            {content.titleStart} <span className="about-title-accent">{content.titleAccent1}</span>{' '}
            {content.titleMiddle} <span className="about-title-accent">{content.titleAccent2}</span>.
          </h2>

          <p className="mb-0 about-text">{content.text}</p>

          <div className="row g-4 mt-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-xl-3">
                <div className="pt-3 about-stat">
                  <p className="mb-1 about-stat-value">{stat.value}</p>
                  <p className="mb-0 about-stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}