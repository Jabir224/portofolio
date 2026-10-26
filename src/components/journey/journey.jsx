import { useEffect, useRef, useState } from 'react'
import '../../styles/journey.css'

const DESKTOP_QUERY = '(min-width: 992px)'

// Tracé du serpent dans un repère de 1000 x 380
const PATH = 'M 40 90 H 860 A 100 100 0 0 1 860 290 H 120'

// x et y : position du cercle en % du tracé
// t : avancement sur la ligne (0 à 1), pour que le cercle apparaisse quand la ligne l'atteint
// side : sens d'ouverture de la carte sur desktop
const steps = [
  {
    period: '2019 – 2023',
    title: 'Génie informatique',
    place: 'Université Mahatma Gandhi',
    points: ['Diplôme en génie informatique', 'Bases du développement logiciel'],
    x: '18%',
    y: '23.7%',
    t: 0.075,
    side: 'down',
  },
  {
    period: 'Mars – Juil. 2023',
    title: 'Développeur Laravel',
    place: 'Mada hardsoft',
    points: [
      'Site web robuste sous Laravel, avec des améliorations significatives pour l’administration',
      'Partie client en HTML, CSS et Bootstrap, modèle MVC et Eloquent',
    ],
    x: '44%',
    y: '23.7%',
    t: 0.213,
    side: 'down',
  },
  {
    period: '2023',
    title: 'Développement mobile Flutter',
    place: 'DYMA.FR',
    points: ['Formation au développement mobile avec Flutter'],
    x: '70%',
    y: '23.7%',
    t: 0.352,
    side: 'down',
  },
  {
    period: 'Juil. 2023 – Mars 2025',
    title: 'Développeur mobile Flutter',
    place: 'Wise and Winner',
    points: [
      'Prototypage et design Figma de plusieurs applications',
      'Modélisation de bases de données et conception d’API en PHP',
      'Applications Flutter de la conception à la mise en production',
    ],
    x: '60%',
    y: '76.3%',
    t: 0.744,
    side: 'up',
  },
  {
    period: 'Avril 2025 – en cours',
    title: 'MOA',
    place: 'Banque Nationale de Guinée',
    points: [
      'Pilotage de Bank to Wallet, E-banking et Wallet BNG',
      'Stratégie de pénétration du marché du projet Wallet',
      'Coordination des équipes techniques et métiers',
    ],
    x: '36%',
    y: '76.3%',
    t: 0.872,
    side: 'up',
  },
]

export function Journey() {
  const trackRef = useRef(null)
  const listRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)

  // Suit le passage mobile / desktop
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)

    const handleChange = (event) => {
      setIsDesktop(event.matches)
      setActiveIndex(null)
    }

    query.addEventListener('change', handleChange)

    return () => query.removeEventListener('change', handleChange)
  }, [])

  // Lance le dessin de la ligne quand le tracé entre dans l'écran
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(trackRef.current)

    return () => observer.disconnect()
  }, [])

  // Fait apparaître chaque étape quand elle arrive à l'écran (utile sur mobile)
  useEffect(() => {
    const items = listRef.current.querySelectorAll('.journey-item')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = 'true'
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.1 }
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  // Mobile : la ligne se remplit au fil du scroll
  useEffect(() => {
    if (isDesktop) return undefined

    const list = listRef.current
    let frame = 0

    const update = () => {
      frame = 0
      const rect = list.getBoundingClientRect()
      const raw = (window.innerHeight * 0.7 - rect.top) / rect.height
      list.style.setProperty('--progress', String(Math.min(1, Math.max(0, raw))))
    }

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isDesktop])

  // Desktop : survol. Mobile : un tap ouvre ou ferme la carte
  const handleEnter = (index) => {
    if (isDesktop) setActiveIndex(index)
  }

  const handleLeave = () => {
    if (isDesktop) setActiveIndex(null)
  }

  const handleClick = (index) => {
    setActiveIndex((prev) => {
      if (isDesktop) return index
      return prev === index ? null : index
    })
  }

  return (
    <section id="journey" className="m-3 py-3 pe-3 ps-4 p-lg-5 journey">
      <p className="mb-3 journey-eyebrow">// parcours</p>

      <h2 className="fw-bold mb-3 journey-title">
        Du code au <span className="journey-title-accent">pilotage</span>, un chemin cohérent.
      </h2>

      <p className="d-none d-lg-block mb-4 journey-hint">
        Survolez un point pour voir le détail de l’étape.
      </p>
      <p className="d-lg-none mb-4 journey-hint">Touchez une étape pour voir le détail.</p>

      <div ref={trackRef} className="mt-4 mt-lg-0 journey-track" data-visible={isVisible}>
        {/* Tracé du serpent (desktop uniquement) */}
        <svg className="d-none d-lg-block journey-svg" viewBox="0 0 1000 380" aria-hidden="true">
          <path className="journey-line-base" d={PATH} />
          <path className="journey-line-draw" pathLength="100" d={PATH} />

          <circle className="journey-cap-start" cx="40" cy="90" r="8" />
          <circle className="journey-cap-end" cx="120" cy="290" r="10" />
        </svg>

        <p className="d-none d-lg-block journey-end-label">// à suivre</p>

        <ol ref={listRef} className="list-unstyled mb-0 journey-list">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="journey-item"
              data-side={step.side}
              data-active={activeIndex === index}
              style={{ '--x': step.x, '--y': step.y, '--t': step.t }}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(index)}
            >
              <button
                type="button"
                className="journey-node"
                aria-expanded={activeIndex === index}
                aria-label={`${step.title}, ${step.period}`}
                onFocus={() => handleEnter(index)}
                onBlur={handleLeave}
              >
                <span className="journey-node-dot">{String(index + 1).padStart(2, '0')}</span>
              </button>

              <p className="journey-period">{step.period}</p>

              <div className="journey-card">
                <h3 className="fw-bold mb-1 journey-card-title">{step.title}</h3>
                <p className="mb-0 journey-card-place">{step.place}</p>

                <div className="journey-card-details">
                  <div className="journey-card-details-inner">
                    <ul className="list-unstyled mb-0 journey-card-points">
                      {step.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <i className="bi bi-plus-lg journey-card-icon" aria-hidden="true"></i>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}