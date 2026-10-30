import { readFileSync } from 'node:fs'
import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = JSON.parse(
  readFileSync(new URL('./serviceAccountKey.json', import.meta.url), 'utf8')
)

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

/* =====================================================
   CONTENU : un document par section de la collection "content"
   Convention : champFr / champEn pour chaque texte traduit
   ===================================================== */

const content = {
  /* ---------- Profil : coordonnées utilisées par Contact et la Navbar ----------
     whatsappNumber : format international, sans "+" ni espaces (sert au lien wa.me) */
  profile: {
    name: 'Mamadou Dian Bah',
    year: '2026',
    email: 'mamadoudianbah365@gmail.com',
    whatsappNumber: '224626969454',
    whatsappDisplay: '+224 626 96 94 54',
    linkedinUrl: 'https://www.linkedin.com/in/mamadou-dian-bah-109987206',
    linkedinDisplay: 'linkedin.com/in/mamadou-dian-bah',
    githubUrl: 'https://github.com/Jabir224',
    githubDisplay: 'github.com/Jabir224',
  },

  /* ---------- Navbar ---------- */
  navbar: {
    items: [
      { labelFr: 'À propos', labelEn: 'About' },
      { labelFr: 'Expertise', labelEn: 'Expertise' },
      { labelFr: 'Projets', labelEn: 'Projects' },
      { labelFr: 'Parcours', labelEn: 'Journey' },
      { labelFr: 'Contacts', labelEn: 'Contact' },
    ],
    navigationLabel: '// navigation',
    findMeLabelFr: '// me trouver',
    findMeLabelEn: '// find me',
    placeFr: 'Basé à Conakry, Guinée',
    placeEn: 'Based in Conakry, Guinea',
    openMenuFr: 'Ouvrir le menu',
    openMenuEn: 'Open the menu',
    closeMenuFr: 'Fermer le menu',
    closeMenuEn: 'Close the menu',
  },

  /* ---------- Héros ---------- */
  hero: {
    titleFr: 'JE CONÇOIS ET JE PILOTE DES',
    titleEn: 'I DESIGN AND LEAD',
    accentFr: 'PRODUITS DIGITAUX',
    accentEn: 'DIGITAL PRODUCTS',
    subtitleFr: 'du besoin métier au code.',
    subtitleEn: 'from business need to code.',
    primaryButtonFr: 'Me contacter',
    primaryButtonEn: 'Contact me',
    secondaryButtonFr: 'Voir mes projets',
    secondaryButtonEn: 'View my projects',
  },

  /* ---------- À propos ---------- */
  about: {
    eyebrowFr: '// à propos',
    eyebrowEn: '// about',
    titleStartFr: 'Je fais le pont entre le',
    titleStartEn: 'I bridge the gap between',
    titleAccent1Fr: 'besoin',
    titleAccent1En: 'need',
    titleMiddleFr: 'et le',
    titleMiddleEn: 'and',
    titleAccent2Fr: 'code',
    titleAccent2En: 'code',
    textFr:
      'Développeur de formation et MOA, je traduis les besoins métier en produits digitaux qui fonctionnent. J’ai créé mes propres applications, co-construit des projets en équipe et piloté des projets bancaires de bout en bout, tout en présidant une association : j’y ai appris à fédérer une équipe et à tenir un cap. Une nouvelle application est en construction.',
    textEn:
      'Developer by training and project owner (MOA), I turn business needs into digital products that work. I built my own applications, co-built projects within teams and led banking projects end to end, all while chairing an association, where I learned to unite a team and stay the course. A new application is under construction.',
    roles: [
      { titleFr: 'Développeur', titleEn: 'Developer' },
      { titleFr: 'MOA & pilotage', titleEn: 'Project owner & delivery' },
      { titleFr: 'Conception', titleEn: 'Design' },
      { titleFr: 'Leadership & com', titleEn: 'Leadership & communication' },
    ],
    stats: [
      { value: '03', labelFr: 'projets pilotés en MOA', labelEn: 'projects led as project owner' },
      { value: '02', labelFr: 'projets co-construits', labelEn: 'co-built projects' },
      { value: '03', labelFr: 'applications créées seul', labelEn: 'apps built solo' },
      { value: '01', labelFr: 'association présidée', labelEn: 'association chaired' },
    ],
  },

  /* ---------- Expertise ---------- */
  expertise: {
    eyebrow: '// expertise',
    titleStartFr: 'Entre le métier et la technique, le besoin se perd.',
    titleStartEn: 'Between business and technology, the need gets lost.',
    titleAccentFr: 'Je suis le pont.',
    titleAccentEn: 'I am the bridge.',
    pipelineLabelFr: '// la chaîne complète',
    pipelineLabelEn: '// the full chain',
    pipelineTitleFr: 'Je couvre toute la chaîne, du besoin à la mise en production.',
    pipelineTitleEn: 'I cover the whole chain, from need to production.',
    stepsFr: 'Besoin, Cadrage, Conception, Code, Livraison',
    stepsEn: 'Need, Scoping, Design, Code, Delivery',
    stackLabel: '// stack',
    stackTitleFr: 'Les outils que je maîtrise.',
    stackTitleEn: 'The tools I master.',
    mainTools: 'React, Flutter, Laravel',
    otherTools: 'JavaScript, Django, PostgreSQL, Figma, Git',
    benefitsLabelFr: '// ce que ça change pour vous',
    benefitsLabelEn: '// what it changes for you',
    ctaFr: 'Parlons de votre projet',
    ctaEn: 'Let’s talk about your project',
    pillars: [
      {
        titleFr: 'MOA & pilotage',
        titleEn: 'Project ownership & delivery',
        benefitFr: 'Un projet cadré, planifié, livré.',
        benefitEn: 'A project scoped, planned and delivered.',
        proofFr: 'Je pilote Bank to Wallet, E-banking et Wallet BNG à la Banque Nationale de Guinée.',
        proofEn: 'I lead Bank to Wallet, E-banking and Wallet BNG at Banque Nationale de Guinée.',
        tagsFr: 'Scrum, Jira, Trello',
        tagsEn: 'Scrum, Jira, Trello',
      },
      {
        titleFr: 'Conception',
        titleEn: 'Design',
        benefitFr: 'Un produit pensé avant d’être codé.',
        benefitEn: 'A product thought through before it is coded.',
        proofFr: 'Maquettes Figma, modélisation de bases de données et conception d’API pour plusieurs applications.',
        proofEn: 'Figma mockups, database modeling and API design for several applications.',
        tagsFr: 'Figma, Canva, API',
        tagsEn: 'Figma, Canva, API',
      },
      {
        titleFr: 'Leadership & com',
        titleEn: 'Leadership & communication',
        benefitFr: 'Une équipe alignée, du métier à la technique.',
        benefitEn: 'A team aligned from business to tech.',
        proofFr: 'Responsable régional d’une ONG nationale et membre de Toastmasters.',
        proofEn: 'Regional manager of a national NGO and Toastmasters member.',
        tagsFr: 'Management, Prise de parole',
        tagsEn: 'Management, Public speaking',
      },
    ],
    benefits: [
      { textFr: 'Moins d’allers-retours', textEn: 'Fewer back-and-forths' },
      { textFr: 'Des specs réalistes', textEn: 'Realistic specs' },
      { textFr: 'Une livraison de bout en bout', textEn: 'End-to-end delivery' },
    ],
  },

  /* ---------- Parcours ---------- */
  journey: {
    eyebrowFr: '// parcours',
    eyebrowEn: '// journey',
    titleStartFr: 'Du code au',
    titleStartEn: 'From code to',
    titleAccentFr: 'pilotage',
    titleAccentEn: 'project leadership',
    titleEndFr: ', un chemin cohérent.',
    titleEndEn: ', one coherent path.',
    hintDesktopFr: 'Survolez un point pour voir le détail de l’étape.',
    hintDesktopEn: 'Hover a point to see the details of the step.',
    hintMobileFr: 'Touchez une étape pour voir le détail.',
    hintMobileEn: 'Tap a step to see the details.',
    endLabelFr: '// à suivre',
    endLabelEn: '// to be continued',
    steps: [
      {
        periodFr: '2019 – 2023',
        periodEn: '2019 – 2023',
        titleFr: 'Génie informatique',
        titleEn: 'Computer engineering',
        place: 'Université Mahatma Gandhi',
        points: [
          { textFr: 'Diplôme en génie informatique', textEn: 'Degree in computer engineering' },
          { textFr: 'Bases du développement logiciel', textEn: 'Software development fundamentals' },
        ],
      },
      {
        periodFr: 'Mars – Juil. 2023',
        periodEn: 'Mar – Jul 2023',
        titleFr: 'Développeur Laravel',
        titleEn: 'Laravel developer',
        place: 'Mada hardsoft',
        points: [
          {
            textFr: 'Site web robuste sous Laravel, avec des améliorations significatives pour l’administration',
            textEn: 'Robust Laravel website, with significant improvements to the administration',
          },
          {
            textFr: 'Partie client en HTML, CSS et Bootstrap, modèle MVC et Eloquent',
            textEn: 'Client side in HTML, CSS and Bootstrap, MVC model and Eloquent',
          },
        ],
      },
      {
        periodFr: '2023',
        periodEn: '2023',
        titleFr: 'Développement mobile Flutter',
        titleEn: 'Flutter mobile development',
        place: 'DYMA.FR',
        points: [
          {
            textFr: 'Formation au développement mobile avec Flutter',
            textEn: 'Training in mobile development with Flutter',
          },
        ],
      },
      {
        periodFr: 'Juil. 2023 – Mars 2025',
        periodEn: 'Jul 2023 – Mar 2025',
        titleFr: 'Développeur mobile Flutter',
        titleEn: 'Flutter mobile developer',
        place: 'Wise and Winner',
        points: [
          {
            textFr: 'Prototypage et design Figma de plusieurs applications',
            textEn: 'Figma prototyping and design of several applications',
          },
          {
            textFr: 'Modélisation de bases de données et conception d’API en PHP',
            textEn: 'Database modeling and API design in PHP',
          },
          {
            textFr: 'Applications Flutter de la conception à la mise en production',
            textEn: 'Flutter applications from design to production',
          },
        ],
      },
      {
        periodFr: 'Avril 2025 – en cours',
        periodEn: 'April 2025 – present',
        titleFr: 'MOA',
        titleEn: 'Project owner (MOA)',
        place: 'Banque Nationale de Guinée',
        points: [
          {
            textFr: 'Pilotage de Bank to Wallet, E-banking et Wallet BNG',
            textEn: 'Leading Bank to Wallet, E-banking and Wallet BNG',
          },
          {
            textFr: 'Stratégie de pénétration du marché du projet Wallet',
            textEn: 'Market penetration strategy for the Wallet project',
          },
          {
            textFr: 'Coordination des équipes techniques et métiers',
            textEn: 'Coordination of technical and business teams',
          },
        ],
      },
    ],
  },

  /* ---------- Projets ----------
     Pour ajouter une note ou un lien à un projet :
       noteFr: '...', noteEn: '...', link: 'https://...'              */
  projects: {
    eyebrowFr: '// projets',
    eyebrowEn: '// projects',
    titleFr: 'Ce que j’ai piloté, construit et créé.',
    titleEn: 'What I led, built and created.',
    flipHintFr: 'Retourner',
    flipHintEn: 'Flip',
    backRoleFr: '// rôle',
    backRoleEn: '// role',
    backStack: '// stack',
    backStatusFr: '// statut',
    backStatusEn: '// status',
    backNoteFr: '// en bref',
    backNoteEn: '// in short',
    linkLabelFr: 'Voir le projet',
    linkLabelEn: 'View the project',
    statuses: [
      { id: 'production', labelFr: 'En production', labelEn: 'In production' },
      { id: 'soon', labelFr: 'Bientôt en production', labelEn: 'Going live soon' },
      { id: 'dev', labelFr: 'En développement', labelEn: 'In development' },
      { id: 'private', labelFr: 'Usage privé', labelEn: 'Private use' },
      { id: 'past', labelFr: 'Premier stage', labelEn: 'First internship' },
    ],
    categories: [
      {
        id: 'moa',
        icon: 'bi bi-kanban',
        tabFr: 'Pilotés en MOA',
        tabEn: 'Led as project owner',
        labelFr: '// j’ai piloté',
        labelEn: '// I led',
        introFr: 'Des projets où j’ai porté le besoin métier jusqu’à la livraison.',
        introEn: 'Projects where I carried the business need through to delivery.',
        projects: [
          {
            id: 'b2w',
            name: 'B2W',
            status: 'production',
            contextFr: 'Projet digital de la Banque Nationale de Guinée.',
            contextEn: 'Digital project of Banque Nationale de Guinée.',
            roleFr: 'MOA, pilotage du projet',
            roleEn: 'Project owner (MOA), project lead',
            stackFr: 'MOA, Pilotage',
            stackEn: 'MOA, Delivery',
          },
          {
            id: 'ebanking',
            name: 'E-banking BNG',
            status: 'production',
            contextFr: 'Application de banque en ligne de la Banque Nationale de Guinée.',
            contextEn: 'Online banking application of Banque Nationale de Guinée.',
            roleFr: 'MOA, pilotage du projet',
            roleEn: 'Project owner (MOA), project lead',
            stackFr: 'MOA, Pilotage',
            stackEn: 'MOA, Delivery',
          },
          {
            id: 'click',
            name: 'CLICK',
            status: 'soon',
            contextFr: 'Application de banque mobile de la Banque Nationale de Guinée.',
            contextEn: 'Mobile banking application of Banque Nationale de Guinée.',
            roleFr: 'MOA, pilotage du projet',
            roleEn: 'Project owner (MOA), project lead',
            stackFr: 'MOA, Pilotage',
            stackEn: 'MOA, Delivery',
          },
        ],
      },
      {
        id: 'co',
        icon: 'bi bi-people',
        tabFr: 'Co-construits',
        tabEn: 'Co-built',
        labelFr: '// j’ai co-construit',
        labelEn: '// I co-built',
        introFr: 'Des projets menés en équipe, où j’ai apporté ma part de conception et de code.',
        introEn: 'Projects built as a team, where I contributed design and code.',
        projects: [
          {
            id: 'guinee-foot',
            name: 'Guinée Foot',
            status: 'production',
            contextFr: 'Application de football guinéen, l’une des plus connues du pays.',
            contextEn: 'Guinean football application, one of the best known in the country.',
            roleFr: 'Développeur au sein de l’équipe',
            roleEn: 'Developer within the team',
            stackFr: 'Développement',
            stackEn: 'Development',
          },
          {
            id: 'tulip',
            name: 'Bornes Tulip Industries',
            status: 'past',
            contextFr: 'Application web pour les bornes de Tulip Industries.',
            contextEn: 'Web application for the Tulip Industries kiosks.',
            roleFr: 'Stagiaire développeur',
            roleEn: 'Developer intern',
            stackFr: 'Web, Stage',
            stackEn: 'Web, Internship',
          },
        ],
      },
      {
        id: 'own',
        icon: 'bi bi-code-slash',
        tabFr: 'Mes créations',
        tabEn: 'My creations',
        labelFr: '// j’ai tout fait seul',
        labelEn: '// I did it all myself',
        introFr: 'Du besoin à la mise en ligne, conçus et développés seul avec Flutter.',
        introEn: 'From need to launch, designed and built on my own with Flutter.',
        projects: [
          {
            id: 'factustock',
            name: 'Factustock',
            status: 'dev',
            contextFr: 'Application mobile de facturation et de gestion de stock.',
            contextEn: 'Mobile invoicing and stock management application.',
            roleFr: 'Conception et développement',
            roleEn: 'Design and development',
            stackFr: 'Flutter, Mobile',
            stackEn: 'Flutter, Mobile',
          },
          {
            id: 'sante',
            name: 'Application de santé',
            status: 'dev',
            contextFr: 'Application mobile dans le domaine de la santé.',
            contextEn: 'Mobile application in the health field.',
            roleFr: 'Conception et développement',
            roleEn: 'Design and development',
            stackFr: 'Flutter, Mobile',
            stackEn: 'Flutter, Mobile',
          },
          {
            id: 'pere',
            name: 'Application pour un proche',
            status: 'private',
            contextFr: 'Conçue et développée pour un proche, usage privé.',
            contextEn: 'Designed and developed for a relative, private use.',
            roleFr: 'Conception et développement',
            roleEn: 'Design and development',
            stackFr: 'Flutter, Mobile',
            stackEn: 'Flutter, Mobile',
          },
        ],
      },
    ],
  },

  /* ---------- Contact ---------- */
  contact: {
    eyebrowFr: '// contact',
    eyebrowEn: '// contact',
    titleStartFr: 'Parlons de',
    titleStartEn: 'Let’s talk about',
    titleAccentFr: 'votre projet.',
    titleAccentEn: 'your project.',
    textFr: 'Un besoin, une idée, un projet à piloter ou à coder ? Écrivez-moi par le canal qui vous arrange.',
    textEn: 'A need, an idea, a project to lead or to code? Write to me through the channel that suits you.',
    placeFr: 'Basé à Conakry, Guinée',
    placeEn: 'Based in Conakry, Guinea',
    formLabelFr: '// envoyer un message',
    formLabelEn: '// send a message',
    subjectLabelFr: '// sujet',
    subjectLabelEn: '// subject',
    subjects: [
      { textFr: 'Projet digital', textEn: 'Digital project' },
      { textFr: 'Mission MOA', textEn: 'MOA assignment' },
      { textFr: 'Développement', textEn: 'Development' },
      { textFr: 'Autre', textEn: 'Other' },
    ],
    fieldNameFr: 'Votre nom',
    fieldNameEn: 'Your name',
    fieldReachFr: 'E-mail ou téléphone',
    fieldReachEn: 'Email or phone',
    fieldMessageFr: 'Votre message',
    fieldMessageEn: 'Your message',
    submitIdleFr: 'Envoyer le message',
    submitIdleEn: 'Send message',
    submitSendingFr: 'Envoi en cours...',
    submitSendingEn: 'Sending...',
    submitSentFr: 'Message envoyé, merci !',
    submitSentEn: 'Message sent, thank you!',
    submitErrorFr: 'Réessayer',
    submitErrorEn: 'Try again',
    feedbackIdleFr: 'Votre message m’arrive directement par e-mail.',
    feedbackIdleEn: 'Your message reaches me directly by email.',
    feedbackSentFr: 'Bien reçu, je vous réponds dès que possible.',
    feedbackSentEn: 'Received, I will reply as soon as possible.',
    feedbackWaitFr: 'Merci de patienter quelques secondes avant d’envoyer votre message.',
    feedbackWaitEn: 'Please wait a few seconds before sending your message.',
    feedbackErrorFr: 'L’envoi a échoué. Écrivez-moi directement à',
    feedbackErrorEn: 'Sending failed. Write to me directly at',
    footerTopFr: 'Retour en haut',
    footerTopEn: 'Back to top',
  },
}

/* =====================================================
   ÉCRITURE
   node scripts/seed.mjs                  écrit toutes les sections
   node scripts/seed.mjs profile contact  écrit seulement ces sections
   ===================================================== */

const requested = process.argv.slice(2)
const sections = requested.length > 0 ? requested : Object.keys(content)

for (const id of sections) {
  if (!content[id]) {
    console.error(`Section inconnue : "${id}". Disponibles : ${Object.keys(content).join(', ')}`)
    process.exit(1)
  }
}

for (const id of sections) {
  await db.collection('content').doc(id).set(content[id])
  console.log(`✔ content/${id} écrit`)
}

console.log('Terminé.')