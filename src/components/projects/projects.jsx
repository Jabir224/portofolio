import { useEffect, useRef, useState } from 'react'
import '../../styles/projects.css'

const STATUS_LABELS = {
  production: 'En production',
  soon: 'Bientôt en production',
  dev: 'En développement',
  private: 'Usage privé',
  past: 'Premier stage',
}

/*
  Champs optionnels par projet :
  - note : une phrase de toi, affichée au dos de la carte
  - link : un lien externe, affiché sous forme de bouton au dos
*/
const CATEGORIES = [
  {
    id: 'moa',
    icon: 'bi bi-kanban',
    tab: 'Pilotés en MOA',
    label: "// j'ai piloté",
    intro: "Des projets où j'ai porté le besoin métier jusqu'à la livraison.",
    projects: [
      {
        id: 'b2w',
        name: 'B2W',
        status: 'production',
        context: 'Projet digital de la Banque Nationale de Guinée.',
        role: 'MOA, pilotage du projet',
        stack: ['MOA', 'Pilotage'],
      },
      {
        id: 'ebanking',
        name: 'E-banking BNG',
        status: 'production',
        context: 'Application de banque en ligne de la Banque Nationale de Guinée.',
        role: 'MOA, pilotage du projet',
        stack: ['MOA', 'Pilotage'],
      },
      {
        id: 'click',
        name: 'CLICK',
        status: 'soon',
        context: 'Application de banque mobile de la Banque Nationale de Guinée.',
        role: 'MOA, pilotage du projet',
        stack: ['MOA', 'Pilotage'],
      },
    ],
  },
  {
    id: 'co',
    icon: 'bi bi-people',
    tab: 'Co-construits',
    label: "// j'ai co-construit",
    intro: "Des projets menés en équipe, où j'ai apporté ma part de conception et de code.",
    projects: [
      {
        id: 'guinee-foot',
        name: 'Guinée Foot',
        status: 'production',
        context: 'Application de football guinéen, l’une des plus connues du pays.',
        role: 'Développeur au sein de l’équipe',
        stack: ['Développement'],
      },
      {
        id: 'tulip',
        name: 'Bornes Tulip Industries',
        status: 'past',
        context: 'Application web pour les bornes de Tulip Industries.',
        role: 'Stagiaire développeur',
        stack: ['Web', 'Stage'],
      },
    ],
  },
  {
    id: 'own',
    icon: 'bi bi-code-slash',
    tab: 'Mes créations',
    label: "// j'ai tout fait seul",
    intro: 'Du besoin à la mise en ligne, conçus et développés seul avec Flutter.',
    projects: [
      {
        id: 'factustock',
        name: 'Factustock',
        status: 'dev',
        context: 'Application mobile de facturation et de gestion de stock.',
        role: 'Conception et développement',
        stack: ['Flutter', 'Mobile'],
      },
      {
        id: 'sante',
        name: 'Application de santé',
        status: 'dev',
        context: 'Application mobile dans le domaine de la santé.',
        role: 'Conception et développement',
        stack: ['Flutter', 'Mobile'],
      },
      {
        id: 'pere',
        name: 'Application pour un proche',
        status: 'private',
        context: 'Conçue et développée pour un proche, usage privé.',
        role: 'Conception et développement',
        stack: ['Flutter', 'Mobile'],
      },
    ],
  },
]

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [flippedId, setFlippedId] = useState(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const category = CATEGORIES[activeIndex]

  const selectTab = (index) => {
    setActiveIndex(index)
    setFlippedId(null)
  }

  const toggleCard = (id) => {
    setFlippedId((current) => (current === id ? null : id))
  }

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleCard(id)
    }
  }

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="m-3 py-3 px-3 p-lg-5 projects"
      data-visible={visible}
    >
      <p className="projects-label">{'// projets'}</p>
      <h2 className="fw-bold projects-title">
        Ce que j’ai piloté, construit et créé.
      </h2>

      <div
        className="position-relative d-grid projects-tabs"
        role="tablist"
        data-active={activeIndex}
      >
        <span className="projects-pill" aria-hidden="true"></span>
        {CATEGORIES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            className="d-flex align-items-center justify-content-center gap-2 projects-tab"
            data-active={activeIndex === index}
            onClick={() => selectTab(index)}
          >
            <i className={item.icon}></i>
            <span>{item.tab}</span>
          </button>
        ))}
      </div>

      <div key={category.id} className="projects-panel">
        <p className="projects-category-label">{category.label}</p>
        <p className="projects-intro">{category.intro}</p>

        <div className="row g-4">
          {category.projects.map((project, index) => {
            const isFlipped = flippedId === project.id
            return (
              <div key={project.id} className="col-12 col-md-6 col-xl-4">
                <div
                  className="projects-card"
                  role="button"
                  tabIndex={0}
                  aria-pressed={isFlipped}
                  data-flipped={isFlipped}
                  data-status={project.status}
                  style={{ '--d': `${index * 100}ms` }}
                  onClick={() => toggleCard(project.id)}
                  onKeyDown={(event) => handleKeyDown(event, project.id)}
                  onMouseMove={handleMouseMove}
                >
                  <span className="projects-card-glow" aria-hidden="true"></span>

                  <div className="projects-card-inner">
                    {/* ===== Face avant ===== */}
                    <div className="d-flex flex-column justify-content-between projects-card-face projects-card-front">
                      <div className="d-flex align-items-start justify-content-between gap-2">
                        <span className="projects-index">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="projects-status">
                          <span className="projects-dot"></span>
                          {STATUS_LABELS[project.status]}
                        </span>
                      </div>

                      <div>
                        <h3 className="fw-bold projects-card-title">{project.name}</h3>
                        <p className="projects-card-context">{project.context}</p>
                        <span className="d-inline-flex align-items-center gap-2 projects-hint">
                          <i className="bi bi-arrow-repeat"></i>
                          Retourner
                        </span>
                      </div>
                    </div>

                    {/* ===== Face arrière ===== */}
                    <div
                      className="d-flex flex-column projects-card-face projects-card-back"
                      aria-hidden={!isFlipped}
                    >
                      <div className="d-flex align-items-start justify-content-between gap-2">
                        <span className="projects-back-name">{project.name}</span>
                        <i className="bi bi-arrow-repeat projects-back-icon"></i>
                      </div>

                      <div className="projects-back-body">
                        <p className="projects-back-label">{'// rôle'}</p>
                        <p className="projects-back-text">{project.role}</p>

                        <p className="projects-back-label">{'// stack'}</p>
                        <div className="d-flex flex-wrap gap-2">
                          {project.stack.map((tag) => (
                            <span key={tag} className="projects-tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="projects-back-label">{'// statut'}</p>
                        <p className="projects-back-text">
                          {STATUS_LABELS[project.status]}
                        </p>

                        {project.note && (
                          <>
                            <p className="projects-back-label">{'// en bref'}</p>
                            <p className="projects-back-text">{project.note}</p>
                          </>
                        )}
                      </div>

                      {project.link && (
                        <a
                          className="align-self-start projects-link"
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Voir le projet
                          <i className="bi bi-arrow-up-right"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects