#!/usr/bin/env node
/**
 * Content Validation CLI Script
 * 
 * Usage:
 *   npx ts-node scripts/validate-content.ts [options]
 * 
 * Options:
 *   --type <type>      Validate specific content type (aarti, bhajan, mantra, festival, chalisa, story)
 *   --file <path>      Validate specific file
 *   --fix              Auto-fix issues where possible
 *   --report           Generate full site validation report
 *   --json             Output as JSON
 *   --migrate          Run migration on all content
 *   --dry-run          Preview changes without applying (default for migrate)
 *   --stats            Show detailed content statistics
 *   --diff <path>      Compare content file with template schema
 *   --backup           Create backup before fixing
 *   --evolution        Show schema evolution report
 * 
 * Examples:
 *   npx ts-node scripts/validate-content.ts --report
 *   npx ts-node scripts/validate-content.ts --type aarti --fix
 *   npx ts-node scripts/validate-content.ts --file content/aartis/ganesh-aarti.json
 *   npx ts-node scripts/validate-content.ts --stats
 *   npx ts-node scripts/validate-content.ts --diff content/aartis/ganesh-aarti.json
 *   npx ts-node scripts/validate-content.ts --fix --backup
 */

import { contentValidator, generateValidationSummary, validateAllContent, validateContentFile } from '../src/lib/contentValidator.js';
import { contentMigrator, migrateAllContent, previewMigration } from '../src/lib/contentMigrator.js';
import { schemaEvolution, getSchemaReport, syncAllSchemas } from '../src/lib/schemaEvolution.js';
import { ContentType } from '../src/lib/contentSchema.js';
import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// CLI ARGUMENT PARSING
// =============================================================================

interface CliOptions {
  type?: ContentType;
  file?: string;
  fix: boolean;
  report: boolean;
  json: boolean;
  migrate: boolean;
  dryRun: boolean;
  help: boolean;
  stats: boolean;
  diff?: string;
  backup: boolean;
  evolution: boolean;
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    fix: false,
    report: false,
    json: false,
    migrate: false,
    dryRun: true,
    help: false,
    stats: false,
    backup: false,
    evolution: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--type':
        options.type = args[++i] as ContentType;
        break;
      case '--file':
        options.file = args[++i];
        break;
      case '--fix':
        options.fix = true;
        break;
      case '--report':
        options.report = true;
        break;
      case '--json':
        options.json = true;
        break;
      case '--migrate':
        options.migrate = true;
        break;
      case '--apply':
        options.dryRun = false;
        break;
      case '--stats':
        options.stats = true;
        break;
      case '--diff':
        options.diff = args[++i];
        break;
      case '--backup':
        options.backup = true;
        break;
      case '--evolution':
        options.evolution = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
    }
  }

  return options;
}

// =============================================================================
// OUTPUT FORMATTING
// =============================================================================

function formatOutput(data: any, asJson: boolean): string {
  if (asJson) {
    return JSON.stringify(data, null, 2);
  }
  return typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

function printHelp(): void {
  console.log(`
Content Validation & Migration Tool
====================================

USAGE:
  npx ts-node scripts/validate-content.ts [options]

OPTIONS:
  --type <type>      Content type: aarti, bhajan, mantra, festival, chalisa, story
  --file <path>      Path to specific file to validate
  --fix              Auto-fix issues where possible
  --report           Generate full site validation report
  --json             Output results as JSON
  --migrate          Run content migration
  --apply            Apply migrations (without this, runs in dry-run mode)
  --stats            Show detailed content statistics
  --diff <path>      Compare content file with template schema
  --backup           Create backup before fixing
  --evolution        Show schema evolution report
  --help, -h         Show this help message

COMMANDS:
  Validate all content:
    npx ts-node scripts/validate-content.ts --report

  Validate specific type:
    npx ts-node scripts/validate-content.ts --type aarti

  Validate and auto-fix:
    npx ts-node scripts/validate-content.ts --type aarti --fix

  Preview migration:
    npx ts-node scripts/validate-content.ts --migrate

  Apply migration:
    npx ts-node scripts/validate-content.ts --migrate --apply

  Check schema evolution:
    npx ts-node scripts/validate-content.ts --evolution

  Show content statistics:
    npx ts-node scripts/validate-content.ts --stats

  Compare with template:
    npx ts-node scripts/validate-content.ts --diff content/aartis/ganesh-aarti.json

  Fix with backup:
    npx ts-node scripts/validate-content.ts --file content/aartis/ganesh-aarti.json --fix --backup
`);
}

// =============================================================================
// MAIN ACTIONS
// =============================================================================

async function runValidation(options: CliOptions): Promise<void> {
  console.log('🔍 Running content validation...\n');

  if (options.file) {
    // Validate single file
    const type = options.type || inferTypeFromPath(options.file);
    const result = await validateContentFile(options.file, type);
    
    if (options.json) {
      console.log(formatOutput(result, true));
    } else {
      console.log(`File: ${result.file}`);
      console.log(`Type: ${result.type}`);
      console.log(`Valid: ${result.isValid ? '✅' : '❌'}`);
      
      if (result.errors.length > 0) {
        console.log('\n❌ Errors:');
        result.errors.forEach(err => {
          console.log(`  [${err.severity.toUpperCase()}] ${err.path}: ${err.message}`);
          if (err.suggestion) {
            console.log(`    💡 Suggestion: ${err.suggestion}`);
          }
        });
      }
      
      if (result.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        result.warnings.forEach(warn => {
          console.log(`  [${warn.category}] ${warn.path}: ${warn.message}`);
        });
      }
      
      if (result.suggestions.length > 0) {
        console.log('\n💡 Suggestions:');
        result.suggestions.forEach(s => console.log(`  - ${s}`));
      }
      
      console.log(`\n📊 Stats:`);
      console.log(`  SEO Score: ${result.stats.seoScore}/100`);
      console.log(`  Content Quality: ${result.stats.contentQualityScore}/100`);
      console.log(`  Word Count: ${result.stats.wordCount}`);
      console.log(`  Sections: ${result.stats.sectionCount}`);
    }
    
    if (options.fix && !result.isValid) {
      if (options.backup) {
        const backupPath = createBackup(options.file);
        console.log(`\n💾 Backup created: ${backupPath}`);
      }
      console.log('\n🔧 Attempting auto-fix...');
      const fixResult = await contentValidator.autoFix(options.file, type);
      console.log(fixResult.success ? '✅ Fixes applied' : '❌ Could not auto-fix');
      console.log('Changes:', fixResult.changes.join(', '));
    }
  } else if (options.type) {
    // Validate all files of type
    const results = await contentValidator.validateDirectory('/content', options.type);
    
    const valid = results.filter(r => r.isValid).length;
    const invalid = results.filter(r => !r.isValid).length;
    
    console.log(`\n📊 Results for ${options.type}:`);
    console.log(`  Total: ${results.length}`);
    console.log(`  Valid: ${valid} ✅`);
    console.log(`  Invalid: ${invalid} ❌`);
    
    if (invalid > 0) {
      console.log('\n❌ Invalid files:');
      results.filter(r => !r.isValid).forEach(r => {
        console.log(`  - ${r.file} (${r.errors.length} errors)`);
      });
    }
  } else {
    // Full site report
    const report = await validateAllContent();
    
    if (options.json) {
      console.log(formatOutput(report, true));
    } else {
      console.log(generateValidationSummary(report));
      
      if (report.globalIssues.length > 0) {
        console.log('\n🌍 Global Issues:');
        report.globalIssues.forEach(issue => {
          console.log(`\n  [${issue.severity.toUpperCase()}] ${issue.type}`);
          console.log(`  Description: ${issue.description}`);
          console.log(`  Affected: ${issue.affectedFiles.join(', ')}`);
        });
      }
    }
  }
}

async function runMigration(options: CliOptions): Promise<void> {
  console.log(`🚀 Running content migration ${options.dryRun ? '(DRY RUN)' : ''}...\n`);
  
  const results = await migrateAllContent(options.dryRun);
  
  for (const [type, result] of Object.entries(results)) {
    console.log(`\n📁 ${type}:`);
    console.log(`  Total: ${result.totalFiles}`);
    console.log(`  Successful: ${result.successful} ✅`);
    console.log(`  Failed: ${result.failed} ❌`);
    console.log(`  Duration: ${result.duration}ms`);
    
    if (result.failed > 0) {
      const failed = result.results.filter(r => !r.success);
      console.log(`\n  Failed files:`);
      failed.forEach(f => {
        console.log(`    - ${f.file}`);
        f.errors.forEach(e => console.log(`      Error: ${e}`));
      });
    }
    
    if (!options.dryRun && result.backupLocation) {
      console.log(`  Backup: ${result.backupLocation}`);
    }
  }
}

async function runSchemaEvolution(): Promise<void> {
  console.log('📈 Schema Evolution Report\n');
  
  const report = getSchemaReport();
  
  console.log(`Current Version: ${report.currentVersion}`);
  console.log(`Total Versions: ${report.totalVersions}`);
  console.log(`Pending Feedback: ${report.pendingFeedback.length}`);
  
  if (report.pendingFeedback.length > 0) {
    console.log('\n📝 Pending Feedback:');
    report.pendingFeedback.forEach(fb => {
      console.log(`  [${fb.priority.toUpperCase()}] ${fb.category}.${fb.field}`);
      console.log(`    Issue: ${fb.issue}`);
    });
  }
  
  if (report.recommendedChanges.length > 0) {
    console.log('\n💡 Recommended Changes:');
    report.recommendedChanges.forEach(change => {
      console.log(`  [${change.impact.toUpperCase()}] ${change.type}`);
      console.log(`    Description: ${change.description}`);
      console.log(`    Affected: ${change.affectedContent.join(', ')}`);
    });
  }
  
  // Sync schemas
  console.log('\n🔄 Syncing schemas...');
  const sync = await syncAllSchemas();
  console.log(`Synced: ${sync.synced.join(', ')}`);
  
  if (sync.conflicts.length > 0) {
    console.log('\n⚠️  Conflicts:');
    sync.conflicts.forEach(c => {
      console.log(`  ${c.type}: ${c.issues.join(', ')}`);
    });
  }
}

// =============================================================================
// HELPERS
// =============================================================================

function inferTypeFromPath(filePath: string): ContentType {
  if (filePath.includes('/aartis/')) return 'aarti';
  if (filePath.includes('/bhajans/')) return 'bhajan';
  if (filePath.includes('/mantras/')) return 'mantra';
  if (filePath.includes('/festivals/')) return 'festival';
  if (filePath.includes('/chalisas/')) return 'chalisa';
  if (filePath.includes('/stories/')) return 'story';
  return 'aarti'; // Default
}

// =============================================================================
// NEW FEATURES: Stats, Diff, Backup
// =============================================================================

async function showContentStats(): Promise<void> {
  console.log('📊 Content Statistics\n');
  
  const contentDir = path.join(process.cwd(), 'content');
  const types = ['aartis', 'bhajans', 'mantras', 'festivals', 'chalisas', 'stories'];
  
  let totalFiles = 0;
  let totalWords = 0;
  let totalSections = 0;
  const typeStats: Record<string, { files: number; words: number; sections: number }> = {};
  
  for (const type of types) {
    const folderPath = path.join(contentDir, type);
    if (!fs.existsSync(folderPath)) {
      typeStats[type] = { files: 0, words: 0, sections: 0 };
      continue;
    }
    
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
    let typeWords = 0;
    let typeSections = 0;
    
    for (const file of files) {
      const content = JSON.parse(fs.readFileSync(path.join(folderPath, file), 'utf-8'));
      const wordCount = countWords(content);
      const sectionCount = content.sections?.length || 0;
      typeWords += wordCount;
      typeSections += sectionCount;
    }
    
    typeStats[type] = { files: files.length, words: typeWords, sections: typeSections };
    totalFiles += files.length;
    totalWords += typeWords;
    totalSections += typeSections;
  }
  
  console.log('Summary by Content Type:');
  console.log('='.repeat(60));
  for (const [type, stats] of Object.entries(typeStats)) {
    if (stats.files > 0) {
      console.log(`\n📁 ${type.toUpperCase()}:`);
      console.log(`  Files: ${stats.files}`);
      console.log(`  Total Words: ${stats.words.toLocaleString()}`);
      console.log(`  Avg Words/File: ${Math.round(stats.words / stats.files)}`);
      console.log(`  Total Sections: ${stats.sections}`);
      console.log(`  Avg Sections/File: ${(stats.sections / stats.files).toFixed(1)}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📈 OVERALL TOTALS:');
  console.log(`  Total Files: ${totalFiles}`);
  console.log(`  Total Words: ${totalWords.toLocaleString()}`);
  console.log(`  Total Sections: ${totalSections}`);
  console.log(`  Avg Words/File: ${totalFiles > 0 ? Math.round(totalWords / totalFiles) : 0}`);
}

function countWords(content: any): number {
  let words = 0;
  const textFields = ['title', 'description', 'name', 'significance'];
  
  for (const field of textFields) {
    if (content[field]) {
      words += content[field].split(/\s+/).length;
    }
  }
  
  if (content.sections) {
    for (const section of content.sections) {
      if (section.content) {
        words += section.content.split(/\s+/).length;
      }
      if (section.hindi) {
        words += section.hindi.split(/\s+/).length;
      }
      if (section.english) {
        words += section.english.split(/\s+/).length;
      }
    }
  }
  
  return words;
}

async function showDiff(filePath: string): Promise<void> {
  console.log(`🔍 Schema Diff for: ${filePath}\n`);
  
  if (!fs.existsSync(filePath)) {
    console.error('❌ File not found');
    return;
  }
  
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const type = inferTypeFromPath(filePath);
  
  const requiredFields = ['id', 'name', 'title', 'description', 'icon', 'color', 'deity', 'significance', 'seo', 'sections', 'category'];
  const missingFields = requiredFields.filter(f => !content[f]);
  const extraFields = Object.keys(content).filter(f => !requiredFields.includes(f) && !['subtitle', 'difficulty', 'tags', 'relatedContent', 'duration'].includes(f));
  
  console.log('📋 Required Fields Status:');
  console.log('='.repeat(50));
  for (const field of requiredFields) {
    const status = content[field] ? '✅' : '❌';
    console.log(`  ${status} ${field}`);
  }
  
  if (missingFields.length > 0) {
    console.log(`\n❌ Missing Required Fields: ${missingFields.join(', ')}`);
  }
  
  if (extraFields.length > 0) {
    console.log(`\n⚠️  Extra Fields (not in schema): ${extraFields.join(', ')}`);
  }
  
  // Check sections
  if (content.sections) {
    console.log(`\n📑 Sections (${content.sections.length} total):`);
    const sectionTypes = content.sections.map((s: any) => s.type);
    const uniqueTypes = [...new Set(sectionTypes)];
    console.log(`  Types found: ${uniqueTypes.join(', ')}`);
    
    // Check required section type for this content type
    const requiredSectionTypes: Record<string, string> = {
      'aarti': 'aarti',
      'bhajan': 'bhajan',
      'mantra': 'mantra',
      'festival': 'ritual',
      'chalisa': 'bhajan',
      'story': 'story'
    };
    
    const requiredSection = requiredSectionTypes[type];
    if (requiredSection && !sectionTypes.includes(requiredSection)) {
      console.log(`  ❌ Missing required section type: ${requiredSection}`);
    }
  }
}

function createBackup(filePath: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(process.cwd(), '.content-backups');
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const fileName = path.basename(filePath);
  const backupPath = path.join(backupDir, `${fileName}.${timestamp}.backup`);
  
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
  const options = parseArgs();
  
  if (options.help) {
    printHelp();
    process.exit(0);
  }
  
  try {
    if (options.stats) {
      await showContentStats();
    } else if (options.diff) {
      await showDiff(options.diff);
    } else if (options.migrate) {
      await runMigration(options);
    } else if (options.evolution) {
      await runSchemaEvolution();
    } else {
      await runValidation(options);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
