import { createContext, useContext, useMemo } from 'react'

export const LanguageContext = createContext(null)
export const ContentContext = createContext(null)

// Repère, dans un objet, les groupes de champs qui sont des versions d'un même texte :
// title / titleFr / titleEn. Renvoie { clé en minuscules: { name, fr, en } }
function findLanguageGroups(object) {
  const keys = Object.keys(object)
  const lowerKeys = new Set(keys.map((key) => key.toLowerCase()))
  const groups = {}

  keys.forEach((key) => {
    const match = key.match(/^(.+?)(fr|en)$/i)

    if (!match || typeof object[key] !== 'string') return

    const base = match[1]
    const suffix = match[2].toLowerCase()
    const partnerSuffix = suffix === 'fr' ? 'en' : 'fr'

    const hasPartner = lowerKeys.has(`${base}${partnerSuffix}`.toLowerCase())
    const hasBase = keys.includes(base) && typeof object[base] === 'string'

    if (!hasPartner && !hasBase) return

    const id = base.toLowerCase()
    groups[id] = groups[id] ?? { name: base }
    groups[id][suffix] = key
  })

  return groups
}

// Transforme récursivement le contenu en texte de la langue choisie.
// Gère : { fr, en }  |  title / titleFr / titleEn  |  title / titleEN
function resolve(value, lang) {
  if (Array.isArray(value)) {
    return value.map((item) => resolve(item, lang))
  }

  if (value && typeof value === 'object') {
    // Convention 1 : un objet { fr: '...', en: '...' }
    const isText = typeof value.fr === 'string' && typeof value.en === 'string'

    if (isText) return value[lang]

    // Convention 2 : des champs séparés par langue
    const groups = Object.values(findLanguageGroups(value))
    const consumedKeys = new Set()

    groups.forEach((group) => {
      if (group.fr) consumedKeys.add(group.fr)
      if (group.en) consumedKeys.add(group.en)
    })

    const result = {}

    Object.entries(value).forEach(([key, item]) => {
      if (consumedKeys.has(key)) return

      result[key] = resolve(item, lang)
    })

    groups.forEach((group) => {
      const frenchText = group.fr ? value[group.fr] : value[group.name]
      const englishText = group.en ? value[group.en] : ''

      const wanted = lang === 'en' ? englishText : frenchText
      const fallback = lang === 'en' ? frenchText : englishText

      result[group.name] = (wanted ?? '').trim() !== '' ? wanted : (fallback ?? '')
    })

    return result
  }

  return value
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage doit être utilisé dans un LanguageProvider')
  }

  return context
}

export function useContentStatus() {
  const context = useContext(ContentContext)

  if (!context) {
    throw new Error('useContentStatus doit être utilisé dans un ContentProvider')
  }

  const { status, isSlow, errorCode, retry } = context

  return { status, isSlow, errorCode, retry }
}

// Renvoie une section du contenu, déjà traduite : useContent('hero')
export function useContent(sectionId) {
  const context = useContext(ContentContext)
  const { language } = useLanguage()

  if (!context) {
    throw new Error('useContent doit être utilisé dans un ContentProvider')
  }

  const { data } = context
  const lang = language === 'EN' ? 'en' : 'fr'

  return useMemo(() => resolve(data?.[sectionId] ?? {}, lang), [data, sectionId, lang])
}