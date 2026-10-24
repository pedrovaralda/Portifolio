export type Locale = "pt" | "en";

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  username?: string;
}

export interface MetricHighlight {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  impactMetric?: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  workType: string;
  description: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  iconKey: string;
  category: "Frontend" | "Backend" | "Cloud & DevOps" | "Databases & Tools";
  proficiency?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    roleTitle: string;
    specialization: string;
    shortBio: string;
    location: string;
    timeZone: string;
    availability: {
      status: string;
      isOpen: boolean;
    };
    email: string;
    resumeUrl: string;
  };
  fastFacts: MetricHighlight[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
  projects: Project[];
  experience: ExperienceItem[];
  skills: SkillItem[];
}

export interface NavTranslations {
  projects: string;
  experience: string;
  skills: string;
  contact: string;
  resume: string;
  availableBadge: string;
}

export interface HeroTranslations {
  headline: string;
  introRolePrefix: string;
  specializedIn: string;
  githubLabel: string;
  linkedinLabel: string;
  connectLabel: string;
  getInTouch: string;
  copyEmail: string;
  copied: string;
}

export interface ProjectsTranslations {
  badge: string;
  title: string;
  subtitle: string;
  featuredBadge: string;
  sourceCode: string;
  liveDemo: string;
}

export interface ExperienceTranslations {
  badge: string;
  title: string;
  subtitle: string;
  stackLabel: string;
}

export interface SkillsTranslations {
  badge: string;
  title: string;
  subtitle: string;
  categories: {
    Frontend: string;
    Backend: string;
    "Cloud & DevOps": string;
    "Databases & Tools": string;
  };
}

export interface ContactTranslations {
  badge: string;
  title: string;
  description: string;
  timeZoneLabel: string;
  typicalResponse: string;
  sendEmail: string;
  copyPill: string;
  copied: string;
}

export interface FooterTranslations {
  builtWith: string;
  backToTop: string;
}

export interface PortfolioContent {
  nav: NavTranslations;
  hero: HeroTranslations;
  projectsSection: ProjectsTranslations;
  experienceSection: ExperienceTranslations;
  skillsSection: SkillsTranslations;
  contactSection: ContactTranslations;
  footer: FooterTranslations;
  data: PortfolioData;
}
