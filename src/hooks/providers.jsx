import { useCallback, useEffect, useMemo, useState } from 'react'
import { ContentContext, LanguageContext } from './contexts'
import { fetchContent } from '../services/contentService'

/* ===================== Langue ===================== */

const STORAGE_KEY = 'portfolio-language'

// Lit la langue mémorisée : FR par défaut si rien n'est stocké ou si le stockage est bloqué
function getInitialLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'EN' ? 'EN' : 'FR'
  } catch {
    return 'FR'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  // Indique la langue au navigateur et aux lecteurs d'écran, et la mémorise
  useEffect(() => {
    document.documentElement.lang = language === 'EN' ? 'en' : 'fr'

    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Stockage indisponible : la langue reste valable pour la session
    }
  }, [language])

  const value = useMemo(
    () => ({
      language,
      isEN: language === 'EN',
      toggleLanguage: () => setLanguage((prev) => (prev === 'FR' ? 'EN' : 'FR')),
    }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/* ===================== Contenu ===================== */

// Durée maximale d'attente avant d'afficher la page d'erreur
const TIMEOUT_MS = 10000

// Durée minimale d'affichage du chargement, pour éviter un flash
const MIN_DISPLAY_MS = 900

// Délai avant d'afficher "la connexion est lente"
const SLOW_HINT_MS = 4000

const initialState = { status: 'loading', isSlow: false, data: null, errorCode: null }

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

function getErrorCode(error) {
  if (error instanceof Error && error.message === 'timeout') return 'timeout'
  return error?.code ?? 'unknown'
}

export function ContentProvider({ children }) {
  const [state, setState] = useState(initialState)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let isCancelled = false
    let timeoutTimer

    // Affiche le message "connexion lente" si le chargement traîne
    const slowTimer = setTimeout(() => {
      if (isCancelled) return
      setState((prev) => (prev.status === 'loading' ? { ...prev, isSlow: true } : prev))
    }, SLOW_HINT_MS)

    // Abandonne la lecture au bout du délai maximum
    const timeout = new Promise((_, reject) => {
      timeoutTimer = setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS)
    })

    Promise.all([Promise.race([fetchContent(), timeout]), wait(MIN_DISPLAY_MS)])
      .then(([data]) => {
        if (!isCancelled) setState({ ...initialState, status: 'ready', data })
      })
      .catch((error) => {
        if (!isCancelled) {
          setState({ ...initialState, status: 'error', errorCode: getErrorCode(error) })
        }
      })
      .finally(() => {
        clearTimeout(slowTimer)
        clearTimeout(timeoutTimer)
      })

    return () => {
      isCancelled = true
      clearTimeout(slowTimer)
      clearTimeout(timeoutTimer)
    }
  }, [attempt])

  // Repasse en chargement puis relance la lecture
  const retry = useCallback(() => {
    setState(initialState)
    setAttempt((prev) => prev + 1)
  }, [])

  const value = useMemo(() => ({ ...state, retry }), [state, retry])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}