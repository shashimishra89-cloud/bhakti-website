// Bhakti Content Management System - Main Export
// Provides validation, migration, and schema evolution capabilities

// Core schema definitions
export {
  // Schemas
  SectionSchema,
  BaseContentSchema,
  SeoSchema,
  AartiContentSchema,
  BhajanContentSchema,
  MantraContentSchema,
  FestivalContentSchema,
  ChalisaContentSchema,
  StoryContentSchema,
  
  // Section-specific schemas
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
  
  // Types
  type Section,
  type BaseContent,
  type Seo,
  type ContentType,
  type AartiContent,
  type BhajanContent,
  type MantraContent,
  type FestivalContent,
  type ChalisaContent,
  type StoryContent,
  
  // Section types
  type ShlokaSection,
  type BhajanSection,
  type AartiSection,
  type MantraSection,
  type StorySection,
  type RitualSection,
  type InfoSection,
  type VideoSection,
  type BenefitsSection,
  type HistorySection,
  
  // Configuration
  categoryConfig,
  
  // Validation functions
  validateContent,
  getValidationErrors,
} from './contentSchema';

// Validator agent
export {
  ContentValidatorAgent,
  contentValidator,
  validateAllContent,
  validateContentFile,
  generateValidationSummary,
  type ValidationResult,
  type ValidationError,
  type ValidationWarning,
  type ContentStats,
  type SiteValidationReport,
  type CategoryStats,
  type GlobalIssue,
} from './contentValidator';

// Schema evolution
export {
  SchemaEvolutionManager,
  SchemaSyncService,
  schemaEvolution,
  schemaSync,
  suggestSchemaImprovement,
  getSchemaReport,
  syncAllSchemas,
  type SchemaVersion,
  type SchemaChange,
  type UserFeedback,
  type SchemaEvolutionReport,
  type RecommendedChange,
} from './schemaEvolution';

// Content migrator
export {
  ContentMigrator,
  contentMigrator,
  migrateAllContent,
  previewMigration,
  migrationTemplates,
  type MigrationPlan,
  type MigrationStep,
  type MigrationResult,
  type BatchMigrationResult,
} from './contentMigrator';

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

/**
 * Quick validation - Check if a content file is valid
 */
export async function quickValidate(filePath: string, type: ContentType): Promise<boolean> {
  const { contentValidator } = await import('./contentValidator');
  const result = await contentValidator.validateFile(filePath, type);
  return result.isValid;
}

/**
 * Full site health check
 */
export async function healthCheck(): Promise<{
  healthy: boolean;
  issues: string[];
  summary: string;
}> {
  const { validateAllContent, generateValidationSummary } = await import('./contentValidator');
  const report = await validateAllContent();
  
  const healthy = report.invalidFiles === 0 && report.globalIssues.length === 0;
  const issues: string[] = [];
  
  if (report.invalidFiles > 0) {
    issues.push(`${report.invalidFiles} files have validation errors`);
  }
  
  report.globalIssues.forEach(issue => {
    issues.push(`[${issue.type}] ${issue.description}`);
  });
  
  return {
    healthy,
    issues,
    summary: generateValidationSummary(report),
  };
}

/**
 * Migrate content to latest schema version
 */
export async function migrateToLatest(dryRun = true): Promise<{
  success: boolean;
  results: Record<ContentType, { migrated: number; failed: number }>;
  duration: number;
}> {
  const { migrateAllContent } = await import('./contentMigrator');
  const start = Date.now();
  
  const results = await migrateAllContent(dryRun);
  
  const summary: Record<ContentType, { migrated: number; failed: number }> = {} as any;
  
  for (const [type, result] of Object.entries(results)) {
    summary[type as ContentType] = {
      migrated: result.successful,
      failed: result.failed,
    };
  }
  
  return {
    success: Object.values(results).every(r => r.failed === 0),
    results: summary,
    duration: Date.now() - start,
  };
}

/**
 * Record feedback for schema improvement
 */
export function feedback(
  category: ContentType,
  field: string,
  issue: string,
  suggestion: string
): void {
  const { schemaEvolution } = require('./schemaEvolution');
  schemaEvolution.recordFeedback({
    category,
    field,
    issue,
    suggestion,
    priority: 'medium',
  });
  console.log(`✅ Feedback recorded for ${category}.${field}`);
}

/**
 * Get current schema version and status
 */
export function getSchemaStatus(): {
  version: string;
  contentTypes: ContentType[];
  hasPendingFeedback: boolean;
  recommendedChanges: number;
} {
  const { schemaEvolution } = require('./schemaEvolution');
  const report = schemaEvolution.generateReport();
  
  return {
    version: report.currentVersion,
    contentTypes: Object.keys(report.categoryBreakdown || {}) as ContentType[],
    hasPendingFeedback: report.pendingFeedback.length > 0,
    recommendedChanges: report.recommendedChanges.length,
  };
}
