import { useEffect } from 'react'

export function useScrollTheme(threshold = 50) {
  useEffect(() => {
    const update = () => {
      document.body.dataset.scrolled = window.scrollY > threshold ? 'true' : 'false'
    }

    update()
    window.addEventListener('scroll', update, { passive: true })

    return () => window.removeEventListener('scroll', update)
  }, [threshold])
}