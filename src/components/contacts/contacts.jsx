import { useEffect, useRef, useState } from 'react'
import { useContent } from '../../hooks/contexts'
import '../../styles/contact.css'

// Sujets envoyés dans l'e-mail : toujours en français, quelle que soit la langue du visiteur.
// Même ordre que la liste "subjects" de la base.
const EMAIL_SUBJECTS = ['Projet digital', 'Mission MOA', 'Développement', 'Autre']

const EMPTY_FORM = { name: '', reach: '', message: '' }

// Longueurs maximales des champs
const MAX_NAME = 100
const MAX_REACH = 150
const MAX_MESSAGE = 2000

// Protections anti-spam
const MIN_TYPING_MS = 3000
const COOLDOWN_MS = 30000
const LAST_SENT_KEY = 'portfolio-contact-last-sent'

function getLastSent() {
  try {
    return Number(localStorage.getItem(LAST_SENT_KEY)) || 0
  } catch {
    return 0
  }
}

function saveLastSent() {
  try {
    localStorage.setItem(LAST_SENT_KEY, String(Date.now()))
  } catch {
    // Stockage indisponible : la pause entre deux envois ne sera pas mémorisée
  }
}

export function Contact() {
  const content = useContent('contact')
  const profile = useContent('profile')
  const subjects = content.subjects ?? []

  // Les canaux de contact viennent de la base : icônes et ordre restent dans le code
  const channels = [
    {
      id: 'mail',
      icon: 'bi bi-envelope',
      label: '// e-mail',
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
    },
    {
      id: 'whatsapp',
      icon: 'bi bi-whatsapp',
      label: '// whatsapp',
      value: profile.whatsappDisplay,
      href: `https://wa.me/${profile.whatsappNumber}`,
      external: true,
    },
    {
      id: 'linkedin',
      icon: 'bi bi-linkedin',
      label: '// linkedin',
      value: profile.linkedinDisplay,
      href: profile.linkedinUrl,
      external: true,
    },
    {
      id: 'github',
      icon: 'bi bi-github',
      label: '// github',
      value: profile.githubDisplay,
      href: profile.githubUrl,
      external: true,
    },
  ]

  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [subjectIndex, setSubjectIndex] = useState(0)
  const [status, setStatus] = useState('idle')
  const sectionRef = useRef(null)
  const typingStartedAt = useRef(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    // Mémorise l'instant de la première saisie
    if (typingStartedAt.current === null) typingStartedAt.current = Date.now()

    setForm((current) => ({ ...current, [name]: value }))
    if (status !== 'sending') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Champ piège : un humain ne le remplit jamais
    const honey = new FormData(event.currentTarget).get('_honey')
    if (honey) return

    // Sans adresse de destination, impossible d'envoyer
    if (!profile.email) {
      setStatus('error')
      return
    }

    // Champs faits uniquement d'espaces
    const name = form.name.trim()
    const reach = form.reach.trim()
    const message = form.message.trim()
    if (!name || !reach || !message) return

    // Trop rapide pour un humain, ou nouvel envoi trop proche du précédent
    const typedFor = Date.now() - (typingStartedAt.current ?? Date.now())
    const sinceLastSent = Date.now() - getLastSent()

    if (typedFor < MIN_TYPING_MS || sinceLastSent < COOLDOWN_MS) {
      setStatus('wait')
      return
    }

    setStatus('sending')

    const subject = EMAIL_SUBJECTS[subjectIndex]

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[Portfolio] ${subject} - ${name}`,
          _template: 'table',
          _captcha: 'false',
          Sujet: subject,
          Nom: name,
          Contact: reach,
          Message: message,
        }),
      })

      if (!response.ok) throw new Error('Envoi refusé')

      saveLastSent()
      typingStartedAt.current = null
      setForm(EMPTY_FORM)
      setStatus('sent')
    } catch (error) {
      setStatus('error')
    }
  }

  const submitLabel = {
    idle: content.submitIdle,
    wait: content.submitIdle,
    sending: content.submitSending,
    sent: content.submitSent,
    error: content.submitError,
  }[status]

  const submitIcon = {
    idle: 'bi bi-arrow-right',
    wait: 'bi bi-arrow-right',
    sending: 'bi bi-three-dots',
    sent: 'bi bi-check-lg',
    error: 'bi bi-arrow-repeat',
  }[status]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="m-3 contact"
      data-visible={visible}
    >
      <div className="contact-card p-4 p-lg-5" onMouseMove={handleMouseMove}>
        <div className="row g-5">
          {/* ===== Colonne gauche : titre + liens ===== */}
          <div className="col-12 col-lg-5">
            <p className="contact-reveal contact-label" style={{ '--d': '0ms' }}>
              {content.eyebrow}
            </p>

            <h2
              className="contact-reveal fw-bold contact-title"
              style={{ '--d': '80ms' }}
            >
              {content.titleStart}{' '}
              <span className="contact-title-accent">{content.titleAccent}</span>
            </h2>

            <p className="contact-reveal contact-text" style={{ '--d': '160ms' }}>
              {content.text}
            </p>

            <p
              className="contact-reveal d-inline-flex align-items-center gap-2 contact-place"
              style={{ '--d': '220ms' }}
            >
              <span className="contact-pulse"></span>
              {content.place}
            </p>

            <ul className="list-unstyled d-flex flex-column gap-3 contact-links">
              {channels.map((channel, index) => (
                <li
                  key={channel.id}
                  className="contact-reveal"
                  style={{ '--d': `${300 + index * 90}ms` }}
                >
                  <a
                    className="d-flex align-items-center gap-3 contact-link"
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noreferrer' : undefined}
                  >
                    <span className="d-flex align-items-center justify-content-center contact-link-icon">
                      <i className={channel.icon}></i>
                    </span>
                    <span className="flex-grow-1 contact-link-body">
                      <span className="d-block contact-link-label">
                        {channel.label}
                      </span>
                      <span className="d-block contact-link-value">
                        {channel.value}
                      </span>
                    </span>
                    <i className="bi bi-arrow-up-right contact-link-arrow"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Colonne droite : formulaire ===== */}
          <div className="col-12 col-lg-7">
            <form
              className="contact-reveal contact-form"
              style={{ '--d': '200ms' }}
              onSubmit={handleSubmit}
            >
              <p className="contact-form-label">{content.formLabel}</p>

              {/* Sujet */}
              <p className="contact-form-sub">{content.subjectLabel}</p>
              <div className="d-flex flex-wrap gap-2 contact-chips">
                {subjects.map((subject, index) => (
                  <button
                    key={index}
                    type="button"
                    className="contact-chip"
                    data-active={subjectIndex === index}
                    aria-pressed={subjectIndex === index}
                    onClick={() => {
                      setSubjectIndex(index)
                      if (status !== 'sending') setStatus('idle')
                    }}
                  >
                    {subject.text}
                  </button>
                ))}
              </div>

              {/* Champ piège anti-spam (invisible) */}
              <input
                className="contact-honey"
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Champs */}
              <div className="row g-3 contact-fields">
                <div className="col-12 col-md-6">
                  <div className="position-relative contact-field">
                    <input
                      id="contact-name"
                      className="w-100 contact-input"
                      type="text"
                      name="name"
                      placeholder=" "
                      autoComplete="name"
                      maxLength={MAX_NAME}
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                    <label className="contact-field-label" htmlFor="contact-name">
                      {content.fieldName}
                    </label>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="position-relative contact-field">
                    <input
                      id="contact-reach"
                      className="w-100 contact-input"
                      type="text"
                      name="reach"
                      placeholder=" "
                      maxLength={MAX_REACH}
                      required
                      value={form.reach}
                      onChange={handleChange}
                    />
                    <label className="contact-field-label" htmlFor="contact-reach">
                      {content.fieldReach}
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="position-relative contact-field">
                    <textarea
                      id="contact-message"
                      className="w-100 contact-input contact-textarea"
                      name="message"
                      rows="5"
                      placeholder=" "
                      maxLength={MAX_MESSAGE}
                      required
                      value={form.message}
                      onChange={handleChange}
                    ></textarea>
                    <label className="contact-field-label" htmlFor="contact-message">
                      {content.fieldMessage}
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="d-inline-flex align-items-center justify-content-center gap-2 contact-submit"
                data-status={status}
                disabled={status === 'sending'}
              >
                <span>{submitLabel}</span>
                <i className={submitIcon}></i>
              </button>

              <p className="contact-feedback" data-status={status} role="status">
                {status === 'sent' && content.feedbackSent}
                {status === 'wait' && content.feedbackWait}
                {status === 'error' && (
                  <>
                    {content.feedbackError}{' '}
                    <a className="contact-feedback-link" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                    .
                  </>
                )}
                {(status === 'idle' || status === 'sending') && content.feedbackIdle}
              </p>
            </form>
          </div>
        </div>

        {/* ===== Pied de page ===== */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 contact-footer">
          <span>
            © {profile.year} {profile.name}
          </span>
          <span>{content.place}</span>
          <a className="d-inline-flex align-items-center gap-2 contact-top" href="#">
            {content.footerTop}
            <i className="bi bi-arrow-up"></i>
          </a>
        </div>
      </div>
    </section>
  )
}