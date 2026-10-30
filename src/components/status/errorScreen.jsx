import '../../styles/status.css'

export function ErrorScreen({ errorCode = 'unavailable', onRetry }) {
  return (
    <main
      className="status-screen d-flex flex-column align-items-center justify-content-center text-center"
      role="alert"
    >
      <p className="mb-4 status-brand">
        <span className="status-brand-dot" aria-hidden="true"></span>
        Portfolio
      </p>

      <h1 className="fw-bold mb-3 error-title">
        Le site n’a pas pu se <span className="error-title-accent">charger</span>.
      </h1>

      <p className="mb-4 error-text">
        Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.
      </p>

      <div className="w-100 mb-4 error-terminal">
        <p className="mb-1">
          <span className="error-terminal-prompt">$</span> connexion au contenu
        </p>
        <p className="mb-0">
          erreur : <span className="error-terminal-code">{errorCode}</span>
        </p>
      </div>

      <button
        type="button"
        className="d-inline-flex align-items-center gap-2 error-button"
        onClick={onRetry}
      >
        <i className="bi bi-arrow-clockwise" aria-hidden="true"></i>
        Réessayer
      </button>
    </main>
  )
}