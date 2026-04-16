export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "Github" | "Linkedin" | "Mail";
};

export type Stat = {
  label: string;
  value: string;
};

export type EducationItem = {
  school: string;
  program: string;
  period: string;
  description: string;
};

export type SkillCard = {
  name: string;
  category: "Frontend" | "Backend" | "Tools";
  description: string;
  icon: string;
};

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export type ProjectLink = {
  label: string;
  href?: string;
  icon?: "ArrowUpRight" | "Github";
  variant?: "primary" | "secondary" | "muted";
};

export type Project = {
  title: string;
  description: string;
  category: string;
  stack: string[];
  links: ProjectLink[];
  features?: string[];
  image?: string;
  images?: string[];
};

export type ContactDetail = {
  label: string;
  value: string;
  href: string;
  icon: "Mail" | "Phone" | "MapPin" | "Linkedin" | "Github";
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  // { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/omerasik", icon: "Github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/omerasik/", icon: "Linkedin" },
  { label: "Email", href: "mailto:omerfarukasik54@gmail.com", icon: "Mail" }
];

export const heroStats: Stat[] = [
  { label: "Focus", value: "Full-Stack Web" },
  { label: "Location", value: "Drongen, BE" },
  { label: "Availability", value: "Internships & Junior roles" }
];

export const languages = ["English", "Dutch", "Turkish"] as const;

export const education: EducationItem[] = [
  {
    school: "Artevelde University",
    program: "Programming",
    period: "2024 - 2026",
    description: "Building a rock-solid full-stack foundation through modern web, infrastructure, and collaboration projects."
  },
  {
    school: "CVO Gent",
    program: "ICT",
    period: "2023 - 2024",
    description: "Hands-on labs in networking, scripting, and automation basics with a focus on practical troubleshooting."
  },
  {
    school: "Nieuwen Bosch Humaniora",
    program: "Science & Mathematics",
    period: "2019 - 2023",
    description: "STEM-intensive secondary education that sharpened analytical thinking and problem solving."
  }
];

export const technicalSkills: SkillCard[] = [
  {
    name: "JavaScript",
    category: "Frontend",
    description: "Modern ES standards, modular patterns, and tooling.",
    icon: "Code"
  },
  {
    name: "React.js",
    category: "Frontend",
    description: "Component-driven UI with hooks, context, and motion.",
    icon: "Atom"
  },
  {
    name: "HTML5",
    category: "Frontend",
    description: "Semantic layouts with accessibility baked in.",
    icon: "Layout"
  },
  {
    name: "CSS3",
    category: "Frontend",
    description: "Responsive design systems using Tailwind and custom tokens.",
    icon: "Palette"
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "REST APIs, utilities, and integration services.",
    icon: "Server"
  },
  {
    name: "PHP",
    category: "Backend",
    description: "Simple server-side logic and CMS integrations.",
    icon: "Braces"
  },
  {
    name: "MySQL",
    category: "Backend",
    description: "Schema design, relationships, and query optimization.",
    icon: "Database"
  },
  {
    name: "Docker",
    category: "Tools",
    description: "Containerized dev environments and deployment scripts.",
    icon: "Box"
  },
  {
    name: "Craft CMS",
    category: "Tools",
    description: "Custom content models and data-driven pages.",
    icon: "Blocks"
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    description: "Team workflows, reviews, and basic CI/CD.",
    icon: "GitBranch"
  }
];

export const softSkills = [
  "Teamwork",
  "Curiosity",
  "Time management",
  "Flexibility",
  "Communication",
  "Customer focus",
  "Creativity",
  "Accuracy",
  "Reliability"
];

export const services: Service[] = [
  {
    title: "Web Application Development",
    description: "Responsive full-stack applications with clean UI, reusable components, and maintainable codebases.",
    icon: "AppWindow"
  },
  {
    title: "Front-End Development",
    description: "Modern interfaces in React with motion, accessibility, and thoughtful typography.",
    icon: "MonitorSmartphone"
  },
  {
    title: "Back-End & API Development",
    description: "Designing REST APIs, authentication flows, and simple services with Node.js and PHP.",
    icon: "ServerCog"
  },
  {
    title: "Database & Data Structures",
    description: "Structuring relational schemas, writing queries, and keeping data consistent and secure.",
    icon: "Database"
  },
  {
    title: "Automation & Integrations",
    description: "Connecting APIs, webhooks, and lightweight automation to make products smarter.",
    icon: "Workflow"
  },
  {
    title: "Consulting & Collaboration",
    description: "Working with designers, developers, and stakeholders to turn ideas into testable prototypes.",
    icon: "Users"
  }
];

export const projects: Project[] = [
  {
    category: "FULL-STACK",
    title: "School Tracking Platform",
    description: "Student dossier management system. Manage student records, registrations, coaches and notes with a Next.js frontend and Strapi CMS backend. Features PDF export and role-based access.",
    stack: ["Next.js", "Strapi 5", "React 19", "jsPDF", "Tailwind CSS"],
    image: "/images/student_tracking.png",
    links: [
      { label: "View on GitHub", href: "https://github.com/omerasik/school_tracking_platform", icon: "Github", variant: "primary" }
    ]
  },
  {
    category: "MOBILE APP",
    title: "OA Code Quiz",
    description: "A modern Expo and Supabase mobile quiz app for programming students, featuring role-based dashboards, progress tracking, and interactive code-focused quizzes.",
    stack: ["Expo", "React Native", "TypeScript", "Supabase", "TanStack Query"],
    images: [
      "/images/oa_quiz_app.png",
      "/images/oa_quiz_app2.png",
      "/images/oa_quiz_app3.png"
    ],
    links: [
      { label: "View on GitHub", href: "https://github.com/omerasik/oa-code-quiz", icon: "Github", variant: "primary" }
    ],
    features: [
      "Role-based experience for students and teachers",
      "Interactive quizzes with timer, scoring, and badges",
      "Progress tracking, leaderboard, and profile management",
      "Teacher overview with searchable student results"
    ]
  },
  {
    category: "MOBILE APP — CURRENT PROJECT",
    title: "QR Student Attendance App (In Progress)",
    description: "Mobile scanner & presence tracker with QR code scanning, campus location logging, and role-based actions.",
    stack: ["React Native", "Expo", "Supabase", "Haptics API", "Location API"],
    image: "/images/attendance.png",
    links: [
      { label: "In Development", variant: "muted" },
      { label: "View on GitHub", href: "https://github.com/omerasik/pgm-qr-attendance", icon: "Github", variant: "secondary" }
    ]
  },
  {
    category: "FULL-STACK",
    title: "The Grand Library",
    description: "Book discovery platform for Artevelde students with wishlist, ratings, role-based borrowing and staff management.",
    stack: ["Next.js 15", "TypeScript", "Prisma", "NextAuth", "SQLite"],
    image: "/images/grandlibrary.png",
    links: [
      { label: "View on GitHub", href: "https://github.com/omerasik/grand-library-nextjs", icon: "Github", variant: "primary" }
    ]
  },
  {
    category: "FULL-STACK",
    title: "Laravel Webshop + Filament Admin",
    description: "E-commerce webshop with admin dashboard, product filters, branded email system and secure checkout.",
    stack: ["Laravel", "Filament", "MySQL", "Tailwind"],
    image: "/images/webshop.png",
    links: [
      { label: "View on GitHub", href: "https://github.com/omerasik/laravel-webshop-filament", icon: "Github", variant: "primary" }
    ]
  },
  {
    category: "HEADLESS CMS",
    title: "Craft Multi-Site CMS",
    description: "Enterprise multi-site content platform for Mariahuis, Sint-Coleta and Cultuur-Colette with Twig templates & Docker.",
    stack: ["Craft CMS", "Twig", "Docker", "DDEV", "Composer"],
    image: "/images/craftcms.png",
    links: [
      { label: "View on GitHub", href: "https://github.com/omerasik/craft-multisite", icon: "Github", variant: "primary" }
    ]
  },
  {
    category: "FRONTEND",
    title: "STAM Museum Gent",
    description: "Responsive replica of STAM Gent city museum website built from Figma design. Features hamburger navigation, semantic HTML structure, and fully responsive layout optimized for all devices.",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: "/images/stam.png",
    links: [
      { label: "View Live", href: "https://omerasik.github.io/stam_museum_gent/index.html", icon: "ArrowUpRight", variant: "primary" },
      { label: "View on GitHub", href: "https://github.com/omerasik/stam_museum_gent", icon: "Github", variant: "secondary" }
    ],
    features: [
      "Pixel-perfect recreation from Figma design",
      "Fully responsive across mobile, tablet, and desktop",
      "Interactive hamburger menu with smooth animations",
      "SEO-optimized with proper meta tags and robots.txt"
    ]
  },
  {
    category: "FRONTEND",
    title: "Gamescom 2025",
    description: "Interactive gaming information website showcasing current games, industry trends, and insights about the future of gaming. Built with modern vanilla JavaScript and fully responsive design.",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript"],
    image: "/images/gamescom.png",
    links: [
      { label: "View Live", href: "https://omerasik.github.io/gamescom-2024/", icon: "ArrowUpRight", variant: "primary" },
      { label: "View on GitHub", href: "https://github.com/omerasik/gamescom-2024", icon: "Github", variant: "secondary" }
    ],
    features: [
      "Responsive design optimized for all devices",
      "Interactive game cards with detailed information",
      "Modern and user-friendly interface",
      "Fast and smooth browsing experience"
    ]
  },
  {
    category: "FRONTEND",
    title: "Best of 2024",
    description: "Interactive website showcasing the best content of 2024 including albums, games, films, movies and timeless picks. Features theme toggle, slideshow, honorable mentions modal, and API data loading.",
    stack: ["HTML", "CSS", "JavaScript", "REST API"],
    image: "/images/bestof_.png",
    links: [
      { label: "View Live", href: "https://pgm-2425-atwork-1.github.io/project-2-omerasik/", icon: "ArrowUpRight", variant: "primary" },
      { label: "View on GitHub", href: "https://github.com/pgm-2425-atwork-1/project-2-omerasik", icon: "Github", variant: "secondary" }
    ],
    features: [
      "Dark/Light theme toggle with smooth transitions",
      "Interactive slideshow for content navigation",
      "Modal window for honorable mentions",
      "Dynamic data loading from external API"
    ]
  },
  {
    category: "FULL-STACK",
    title: "Make It Happen (To-Do + Categories)",
    description: "Task organizer with JWT login, protected categories and user-specific dashboards using EJS + SQLite ORM.",
    stack: ["Node.js", "Express", "EJS", "Knex", "Objection.js"],
    image: "/images/to_do_app.png",
    links: [
      { label: "View on GitHub", href: "https://github.com/omerasik/to-do-make-it-happen-", icon: "Github", variant: "primary" }
    ]
  }
];

export const contactDetails: ContactDetail[] = [
  {
    label: "Email",
    value: "omerfarukasik54@gmail.com",
    href: "mailto:omerfarukasik54@gmail.com",
    icon: "Mail"
  },
  {
    label: "Phone",
    value: "+32 499 35 23 34",
    href: "tel:+32499352334",
    icon: "Phone"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/omerasik",
    href: "https://www.linkedin.com/in/omerasik/",
    icon: "Linkedin"
  },
  {
    label: "GitHub",
    value: "github.com/omerasik",
    href: "https://github.com/omerasik",
    icon: "Github"
  }
];

export const contactBullets = [];
