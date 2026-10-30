import { useContent } from '../../hooks/contexts'
import '../../styles/heros.css'
import portrait from '../../assets/portrait.png'

export function Heros() {
  const content = useContent('hero')

  return (
    <section className="m-3 p-3 d-flex flex-column heros">
      <div className="row g-0 flex-grow-1">
        {/* Côté gauche : texte et boutons */}
        <div className="col-12 col-md-7 px-2 px-md-4 py-4 py-md-0 d-flex flex-column justify-content-center">
          <h1 className="fw-bold mb-0 heros-title">
            {content.title} <span className="heros-title-accent">{content.accent}</span>
          </h1>
          <p className="mt-4 mb-0 heros-subtitle">{content.subtitle}</p>

          <div className="d-flex flex-wrap gap-3 mt-4 mt-md-5">
            <a href="#contact" className="heros-btn heros-btn-primary">
              {content.primaryButton}
            </a>
            <a href="#projects" className="heros-btn heros-btn-secondary">
              {content.secondaryButton}
            </a>
          </div>
        </div>

        {/* Côté droit : colonne sky mint avec l'image */}
        <div className="col-12 col-md-5 position-relative heros-visual">
          <img
            src={portrait}
            alt="Portrait"
            className="position-absolute bottom-0 start-0 w-100 h-100 heros-image"
          />
        </div>
      </div>
    </section>
  )
}