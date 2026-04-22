// Schema Evolution System - Updates schema based on user feedback
// Tracks schema versions and manages migrations

import { z } from 'zod';
import { ContentType, categoryConfig } from './contentSchema';

// =============================================================================
// TYPES
// =============================================================================

export interface SchemaVersion {
  version: string;
  timestamp: string;
  changes: SchemaChange[];
  author: string;
}

export interface SchemaChange {
  type: 'add' | 'remove' | 'modify' | 'deprecate';
  target: string;
  description: string;
  breaking: boolean;
  migration?: string;
}

export interface UserFeedback {
  id: string;
  timestamp: string;
  category: ContentType;
  field: string;
  issue: string;
  suggestion: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  resolution?: string;
}

export interface SchemaEvolutionReport {
  currentVersion: string;
  totalVersions: number;
  pendingFeedback: UserFeedback[];
  appliedChanges: SchemaChange[];
  recommendedChanges: RecommendedChange[];
}

export interface RecommendedChange {
  type: 'add-field' | 'remove-field' | 'modify-validation' | 'new-section-type';
  field?: string;
  sectionType?: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  affectedContent: ContentType[];
  implementation: string;
}

// =============================================================================
// SCHEMA EVOLUTION MANAGER
// =============================================================================

export class SchemaEvolutionManager {
  private versions: SchemaVersion[] = [];
  private feedback: UserFeedback[] = [];
  private currentVersion: string = '1.0.0';
  
  constructor() {
    this.loadHistory();
  }
  
  /**
   * Record user feedback for schema improvement
   */
  recordFeedback(feedback: Omit<UserFeedback, 'id' | 'timestamp' | 'resolved'>): UserFeedback {
    const newFeedback: UserFeedback = {
      ...feedback,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      resolved: false,
    };
    
    this.feedback.push(newFeedback);
    this.saveHistory();
    
    return newFeedback;
  }
  
  /**
   * Resolve feedback with a schema change
   */
  resolveFeedback(feedbackId: string, resolution: string, changes: SchemaChange[]): void {
    const feedback = this.feedback.find(f => f.id === feedbackId);
    if (!feedback) return;
    
    feedback.resolved = true;
    feedback.resolution = resolution;
    
    // Create new version
    this.createVersion(changes, 'system');
    this.saveHistory();
  }
  
  /**
   * Analyze feedback and recommend schema changes
   */
  analyzeFeedback(): RecommendedChange[] {
    const pending = this.feedback.filter(f => !f.resolved);
    const recommendations: RecommendedChange[] = [];
    
    // Group feedback by field/category
    const grouped = this.groupFeedbackByField(pending);
    
    for (const [key, items] of Object.entries(grouped)) {
      if (items.length >= 3) {
        // High frequency feedback - recommend change
        const [category, field] = key.split('.');
        const sample = items[0];
        
        recommendations.push({
          type: this.determineChangeType(sample),
          field,
          description: `Based on ${items.length} feedback items: ${sample.issue}`,
          impact: this.calculateImpact(items),
          affectedContent: [category as ContentType],
          implementation: sample.suggestion,
        });
      }
    }
    
    return recommendations.sort((a, b) => {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    });
  }
  
  /**
   * Create a new schema version
   */
  createVersion(changes: SchemaChange[], author: string): SchemaVersion {
    const newVersion = this.incrementVersion();
    
    const version: SchemaVersion = {
      version: newVersion,
      timestamp: new Date().toISOString(),
      changes,
      author,
    };
    
    this.versions.push(version);
    this.currentVersion = newVersion;
    this.saveHistory();
    
    return version;
  }
  
  /**
   * Generate evolution report
   */
  generateReport(): SchemaEvolutionReport {
    return {
      currentVersion: this.currentVersion,
      totalVersions: this.versions.length,
      pendingFeedback: this.feedback.filter(f => !f.resolved),
      appliedChanges: this.versions.flatMap(v => v.changes),
      recommendedChanges: this.analyzeFeedback(),
    };
  }
  
  /**
   * Get migration path between versions
   */
  getMigrationPath(fromVersion: string, toVersion: string): SchemaChange[] {
    const fromIndex = this.versions.findIndex(v => v.version === fromVersion);
    const toIndex = this.versions.findIndex(v => v.version === toVersion);
    
    if (fromIndex === -1 || toIndex === -1) {
      return [];
    }
    
    return this.versions
      .slice(fromIndex + 1, toIndex + 1)
      .flatMap(v => v.changes)
      .filter(c => c.breaking);
  }
  
  // =============================================================================
  // FEEDBACK TEMPLATES - Common feedback patterns
  // =============================================================================
  
  readonly feedbackTemplates = {
    fieldMissing: (field: string, contentType: ContentType): Partial<UserFeedback> => ({
      category: contentType,
      field,
      issue: `Missing ${field} field for ${contentType}`,
      suggestion: `Add ${field} to ${contentType} schema`,
      priority: 'medium' as const,
    }),
    
    validationTooStrict: (field: string, contentType: ContentType): Partial<UserFeedback> => ({
      category: contentType,
      field,
      issue: `Validation for ${field} is too strict`,
      suggestion: `Relax validation rules for ${field}`,
      priority: 'high' as const,
    }),
    
    sectionTypeNeeded: (sectionType: string, contentType: ContentType): Partial<UserFeedback> => ({
      category: contentType,
      field: 'sections',
      issue: `Need new section type: ${sectionType}`,
      suggestion: `Add ${sectionType} as valid section type`,
      priority: 'medium' as const,
    }),
    
    inconsistentFormatting: (field: string, contentType: ContentType): Partial<UserFeedback> => ({
      category: contentType,
      field,
      issue: `Inconsistent ${field} formatting across ${contentType} content`,
      suggestion: `Standardize ${field} format with validation rules`,
      priority: 'low' as const,
    }),
  };
  
  // =============================================================================
  // PRIVATE METHODS
  // =============================================================================
  
  private generateId(): string {
    return `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private incrementVersion(): string {
    const parts = this.currentVersion.split('.').map(Number);
    parts[2]++; // Increment patch version
    return parts.join('.');
  }
  
  private groupFeedbackByField(feedback: UserFeedback[]): Record<string, UserFeedback[]> {
    return feedback.reduce((acc, item) => {
      const key = `${item.category}.${item.field}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, UserFeedback[]>);
  }
  
  private determineChangeType(feedback: UserFeedback): RecommendedChange['type'] {
    if (feedback.issue.includes('Missing')) return 'add-field';
    if (feedback.issue.includes('strict')) return 'modify-validation';
    if (feedback.issue.includes('section type')) return 'new-section-type';
    if (feedback.issue.includes('remove')) return 'remove-field';
    return 'modify-validation';
  }
  
  private calculateImpact(items: UserFeedback[]): 'low' | 'medium' | 'high' {
    const hasCritical = items.some(i => i.priority === 'critical');
    const hasHigh = items.some(i => i.priority === 'high');
    const count = items.length;
    
    if (hasCritical || count >= 5) return 'high';
    if (hasHigh || count >= 3) return 'medium';
    return 'low';
  }
  
  private loadHistory(): void {
    // In a real implementation, this would load from localStorage or a file
    const saved = typeof window !== 'undefined' ? localStorage.getItem('schemaHistory') : null;
    if (saved) {
      const data = JSON.parse(saved);
      this.versions = data.versions || [];
      this.feedback = data.feedback || [];
      this.currentVersion = data.currentVersion || '1.0.0';
    }
  }
  
  private saveHistory(): void {
    // In a real implementation, this would save to localStorage or a file
    const data = {
      versions: this.versions,
      feedback: this.feedback,
      currentVersion: this.currentVersion,
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('schemaHistory', JSON.stringify(data));
    }
  }
}

// =============================================================================
// SCHEMA SYNC SERVICE
// =============================================================================

export class SchemaSyncService {
  private evolutionManager: SchemaEvolutionManager;
  
  constructor() {
    this.evolutionManager = new SchemaEvolutionManager();
  }
  
  /**
   * Sync schema across all content types
   */
  async syncSchema(targetTypes?: ContentType[]): Promise<{
    synced: ContentType[];
    conflicts: Array<{ type: ContentType; issues: string[] }>;
  }> {
    const types = targetTypes || Object.keys(categoryConfig) as ContentType[];
    const synced: ContentType[] = [];
    const conflicts: Array<{ type: ContentType; issues: string[] }> = [];
    
    for (const type of types) {
      try {
        await this.syncTypeSchema(type);
        synced.push(type);
      } catch (error) {
        conflicts.push({
          type,
          issues: [String(error)],
        });
      }
    }
    
    return { synced, conflicts };
  }
  
  /**
   * Apply schema changes to existing content
   */
  async applySchemaChanges(changes: SchemaChange[], dryRun = true): Promise<{
    affected: number;
    changes: Array<{ file: string; changes: string[] }>;
  }> {
    // This would iterate through all content files and apply changes
    return {
      affected: 0,
      changes: [],
    };
  }
  
  /**
   * Validate schema consistency across all types
   */
  async validateConsistency(): Promise<{
    consistent: boolean;
    inconsistencies: Array<{ type: ContentType; field: string; issue: string }>;
  }> {
    const inconsistencies: Array<{ type: ContentType; field: string; issue: string }> = [];
    
    // Check that all types have common fields
    const commonFields = ['id', 'name', 'title', 'description', 'seo'];
    
    for (const type of Object.keys(categoryConfig) as ContentType[]) {
      // Validate each type has required common fields
      // This would involve checking the actual schema definitions
    }
    
    return {
      consistent: inconsistencies.length === 0,
      inconsistencies,
    };
  }
  
  private async syncTypeSchema(type: ContentType): Promise<void> {
    // Implementation would sync schema for specific content type
  }
}

// =============================================================================
// EXPORT INSTANCES
// =============================================================================

export const schemaEvolution = new SchemaEvolutionManager();
export const schemaSync = new SchemaSyncService();

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export function suggestSchemaImprovement(
  category: ContentType,
  field: string,
  issue: string,
  suggestion: string,
  priority: UserFeedback['priority'] = 'medium'
): UserFeedback {
  return schemaEvolution.recordFeedback({
    category,
    field,
    issue,
    suggestion,
    priority,
  });
}

export function getSchemaReport(): SchemaEvolutionReport {
  return schemaEvolution.generateReport();
}

export async function syncAllSchemas(): Promise<{
  synced: ContentType[];
  conflicts: Array<{ type: ContentType; issues: string[] }>;
}> {
  return schemaSync.syncSchema();
}
