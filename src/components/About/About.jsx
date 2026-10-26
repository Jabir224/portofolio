import '../../styles/about.css'

const roles = [
  { icon: 'bi bi-code-slash', title: 'Développeur' },
  { icon: 'bi bi-kanban', title: 'MOA & pilotage' },
  { icon: 'bi bi-diagram-3', title: 'Conception' },
  { icon: 'bi bi-people', title: 'Leadership & com' },
]

const stats = [
  { value: '01', label: 'application livrée' },
  { value: '03', label: 'projets web co-construits' },
  { value: '03', label: 'projets pilotés en MOA' },
  { value: '01', label: 'association présidée' },
]

export function About() {
  return (
    <section id="about" className="m-3 p-3 about">
      <div className="row g-4 align-items-center">
        {/* Côté gauche : liste des rôles sur une ligne verticale */}
        <div className="col-12 col-lg-5">
          <ul className="list-unstyled mb-0 about-roles">
            {roles.map((role) => (
              <li key={role.title} className="d-flex align-items-center about-role">
                <span className="about-role-dot" aria-hidden="true"></span>
                <span className="d-flex align-items-center justify-content-center about-role-icon-box">
                  <i className={role.icon} aria-hidden="true"></i>
                </span>
                <span className="fw-bold about-role-title">{role.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Côté droit : label, titre, texte, chiffres */}
        <div className="col-12 col-lg-7 px-lg-4">
          <p className="mb-3 about-eyebrow">// à propos</p>

          <h2 className="fw-bold mb-4 about-title">
            Je fais le pont entre le{' '}
            <span className="about-title-accent">besoin</span> et le{' '}
            <span className="about-title-accent">code</span>.
          </h2>

          <p className="mb-0 about-text">
            Développeur et MOA, je traduis les besoins métier en produits digitaux qui
            fonctionnent. J'ai livré une application, co-construit trois projets web et
            piloté trois projets de bout en bout, tout en présidant une association : j'y
            ai appris à fédérer une équipe et à tenir un cap. Une nouvelle application est
            en construction.
          </p>

          <div className="row g-4 mt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="col-6 col-xl-3">
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