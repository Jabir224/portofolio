import { useEffect, useRef } from 'react'
import '../../styles/expertise.css'

const steps = ['Besoin', 'Cadrage', 'Conception', 'Code', 'Livraison']

const mainTools = ['React', 'Flutter', 'Laravel']
const otherTools = ['JavaScript', 'Django', 'PostgreSQL', 'Figma', 'Git']

const pillars = [
  {
    number: '01',
    icon: 'bi bi-kanban',
    title: 'MOA & pilotage',
    benefit: 'Un projet cadré, planifié, livré.',
    proof: 'Je pilote Bank to Wallet, E-banking et Wallet BNG à la Banque Nationale de Guinée.',
    tags: ['Scrum', 'Jira', 'Trello'],
  },
  {
    number: '02',
    icon: 'bi bi-diagram-3',
    title: 'Conception',
    benefit: 'Un produit pensé avant d’être codé.',
    proof: 'Maquettes Figma, modélisation de bases de données et conception d’API pour plusieurs applications.',
    tags: ['Figma', 'Canva', 'API'],
  },
  {
    number: '03',
    icon: 'bi bi-people',
    title: 'Leadership & com',
    benefit: 'Une équipe alignée, du métier à la technique.',
    proof: 'Responsable régional d’une ONG nationale et membre de Toastmasters.',
    tags: ['Management', 'Prise de parole'],
  },
]

const benefits = [
  { icon: 'bi bi-arrow-repeat', text: 'Moins d’allers-retours' },
  { icon: 'bi bi-rulers', text: 'Des specs réalistes' },
  { icon: 'bi bi-rocket-takeoff', text: 'Une livraison de bout en bout' },
]

export function Expertise() {
  const sectionRef = useRef(null)

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
        <p className="mb-3 expertise-eyebrow">// expertise</p>

        <h2 className="fw-bold mb-5 expertise-title">
          Entre le métier et la technique, le besoin se perd.{' '}
          <span className="expertise-title-accent">Je suis le pont.</span>
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
              <p className="mb-2 expertise-cell-label">// la chaîne complète</p>
              <h3 className="fw-bold mb-4 expertise-cell-title">
                Je couvre toute la chaîne, du besoin à la mise en production.
              </h3>

              <ol className="list-unstyled mb-4 d-flex expertise-steps">
                {steps.map((step, index) => (
                  <li
                    key={step}
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

              <p className="mb-0 expertise-cell-proof">
                Applications Flutter livrées de la conception à la mise en production.
              </p>
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
              <p className="mb-2 expertise-cell-label">// stack</p>
              <h3 className="fw-bold mb-4 expertise-cell-title">Les outils que je maîtrise.</h3>

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
            <div key={pillar.number} className="col-12 col-md-4">
              <div
                className="h-100 p-4 d-flex flex-column expertise-cell"
                data-reveal
                onMouseMove={handleMove}
                style={{ '--d': index + 2 }}
              >
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <span className="expertise-cell-label">{pillar.number}</span>
                  <i className={pillar.icon} aria-hidden="true"></i>
                </div>

                <h3 className="fw-bold mb-2 expertise-cell-title">{pillar.title}</h3>
                <p className="mb-3 expertise-cell-benefit">{pillar.benefit}</p>
                <p className="mb-4 expertise-cell-proof">{pillar.proof}</p>

                <div className="mt-auto d-flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
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
                <p className="mb-3 expertise-cell-label">// ce que ça change pour vous</p>
                <ul className="list-unstyled mb-0 d-flex flex-column flex-md-row flex-wrap gap-3 gap-md-5">
                  {benefits.map((benefit) => (
                    <li key={benefit.text} className="d-flex align-items-center gap-2 expertise-benefit">
                      <i className={benefit.icon} aria-hidden="true"></i>
                      <span>{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#contact" className="expertise-cta">
                Parlons de votre projet
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}