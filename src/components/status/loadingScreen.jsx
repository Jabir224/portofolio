import '../../styles/status.css'


export function LoadingScreen({ isSlow = false }) {
  return (
    <main
      className="status-screen d-flex flex-column align-items-center justify-content-center text-center"
      role="status"
      aria-live="polite"
    >
      <p className="mb-0 status-brand">
        <span className="status-brand-dot" aria-hidden="true"></span>
        Portfolio
      </p>

      <div className="status-bar" aria-hidden="true">
        <span className="status-bar-fill"></span>
      </div>

      <p className="mb-2 status-text">// chargement</p>

      <p className="mb-0 status-hint" data-visible={isSlow}>
        La connexion est lente, merci de patienter…
      </p>
    </main>
  )
}