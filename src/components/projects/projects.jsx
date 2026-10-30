import { useEffect, useRef, useState } from 'react'
import { useContent } from '../../hooks/contexts'
import '../../styles/projects.css'

// Découpe "Flutter, Mobile" en liste de mots
function toList(text) {
  return (text ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function Projects() {
  const content = useContent('projects')
  const categories = content.categories ?? []

  // Identifiant du statut vers son libellé traduit : { production: 'En production', ... }
  const statusLabels = Object.fromEntries(
    (content.statuses ?? []).map((status) => [status.id, status.label])
  )

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

  const category = categories[activeIndex]

  if (!category) return null

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
      <p className="projects-label">{content.eyebrow}</p>
      <h2 className="fw-bold projects-title">{content.title}</h2>

      <div
        className="position-relative d-grid projects-tabs"
        role="tablist"
        data-active={activeIndex}
      >
        <span className="projects-pill" aria-hidden="true"></span>
        {categories.map((item, index) => (
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
          {(category.projects ?? []).map((project, index) => {
            const isFlipped = flippedId === project.id
            const statusLabel = statusLabels[project.status] ?? project.status

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
                          {statusLabel}
                        </span>
                      </div>

                      <div>
                        <h3 className="fw-bold projects-card-title">{project.name}</h3>
                        <p className="projects-card-context">{project.context}</p>
                        <span className="d-inline-flex align-items-center gap-2 projects-hint">
                          <i className="bi bi-arrow-repeat"></i>
                          {content.flipHint}
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
                        <p className="projects-back-label">{content.backRole}</p>
                        <p className="projects-back-text">{project.role}</p>

                        <p className="projects-back-label">{content.backStack}</p>
                        <div className="d-flex flex-wrap gap-2">
                          {toList(project.stack).map((tag) => (
                            <span key={tag} className="projects-tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="projects-back-label">{content.backStatus}</p>
                        <p className="projects-back-text">{statusLabel}</p>

                        {project.note && (
                          <>
                            <p className="projects-back-label">{content.backNote}</p>
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
                          {content.linkLabel}
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