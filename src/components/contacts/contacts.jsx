import { useEffect, useRef, useState } from 'react'
import '../../styles/contact.css'

const EMAIL = 'mamadoudianbah365@gmail.com'
const WHATSAPP_NUMBER = '224626969454'
const WHATSAPP_DISPLAY = '+224 626 96 94 54'
const LINKEDIN_URL = 'https://www.linkedin.com/in/mamadou-dian-bah-109987206'
const LINKEDIN_DISPLAY = 'linkedin.com/in/mamadou-dian-bah'
const GITHUB_URL = 'https://github.com/Jabir224'
const GITHUB_DISPLAY = 'github.com/Jabir224'

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

const CHANNELS = [
  {
    id: 'mail',
    icon: 'bi bi-envelope',
    label: '// e-mail',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
  },
  {
    id: 'whatsapp',
    icon: 'bi bi-whatsapp',
    label: '// whatsapp',
    value: WHATSAPP_DISPLAY,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    external: true,
  },
  {
    id: 'linkedin',
    icon: 'bi bi-linkedin',
    label: '// linkedin',
    value: LINKEDIN_DISPLAY,
    href: LINKEDIN_URL,
    external: true,
  },
  {
    id: 'github',
    icon: 'bi bi-github',
    label: '// github',
    value: GITHUB_DISPLAY,
    href: GITHUB_URL,
    external: true,
  },
]

const SUBJECTS = ['Projet digital', 'Mission MOA', 'Développement', 'Autre']

const EMPTY_FORM = { name: '', reach: '', message: '' }

function Contact() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [subjectIndex, setSubjectIndex] = useState(0)
  const [status, setStatus] = useState('idle')
  const sectionRef = useRef(null)

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
    setForm((current) => ({ ...current, [name]: value }))
    if (status !== 'sending') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Champ piège : un humain ne le remplit jamais
    const honey = new FormData(event.currentTarget).get('_honey')
    if (honey) return

    setStatus('sending')

    const subject = SUBJECTS[subjectIndex]

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[Portfolio] ${subject} - ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          Sujet: subject,
          Nom: form.name,
          Contact: form.reach,
          Message: form.message,
        }),
      })

      if (!response.ok) throw new Error('Envoi refusé')

      setForm(EMPTY_FORM)
      setStatus('sent')
    } catch (error) {
      setStatus('error')
    }
  }

  const submitLabel = {
    idle: 'Envoyer le message',
    sending: 'Envoi en cours...',
    sent: 'Message envoyé, merci !',
    error: 'Réessayer',
  }[status]

  const submitIcon = {
    idle: 'bi bi-arrow-right',
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
              {'// contact'}
            </p>

            <h2
              className="contact-reveal fw-bold contact-title"
              style={{ '--d': '80ms' }}
            >
              Parlons de <span className="contact-title-accent">votre projet.</span>
            </h2>

            <p className="contact-reveal contact-text" style={{ '--d': '160ms' }}>
              Un besoin, une idée, un projet à piloter ou à coder ? Écrivez-moi
              par le canal qui vous arrange.
            </p>

            <p
              className="contact-reveal d-inline-flex align-items-center gap-2 contact-place"
              style={{ '--d': '220ms' }}
            >
              <span className="contact-pulse"></span>
              Basé à Conakry, Guinée
            </p>

            <ul className="list-unstyled d-flex flex-column gap-3 contact-links">
              {CHANNELS.map((channel, index) => (
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
              <p className="contact-form-label">{'// envoyer un message'}</p>

              {/* Sujet */}
              <p className="contact-form-sub">{'// sujet'}</p>
              <div className="d-flex flex-wrap gap-2 contact-chips">
                {SUBJECTS.map((subject, index) => (
                  <button
                    key={subject}
                    type="button"
                    className="contact-chip"
                    data-active={subjectIndex === index}
                    aria-pressed={subjectIndex === index}
                    onClick={() => {
                      setSubjectIndex(index)
                      if (status !== 'sending') setStatus('idle')
                    }}
                  >
                    {subject}
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
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                    <label className="contact-field-label" htmlFor="contact-name">
                      Votre nom
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
                      required
                      value={form.reach}
                      onChange={handleChange}
                    />
                    <label className="contact-field-label" htmlFor="contact-reach">
                      E-mail ou téléphone
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
                      required
                      value={form.message}
                      onChange={handleChange}
                    ></textarea>
                    <label className="contact-field-label" htmlFor="contact-message">
                      Votre message
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
                {status === 'sent' && 'Bien reçu, je vous réponds dès que possible.'}
                {status === 'error' && (
                  <>
                    L’envoi a échoué. Écrivez-moi directement à{' '}
                    <a className="contact-feedback-link" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                    .
                  </>
                )}
                {(status === 'idle' || status === 'sending') &&
                  'Votre message m’arrive directement par e-mail.'}
              </p>
            </form>
          </div>
        </div>

        {/* ===== Pied de page ===== */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 contact-footer">
          <span>© 2026 Mamadou Dian Bah</span>
          <span>Conakry, Guinée</span>
          <a className="d-inline-flex align-items-center gap-2 contact-top" href="#">
            Retour en haut
            <i className="bi bi-arrow-up"></i>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact