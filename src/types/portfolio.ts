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
  category: "Full-Stack" | "Backend / Distributed" | "Frontend Architecture" | "DevOps & Cloud";
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
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
      status: "Available for new roles" | "Open to opportunities" | "Consulting";
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
