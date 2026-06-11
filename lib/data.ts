export type NavKey = "home" | "about" | "experience" | "skills" | "services" | "projects" | "contact";

export type NavItem = {
  key: NavKey;
  href: `#${string}`;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "Github" | "Linkedin" | "Mail";
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
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "skills", href: "#skills" },
  { key: "services", href: "#services" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" }
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/omerasik", icon: "Github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/omerasik/", icon: "Linkedin" },
  { label: "Email", href: "mailto:omerfarukasik54@gmail.com", icon: "Mail" }
];

export const languages = ["English", "Dutch", "Turkish"] as const;

/* Skill cloud for the 3D sphere */
export const skillCloud = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP",
  "Laravel", "MySQL", "Supabase", "React Native", "Expo", "Tailwind CSS",
  "Docker", "Git", "Business Central", "AL", "Power Apps", "Power Automate",
  "Azure DevOps", "AI Agents", "Craft CMS", "REST APIs", "CI/CD", "Prisma"
];

export const techMarquee = [
  "React", "Next.js", "TypeScript", "Node.js", "Business Central", "AL",
  "Power Apps", "Power Automate", "Azure DevOps", "AI Agents", "Supabase",
  "Laravel", "Docker", "MySQL", "React Native", "Tailwind CSS"
];

export const projects: Project[] = [
  {
    category: "AI · AUTOMATION · ASTENA INTERNSHIP",
    title: "AI Mail Agent",
    description:
      "An intelligent mail agent built during my internship at Astena. It automatically reads incoming customer emails, classifies them with AI, extracts the relevant data and triggers the right business workflow, turning a manual inbox process into a hands-free pipeline integrated with the Microsoft ecosystem.",
    stack: ["AI / LLM", "Power Automate", "Power Apps", "Business Central", "Azure DevOps"],
    links: [
      { label: "Built at Astena · Private codebase", variant: "muted" }
    ],
    features: [
      "AI-powered classification and data extraction from incoming emails",
      "Automated business workflows triggered from email content",
      "Integrated with Dynamics 365 Business Central",
      "Deployed through Azure DevOps solution pipelines"
    ]
  },
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
    description: "A modern Expo and Supabase mobile quiz app for programming students, featuring role-based dashboards, progress tracking and interactive code-focused quizzes.",
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
      "Interactive quizzes with timer, scoring and badges",
      "Progress tracking, leaderboard and profile management",
      "Teacher overview with searchable student results"
    ]
  },
  {
    category: "MOBILE APP · IN PROGRESS",
    title: "QR Student Attendance App",
    description: "Mobile scanner and presence tracker with QR code scanning, campus location logging and role-based actions.",
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
    description: "Enterprise multi-site content platform for Mariahuis, Sint-Coleta and Cultuur-Colette with Twig templates and Docker.",
    stack: ["Craft CMS", "Twig", "Docker", "DDEV", "Composer"],
    image: "/images/craftcms.png",
    links: [
      { label: "View on GitHub", href: "https://github.com/omerasik/craft-multisite", icon: "Github", variant: "primary" }
    ]
  },
  {
    category: "FRONTEND",
    title: "STAM Museum Gent",
    description: "Responsive replica of STAM Gent city museum website built from a Figma design. Features hamburger navigation, semantic HTML structure and a fully responsive layout optimized for all devices.",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: "/images/stam.png",
    links: [
      { label: "View Live", href: "https://omerasik.github.io/stam_museum_gent/index.html", icon: "ArrowUpRight", variant: "primary" },
      { label: "View on GitHub", href: "https://github.com/omerasik/stam_museum_gent", icon: "Github", variant: "secondary" }
    ],
    features: [
      "Pixel-perfect recreation from Figma design",
      "Fully responsive across mobile, tablet and desktop",
      "Interactive hamburger menu with smooth animations",
      "SEO-optimized with proper meta tags and robots.txt"
    ]
  },
  {
    category: "FRONTEND",
    title: "Gamescom 2025",
    description: "Interactive gaming information website showcasing current games, industry trends and insights about the future of gaming. Built with modern vanilla JavaScript and fully responsive design.",
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
    description: "Interactive website showcasing the best content of 2024 including albums, games, films and timeless picks. Features theme toggle, slideshow, honorable mentions modal and API data loading.",
    stack: ["HTML", "CSS", "JavaScript", "REST API"],
    image: "/images/bestof_.png",
    links: [
      { label: "View Live", href: "https://pgm-2425-atwork-1.github.io/project-2-omerasik/", icon: "ArrowUpRight", variant: "primary" },
      { label: "View on GitHub", href: "https://github.com/pgm-2425-atwork-1/project-2-omerasik", icon: "Github", variant: "secondary" }
    ],
    features: [
      "Dark and light theme toggle with smooth transitions",
      "Interactive slideshow for content navigation",
      "Modal window for honorable mentions",
      "Dynamic data loading from an external API"
    ]
  },
  {
    category: "FULL-STACK",
    title: "Make It Happen (To-Do + Categories)",
    description: "Task organizer with JWT login, protected categories and user-specific dashboards using EJS and a SQLite ORM.",
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
