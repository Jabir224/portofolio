import { useEffect, useRef } from 'react'
import { useContent } from '../../hooks/contexts'
import '../../styles/expertise.css'

// Une icône par pilier et par bénéfice, dans le même ordre que la base
const pillarIcons = ['bi bi-kanban', 'bi bi-diagram-3', 'bi bi-people']
const benefitIcons = ['bi bi-arrow-repeat', 'bi bi-rulers', 'bi bi-rocket-takeoff']

// Découpe "React, Flutter, Laravel" en liste de mots
function toList(text) {
  return (text ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function Expertise() {
  const content = useContent('expertise')
  const sectionRef = useRef(null)

  const steps = toList(content.steps)
  const mainTools = toList(content.mainTools)
  const otherTools = toList(content.otherTools)
  const pillars = content.pillars ?? []
  const benefits = content.benefits ?? []

  // Révèle chaque cellule quand elle entre dans l'écran
  useEffect(() => {
    const cells = sectionRef.current.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = 'true'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    cells.forEach((cell) => observer.observe(cell))

    return () => observer.disconnect()
  }, [])

  // Halo lumineux qui suit la souris dans la cellule
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <section id="expertise" ref={sectionRef} className="m-3 p-3 p-lg-5 expertise">
      <div className="expertise-content">
        <p className="mb-3 expertise-eyebrow">{content.eyebrow}</p>

        <h2 className="fw-bold mb-5 expertise-title">
          {content.titleStart} <span className="expertise-title-accent">{content.titleAccent}</span>
        </h2>

        <div className="row g-3">
          {/* Cellule 1 : le pipeline */}
          <div className="col-12 col-lg-7">
            <div
              className="h-100 p-4 expertise-cell"
              data-reveal
              onMouseMove={handleMove}
              style={{ '--d': 0 }}
            >
              <p className="mb-2 expertise-cell-label">{content.pipelineLabel}</p>
              <h3 className="fw-bold mb-4 expertise-cell-title">{content.pipelineTitle}</h3>

              <ol className="list-unstyled mb-0 d-flex expertise-steps">
                {steps.map((step, index) => (
                  <li
                    key={index}
                    className="d-flex flex-column align-items-center gap-2 expertise-step"
                    style={{ '--i': index }}
                  >
                    <span className="d-flex align-items-center justify-content-center expertise-step-dot">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="expertise-step-label">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Cellule 2 : la stack */}
          <div className="col-12 col-lg-5">
            <div
              className="h-100 p-4 expertise-cell"
              data-reveal
              onMouseMove={handleMove}
              style={{ '--d': 1 }}
            >
              <p className="mb-2 expertise-cell-label">{content.stackLabel}</p>
              <h3 className="fw-bold mb-4 expertise-cell-title">{content.stackTitle}</h3>

              <div className="d-flex flex-wrap gap-2 mb-3">
                {mainTools.map((tool) => (
                  <span key={tool} className="expertise-chip-main">
                    {tool}
                  </span>
                ))}
              </div>

              <div className="d-flex flex-wrap gap-2">
                {otherTools.map((tool) => (
                  <span key={tool} className="expertise-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cellules 3 à 5 : les piliers */}
          {pillars.map((pillar, index) => (
            <div key={index} className="col-12 col-md-4">
              <div
                className="h-100 p-4 d-flex flex-column expertise-cell"
                data-reveal
                onMouseMove={handleMove}
                style={{ '--d': index + 2 }}
              >
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <span className="expertise-cell-label">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <i className={pillarIcons[index]} aria-hidden="true"></i>
                </div>

                <h3 className="fw-bold mb-2 expertise-cell-title">{pillar.title}</h3>
                <p className="mb-3 expertise-cell-benefit">{pillar.benefit}</p>
                <p className="mb-4 expertise-cell-proof">{pillar.proof}</p>

                <div className="mt-auto d-flex flex-wrap gap-2">
                  {toList(pillar.tags).map((tag) => (
                    <span key={tag} className="expertise-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Cellule 6 : bandeau de conclusion */}
          <div className="col-12">
            <div
              className="p-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4 expertise-cell"
              data-reveal
              onMouseMove={handleMove}
              style={{ '--d': 5 }}
            >
              <div>
                <p className="mb-3 expertise-cell-label">{content.benefitsLabel}</p>
                <ul className="list-unstyled mb-0 d-flex flex-column flex-md-row flex-wrap gap-3 gap-md-5">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="d-flex align-items-center gap-2 expertise-benefit">
                      <i className={benefitIcons[index]} aria-hidden="true"></i>
                      <span>{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#contact" className="expertise-cta">
                {content.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}