export type VisualStyle = "orbit" | "waves" | "blocks" | "type";

export interface Project {
  title: string;
  subtitle: string;
  year: string;
  category: string;
  description: string;
  impact: string;
  tags: string[];
  link: string;
  image: string;
  visual: VisualStyle;
  accent: string;
}

export interface Service {
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
}

export interface PortfolioContent {
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  availability: string;
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    intro: string;
  };
  marquee: string[];
  projects: Project[];
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    image: string;
  };
  stats: { value: string; label: string }[];
  experience: { period: string; role: string; company: string }[];
  services: Service[];
  process: { title: string; description: string }[];
  contact: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
  };
  socials: { label: string; url: string }[];
  seo: {
    title: string;
    description: string;
  };
}
