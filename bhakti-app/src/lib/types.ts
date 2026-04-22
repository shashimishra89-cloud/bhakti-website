// Content types for the Bhakti website
// DEPRECATED: Use contentSchema.ts for new development
// This file maintained for backward compatibility

/**
 * @deprecated Use AartiContent, BhajanContent, etc. from contentSchema.ts
 */
export interface BaseContent {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  duration?: string;
  icon: string;
  color?: string;
  featured?: boolean;
  significance?: string;
  deity?: string;
  purpose?: string;
  language?: string;
  theme?: string;
  rituals?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  relatedContent?: string[];
  category?: 'aarti' | 'bhajan' | 'mantra' | 'festival' | 'chalisa' | 'story';
  seo?: {
    title?: string;
    keywords: string[];
    description: string;
    ogImage?: string;
  };
  sections: ContentSection[];
}

/**
 * @deprecated Use typed sections from contentSchema.ts (AartiSection, BhajanSection, etc.)
 */
export interface ContentSection {
  type: 'hero' | 'historical_significance' | 'stories' | 'lyrics' | 'rituals' | 'significance' | 'benefits' | 'videos' | 'shloka' | 'story' | 'bhajan' | 'aarti' | 'mantra' | 'ritual' | 'info' | 'video' | 'history';
  title: string;
  content: string;
  subsections?: Subsection[];
  videos?: VideoEmbed[];
  // New fields for typed sections
  hindi?: string;
  english?: string;
  sanskrit?: string;
  meaning?: string;
  transliteration?: string;
  items?: Array<{ category: string; description: string }>;
  steps?: string[];
  materials?: string[];
  bestTime?: string;
  origin?: string;
  composer?: string;
  timeline?: string;
  summary?: string;
  moral?: string;
  relatedDeities?: string[];
  audioUrl?: string;
  videoUrl?: string;
}

export interface Subsection {
  title: string;
  content?: string;
  hindi?: string;
  english?: string;
  meaning?: string;
  sanskrit?: string;
}

export interface VideoEmbed {
  title: string;
  embedId: string;
  description: string;
}

export interface Section {
  type: 'shloka' | 'story' | 'bhajan' | 'aarti' | 'mantra' | 'ritual';
  title: string;
  content: string | ShlokaContent | BhajanContent;
}

export interface ShlokaContent {
  sanskrit: string;
  english: string;
  meaning: string;
}

export interface BhajanContent {
  hindi: string;
  english: string;
  meaning: string;
}

export interface Festival extends BaseContent {
  duration: string;
  significance?: string;
  rituals?: string[];
  sections: ContentSection[];
}

export interface Aarti extends BaseContent {
  deity: string;
  sections: ContentSection[];
}

export interface Bhajan extends BaseContent {
  deity: string;
  sections: ContentSection[];
}

export interface Mantra extends BaseContent {
  deity: string;
  sections: ContentSection[];
}

export interface Category {
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

export type ContentType = Festival | Aarti | Bhajan | Mantra;
