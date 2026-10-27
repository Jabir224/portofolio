import '../../styles/heros.css'
import portrait from '../../assets/portrait.png'

export function Heros() {
  return (
    <section className="m-3 p-3 d-flex flex-column heros">
      <div className="row g-0 flex-grow-1">
        {/* Côté gauche : texte et boutons */}
        <div className="col-12 col-md-7 px-2 px-md-4 py-4 py-md-0 d-flex flex-column justify-content-center">
          <h1 className="fw-bold mb-0 heros-title">
            JE CONÇOIS ET JE PILOTE DES{' '}
            <span className="heros-title-accent">PRODUITS DIGITAUX</span>
          </h1>
          <p className="mt-4 mb-0 heros-subtitle">du besoin métier au code.</p>

          <div className="d-flex flex-wrap gap-3 mt-4 mt-md-5">
            <a href="#contact" className="heros-btn heros-btn-primary">
              Me contacter
            </a>
            <a href="#projects" className="heros-btn heros-btn-secondary">
              Voir mes projets
            </a>
          </div>
        </div>

        {/* Côté droit : le portrait incrusté dans le fond */}
        <div className="col-12 col-md-5 position-relative heros-visual">
          <img
            src={portrait}
            alt="Portrait de Mamadou Dian Bah"
            className="position-absolute bottom-0 start-0 w-100 h-100 heros-image"
          />
        </div>
      </div>
    </section>
  )
}