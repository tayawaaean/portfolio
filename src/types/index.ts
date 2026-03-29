export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  techStack: string[];
  keyFeatures: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  isNda: boolean;
}

export interface Skill {
  name: string;
  color: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface Social {
  name: string;
  url: string;
  icon: string;
}
