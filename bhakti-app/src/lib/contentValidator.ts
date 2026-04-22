// Content Validator Agent - Validates all content against schemas
// Provides detailed reports and auto-fix suggestions

import {
  validateContent,
  getValidationErrors,
  ContentType,
  categoryConfig,
} from './contentSchema';

// Node.js fs module for CLI usage (only available in Node.js)
let fs: any;
let path: any;

// Check if we're in Node.js environment
try {
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    fs = require('fs');
    path = require('path');
  }
} catch {
  // Browser environment - fs not available
}

// =============================================================================
// VALIDATION RESULT TYPES
// =============================================================================

export interface ValidationResult {
  file: string;
  type: ContentType;
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: string[];
  stats: ContentStats;
}

export interface ValidationError {
  path: string;
  message: string;
  severity: 'error' | 'critical';
  autoFixable: boolean;
  suggestion?: string;
}

export interface ValidationWarning {
  path: string;
  message: string;
  category: 'seo' | 'content' | 'structure' | 'accessibility';
}

export interface ContentStats {
  wordCount: number;
  sectionCount: number;
  hasAllRequiredSections: boolean;
  missingRequiredSections: string[];
  seoScore: number;
  contentQualityScore: number;
}

export interface SiteValidationReport {
  timestamp: string;
  totalFiles: number;
  validFiles: number;
  invalidFiles: number;
  results: ValidationResult[];
  categoryBreakdown: Record<ContentType, CategoryStats>;
  globalIssues: GlobalIssue[];
}

export interface CategoryStats {
  total: number;
  valid: number;
  invalid: number;
  averageSeoScore: number;
}

export interface GlobalIssue {
  type: 'duplicate-id' | 'missing-content' | 'broken-reference' | 'inconsistent-formatting';
  description: string;
  affectedFiles: string[];
  severity: 'warning' | 'error';
}

// =============================================================================
// CONTENT VALIDATOR AGENT
// =============================================================================

export class ContentValidatorAgent {
  private contentCache: Map<string, any> = new Map();
  
  /**
   * Validate a single content file
   */
  async validateFile(filePath: string, type: ContentType): Promise<ValidationResult> {
    try {
      const content = await this.loadContent(filePath);
      const validation = validateContent(content, type);
      
      const errors: ValidationError[] = [];
      const warnings: ValidationWarning[] = [];
      const suggestions: string[] = [];
      
      if (!validation.success) {
        const schemaErrors = getValidationErrors(validation);
        schemaErrors.forEach(err => {
          const [path, message] = err.split(': ');
          errors.push({
            path: path || 'unknown',
            message: message || err,
            severity: 'error',
            autoFixable: this.isAutoFixable(path, message),
            suggestion: this.getFixSuggestion(path, message, content),
          });
        });
      }
      
      // Run additional validation checks
      const additionalChecks = this.runAdditionalChecks(content, type);
      errors.push(...additionalChecks.errors);
      warnings.push(...additionalChecks.warnings);
      suggestions.push(...additionalChecks.suggestions);
      
      // Calculate stats
      const stats = this.calculateStats(content, type);
      
      return {
        file: filePath,
        type,
        isValid: errors.length === 0,
        errors,
        warnings,
        suggestions,
        stats,
      };
    } catch (error) {
      return {
        file: filePath,
        type,
        isValid: false,
        errors: [{
          path: 'file',
          message: `Failed to load or parse file: ${error}`,
          severity: 'critical',
          autoFixable: false,
        }],
        warnings: [],
        suggestions: [],
        stats: {
          wordCount: 0,
          sectionCount: 0,
          hasAllRequiredSections: false,
          missingRequiredSections: [],
          seoScore: 0,
          contentQualityScore: 0,
        },
      };
    }
  }
  
  /**
   * Validate all content in a directory
   */
  async validateDirectory(
    basePath: string,
    type: ContentType
  ): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    const files = await this.getContentFiles(`${basePath}/${type}s`);
    
    for (const file of files) {
      const result = await this.validateFile(file, type);
      results.push(result);
    }
    
    return results;
  }
  
  /**
   * Generate full site validation report
   */
  async generateSiteReport(): Promise<SiteValidationReport> {
    const allTypes: ContentType[] = ['aarti', 'bhajan', 'mantra', 'festival', 'chalisa', 'story'];
    const allResults: ValidationResult[] = [];
    const categoryBreakdown: Record<ContentType, CategoryStats> = {} as any;
    
    for (const type of allTypes) {
      const results = await this.validateDirectory('/content', type);
      allResults.push(...results);
      
      const valid = results.filter(r => r.isValid).length;
      const avgSeo = results.reduce((sum, r) => sum + r.stats.seoScore, 0) / results.length || 0;
      
      categoryBreakdown[type] = {
        total: results.length,
        valid,
        invalid: results.length - valid,
        averageSeoScore: Math.round(avgSeo),
      };
    }
    
    const globalIssues = this.detectGlobalIssues(allResults);
    
    return {
      timestamp: new Date().toISOString(),
      totalFiles: allResults.length,
      validFiles: allResults.filter(r => r.isValid).length,
      invalidFiles: allResults.filter(r => !r.isValid).length,
      results: allResults,
      categoryBreakdown,
      globalIssues,
    };
  }
  
  /**
   * Auto-fix content issues where possible
   */
  async autoFix(filePath: string, type: ContentType): Promise<{ success: boolean; changes: string[] }> {
    const result = await this.validateFile(filePath, type);
    const changes: string[] = [];
    
    if (result.isValid) {
      return { success: true, changes: ['No issues found'] };
    }
    
    let content = await this.loadContent(filePath);
    
    for (const error of result.errors) {
      if (error.autoFixable && error.suggestion) {
        content = this.applyFix(content, error.path, error.suggestion);
        changes.push(`Fixed: ${error.path} - ${error.message}`);
      }
    }
    
    // Save fixed content
    await this.saveContent(filePath, content);
    
    return { success: true, changes };
  }
  
  // =============================================================================
  // PRIVATE HELPER METHODS
  // =============================================================================
  
  private async loadContent(filePath: string): Promise<any> {
    if (this.contentCache.has(filePath)) {
      return this.contentCache.get(filePath);
    }
    
    // Node.js environment - read from filesystem
    if (fs && fs.existsSync && fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const content = JSON.parse(data);
      this.contentCache.set(filePath, content);
      return content;
    }
    
    // Browser/Next.js context - use fetch
    const response = await fetch(filePath);
    const content = await response.json();
    this.contentCache.set(filePath, content);
    return content;
  }
  
  private async saveContent(filePath: string, content: any): Promise<void> {
    // This would be implemented server-side or during build
    console.log(`Saving fixed content to ${filePath}`);
  }
  
  private async getContentFiles(directory: string): Promise<string[]> {
    // Node.js environment - scan filesystem
    if (fs && fs.existsSync && path) {
      const contentDir = path.join(process.cwd(), 'content');
      const typeDir = directory.replace('/content/', '');
      const fullPath = path.join(contentDir, typeDir);
      
      if (!fs.existsSync(fullPath)) {
        return [];
      }
      
      const files = fs.readdirSync(fullPath)
        .filter((f: string) => f.endsWith('.json'))
        .map((f: string) => path.join(fullPath, f));
      
      return files;
    }
    
    // Browser environment - would need different approach
    return [];
  }
  
  private isAutoFixable(path: string, message: string): boolean {
    const autoFixablePatterns = [
      'required',
      'must contain',
      'should be at least',
      'invalid format',
    ];
    return autoFixablePatterns.some(pattern => message.toLowerCase().includes(pattern));
  }
  
  private getFixSuggestion(path: string, message: string, content: any): string | undefined {
    // Generate contextual fix suggestions
    if (path.includes('seo.keywords') && message.includes('at least')) {
      return 'Add more relevant keywords (minimum 3 required)';
    }
    if (path.includes('sections') && message.includes('must contain')) {
      const config = categoryConfig[content.category as ContentType];
      return `Add required section types: ${config?.requiredSections.join(', ')}`;
    }
    return undefined;
  }
  
  private runAdditionalChecks(content: any, type: ContentType): {
    errors: ValidationError[];
    warnings: ValidationWarning[];
    suggestions: string[];
  } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: string[] = [];
    
    // Check ID format
    if (!/^[a-z0-9-]+$/.test(content.id)) {
      errors.push({
        path: 'id',
        message: 'ID must be lowercase alphanumeric with hyphens only',
        severity: 'error',
        autoFixable: true,
        suggestion: content.id.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      });
    }
    
    // Check SEO description length
    if (content.seo?.description) {
      const length = content.seo.description.length;
      if (length < 50 || length > 160) {
        warnings.push({
          path: 'seo.description',
          message: `SEO description is ${length} chars (optimal: 50-160)`,
          category: 'seo',
        });
      }
    }
    
    // Check content quality
    if (content.description && content.description.length < 100) {
      warnings.push({
        path: 'description',
        message: 'Description should be at least 100 characters for better SEO',
        category: 'content',
      });
    }
    
    // Check section variety
    const sectionTypes = new Set(content.sections?.map((s: any) => s.type));
    if (sectionTypes.size < 2) {
      suggestions.push('Consider adding more section types for richer content');
    }
    
    return { errors, warnings, suggestions };
  }
  
  private calculateStats(content: any, type: ContentType): ContentStats {
    const config = categoryConfig[type];
    const sectionTypes = content.sections?.map((s: any) => s.type) || [];
    const missingRequired = config.requiredSections.filter(
      req => !sectionTypes.includes(req)
    );
    
    // Calculate word count
    let wordCount = 0;
    content.sections?.forEach((section: any) => {
      const text = JSON.stringify(section);
      wordCount += text.split(/\s+/).length;
    });
    
    // Calculate SEO score
    let seoScore = 0;
    if (content.seo?.title) seoScore += 20;
    if (content.seo?.description && content.seo.description.length >= 50) seoScore += 20;
    if (content.seo?.keywords && content.seo.keywords.length >= 3) seoScore += 20;
    if (content.description && content.description.length >= 100) seoScore += 20;
    if (content.sections?.length >= 2) seoScore += 20;
    
    // Calculate content quality score
    let contentQualityScore = 0;
    if (wordCount > 200) contentQualityScore += 25;
    if (sectionTypes.size >= 3) contentQualityScore += 25;
    if (missingRequired.length === 0) contentQualityScore += 25;
    if (content.relatedContent?.length > 0) contentQualityScore += 25;
    
    return {
      wordCount,
      sectionCount: content.sections?.length || 0,
      hasAllRequiredSections: missingRequired.length === 0,
      missingRequiredSections: missingRequired,
      seoScore,
      contentQualityScore,
    };
  }
  
  private detectGlobalIssues(allResults: ValidationResult[]): GlobalIssue[] {
    const issues: GlobalIssue[] = [];
    
    // Check for duplicate IDs
    const ids = allResults.map(r => r.file);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length > 0) {
      issues.push({
        type: 'duplicate-id',
        description: 'Duplicate content IDs found',
        affectedFiles: duplicates,
        severity: 'error',
      });
    }
    
    // Check for broken related content references
    const allIds = new Set(ids);
    for (const result of allResults) {
      const content = this.contentCache.get(result.file);
      if (content?.relatedContent) {
        const broken = content.relatedContent.filter((id: string) => !allIds.has(id));
        if (broken.length > 0) {
          issues.push({
            type: 'broken-reference',
            description: `Broken references: ${broken.join(', ')}`,
            affectedFiles: [result.file],
            severity: 'warning',
          });
        }
      }
    }
    
    return issues;
  }
  
  private applyFix(content: any, path: string, suggestion: string): any {
    // Apply automated fixes
    const keys = path.split('.');
    let current = content;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = suggestion;
    return content;
  }
}

// =============================================================================
// EXPORT SINGLETON INSTANCE
// =============================================================================

export const contentValidator = new ContentValidatorAgent();

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

export async function validateAllContent(): Promise<SiteValidationReport> {
  return contentValidator.generateSiteReport();
}

export async function validateContentFile(filePath: string, type: ContentType): Promise<ValidationResult> {
  return contentValidator.validateFile(filePath, type);
}

export function generateValidationSummary(report: SiteValidationReport): string {
  const lines = [
    '=== Content Validation Report ===',
    `Generated: ${report.timestamp}`,
    '',
    `Total Files: ${report.totalFiles}`,
    `Valid: ${report.validFiles} ✓`,
    `Invalid: ${report.invalidFiles} ✗`,
    `Success Rate: ${Math.round((report.validFiles / report.totalFiles) * 100)}%`,
    '',
    '=== Category Breakdown ===',
  ];
  
  for (const [type, stats] of Object.entries(report.categoryBreakdown)) {
    lines.push(`${type}: ${stats.valid}/${stats.total} valid (Avg SEO: ${stats.averageSeoScore}/100)`);
  }
  
  if (report.globalIssues.length > 0) {
    lines.push('', '=== Global Issues ===');
    for (const issue of report.globalIssues) {
      lines.push(`[${issue.severity.toUpperCase()}] ${issue.type}: ${issue.description}`);
    }
  }
  
  return lines.join('\n');
}
