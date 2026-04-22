// Content Schema Definitions for Bhakti Website
// These schemas ensure consistent structure across all content types

import { z } from 'zod';

// =============================================================================
// SECTION TYPE SCHEMAS - Define structure for different content sections
// =============================================================================

export const ShlokaSectionSchema = z.object({
  type: z.literal('shloka'),
  title: z.string().min(1),
  sanskrit: z.string().min(1),
  english: z.string().min(1),
  meaning: z.string().min(1),
  transliteration: z.string().optional(),
});

export const BhajanSectionSchema = z.object({
  type: z.literal('bhajan'),
  title: z.string().min(1),
  hindi: z.string().min(1),
  english: z.string().min(1),
  meaning: z.string().min(1),
});

export const AartiSectionSchema = z.object({
  type: z.literal('aarti'),
  title: z.string().min(1),
  hindi: z.string().min(1),
  english: z.string().min(1),
  meaning: z.string().min(1),
  audioUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
});

export const MantraSectionSchema = z.object({
  type: z.literal('mantra'),
  title: z.string().min(1),
  sanskrit: z.string().min(1),
  transliteration: z.string().min(1),
  meaning: z.string().min(1),
  benefits: z.array(z.string()).optional(),
  audioUrl: z.string().url().optional(),
});

export const StorySectionSchema = z.object({
  type: z.literal('story'),
  title: z.string().min(1),
  content: z.string().min(100),
  summary: z.string().optional(),
  moral: z.string().optional(),
  relatedDeities: z.array(z.string()).optional(),
});

export const RitualSectionSchema = z.object({
  type: z.literal('ritual'),
  title: z.string().min(1),
  content: z.string().min(50),
  steps: z.array(z.string()).optional(),
  materials: z.array(z.string()).optional(),
  bestTime: z.string().optional(),
  duration: z.string().optional(),
});

export const InfoSectionSchema = z.object({
  type: z.literal('info'),
  title: z.string().min(1),
  content: z.string().min(50),
});

export const VideoSectionSchema = z.object({
  type: z.literal('video'),
  title: z.string().min(1),
  videos: z.array(z.object({
    title: z.string().min(1),
    embedId: z.string().min(1),
    description: z.string().optional(),
    thumbnailUrl: z.string().url().optional(),
  })).min(1),
});

export const BenefitsSectionSchema = z.object({
  type: z.literal('benefits'),
  title: z.string().min(1),
  items: z.array(z.object({
    category: z.enum(['spiritual', 'mental', 'physical', 'material']),
    description: z.string().min(1),
  })).min(1),
});

export const HistorySectionSchema = z.object({
  type: z.literal('history'),
  title: z.string().min(1),
  content: z.string().min(100),
  origin: z.string().optional(),
  composer: z.string().optional(),
  timeline: z.string().optional(),
});

// Union type for all section types
export const SectionSchema = z.discriminatedUnion('type', [
  ShlokaSectionSchema,
  BhajanSectionSchema,
  AartiSectionSchema,
  MantraSectionSchema,
  StorySectionSchema,
  RitualSectionSchema,
  InfoSectionSchema,
  VideoSectionSchema,
  BenefitsSectionSchema,
  HistorySectionSchema,
]);

// =============================================================================
// BASE CONTENT SCHEMA - Common fields for all content types
// =============================================================================

export const SeoSchema = z.object({
  title: z.string().min(10).max(70),
  description: z.string().min(50).max(160),
  keywords: z.array(z.string()).min(3).max(20),
  ogImage: z.string().url().optional(),
});

export const BaseContentSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/).min(3),
  name: z.string().min(2),
  title: z.string().min(10).max(100),
  subtitle: z.string().max(200).optional(),
  description: z.string().min(100).max(500),
  icon: z.string().min(1),
  color: z.string().regex(/^from-[a-z]+-\d+\s+to-[a-z]+-\d+$/),
  
  // Category-specific metadata
  deity: z.string().min(1),
  duration: z.string().optional(),
  purpose: z.string().optional(),
  significance: z.string().min(50).max(500),
  
  // Content sections (required for all content types)
  sections: z.array(SectionSchema).min(2).refine(
    (sections) => sections.some(s => ['shloka', 'bhajan', 'aarti', 'mantra'].includes(s.type)),
    { message: 'Must contain at least one content section (shloka, bhajan, aarti, or mantra)' }
  ),
  
  // SEO configuration
  seo: SeoSchema,
  
  // Optional metadata
  featured: z.boolean().default(false),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  tags: z.array(z.string()).max(10).optional(),
  relatedContent: z.array(z.string().regex(/^[a-z0-9-]+$/)).max(6).optional(),
});

// =============================================================================
// CATEGORY-SPECIFIC SCHEMAS
// =============================================================================

export const AartiContentSchema = BaseContentSchema.extend({
  category: z.literal('aarti'),
  sections: z.array(SectionSchema).refine(
    (sections) => sections.some(s => s.type === 'aarti'),
    { message: 'Aarti content must contain at least one aarti section' }
  ),
});

export const BhajanContentSchema = BaseContentSchema.extend({
  category: z.literal('bhajan'),
  sections: z.array(SectionSchema).refine(
    (sections) => sections.some(s => s.type === 'bhajan'),
    { message: 'Bhajan content must contain at least one bhajan section' }
  ),
});

export const MantraContentSchema = BaseContentSchema.extend({
  category: z.literal('mantra'),
  sections: z.array(SectionSchema).refine(
    (sections) => sections.some(s => s.type === 'mantra'),
    { message: 'Mantra content must contain at least one mantra section' }
  ),
  repetitionCount: z.number().int().min(1).max(108).optional(),
});

export const FestivalContentSchema = BaseContentSchema.extend({
  category: z.literal('festival'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  tithi: z.string().optional(),
  region: z.array(z.enum(['all-india', 'north', 'south', 'east', 'west', 'specific'])).default(['all-india']),
  rituals: z.array(z.string()).optional(),
  sections: z.array(SectionSchema).refine(
    (sections) => sections.some(s => ['story', 'ritual', 'info'].includes(s.type)),
    { message: 'Festival content must contain at least one story, ritual, or info section' }
  ),
});

export const ChalisaContentSchema = BaseContentSchema.extend({
  category: z.literal('chalisa'),
  sections: z.array(SectionSchema).refine(
    (sections) => sections.some(s => s.type === 'bhajan'),
    { message: 'Chalisa content must contain bhajan sections for the verses' }
  ),
  totalVerses: z.number().int().positive(),
});

export const StoryContentSchema = BaseContentSchema.extend({
  category: z.literal('story'),
  sections: z.array(SectionSchema).refine(
    (sections) => sections.some(s => s.type === 'story'),
    { message: 'Story content must contain at least one story section' }
  ),
});

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ShlokaSection = z.infer<typeof ShlokaSectionSchema>;
export type BhajanSection = z.infer<typeof BhajanSectionSchema>;
export type AartiSection = z.infer<typeof AartiSectionSchema>;
export type MantraSection = z.infer<typeof MantraSectionSchema>;
export type StorySection = z.infer<typeof StorySectionSchema>;
export type RitualSection = z.infer<typeof RitualSectionSchema>;
export type InfoSection = z.infer<typeof InfoSectionSchema>;
export type VideoSection = z.infer<typeof VideoSectionSchema>;
export type BenefitsSection = z.infer<typeof BenefitsSectionSchema>;
export type HistorySection = z.infer<typeof HistorySectionSchema>;

export type Section = z.infer<typeof SectionSchema>;
export type Seo = z.infer<typeof SeoSchema>;
export type BaseContent = z.infer<typeof BaseContentSchema>;

export type AartiContent = z.infer<typeof AartiContentSchema>;
export type BhajanContent = z.infer<typeof BhajanContentSchema>;
export type MantraContent = z.infer<typeof MantraContentSchema>;
export type FestivalContent = z.infer<typeof FestivalContentSchema>;
export type ChalisaContent = z.infer<typeof ChalisaContentSchema>;
export type StoryContent = z.infer<typeof StoryContentSchema>;

export type ContentType = 'aarti' | 'bhajan' | 'mantra' | 'festival' | 'chalisa' | 'story';

// =============================================================================
// CATEGORY CONFIGURATION
// =============================================================================

export const categoryConfig: Record<ContentType, {
  name: string;
  plural: string;
  icon: string;
  description: string;
  requiredSections: string[];
  optionalSections: string[];
  color: string;
}> = {
  aarti: {
    name: 'Aarti',
    plural: 'Aartis',
    icon: '🪔',
    description: 'Devotional prayers sung to praise deities',
    requiredSections: ['aarti'],
    optionalSections: ['history', 'benefits', 'ritual', 'video'],
    color: 'from-orange-400 to-red-500',
  },
  bhajan: {
    name: 'Bhajan',
    plural: 'Bhajans',
    icon: '🎵',
    description: 'Devotional songs expressing love for the divine',
    requiredSections: ['bhajan'],
    optionalSections: ['history', 'benefits', 'story', 'video'],
    color: 'from-blue-400 to-indigo-500',
  },
  mantra: {
    name: 'Mantra',
    plural: 'Mantras',
    icon: '🕉️',
    description: 'Sacred sounds and phrases for spiritual practice',
    requiredSections: ['mantra'],
    optionalSections: ['history', 'benefits', 'ritual', 'info'],
    color: 'from-purple-400 to-pink-500',
  },
  festival: {
    name: 'Festival',
    plural: 'Festivals',
    icon: '🎊',
    description: 'Sacred celebrations and religious observances',
    requiredSections: ['info', 'ritual'],
    optionalSections: ['story', 'history', 'video'],
    color: 'from-yellow-400 to-amber-500',
  },
  chalisa: {
    name: 'Chalisa',
    plural: 'Chalisas',
    icon: '📜',
    description: 'Forty-verse devotional hymns',
    requiredSections: ['bhajan'],
    optionalSections: ['history', 'benefits', 'ritual'],
    color: 'from-red-400 to-orange-500',
  },
  story: {
    name: 'Story',
    plural: 'Stories',
    icon: '📖',
    description: 'Sacred narratives from Hindu scriptures',
    requiredSections: ['story'],
    optionalSections: ['info', 'video', 'shloka'],
    color: 'from-green-400 to-teal-500',
  },
};

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

export function validateContent(content: unknown, type: ContentType) {
  let schema;
  switch (type) {
    case 'aarti':
      schema = AartiContentSchema;
      break;
    case 'bhajan':
      schema = BhajanContentSchema;
      break;
    case 'mantra':
      schema = MantraContentSchema;
      break;
    case 'festival':
      schema = FestivalContentSchema;
      break;
    case 'chalisa':
      schema = ChalisaContentSchema;
      break;
    case 'story':
      schema = StoryContentSchema;
      break;
  }
  
  return schema.safeParse(content);
}

export function getValidationErrors(result: z.SafeParseReturnType<any, any>): string[] {
  if (result.success) return [];
  
  return result.error.errors.map(err => {
    const path = err.path.join('.');
    return `${path}: ${err.message}`;
  });
}
