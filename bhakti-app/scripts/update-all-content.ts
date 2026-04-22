#!/usr/bin/env node
/**
 * Content Update Script
 * Reviews all existing content and updates to match new schema
 */

import * as fs from 'fs';
import * as path from 'path';

// Content type mapping from folder names
const CONTENT_TYPES = {
  'aartis': 'aarti',
  'bhajans': 'bhajan',
  'festivals': 'festival',
  'mantras': 'mantra',
  'chalisas': 'chalisa',
  'stories': 'story'
} as const;

type ContentType = typeof CONTENT_TYPES[keyof typeof CONTENT_TYPES];

// Color mappings for content types
const TYPE_COLORS: Record<ContentType, string> = {
  'aarti': 'from-orange-400 to-red-500',
  'bhajan': 'from-blue-400 to-indigo-500',
  'mantra': 'from-purple-400 to-pink-500',
  'festival': 'from-yellow-400 to-amber-500',
  'chalisa': 'from-red-400 to-orange-500',
  'story': 'from-green-400 to-teal-500'
};

// Icons for content types
const TYPE_ICONS: Record<ContentType, string> = {
  'aarti': '🪔',
  'bhajan': '🎵',
  'mantra': '🕉️',
  'festival': '🎊',
  'chalisa': '📜',
  'story': '📖'
};

interface UpdateResult {
  file: string;
  type: ContentType;
  success: boolean;
  changes: string[];
  errors: string[];
  backupCreated: boolean;
}

interface ContentStats {
  totalFiles: number;
  updatedFiles: number;
  failedFiles: number;
  backupsCreated: number;
  byType: Record<ContentType, { total: number; updated: number; failed: number }>;
}

class ContentUpdater {
  private contentDir: string;
  private backupDir: string;
  private results: UpdateResult[] = [];

  constructor() {
    this.contentDir = path.join(process.cwd(), 'content');
    this.backupDir = path.join(process.cwd(), 'backups', `content-${Date.now()}`);
  }

  async run(): Promise<ContentStats> {
    console.log('🔍 Bhakti Content Update System\n');
    console.log('=' .repeat(50));
    
    // Create backup directory
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }

    // Process each content type
    for (const [folder, type] of Object.entries(CONTENT_TYPES)) {
      await this.processFolder(folder, type as ContentType);
    }

    // Generate report
    const stats = this.generateStats();
    this.printReport(stats);
    
    return stats;
  }

  private async processFolder(folderName: string, type: ContentType): Promise<void> {
    const folderPath = path.join(this.contentDir, folderName);
    
    if (!fs.existsSync(folderPath)) {
      console.log(`⚠️  Folder not found: ${folderName}`);
      return;
    }

    const files = fs.readdirSync(folderPath)
      .filter(f => f.endsWith('.json'))
      .map(f => path.join(folderPath, f));

    console.log(`\n📁 Processing ${folderName} (${files.length} files)...`);

    for (const file of files) {
      const result = await this.updateFile(file, type);
      this.results.push(result);
      
      if (result.success) {
        console.log(`  ✅ ${path.basename(file)} - ${result.changes.length} changes`);
      } else {
        console.log(`  ❌ ${path.basename(file)} - ${result.errors.join(', ')}`);
      }
    }
  }

  private async updateFile(filePath: string, type: ContentType): Promise<UpdateResult> {
    const result: UpdateResult = {
      file: filePath,
      type,
      success: false,
      changes: [],
      errors: [],
      backupCreated: false
    };

    try {
      // Read existing content
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      // Create backup
      const backupPath = path.join(
        this.backupDir, 
        path.basename(path.dirname(filePath)),
        path.basename(filePath)
      );
      
      if (!fs.existsSync(path.dirname(backupPath))) {
        fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      }
      fs.writeFileSync(backupPath, JSON.stringify(content, null, 2));
      result.backupCreated = true;

      // Transform content
      const updated = this.transformContent(content, type);
      
      // Write updated content
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
      
      result.success = true;
      result.changes = this.detectChanges(content, updated);
      
    } catch (error) {
      result.errors.push(String(error));
    }

    return result;
  }

  private transformContent(content: any, type: ContentType): any {
    const updated = { ...content };

    // 1. Add category field
    if (!updated.category) {
      updated.category = type;
    }

    // 2. Add/update color
    if (!updated.color || !updated.color.includes('from-')) {
      updated.color = TYPE_COLORS[type];
    }

    // 3. Ensure icon is set
    if (!updated.icon) {
      updated.icon = TYPE_ICONS[type];
    }

    // 4. Transform SEO structure
    if (!updated.seo) {
      updated.seo = {};
    }
    
    if (!updated.seo.title && updated.title) {
      updated.seo.title = updated.title.substring(0, 70);
    }
    
    if (!updated.seo.description && updated.description) {
      updated.seo.description = updated.description.substring(0, 160);
    }
    
    if (!updated.seo.keywords || !Array.isArray(updated.seo.keywords) || updated.seo.keywords.length === 0) {
      updated.seo.keywords = this.generateKeywords(updated, type);
    }

    // 5. Add new metadata fields
    if (!updated.difficulty) {
      updated.difficulty = 'beginner';
    }
    
    if (!updated.tags) {
      updated.tags = [type, updated.deity?.toLowerCase().replace('lord ', '').replace('goddess ', '') || ''].filter(Boolean);
    }
    
    if (!updated.relatedContent) {
      updated.relatedContent = [];
    }

    // 6. Transform sections to new format
    if (updated.sections) {
      updated.sections = updated.sections.map((section: any) => 
        this.transformSection(section, type)
      );
    }

    // 7. Add type-specific fields
    switch (type) {
      case 'festival':
        if (!updated.date) {
          updated.date = '2024-01-01'; // Placeholder - should be updated
        }
        if (!updated.region) {
          updated.region = ['all-india'];
        }
        break;
        
      case 'chalisa':
        if (!updated.totalVerses) {
          updated.totalVerses = 40;
        }
        break;
        
      case 'mantra':
        if (!updated.repetitionCount) {
          updated.repetitionCount = 108;
        }
        break;
    }

    // 8. Ensure significance field
    if (!updated.significance && updated.description) {
      updated.significance = updated.description.substring(0, 500);
    }

    return updated;
  }

  private transformSection(section: any, contentType: ContentType): any {
    const type = section.type;
    
    // Map old types to new typed sections
    const typeMap: Record<string, string> = {
      'hero': 'info',
      'historical_significance': 'history',
      'stories': 'story',
      'lyrics': contentType === 'aarti' ? 'aarti' : contentType === 'bhajan' ? 'bhajan' : 'mantra',
      'rituals': 'ritual',
      'significance': 'info',
      'benefits': 'benefits',
      'videos': 'video'
    };

    const newType = typeMap[type] || type;
    const updated = { ...section, type: newType };

    // Transform subsections to direct fields based on new type
    if (section.subsections && Array.isArray(section.subsections)) {
      switch (newType) {
        case 'aarti':
        case 'bhajan':
          // Extract hindi/english/meaning from subsections
          section.subsections.forEach((sub: any) => {
            if (sub.hindi && !updated.hindi) updated.hindi = sub.hindi;
            if (sub.english && !updated.english) updated.english = sub.english;
            if (sub.meaning && !updated.meaning) updated.meaning = sub.meaning;
          });
          // If still no content, try to use first subsection
          if (!updated.hindi && section.subsections[0]?.hindi) {
            updated.hindi = section.subsections[0].hindi;
            updated.english = section.subsections[0].english;
            updated.meaning = section.subsections[0].meaning;
          }
          break;
          
        case 'mantra':
          section.subsections.forEach((sub: any) => {
            if (sub.sanskrit && !updated.sanskrit) updated.sanskrit = sub.sanskrit;
            if (sub.english && !updated.english) updated.english = sub.english;
            if (sub.meaning && !updated.meaning) updated.meaning = sub.meaning;
          });
          break;
          
        case 'benefits':
          if (!updated.items && section.subsections) {
            updated.items = section.subsections.map((sub: any) => ({
              category: 'spiritual',
              description: sub.content || sub.title
            }));
          }
          break;
          
        case 'ritual':
          if (!updated.steps && section.subsections) {
            updated.steps = section.subsections.map((sub: any) => 
              `${sub.title}: ${sub.content || ''}`.trim()
            );
          }
          break;
      }
    }

    // Remove old subsection structure (now flattened)
    if (updated.subsections) {
      delete updated.subsections;
    }

    return updated;
  }

  private generateKeywords(content: any, type: ContentType): string[] {
    const keywords: string[] = [type];
    
    if (content.deity) {
      keywords.push(content.deity.toLowerCase().replace('lord ', '').replace('goddess ', ''));
    }
    
    if (content.name) {
      keywords.push(...content.name.toLowerCase().split(' ').filter((w: string) => w.length > 3));
    }
    
    // Add type-specific keywords
    const typeKeywords: Record<ContentType, string[]> = {
      'aarti': ['aarti', 'prayer', 'worship'],
      'bhajan': ['bhajan', 'devotional', 'song'],
      'mantra': ['mantra', 'chanting', 'meditation'],
      'festival': ['festival', 'celebration', 'hindu'],
      'chalisa': ['chalisa', '40 verses', 'hymn'],
      'story': ['story', 'mythology', 'wisdom']
    };
    
    keywords.push(...typeKeywords[type]);
    
    return [...new Set(keywords)].slice(0, 10);
  }

  private detectChanges(oldContent: any, newContent: any): string[] {
    const changes: string[] = [];
    
    if (!oldContent.category && newContent.category) {
      changes.push('Added category field');
    }
    
    if ((!oldContent.color || !oldContent.color.includes('from-')) && newContent.color) {
      changes.push('Updated color to gradient format');
    }
    
    if (!oldContent.difficulty && newContent.difficulty) {
      changes.push('Added difficulty field');
    }
    
    if (!oldContent.tags && newContent.tags) {
      changes.push('Added tags field');
    }
    
    if (!oldContent.seo?.title && newContent.seo?.title) {
      changes.push('Added SEO title');
    }
    
    if (!oldContent.seo?.keywords || oldContent.seo?.keywords.length === 0) {
      changes.push('Generated SEO keywords');
    }
    
    if (oldContent.sections && newContent.sections) {
      const oldTypes = oldContent.sections.map((s: any) => s.type).join(',');
      const newTypes = newContent.sections.map((s: any) => s.type).join(',');
      if (oldTypes !== newTypes) {
        changes.push('Transformed section types');
      }
    }
    
    if (!oldContent.significance && newContent.significance) {
      changes.push('Added significance field');
    }
    
    if (changes.length === 0) {
      changes.push('Minor formatting updates');
    }
    
    return changes;
  }

  private generateStats(): ContentStats {
    const byType: Record<ContentType, { total: number; updated: number; failed: number }> = {
      'aarti': { total: 0, updated: 0, failed: 0 },
      'bhajan': { total: 0, updated: 0, failed: 0 },
      'mantra': { total: 0, updated: 0, failed: 0 },
      'festival': { total: 0, updated: 0, failed: 0 },
      'chalisa': { total: 0, updated: 0, failed: 0 },
      'story': { total: 0, updated: 0, failed: 0 }
    };

    for (const result of this.results) {
      byType[result.type].total++;
      if (result.success) {
        byType[result.type].updated++;
      } else {
        byType[result.type].failed++;
      }
    }

    return {
      totalFiles: this.results.length,
      updatedFiles: this.results.filter(r => r.success).length,
      failedFiles: this.results.filter(r => !r.success).length,
      backupsCreated: this.results.filter(r => r.backupCreated).length,
      byType
    };
  }

  private printReport(stats: ContentStats): void {
    console.log('\n' + '='.repeat(50));
    console.log('📊 UPDATE COMPLETE\n');
    
    console.log(`Total Files Processed: ${stats.totalFiles}`);
    console.log(`✅ Successfully Updated: ${stats.updatedFiles}`);
    console.log(`❌ Failed: ${stats.failedFiles}`);
    console.log(`💾 Backups Created: ${stats.backupsCreated}`);
    console.log(`📂 Backup Location: ${this.backupDir}\n`);
    
    console.log('By Content Type:');
    console.log('-'.repeat(50));
    
    for (const [type, counts] of Object.entries(stats.byType)) {
      if (counts.total > 0) {
        const icon = TYPE_ICONS[type as ContentType];
        console.log(`${icon} ${type.padEnd(12)} | ${counts.updated}/${counts.total} updated${counts.failed > 0 ? ` | ${counts.failed} failed` : ''}`);
      }
    }
    
    if (stats.failedFiles > 0) {
      console.log('\n❌ Failed Files:');
      this.results.filter(r => !r.success).forEach(r => {
        console.log(`  - ${path.basename(r.file)}: ${r.errors.join(', ')}`);
      });
    }
    
    console.log('\n✨ All content has been updated to match the new schema!');
    console.log(`📝 Review the backup at: ${this.backupDir}`);
    console.log(`🔍 Run validation to verify: npx ts-node scripts/validate-content.ts --report`);
  }
}

// Run the updater
const updater = new ContentUpdater();
updater.run().catch(console.error);
