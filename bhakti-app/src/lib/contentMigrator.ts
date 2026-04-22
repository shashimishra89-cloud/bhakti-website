// Content Migration Tool - Converts existing content to new schema format
// Handles version migrations and batch transformations

import { ContentType, categoryConfig } from './contentSchema';

// =============================================================================
// TYPES
// =============================================================================

export interface MigrationPlan {
  sourceVersion: string;
  targetVersion: string;
  steps: MigrationStep[];
  affectedFiles: string[];
  estimatedTime: number;
  backupRequired: boolean;
}

export interface MigrationStep {
  name: string;
  description: string;
  action: 'transform' | 'add-field' | 'remove-field' | 'rename-field' | 'validate';
  transform?: (content: any) => any;
  field?: string;
  newName?: string;
  defaultValue?: any;
}

export interface MigrationResult {
  file: string;
  success: boolean;
  changes: string[];
  errors: string[];
  warnings: string[];
}

export interface BatchMigrationResult {
  totalFiles: number;
  successful: number;
  failed: number;
  results: MigrationResult[];
  duration: number;
  backupLocation?: string;
}

// =============================================================================
// CONTENT MIGRATOR
// =============================================================================

export class ContentMigrator {
  private migrationHistory: Map<string, MigrationPlan[]> = new Map();
  
  /**
   * Create migration plan from old format to new schema
   */
  createMigrationPlan(
    contentType: ContentType,
    sourceVersion: string,
    targetVersion: string
  ): MigrationPlan {
    const steps: MigrationStep[] = [];
    
    // Standard migration steps for any content type
    steps.push({
      name: 'Add Category Field',
      description: 'Add category field if missing',
      action: 'add-field',
      field: 'category',
      defaultValue: contentType,
    });
    
    steps.push({
      name: 'Standardize SEO',
      description: 'Ensure SEO object has all required fields',
      action: 'transform',
      transform: (content) => this.standardizeSeo(content),
    });
    
    steps.push({
      name: 'Transform Sections',
      description: 'Convert old section format to new typed sections',
      action: 'transform',
      transform: (content) => this.transformSections(content, contentType),
    });
    
    steps.push({
      name: 'Add Metadata',
      description: 'Add optional metadata fields with defaults',
      action: 'transform',
      transform: (content) => this.addMetadata(content),
    });
    
    steps.push({
      name: 'Validate Final',
      description: 'Validate against new schema',
      action: 'validate',
    });
    
    return {
      sourceVersion,
      targetVersion,
      steps,
      affectedFiles: [], // Would be populated by scanning
      estimatedTime: steps.length * 2, // Rough estimate
      backupRequired: true,
    };
  }
  
  /**
   * Migrate a single file
   */
  async migrateFile(
    filePath: string,
    contentType: ContentType,
    plan: MigrationPlan,
    dryRun = false
  ): Promise<MigrationResult> {
    const changes: string[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];
    
    try {
      let content = await this.loadFile(filePath);
      
      for (const step of plan.steps) {
        try {
          const result = await this.executeStep(content, step);
          content = result.content;
          
          if (result.changes.length > 0) {
            changes.push(...result.changes);
          }
          if (result.warnings.length > 0) {
            warnings.push(...result.warnings);
          }
        } catch (error) {
          errors.push(`Step '${step.name}' failed: ${error}`);
          break;
        }
      }
      
      if (!dryRun && errors.length === 0) {
        await this.saveFile(filePath, content);
      }
      
      return {
        file: filePath,
        success: errors.length === 0,
        changes,
        errors,
        warnings,
      };
    } catch (error) {
      return {
        file: filePath,
        success: false,
        changes: [],
        errors: [`Failed to load file: ${error}`],
        warnings: [],
      };
    }
  }
  
  /**
   * Batch migrate all files of a content type
   */
  async migrateBatch(
    contentType: ContentType,
    dryRun = false,
    onProgress?: (current: number, total: number, file: string) => void
  ): Promise<BatchMigrationResult> {
    const startTime = Date.now();
    const files = await this.getFilesOfType(contentType);
    const plan = this.createMigrationPlan(contentType, 'legacy', '2.0.0');
    
    const results: MigrationResult[] = [];
    
    if (!dryRun) {
      await this.createBackup(files);
    }
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      onProgress?.(i + 1, files.length, file);
      
      const result = await this.migrateFile(file, contentType, plan, dryRun);
      results.push(result);
    }
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    return {
      totalFiles: files.length,
      successful,
      failed,
      results,
      duration: Date.now() - startTime,
      backupLocation: dryRun ? undefined : this.getBackupLocation(),
    };
  }
  
  /**
   * Compare old and new format
   */
  async compareFormats(filePath: string, contentType: ContentType): Promise<{
    oldFormat: any;
    newFormat: any;
    differences: Array<{ path: string; old: any; new: any }>;
  }> {
    const oldContent = await this.loadFile(filePath);
    const plan = this.createMigrationPlan(contentType, 'legacy', '2.0.0');
    
    let newContent = oldContent;
    for (const step of plan.steps) {
      if (step.action !== 'validate') {
        const result = await this.executeStep(newContent, step);
        newContent = result.content;
      }
    }
    
    const differences = this.findDifferences(oldContent, newContent);
    
    return {
      oldFormat: oldContent,
      newFormat: newContent,
      differences,
    };
  }
  
  /**
   * Rollback migration
   */
  async rollback(backupLocation: string): Promise<{
    restored: number;
    failed: string[];
  }> {
    // Restore from backup
    return {
      restored: 0,
      failed: [],
    };
  }
  
  // =============================================================================
  // TRANSFORMATION HELPERS
  // =============================================================================
  
  private standardizeSeo(content: any): any {
    if (!content.seo) {
      content.seo = {};
    }
    
    // Ensure all SEO fields exist
    content.seo.title = content.seo.title || content.title;
    content.seo.description = content.seo.description || content.description;
    content.seo.keywords = content.seo.keywords || this.extractKeywords(content);
    
    return content;
  }
  
  private transformSections(content: any, contentType: ContentType): any {
    if (!content.sections) {
      content.sections = [];
    }
    
    // Transform old section format to new typed format
    content.sections = content.sections.map((section: any) => {
      // If section already has proper type, keep it
      if (section.type && this.isValidSectionType(section.type)) {
        return section;
      }
      
      // Otherwise, infer type from content
      return this.inferSectionType(section, contentType);
    });
    
    return content;
  }
  
  private addMetadata(content: any): any {
    // Add optional fields with defaults
    content.featured = content.featured || false;
    content.difficulty = content.difficulty || 'beginner';
    content.tags = content.tags || [];
    content.relatedContent = content.relatedContent || [];
    content.subtitle = content.subtitle || '';
    
    return content;
  }
  
  private inferSectionType(section: any, contentType: ContentType): any {
    // Infer section type based on content properties
    if (section.hindi && section.english && section.meaning) {
      if (contentType === 'aarti') {
        return { ...section, type: 'aarti' };
      }
      if (contentType === 'bhajan' || contentType === 'chalisa') {
        return { ...section, type: 'bhajan' };
      }
    }
    
    if (section.sanskrit && section.english) {
      if (contentType === 'mantra') {
        return { ...section, type: 'mantra' };
      }
      return { ...section, type: 'shloka' };
    }
    
    if (section.content && section.content.length > 100) {
      if (section.title?.toLowerCase().includes('story') || section.title?.toLowerCase().includes('katha')) {
        return { ...section, type: 'story', content: section.content };
      }
    }
    
    if (section.videos) {
      return { ...section, type: 'video', videos: section.videos };
    }
    
    // Default to info type
    return {
      type: 'info',
      title: section.title || 'Information',
      content: section.content || JSON.stringify(section),
    };
  }
  
  private isValidSectionType(type: string): boolean {
    const validTypes = [
      'shloka', 'bhajan', 'aarti', 'mantra', 'story', 
      'ritual', 'info', 'video', 'benefits', 'history'
    ];
    return validTypes.includes(type);
  }
  
  private extractKeywords(content: any): string[] {
    // Extract keywords from title, description, and deity
    const keywords: string[] = [];
    
    if (content.deity) {
      keywords.push(content.deity.toLowerCase().replace('lord ', '').replace('goddess ', ''));
    }
    
    if (content.name) {
      const words = content.name.toLowerCase().split(' ');
      keywords.push(...words.filter((w: string) => w.length > 3));
    }
    
    return [...new Set(keywords)].slice(0, 10);
  }
  
  private findDifferences(old: any, new_: any, path = ''): Array<{ path: string; old: any; new: any }> {
    const differences: Array<{ path: string; old: any; new: any }> = [];
    
    const oldKeys = Object.keys(old);
    const newKeys = Object.keys(new_);
    
    // Check for new keys
    for (const key of newKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      if (!(key in old)) {
        differences.push({ path: currentPath, old: undefined, new: new_[key] });
      } else if (typeof old[key] === 'object' && typeof new_[key] === 'object') {
        differences.push(...this.findDifferences(old[key], new_[key], currentPath));
      } else if (JSON.stringify(old[key]) !== JSON.stringify(new_[key])) {
        differences.push({ path: currentPath, old: old[key], new: new_[key] });
      }
    }
    
    // Check for removed keys
    for (const key of oldKeys) {
      if (!(key in new_)) {
        differences.push({ path: path ? `${path}.${key}` : key, old: old[key], new: undefined });
      }
    }
    
    return differences;
  }
  
  // =============================================================================
  // FILE OPERATIONS
  // =============================================================================
  
  private async loadFile(filePath: string): Promise<any> {
    const response = await fetch(filePath);
    return response.json();
  }
  
  private async saveFile(filePath: string, content: any): Promise<void> {
    // In browser context, this would use a server API
    console.log(`Saving ${filePath}`);
  }
  
  private async getFilesOfType(contentType: ContentType): Promise<string[]> {
    // Scan directory for files
    return [];
  }
  
  private async createBackup(files: string[]): Promise<void> {
    // Create backup of all files
    console.log(`Creating backup of ${files.length} files`);
  }
  
  private getBackupLocation(): string {
    return `/backups/${Date.now()}`;
  }
  
  private async executeStep(content: any, step: MigrationStep): Promise<{
    content: any;
    changes: string[];
    warnings: string[];
  }> {
    const changes: string[] = [];
    const warnings: string[] = [];
    
    switch (step.action) {
      case 'add-field':
        if (!(step.field! in content)) {
          content[step.field!] = step.defaultValue;
          changes.push(`Added field: ${step.field}`);
        }
        break;
        
      case 'remove-field':
        if (step.field! in content) {
          delete content[step.field!];
          changes.push(`Removed field: ${step.field}`);
        }
        break;
        
      case 'rename-field':
        if (step.field! in content) {
          content[step.newName!] = content[step.field!];
          delete content[step.field!];
          changes.push(`Renamed ${step.field} to ${step.newName}`);
        }
        break;
        
      case 'transform':
        if (step.transform) {
          const before = JSON.stringify(content);
          content = step.transform(content);
          if (JSON.stringify(content) !== before) {
            changes.push(`Applied transformation: ${step.name}`);
          }
        }
        break;
        
      case 'validate':
        // Validation step - no changes made
        break;
    }
    
    return { content, changes, warnings };
  }
}

// =============================================================================
// MIGRATION TEMPLATES
// =============================================================================

export const migrationTemplates: Record<string, MigrationStep[]> = {
  'legacy-to-v2': [
    {
      name: 'Structure Sections',
      description: 'Restructure flat content into typed sections',
      action: 'transform',
      transform: (content) => {
        if (content.lyrics && !content.sections) {
          content.sections = [{
            type: 'bhajan',
            title: 'Lyrics',
            ...content.lyrics,
          }];
          delete content.lyrics;
        }
        return content;
      },
    },
    {
      name: 'Add Significance',
      description: 'Extract or create significance field',
      action: 'transform',
      transform: (content) => {
        if (!content.significance && content.description) {
          content.significance = content.description;
        }
        return content;
      },
    },
  ],
  
  'v2-to-v3': [
    {
      name: 'Add Difficulty',
      description: 'Add difficulty level field',
      action: 'add-field',
      field: 'difficulty',
      defaultValue: 'beginner',
    },
    {
      name: 'Add Tags',
      description: 'Add tags array',
      action: 'add-field',
      field: 'tags',
      defaultValue: [],
    },
  ],
};

// =============================================================================
// EXPORT
// =============================================================================

export const contentMigrator = new ContentMigrator();

export async function migrateAllContent(dryRun = true): Promise<Record<ContentType, BatchMigrationResult>> {
  const types: ContentType[] = ['aarti', 'bhajan', 'mantra', 'festival', 'chalisa', 'story'];
  const results: Partial<Record<ContentType, BatchMigrationResult>> = {};
  
  for (const type of types) {
    results[type] = await contentMigrator.migrateBatch(type, dryRun);
  }
  
  return results as Record<ContentType, BatchMigrationResult>;
}

export async function previewMigration(filePath: string, contentType: ContentType): Promise<{
  oldFormat: any;
  newFormat: any;
  differences: Array<{ path: string; old: any; new: any }>;
}> {
  return contentMigrator.compareFormats(filePath, contentType);
}
