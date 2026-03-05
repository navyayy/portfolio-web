export interface NavLink {
  label: string;
  href: string;
  sectionId?: string;
}

export interface PortfolioMeta {
  name: string;
  title: string;
  tagline: string;
  roles: string[];
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  blog?: string;
  portfolio?: string;
  resumeUrl?: string;
  profileImage?: string;
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundType: "gradient-mesh" | "particles" | "video" | "static";
}

export interface AboutSection {
  shortBio: string;
  philosophy: string;
  backgroundText?: string;
  backgroundSubtext?: string;
  highlights: string[];
  funFacts: string[];
}

export interface MetricItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: "full-time" | "part-time" | "internship" | "contract";
  logo?: string;
  description: string;
  highlights: string[];
  skills: string[];
  achievements?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  category: "content" | "social" | "seo" | "campaign" | "technical";
  featured: boolean;
  thumbnail: string;
  brief: string;
  metrics: string[];
  tools: string[];
  link: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface FeaturedSkill {
  name: string;
  icon: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface InstagramReelsSection {
  sectionTitle: string;
  subtitle: string;
  instagramHandle: string;
  instagramUrl: string;
  reelUrls: string[];
  postUrls: string[];
}

export interface BookCallSection {
  heading: string;
  subheading: string;
  calLink: string;
  calNamespace: string;
  buttonText: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  externalUrl?: string;
  slug?: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  icon: string;
  highlight: boolean;
}

export interface Education {
  degree: string;
  major: string;
  institution: string;
  location: string;
  period: string;
  logo?: string;
}

export interface ContactSection {
  headline: string;
  subheadline: string;
  email: string;
  phone: string;
  linkedin: string;
  calendlyLink?: string;
  availability: string;
}

export interface FooterSection {
  tagline: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}

export interface PortfolioData {
  navLinks: NavLink[];
  meta: PortfolioMeta;
  hero: HeroSection;
  about: AboutSection;
  metrics: {
    sectionTitle: string;
    items: MetricItem[];
  };
  experience: {
    sectionTitle: string;
    subtitle: string;
    items: ExperienceItem[];
  };
  caseStudies: {
    sectionTitle: string;
    subtitle: string;
    items: CaseStudy[];
  };
  skills: {
    sectionTitle: string;
    subtitle: string;
    categories: SkillCategory[];
    featured: FeaturedSkill[];
  };
  instagramReels: InstagramReelsSection;
  bookCall: BookCallSection;
  blog: {
    sectionTitle: string;
    subtitle: string;
    featured: BlogPost[];
  };
  achievements: {
    sectionTitle: string;
    subtitle: string;
    items: Achievement[];
  };
  education: Education;
  contact: ContactSection;
  footer: FooterSection;
}
