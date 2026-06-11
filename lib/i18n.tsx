"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "nl" | "fr" | "es" | "tr";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "tr", label: "Türkçe" }
];

type EduEntry = { program: string; school: string; period: string; desc: string };
type Pillar = { title: string; desc: string };
type ServiceEntry = { title: string; desc: string };

export type Dict = {
  nav: { home: string; about: string; experience: string; skills: string; services: string; projects: string; contact: string };
  hero: {
    badge: string;
    roles: string[];
    desc: string;
    ctaWork: string;
    ctaContact: string;
    statFocus: string; statFocusV: string;
    statLocation: string; statLocationV: string;
    statStatus: string; statStatusV: string;
  };
  about: {
    eyebrow: string; title: string; desc: string;
    pillars: Pillar[];
    currently: string; currentlyRole: string; currentlyCompany: string; currentlyDesc: string;
    humanSkills: string; soft: string[]; learning: string;
  };
  exp: {
    eyebrow: string; title: string; desc: string;
    role: string; period: string; jobDesc: string; highlights: string[];
    edu: EduEntry[];
  };
  skills: { eyebrow: string; title: string; desc: string; hint: string };
  services: { eyebrow: string; title: string; items: ServiceEntry[] };
  projects: { eyebrow: string; title: string; desc: string; view: string };
  contact: {
    eyebrow: string; title: string; desc: string;
    ready: string; heading1: string; heading2: string; body: string; button: string;
  };
  footer: { tagline: string };
};

const en: Dict = {
  nav: { home: "Home", about: "About", experience: "Experience", skills: "Skills", services: "Services", projects: "Projects", contact: "Contact" },
  hero: {
    badge: "AUTOMATION & AI · BUILDING WHAT'S NEXT",
    roles: ["Full-Stack Developer", "Automation Engineer", "AI Agent Builder", "Power Platform Developer"],
    desc: "I build full-stack web apps and intelligent automations: from React frontends to AI agents that run real business workflows. New technology is my favourite playground.",
    ctaWork: "Explore my work",
    ctaContact: "Get in touch",
    statFocus: "Focus", statFocusV: "Full-Stack · Automation · AI",
    statLocation: "Location", statLocationV: "Ghent, Belgium",
    statStatus: "Status", statStatusV: "Available for opportunities"
  },
  about: {
    eyebrow: "About",
    title: "Curious by default, builder by choice.",
    desc: "Full-stack developer from Ghent, Belgium, currently at Astena working on business automation and AI inside the Microsoft ecosystem. I love the moment a new technology clicks and becomes a tool I can build with.",
    pillars: [
      { title: "Ship fast", desc: "Ideas become working products. I prototype quickly and iterate until it is solid." },
      { title: "Automate everything", desc: "If a task happens twice, I build a pipeline for it: from Power Automate flows to CI/CD." },
      { title: "AI-native", desc: "I build with AI, not just about it: agents that read, decide and act on real business data." }
    ],
    currently: "Currently",
    currentlyRole: "Software Developer Intern",
    currentlyCompany: "Astena",
    currentlyDesc: "Business Central (AL) development, Power Apps and Power Automate solutions, Azure DevOps pipelines, and an AI Mail Agent that automates real customer email workflows.",
    humanSkills: "Soft skills",
    soft: ["Teamwork", "Curiosity", "Time management", "Flexibility", "Communication", "Customer focus", "Creativity", "Accuracy", "Reliability"],
    learning: "Always learning, currently deep in AI agents and the Power Platform."
  },
  exp: {
    eyebrow: "Experience & Education",
    title: "The journey so far.",
    desc: "From STEM classrooms to building AI automation in a real company. Every step added a new layer.",
    role: "Software Developer Intern",
    period: "2026 · Internship",
    jobDesc: "Internship at Astena, a Microsoft solutions partner, working on business automation and AI inside the Microsoft ecosystem.",
    highlights: [
      "Developed extensions in Microsoft Dynamics 365 Business Central using AL",
      "Built Power Apps solutions and automated business workflows with Power Automate",
      "Managed Power Platform solutions and deployment pipelines with Azure DevOps",
      "Built an AI Mail Agent that automates the processing of incoming customer emails"
    ],
    edu: [
      { program: "Programming", school: "Artevelde University of Applied Sciences", period: "2024 - 2026", desc: "Building a rock-solid full-stack foundation through modern web, infrastructure and collaboration projects." },
      { program: "ICT", school: "CVO Gent", period: "2023 - 2024", desc: "Hands-on labs in networking, scripting and automation basics with a focus on practical troubleshooting." },
      { program: "Science & Mathematics", school: "Nieuwen Bosch Humaniora", period: "2019 - 2023", desc: "STEM-intensive secondary education that sharpened analytical thinking and problem solving." }
    ]
  },
  skills: {
    eyebrow: "Skills",
    title: "One orbit, many tools.",
    desc: "Modern web stacks, the Microsoft Power Platform and AI agents. I pick the right tool for the job and learn the missing ones on the way.",
    hint: "Drag to spin · tap a node to inspect it"
  },
  services: {
    eyebrow: "What I do",
    title: "From idea to running product.",
    items: [
      { title: "Full-Stack Development", desc: "End-to-end web apps: React frontends, Node.js & PHP backends, REST APIs and maintainable code." },
      { title: "Automations", desc: "Power Apps, Power Automate and Business Central solutions that remove repetitive work." },
      { title: "AI Agents & Integrations", desc: "AI-powered agents and integrations that read, classify and act on real data." },
      { title: "Consulting & Collaboration", desc: "Working with designers, developers and stakeholders to turn ideas into testable prototypes." }
    ]
  },
  projects: {
    eyebrow: "Projects",
    title: "Things I have actually built.",
    desc: "Real products: AI automation, full-stack platforms and mobile apps. Click any card for the full story.",
    view: "View details"
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something together.",
    desc: "Open to new opportunities, freelance projects and conversations about automation and AI. My inbox is the fastest route.",
    ready: "Ready when you are",
    heading1: "Have an idea?",
    heading2: "Let's automate it.",
    body: "Whether it is a web app, a business workflow or an AI agent, I would love to hear about it and figure out how to build it.",
    button: "Say hello"
  },
  footer: { tagline: "Built with Next.js, caffeine and curiosity." }
};

const nl: Dict = {
  nav: { home: "Home", about: "Over mij", experience: "Ervaring", skills: "Skills", services: "Diensten", projects: "Projecten", contact: "Contact" },
  hero: {
    badge: "AUTOMATION & AI · BUILDING WHAT'S NEXT",
    roles: ["Full-Stack Developer", "Automation Engineer", "AI Agent Builder", "Power Platform Developer"],
    desc: "Ik bouw full-stack webapps en intelligente automatisaties: van React-frontends tot AI-agents die echte bedrijfsprocessen uitvoeren. Nieuwe technologie is mijn favoriete speeltuin.",
    ctaWork: "Bekijk mijn werk",
    ctaContact: "Neem contact op",
    statFocus: "Focus", statFocusV: "Full-Stack · Automatisatie · AI",
    statLocation: "Locatie", statLocationV: "Gent, België",
    statStatus: "Status", statStatusV: "Beschikbaar voor opportuniteiten"
  },
  about: {
    eyebrow: "Over mij",
    title: "Nieuwsgierig van nature, bouwer uit overtuiging.",
    desc: "Full-stack developer uit Gent, momenteel aan de slag bij Astena rond bedrijfsautomatisatie en AI binnen het Microsoft-ecosysteem. Ik hou van het moment waarop nieuwe technologie klikt en een tool wordt waarmee ik kan bouwen.",
    pillars: [
      { title: "Snel opleveren", desc: "Ideeën worden werkende producten. Ik prototype snel en itereer tot het solide staat." },
      { title: "Alles automatiseren", desc: "Gebeurt een taak twee keer, dan bouw ik er een pipeline voor: van Power Automate-flows tot CI/CD." },
      { title: "AI-native", desc: "Ik bouw mét AI, niet alleen erover: agents die echte bedrijfsdata lezen, beslissen en uitvoeren." }
    ],
    currently: "Momenteel",
    currentlyRole: "Software Developer Stagiair",
    currentlyCompany: "Astena",
    currentlyDesc: "Business Central (AL)-ontwikkeling, Power Apps- en Power Automate-oplossingen, Azure DevOps-pipelines, en een AI Mail Agent die echte e-mailworkflows van klanten automatiseert.",
    humanSkills: "Soft skills",
    soft: ["Teamwork", "Nieuwsgierigheid", "Timemanagement", "Flexibiliteit", "Communicatie", "Klantgerichtheid", "Creativiteit", "Nauwkeurigheid", "Betrouwbaarheid"],
    learning: "Altijd aan het leren, momenteel volop bezig met AI-agents en het Power Platform."
  },
  exp: {
    eyebrow: "Ervaring & Opleiding",
    title: "Het parcours tot nu toe.",
    desc: "Van STEM-klaslokalen tot AI-automatisatie bouwen in een echt bedrijf. Elke stap voegde een laag toe.",
    role: "Software Developer Stagiair",
    period: "2026 · Stage",
    jobDesc: "Stage bij Astena, een Microsoft-partner, met focus op bedrijfsautomatisatie en AI binnen het Microsoft-ecosysteem.",
    highlights: [
      "Extensies ontwikkeld in Microsoft Dynamics 365 Business Central met AL",
      "Power Apps-oplossingen gebouwd en bedrijfsprocessen geautomatiseerd met Power Automate",
      "Power Platform-oplossingen en deployment-pipelines beheerd met Azure DevOps",
      "Een AI Mail Agent gebouwd die inkomende klantenmails automatisch verwerkt"
    ],
    edu: [
      { program: "Programmeren", school: "Arteveldehogeschool", period: "2024 - 2026", desc: "Een ijzersterke full-stack basis via moderne web-, infrastructuur- en samenwerkingsprojecten." },
      { program: "ICT", school: "CVO Gent", period: "2023 - 2024", desc: "Hands-on labo's rond netwerken, scripting en automatisatie met focus op praktisch probleemoplossen." },
      { program: "Wetenschappen & Wiskunde", school: "Nieuwen Bosch Humaniora", period: "2019 - 2023", desc: "STEM-intensief secundair onderwijs dat analytisch denken en probleemoplossen aanscherpte." }
    ]
  },
  skills: {
    eyebrow: "Skills",
    title: "Eén baan, veel tools.",
    desc: "Moderne webstacks, het Microsoft Power Platform en AI-agents. Ik kies de juiste tool voor de job en leer de ontbrekende onderweg.",
    hint: "Sleep om te draaien · tik op een node voor info"
  },
  services: {
    eyebrow: "Wat ik doe",
    title: "Van idee tot draaiend product.",
    items: [
      { title: "Full-Stack Development", desc: "End-to-end webapps: React-frontends, Node.js- & PHP-backends, REST API's en onderhoudbare code." },
      { title: "Automatisaties", desc: "Power Apps-, Power Automate- en Business Central-oplossingen die repetitief werk wegnemen." },
      { title: "AI-agents & Integraties", desc: "AI-gedreven agents en integraties die echte data lezen, classificeren en verwerken." },
      { title: "Consulting & Samenwerking", desc: "Samenwerken met designers, developers en stakeholders om ideeën om te zetten in testbare prototypes." }
    ]
  },
  projects: {
    eyebrow: "Projecten",
    title: "Dingen die ik echt gebouwd heb.",
    desc: "Echte producten: AI-automatisatie, full-stack platformen en mobiele apps. Klik op een kaart voor het volledige verhaal.",
    view: "Bekijk details"
  },
  contact: {
    eyebrow: "Contact",
    title: "Laten we samen iets bouwen.",
    desc: "Open voor nieuwe opportuniteiten, freelanceprojecten en gesprekken over automatisatie en AI. Mijn inbox is de snelste weg.",
    ready: "Klaar wanneer jij dat bent",
    heading1: "Een idee?",
    heading2: "Laten we het automatiseren.",
    body: "Of het nu een webapp, een bedrijfsworkflow of een AI-agent is: ik hoor er graag over en zoek mee uit hoe we het bouwen.",
    button: "Zeg hallo"
  },
  footer: { tagline: "Gebouwd met Next.js, cafeïne en nieuwsgierigheid." }
};

const fr: Dict = {
  nav: { home: "Accueil", about: "À propos", experience: "Expérience", skills: "Compétences", services: "Services", projects: "Projets", contact: "Contact" },
  hero: {
    badge: "AUTOMATION & AI · BUILDING WHAT'S NEXT",
    roles: ["Développeur Full-Stack", "Ingénieur Automatisation", "Créateur d'Agents IA", "Développeur Power Platform"],
    desc: "Je construis des applications web full-stack et des automatisations intelligentes : des frontends React aux agents IA qui exécutent de vrais processus métier. Les nouvelles technologies sont mon terrain de jeu favori.",
    ctaWork: "Découvrir mon travail",
    ctaContact: "Me contacter",
    statFocus: "Focus", statFocusV: "Full-Stack · Automatisation · IA",
    statLocation: "Localisation", statLocationV: "Gand, Belgique",
    statStatus: "Statut", statStatusV: "Disponible pour de nouvelles opportunités"
  },
  about: {
    eyebrow: "À propos",
    title: "Curieux par nature, bâtisseur par choix.",
    desc: "Développeur full-stack basé à Gand, en Belgique, actuellement chez Astena où je travaille sur l'automatisation d'entreprise et l'IA dans l'écosystème Microsoft. J'adore le moment où une nouvelle technologie fait sens et devient un outil avec lequel je peux construire.",
    pillars: [
      { title: "Livrer vite", desc: "Les idées deviennent des produits fonctionnels. Je prototype rapidement et j'itère jusqu'à ce que ce soit solide." },
      { title: "Tout automatiser", desc: "Si une tâche se répète, je construis un pipeline : des flux Power Automate au CI/CD." },
      { title: "IA-native", desc: "Je construis avec l'IA, pas seulement à son sujet : des agents qui lisent, décident et agissent sur de vraies données." }
    ],
    currently: "Actuellement",
    currentlyRole: "Stagiaire Développeur Logiciel",
    currentlyCompany: "Astena",
    currentlyDesc: "Développement Business Central (AL), solutions Power Apps et Power Automate, pipelines Azure DevOps, et un Agent Mail IA qui automatise de vrais flux d'e-mails clients.",
    humanSkills: "Soft skills",
    soft: ["Esprit d'équipe", "Curiosité", "Gestion du temps", "Flexibilité", "Communication", "Orientation client", "Créativité", "Précision", "Fiabilité"],
    learning: "Toujours en apprentissage, actuellement plongé dans les agents IA et la Power Platform."
  },
  exp: {
    eyebrow: "Expérience & Formation",
    title: "Le parcours jusqu'ici.",
    desc: "Des salles de classe STEM à la construction d'automatisations IA en entreprise. Chaque étape a ajouté une couche.",
    role: "Stagiaire Développeur Logiciel",
    period: "2026 · Stage",
    jobDesc: "Stage chez Astena, partenaire Microsoft, sur l'automatisation d'entreprise et l'IA dans l'écosystème Microsoft.",
    highlights: [
      "Développement d'extensions dans Microsoft Dynamics 365 Business Central en AL",
      "Création de solutions Power Apps et automatisation de processus avec Power Automate",
      "Gestion des solutions Power Platform et des pipelines de déploiement avec Azure DevOps",
      "Création d'un Agent Mail IA qui automatise le traitement des e-mails clients entrants"
    ],
    edu: [
      { program: "Programmation", school: "Artevelde University of Applied Sciences", period: "2024 - 2026", desc: "Une base full-stack solide à travers des projets web modernes, d'infrastructure et de collaboration." },
      { program: "ICT", school: "CVO Gent", period: "2023 - 2024", desc: "Labos pratiques en réseaux, scripting et bases de l'automatisation, axés sur le dépannage concret." },
      { program: "Sciences & Mathématiques", school: "Nieuwen Bosch Humaniora", period: "2019 - 2023", desc: "Un enseignement secondaire intensif en STEM qui a aiguisé la pensée analytique et la résolution de problèmes." }
    ]
  },
  skills: {
    eyebrow: "Compétences",
    title: "Une orbite, beaucoup d'outils.",
    desc: "Stacks web modernes, Microsoft Power Platform et agents IA. Je choisis le bon outil pour chaque tâche et j'apprends ceux qui manquent en chemin.",
    hint: "Glissez pour tourner · cliquez sur un nœud pour l'inspecter"
  },
  services: {
    eyebrow: "Ce que je fais",
    title: "De l'idée au produit en production.",
    items: [
      { title: "Développement Full-Stack", desc: "Applications web de bout en bout : frontends React, backends Node.js & PHP, API REST et code maintenable." },
      { title: "Automatisations", desc: "Solutions Power Apps, Power Automate et Business Central qui éliminent le travail répétitif." },
      { title: "Agents IA & Intégrations", desc: "Agents et intégrations propulsés par l'IA qui lisent, classifient et agissent sur de vraies données." },
      { title: "Conseil & Collaboration", desc: "Travailler avec designers, développeurs et parties prenantes pour transformer les idées en prototypes testables." }
    ]
  },
  projects: {
    eyebrow: "Projets",
    title: "Des choses que j'ai vraiment construites.",
    desc: "De vrais produits : automatisation IA, plateformes full-stack et apps mobiles. Cliquez sur une carte pour l'histoire complète.",
    view: "Voir les détails"
  },
  contact: {
    eyebrow: "Contact",
    title: "Construisons quelque chose ensemble.",
    desc: "Ouvert aux nouvelles opportunités, aux projets freelance et aux conversations sur l'automatisation et l'IA. Ma boîte mail est le chemin le plus rapide.",
    ready: "Prêt quand vous l'êtes",
    heading1: "Une idée ?",
    heading2: "Automatisons-la.",
    body: "Qu'il s'agisse d'une app web, d'un workflow métier ou d'un agent IA, j'aimerais en entendre parler et trouver comment le construire.",
    button: "Dites bonjour"
  },
  footer: { tagline: "Construit avec Next.js, de la caféine et de la curiosité." }
};

const es: Dict = {
  nav: { home: "Inicio", about: "Sobre mí", experience: "Experiencia", skills: "Habilidades", services: "Servicios", projects: "Proyectos", contact: "Contacto" },
  hero: {
    badge: "AUTOMATION & AI · BUILDING WHAT'S NEXT",
    roles: ["Desarrollador Full-Stack", "Ingeniero de Automatización", "Creador de Agentes IA", "Desarrollador Power Platform"],
    desc: "Construyo aplicaciones web full-stack y automatizaciones inteligentes: desde frontends en React hasta agentes de IA que ejecutan procesos de negocio reales. La nueva tecnología es mi terreno de juego favorito.",
    ctaWork: "Explora mi trabajo",
    ctaContact: "Contáctame",
    statFocus: "Enfoque", statFocusV: "Full-Stack · Automatización · IA",
    statLocation: "Ubicación", statLocationV: "Gante, Bélgica",
    statStatus: "Estado", statStatusV: "Disponible para nuevas oportunidades"
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Curioso por naturaleza, constructor por elección.",
    desc: "Desarrollador full-stack de Gante, Bélgica, actualmente en Astena trabajando en automatización empresarial e IA dentro del ecosistema Microsoft. Me encanta el momento en que una nueva tecnología hace clic y se convierte en una herramienta con la que puedo construir.",
    pillars: [
      { title: "Entregar rápido", desc: "Las ideas se convierten en productos funcionales. Hago prototipos rápido e itero hasta que queda sólido." },
      { title: "Automatizar todo", desc: "Si una tarea ocurre dos veces, construyo un pipeline: desde flujos de Power Automate hasta CI/CD." },
      { title: "IA nativa", desc: "Construyo con IA, no solo sobre ella: agentes que leen, deciden y actúan sobre datos reales de negocio." }
    ],
    currently: "Actualmente",
    currentlyRole: "Desarrollador de Software en Prácticas",
    currentlyCompany: "Astena",
    currentlyDesc: "Desarrollo en Business Central (AL), soluciones Power Apps y Power Automate, pipelines de Azure DevOps, y un Agente de Correo IA que automatiza flujos reales de correo de clientes.",
    humanSkills: "Soft skills",
    soft: ["Trabajo en equipo", "Curiosidad", "Gestión del tiempo", "Flexibilidad", "Comunicación", "Orientación al cliente", "Creatividad", "Precisión", "Fiabilidad"],
    learning: "Siempre aprendiendo, ahora inmerso en agentes de IA y la Power Platform."
  },
  exp: {
    eyebrow: "Experiencia & Formación",
    title: "El camino hasta ahora.",
    desc: "De las aulas STEM a construir automatización con IA en una empresa real. Cada paso añadió una capa.",
    role: "Desarrollador de Software en Prácticas",
    period: "2026 · Prácticas",
    jobDesc: "Prácticas en Astena, partner de Microsoft, trabajando en automatización empresarial e IA dentro del ecosistema Microsoft.",
    highlights: [
      "Desarrollo de extensiones en Microsoft Dynamics 365 Business Central con AL",
      "Creación de soluciones Power Apps y automatización de procesos con Power Automate",
      "Gestión de soluciones Power Platform y pipelines de despliegue con Azure DevOps",
      "Creación de un Agente de Correo IA que automatiza el procesamiento de correos entrantes de clientes"
    ],
    edu: [
      { program: "Programación", school: "Artevelde University of Applied Sciences", period: "2024 - 2026", desc: "Una base full-stack sólida a través de proyectos modernos de web, infraestructura y colaboración." },
      { program: "ICT", school: "CVO Gent", period: "2023 - 2024", desc: "Laboratorios prácticos de redes, scripting y fundamentos de automatización, con foco en la resolución práctica de problemas." },
      { program: "Ciencias & Matemáticas", school: "Nieuwen Bosch Humaniora", period: "2019 - 2023", desc: "Educación secundaria intensiva en STEM que afiló el pensamiento analítico y la resolución de problemas." }
    ]
  },
  skills: {
    eyebrow: "Habilidades",
    title: "Una órbita, muchas herramientas.",
    desc: "Stacks web modernos, Microsoft Power Platform y agentes de IA. Elijo la herramienta adecuada para cada trabajo y aprendo las que faltan por el camino.",
    hint: "Arrastra para girar · toca un nodo para inspeccionarlo"
  },
  services: {
    eyebrow: "Qué hago",
    title: "De la idea al producto en marcha.",
    items: [
      { title: "Desarrollo Full-Stack", desc: "Apps web de extremo a extremo: frontends en React, backends en Node.js y PHP, APIs REST y código mantenible." },
      { title: "Automatizaciones", desc: "Soluciones de Power Apps, Power Automate y Business Central que eliminan el trabajo repetitivo." },
      { title: "Agentes IA & Integraciones", desc: "Agentes e integraciones impulsados por IA que leen, clasifican y actúan sobre datos reales." },
      { title: "Consultoría & Colaboración", desc: "Trabajar con diseñadores, desarrolladores y stakeholders para convertir ideas en prototipos testeables." }
    ]
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Cosas que realmente he construido.",
    desc: "Productos reales: automatización con IA, plataformas full-stack y apps móviles. Haz clic en cualquier tarjeta para la historia completa.",
    view: "Ver detalles"
  },
  contact: {
    eyebrow: "Contacto",
    title: "Construyamos algo juntos.",
    desc: "Abierto a nuevas oportunidades, proyectos freelance y conversaciones sobre automatización e IA. Mi bandeja de entrada es la vía más rápida.",
    ready: "Listo cuando tú lo estés",
    heading1: "¿Tienes una idea?",
    heading2: "Automaticémosla.",
    body: "Ya sea una app web, un flujo de negocio o un agente de IA, me encantaría escucharla y descubrir cómo construirla.",
    button: "Saluda"
  },
  footer: { tagline: "Hecho con Next.js, cafeína y curiosidad." }
};

const tr: Dict = {
  nav: { home: "Ana Sayfa", about: "Hakkımda", experience: "Deneyim", skills: "Yetenekler", services: "Hizmetler", projects: "Projeler", contact: "İletişim" },
  hero: {
    badge: "AUTOMATION & AI · BUILDING WHAT'S NEXT",
    roles: ["Full-Stack Geliştirici", "Otomasyon Mühendisi", "AI Agent Geliştiricisi", "Power Platform Geliştiricisi"],
    desc: "Full-stack web uygulamaları ve akıllı otomasyonlar geliştiriyorum: React arayüzlerinden gerçek iş süreçlerini yürüten AI agent'lara kadar. Yeni teknolojiler benim en sevdiğim oyun alanı.",
    ctaWork: "Çalışmalarımı keşfet",
    ctaContact: "İletişime geç",
    statFocus: "Odak", statFocusV: "Full-Stack · Otomasyon · AI",
    statLocation: "Konum", statLocationV: "Gent, Belçika",
    statStatus: "Durum", statStatusV: "Yeni fırsatlara açık"
  },
  about: {
    eyebrow: "Hakkımda",
    title: "Doğuştan meraklı, tercihen üretici.",
    desc: "Gent, Belçika merkezli full-stack geliştiriciyim; şu anda Astena'da Microsoft ekosistemi içinde iş otomasyonu ve yapay zeka üzerine çalışıyorum. Yeni bir teknolojinin oturduğu ve elimde üretken bir araca dönüştüğü anı çok seviyorum.",
    pillars: [
      { title: "Hızlı teslim et", desc: "Fikirler çalışan ürünlere dönüşür. Hızlı prototipler, sağlamlaşana kadar iterasyon." },
      { title: "Her şeyi otomatikleştir", desc: "Bir iş iki kez tekrar ediyorsa ona pipeline kurarım: Power Automate akışlarından CI/CD'ye kadar." },
      { title: "AI-native", desc: "Yapay zekayla üretirim, sadece konuşmam: gerçek iş verisini okuyan, karar veren ve harekete geçen agent'lar." }
    ],
    currently: "Şu anda",
    currentlyRole: "Yazılım Geliştirici Stajyeri",
    currentlyCompany: "Astena",
    currentlyDesc: "Business Central (AL) geliştirme, Power Apps ve Power Automate çözümleri, Azure DevOps pipeline'ları ve gerçek müşteri e-posta süreçlerini otomatikleştiren bir AI Mail Agent.",
    humanSkills: "Soft skills",
    soft: ["Takım çalışması", "Merak", "Zaman yönetimi", "Esneklik", "İletişim", "Müşteri odaklılık", "Yaratıcılık", "Titizlik", "Güvenilirlik"],
    learning: "Sürekli öğreniyorum; şu sıralar AI agent'lar ve Power Platform derinliklerindeyim."
  },
  exp: {
    eyebrow: "Deneyim & Eğitim",
    title: "Bugüne kadarki yolculuk.",
    desc: "STEM sınıflarından gerçek bir şirkette AI otomasyonu geliştirmeye. Her adım yeni bir katman ekledi.",
    role: "Yazılım Geliştirici Stajyeri",
    period: "2026 · Staj",
    jobDesc: "Microsoft çözüm ortağı Astena'da, Microsoft ekosistemi içinde iş otomasyonu ve yapay zeka üzerine staj.",
    highlights: [
      "Microsoft Dynamics 365 Business Central'da AL ile eklentiler geliştirdim",
      "Power Apps çözümleri kurdum, iş süreçlerini Power Automate ile otomatikleştirdim",
      "Power Platform çözümlerini ve dağıtım pipeline'larını Azure DevOps ile yönettim",
      "Gelen müşteri e-postalarını otomatik işleyen bir AI Mail Agent geliştirdim"
    ],
    edu: [
      { program: "Programlama", school: "Artevelde Üniversitesi", period: "2024 - 2026", desc: "Modern web, altyapı ve ekip projeleriyle sapasağlam bir full-stack temeli." },
      { program: "ICT", school: "CVO Gent", period: "2023 - 2024", desc: "Ağ, scripting ve otomasyon temelleri üzerine uygulamalı laboratuvarlar; pratik problem çözme odaklı." },
      { program: "Fen & Matematik", school: "Nieuwen Bosch Humaniora", period: "2019 - 2023", desc: "Analitik düşünmeyi ve problem çözmeyi keskinleştiren STEM ağırlıklı lise eğitimi." }
    ]
  },
  skills: {
    eyebrow: "Yetenekler",
    title: "Tek yörünge, çok araç.",
    desc: "Modern web stack'leri, Microsoft Power Platform ve AI agent'lar. İşe uygun aracı seçerim, eksik olanları yolda öğrenirim.",
    hint: "Döndürmek için sürükle · incelemek için bir düğüme dokun"
  },
  services: {
    eyebrow: "Ne yapıyorum",
    title: "Fikirden çalışan ürüne.",
    items: [
      { title: "Full-Stack Geliştirme", desc: "Uçtan uca web uygulamaları: React arayüzleri, Node.js & PHP backend'leri, REST API'lar ve bakımı kolay kod." },
      { title: "Otomasyonlar", desc: "Tekrarlayan işleri ortadan kaldıran Power Apps, Power Automate ve Business Central çözümleri." },
      { title: "AI Agent & Entegrasyonlar", desc: "Gerçek veriyi okuyan, sınıflandıran ve harekete geçen yapay zeka destekli agent'lar ve entegrasyonlar." },
      { title: "Danışmanlık & İş Birliği", desc: "Fikirleri test edilebilir prototiplere dönüştürmek için tasarımcılar, geliştiriciler ve paydaşlarla çalışmak." }
    ]
  },
  projects: {
    eyebrow: "Projeler",
    title: "Gerçekten inşa ettiğim şeyler.",
    desc: "Gerçek ürünler: AI otomasyonu, full-stack platformlar ve mobil uygulamalar. Hikayenin tamamı için bir karta tıkla.",
    view: "Detayları gör"
  },
  contact: {
    eyebrow: "İletişim",
    title: "Birlikte bir şeyler inşa edelim.",
    desc: "Yeni fırsatlara, freelance projelere ve otomasyon ile yapay zeka sohbetlerine açığım. En hızlı yol e-posta kutum.",
    ready: "Sen hazır olduğunda",
    heading1: "Bir fikrin mi var?",
    heading2: "Hadi otomatikleştirelim.",
    body: "Web uygulaması, iş akışı ya da AI agent; ne olursa olsun duymak ve birlikte nasıl inşa edeceğimizi bulmak isterim.",
    button: "Merhaba de"
  },
  footer: { tagline: "Next.js, kafein ve merakla geliştirildi." }
};

const DICTS: Record<Lang, Dict> = { en, nl, fr, es, tr };

type LangContextValue = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LangContext = createContext<LangContextValue>({ lang: "en", setLang: () => {}, t: en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved && DICTS[saved]) setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
