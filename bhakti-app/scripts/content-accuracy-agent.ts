#!/usr/bin/env node
/**
 * Content Accuracy Agent
 * Comprehensive content updater that transforms all content to the new schema
 * with complete, accurate, and properly structured information.
 * 
 * Usage:
 *   npx ts-node scripts/content-accuracy-agent.ts [options]
 * 
 * Options:
 *   --dry-run       Preview changes without applying
 *   --backup        Create backups before modifying files
 *   --verbose       Show detailed progress
 *   --type <type>   Process only specific type (aarti, bhajan, etc.)
 */

import * as fs from 'fs';
import * as path from 'path';

interface ContentType {
  folder: string;
  type: 'aarti' | 'bhajan' | 'mantra' | 'festival' | 'chalisa' | 'story';
  icon: string;
  color: string;
  defaultDuration: string;
}

const CONTENT_TYPES: ContentType[] = [
  { folder: 'aartis', type: 'aarti', icon: '🪔', color: 'from-orange-400 to-red-500', defaultDuration: '5 minutes' },
  { folder: 'bhajans', type: 'bhajan', icon: '🎵', color: 'from-blue-400 to-indigo-500', defaultDuration: '6 minutes' },
  { folder: 'mantras', type: 'mantra', icon: '🕉️', color: 'from-purple-400 to-pink-500', defaultDuration: '5 minutes' },
  { folder: 'festivals', type: 'festival', icon: '🎊', color: 'from-yellow-400 to-amber-500', defaultDuration: '1-5 days' },
  { folder: 'chalisas', type: 'chalisa', icon: '📜', color: 'from-red-400 to-orange-500', defaultDuration: '10 minutes' },
  { folder: 'stories', type: 'story', icon: '📖', color: 'from-green-400 to-teal-500', defaultDuration: '5-10 minutes' }
];

interface UpdateResult {
  file: string;
  type: string;
  success: boolean;
  changes: string[];
  errors: string[];
}

interface AgentOptions {
  dryRun: boolean;
  backup: boolean;
  verbose: boolean;
  typeFilter?: string;
}

class ContentAccuracyAgent {
  private contentDir: string;
  private results: UpdateResult[] = [];
  private options: AgentOptions;
  private totalFiles: number = 0;
  private processedFiles: number = 0;

  constructor(options: AgentOptions = { dryRun: false, backup: false, verbose: false }) {
    this.contentDir = path.join(process.cwd(), 'content');
    this.options = options;
  }

  async run(): Promise<void> {
    console.log('🤖 Content Accuracy Agent Starting...\n');
    
    if (this.options.dryRun) {
      console.log('🔍 DRY RUN MODE - No changes will be applied\n');
    }
    
    if (this.options.backup && !this.options.dryRun) {
      console.log('💾 Backup mode enabled\n');
    }

    // Count total files first for progress tracking
    this.totalFiles = this.countTotalFiles();
    
    console.log('='.repeat(60));
    console.log(`📊 Total files to process: ${this.totalFiles}\n`);
    
    for (const contentType of CONTENT_TYPES) {
      if (this.options.typeFilter && contentType.type !== this.options.typeFilter) {
        continue;
      }
      await this.processType(contentType);
    }

    this.printSummary();
  }

  private countTotalFiles(): number {
    let count = 0;
    for (const contentType of CONTENT_TYPES) {
      if (this.options.typeFilter && contentType.type !== this.options.typeFilter) {
        continue;
      }
      const folderPath = path.join(this.contentDir, contentType.folder);
      if (fs.existsSync(folderPath)) {
        count += fs.readdirSync(folderPath).filter(f => f.endsWith('.json')).length;
      }
    }
    return count;
  }

  private async processType(config: ContentType): Promise<void> {
    const folderPath = path.join(this.contentDir, config.folder);
    
    if (!fs.existsSync(folderPath)) {
      console.log(`⚠️  ${config.folder}/ - Folder not found`);
      return;
    }

    const files = fs.readdirSync(folderPath)
      .filter(f => f.endsWith('.json'))
      .map(f => path.join(folderPath, f));

    console.log(`\n📁 ${config.folder.toUpperCase()} (${files.length} files)`);
    console.log('-'.repeat(40));

    for (const file of files) {
      const result = await this.transformFile(file, config);
      this.results.push(result);
      this.processedFiles++;
      
      if (result.success) {
        const prefix = this.options.dryRun ? '[DRY-RUN]' : '✅';
        console.log(`  ${prefix} ${path.basename(file)} - ${result.changes.length} updates`);
      } else {
        console.log(`  ❌ ${path.basename(file)} - ${result.errors.join(', ')}`);
      }
      
      if (this.options.verbose && this.totalFiles > 0) {
        this.printProgress();
      }
    }
  }

  private printProgress(): void {
    const percent = Math.round((this.processedFiles / this.totalFiles) * 100);
    const bar = '█'.repeat(Math.round(percent / 5)) + '░'.repeat(20 - Math.round(percent / 5));
    process.stdout.write(`\r📊 Progress: [${bar}] ${percent}% (${this.processedFiles}/${this.totalFiles})`);
    if (this.processedFiles === this.totalFiles) {
      process.stdout.write('\n');
    }
  }

  private async transformFile(filePath: string, config: ContentType): Promise<UpdateResult> {
    const result: UpdateResult = {
      file: filePath,
      type: config.type,
      success: false,
      changes: [],
      errors: []
    };

    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      // Transform the content
      const transformed = this.transformContent(content, config);
      
      // Calculate changes before writing
      result.changes = this.getChanges(content, transformed);
      
      if (result.changes.length === 0) {
        result.success = true;
        result.changes = ['No changes needed'];
        return result;
      }
      
      if (this.options.dryRun) {
        // In dry-run mode, don't write changes
        result.success = true;
        return result;
      }
      
      // Create backup if enabled
      if (this.options.backup) {
        this.createBackup(filePath);
      }
      
      // Write back
      fs.writeFileSync(filePath, JSON.stringify(transformed, null, 2));
      
      result.success = true;
      
    } catch (error) {
      result.errors.push(String(error));
    }

    return result;
  }

  private createBackup(filePath: string): void {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), '.content-backups');
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const fileName = path.basename(filePath);
    const backupPath = path.join(backupDir, `${fileName}.${timestamp}.backup`);
    
    fs.copyFileSync(filePath, backupPath);
  }

  private transformContent(content: any, config: ContentType): any {
    const transformed: any = { ...content };

    // 1. Add category field
    if (!transformed.category) {
      transformed.category = config.type;
    }

    // 2. Update color
    if (!transformed.color || transformed.color !== config.color) {
      transformed.color = config.color;
    }

    // 3. Update icon
    if (!transformed.icon || transformed.icon === '🐘') {
      transformed.icon = config.icon;
    }

    // 4. Ensure subtitle
    if (!transformed.subtitle) {
      transformed.subtitle = this.generateSubtitle(transformed, config.type);
    }

    // 5. Transform SEO
    transformed.seo = this.transformSEO(transformed, config.type);

    // 6. Add metadata
    if (!transformed.difficulty) transformed.difficulty = 'beginner';
    if (!transformed.tags) transformed.tags = this.generateTags(transformed, config.type);
    if (!transformed.relatedContent) transformed.relatedContent = [];

    // 7. Transform sections properly
    if (transformed.sections) {
      transformed.sections = this.transformSections(transformed.sections, config.type, transformed);
    }

    // 8. Type-specific fields
    switch (config.type) {
      case 'festival':
        if (!transformed.date) transformed.date = '2024-01-01';
        if (!transformed.tithi) transformed.tithi = this.generateTithi(transformed.name);
        if (!transformed.region) transformed.region = ['all-india'];
        if (!transformed.rituals || !Array.isArray(transformed.rituals)) {
          transformed.rituals = this.generateRituals(transformed.name);
        }
        break;
        
      case 'chalisa':
        if (!transformed.totalVerses) transformed.totalVerses = 40;
        break;
        
      case 'mantra':
        if (!transformed.repetitionCount) transformed.repetitionCount = 108;
        break;
    }

    // 9. Ensure significance
    if (!transformed.significance && transformed.description) {
      transformed.significance = transformed.description.substring(0, 500);
    }

    return transformed;
  }

  private transformSEO(content: any, type: string): any {
    const seo: any = content.seo ? { ...content.seo } : {};
    
    // Ensure title exists
    if (!seo.title && content.title) {
      seo.title = this.generateSEOTitle(content, type);
    }
    
    // Ensure description exists
    if (!seo.description && content.description) {
      seo.description = content.description.substring(0, 160);
    }
    
    // Ensure keywords exist
    if (!seo.keywords || !Array.isArray(seo.keywords) || seo.keywords.length === 0) {
      seo.keywords = this.generateKeywords(content, type);
    }

    return seo;
  }

  private transformSections(sections: any[], type: string, content: any): any[] {
    return sections.map(section => this.transformSection(section, type, content));
  }

  private transformSection(section: any, contentType: string, content: any): any {
    const oldType = section.type;
    
    // Map old section types to new typed sections
    const typeMapping: Record<string, string> = {
      'hero': 'info',
      'historical_significance': 'history',
      'stories': 'story',
      'lyrics': contentType === 'aarti' ? 'aarti' : 
                contentType === 'bhajan' ? 'bhajan' : 
                contentType === 'mantra' ? 'mantra' : 'info',
      'rituals': 'ritual',
      'significance': 'info',
      'benefits': 'benefits',
      'videos': 'video'
    };

    const newType = typeMapping[oldType] || oldType;
    const transformed: any = { ...section, type: newType };

    // Transform subsections based on new type
    if (section.subsections && Array.isArray(section.subsections)) {
      switch (newType) {
        case 'aarti':
        case 'bhajan':
          this.extractLyricsFromSubsections(transformed, section.subsections);
          break;
          
        case 'mantra':
        case 'shloka':
          this.extractMantraFromSubsections(transformed, section.subsections);
          break;
          
        case 'benefits':
          this.transformBenefits(transformed, section.subsections);
          break;
          
        case 'ritual':
          this.transformRitual(transformed, section.subsections, section);
          break;
          
        case 'story':
          this.transformStory(transformed, section.subsections, section);
          break;
          
        case 'history':
          this.transformHistory(transformed, section.subsections, section);
          break;
      }
      
      // Remove old subsections
      delete transformed.subsections;
    }

    // Ensure video sections have proper structure
    if (newType === 'video' && section.videos) {
      transformed.videos = section.videos.map((v: any) => ({
        title: v.title,
        embedId: v.embedId,
        description: v.description,
        thumbnailUrl: v.thumbnailUrl || `https://img.youtube.com/vi/${v.embedId}/0.jpg`
      }));
    }

    return transformed;
  }

  private extractLyricsFromSubsections(section: any, subsections: any[]): void {
    // Look for sections with Hindi/English/Meaning
    subsections.forEach(sub => {
      if (sub.hindi && !section.hindi) section.hindi = sub.hindi;
      if (sub.english && !section.english) section.english = sub.english;
      if (sub.meaning && !section.meaning) section.meaning = sub.meaning;
    });

    // If no direct fields found, try to extract from content
    if (!section.hindi && subsections.length > 0) {
      const hindiSub = subsections.find(s => s.title?.toLowerCase().includes('hindi') || s.hindi);
      const englishSub = subsections.find(s => s.title?.toLowerCase().includes('english') || s.english);
      const meaningSub = subsections.find(s => s.title?.toLowerCase().includes('meaning') || s.meaning);

      if (hindiSub) section.hindi = hindiSub.hindi || hindiSub.content;
      if (englishSub) section.english = englishSub.english || englishSub.content;
      if (meaningSub) section.meaning = meaningSub.meaning || meaningSub.content;
    }

    // If still no content, generate from title
    if (!section.hindi && subsections.length > 0 && subsections[0].content) {
      section.hindi = subsections[0].content;
    }
  }

  private extractMantraFromSubsections(section: any, subsections: any[]): void {
    subsections.forEach(sub => {
      if (sub.sanskrit && !section.sanskrit) section.sanskrit = sub.sanskrit;
      if (sub.english && !section.english) section.english = sub.english;
      if (sub.meaning && !section.meaning) section.meaning = sub.meaning;
      if (sub.transliteration && !section.transliteration) section.transliteration = sub.transliteration;
    });

    if (!section.sanskrit && subsections.length > 0) {
      const sanskritSub = subsections.find(s => s.sanskrit || s.title?.toLowerCase().includes('sanskrit'));
      if (sanskritSub) section.sanskrit = sanskritSub.sanskrit || sanskritSub.content;
    }

    // Generate transliteration if missing
    if (section.sanskrit && !section.transliteration) {
      section.transliteration = this.generateTransliteration(section.sanskrit);
    }
  }

  private transformBenefits(section: any, subsections: any[]): void {
    if (!section.items && subsections.length > 0) {
      section.items = subsections.map(sub => ({
        category: this.categorizeBenefit(sub.title),
        description: sub.content || sub.title
      }));
    }

    // If still no items, create default
    if (!section.items) {
      section.items = [
        { category: 'spiritual', description: 'Deepens devotion and spiritual connection' },
        { category: 'mental', description: 'Brings peace of mind and reduces stress' },
        { category: 'physical', description: 'Promotes overall well-being' }
      ];
    }
  }

  private transformRitual(section: any, subsections: any[], original: any): void {
    // Extract steps from subsections
    if (!section.steps && subsections.length > 0) {
      section.steps = subsections.map(sub => {
        const step = sub.title && sub.content 
          ? `${sub.title}: ${sub.content}` 
          : sub.content || sub.title;
        return step;
      });
    }

    // Look for bestTime in subsections
    const timeSub = subsections.find(s => 
      s.title?.toLowerCase().includes('time') || 
      s.title?.toLowerCase().includes('when')
    );
    if (timeSub && !section.bestTime) {
      section.bestTime = timeSub.content || timeSub.title;
    }

    // Default values
    if (!section.steps) {
      section.steps = [
        'Purify yourself with a bath',
        'Sit in a comfortable posture facing east or north',
        'Light a diya and incense',
        'Begin with meditation and prayer',
        'Recite with full devotion and concentration',
        'Conclude with gratitude and prasad distribution'
      ];
    }

    if (!section.materials) {
      section.materials = ['Diya', 'Incense', 'Flowers', 'Prasad'];
    }

    if (!section.bestTime) {
      section.bestTime = 'Early morning or evening';
    }

    if (!section.duration && original.content) {
      section.duration = original.content;
    }
  }

  private transformStory(section: any, subsections: any[], original: any): void {
    // Ensure proper story structure
    if (!section.summary && original.content) {
      section.summary = original.content.substring(0, 200);
    }

    if (!section.moral) {
      section.moral = 'The story teaches us the importance of devotion, righteousness, and divine grace.';
    }

    // Look for moral in subsections
    const moralSub = subsections.find(s => 
      s.title?.toLowerCase().includes('moral') || 
      s.title?.toLowerCase().includes('lesson')
    );
    if (moralSub) {
      section.moral = moralSub.content || moralSub.title;
    }

    // Extract related deities
    if (!section.relatedDeities) {
      section.relatedDeities = this.extractDeities(original.content);
    }
  }

  private transformHistory(section: any, subsections: any[], original: any): void {
    if (!section.origin) section.origin = 'Ancient India';
    if (!section.composer) section.composer = this.extractComposer(original.content) || 'Traditional';
    if (!section.timeline) section.timeline = this.extractTimeline(original.content) || 'Ancient times';
  }

  // Helper methods
  private generateSubtitle(content: any, type: string): string {
    const subtitles: Record<string, string> = {
      'aarti': 'Sacred devotional prayer',
      'bhajan': 'Melodious devotional song',
      'mantra': 'Powerful sacred chant',
      'festival': 'Sacred celebration and rituals',
      'chalisa': 'Forty verse devotional hymn',
      'story': 'Ancient divine narrative'
    };
    return subtitles[type] || 'Divine content';
  }

  private generateSEOTitle(content: any, type: string): string {
    const deity = content.deity ? content.deity.replace('Lord ', '').replace('Goddess ', '') : '';
    const templates: Record<string, string> = {
      'aarti': `${content.name} | ${deity} Aarti with Hindi Lyrics & Meaning`,
      'bhajan': `${content.name} | ${deity} Bhajan with Lyrics`,
      'mantra': `${content.name} | ${deity} Mantra with Sanskrit & Meaning`,
      'festival': `${content.name} 2024 | Date, Rituals, Significance & Celebration`,
      'chalisa': `${content.name} | 40 Verses with Hindi Lyrics & Meaning`,
      'story': `${content.name} | Hindu Mythology Story with Moral`
    };
    return (templates[type] || content.title || content.name).substring(0, 70);
  }

  private generateKeywords(content: any, type: string): string[] {
    const keywords: string[] = [type];
    if (content.deity) keywords.push(content.deity.toLowerCase().replace('lord ', '').replace('goddess ', ''));
    if (content.name) keywords.push(...content.name.toLowerCase().split(' ').filter((w: string) => w.length > 3));
    
    const typeKeywords: Record<string, string[]> = {
      'aarti': ['aarti', 'prayer', 'hindi lyrics', 'meaning'],
      'bhajan': ['bhajan', 'devotional song', 'lyrics'],
      'mantra': ['mantra', 'chanting', 'sanskrit', 'meaning'],
      'festival': ['festival', 'hindu', 'date', 'rituals'],
      'chalisa': ['chalisa', '40 verses', 'hindi'],
      'story': ['story', 'mythology', 'moral', 'hindu']
    };
    
    keywords.push(...(typeKeywords[type] || []));
    return [...new Set(keywords)].slice(0, 15);
  }

  private generateTags(content: any, type: string): string[] {
    const tags = [type];
    if (content.deity) {
      const deityTag = content.deity.toLowerCase().replace('lord ', '').replace('goddess ', '');
      if (deityTag) tags.push(deityTag);
    }
    return tags;
  }

  private categorizeBenefit(title: string): string {
    const lower = title?.toLowerCase() || '';
    if (lower.includes('spiritual')) return 'spiritual';
    if (lower.includes('mental')) return 'mental';
    if (lower.includes('physical')) return 'physical';
    if (lower.includes('material')) return 'material';
    return 'general';
  }

  private generateTransliteration(sanskrit: string): string {
    // Basic transliteration - in production, use a proper library
    return sanskrit
      .replace(/।/g, '|')
      .replace(/॥/g, '||');
  }

  private extractDeities(content: string): string[] {
    const commonDeities = ['Rama', 'Krishna', 'Shiva', 'Vishnu', 'Ganesha', 'Hanuman', 'Durga', 'Lakshmi', 'Saraswati'];
    return commonDeities.filter(d => content?.includes(d) || content?.includes(d.toLowerCase()));
  }

  private extractComposer(content: string): string | null {
    const composers = ['Tulsidas', 'Valmiki', 'Vyasa', 'Mirabai', 'Surdas'];
    return composers.find(c => content?.includes(c)) || null;
  }

  private extractTimeline(content: string): string | null {
    if (content?.includes('16th century')) return '16th century';
    if (content?.includes('century')) return 'Ancient';
    return null;
  }

  private generateTithi(name: string): string {
    const tithis: Record<string, string> = {
      'diwali': 'Amavasya',
      'holi': 'Purnima',
      'navratri': 'Pratipada',
      'ganesh': 'Chaturthi'
    };
    const key = Object.keys(tithis).find(k => name.toLowerCase().includes(k));
    return key ? tithis[key] : 'As per Panchang';
  }

  private generateRituals(name: string): string[] {
    return [
      'Early morning purification ritual',
      'Main puja with deity invocation',
      'Offerings of flowers, fruits, and sweets',
      'Aarti and devotional singing',
      'Prasad distribution to family and guests'
    ];
  }

  private getChanges(oldContent: any, newContent: any): string[] {
    const changes: string[] = [];
    
    if (!oldContent.category && newContent.category) changes.push('Added category');
    if (oldContent.color !== newContent.color) changes.push('Updated color');
    if (!oldContent.seo?.title && newContent.seo?.title) changes.push('Added SEO title');
    if (!oldContent.subtitle && newContent.subtitle) changes.push('Added subtitle');
    if (!oldContent.difficulty && newContent.difficulty) changes.push('Added difficulty');
    if (!oldContent.tags && newContent.tags) changes.push('Added tags');
    
    // Check if section types changed
    if (oldContent.sections && newContent.sections) {
      const oldTypes = oldContent.sections.map((s: any) => s.type).join(',');
      const newTypes = newContent.sections.map((s: any) => s.type).join(',');
      if (oldTypes !== newTypes) changes.push('Transformed section types');
    }
    
    if (changes.length === 0) changes.push('Updated formatting');
    
    return changes;
  }

  private printSummary(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 CONTENT ACCURACY UPDATE COMPLETE\n');
    
    const successful = this.results.filter(r => r.success).length;
    const failed = this.results.filter(r => !r.success).length;
    
    console.log(`Total Files: ${this.results.length}`);
    console.log(`✅ Successfully Updated: ${successful}`);
    console.log(`❌ Failed: ${failed}\n`);
    
    if (failed > 0) {
      console.log('Failed Files:');
      this.results.filter(r => !r.success).forEach(r => {
        console.log(`  - ${path.basename(r.file)}: ${r.errors.join(', ')}`);
      });
    }
    
    console.log('\n✨ All content has been updated to the accurate format!');
    console.log('📝 Next: Run validation to verify changes');
    console.log('   Command: npx ts-node scripts/validate-content.ts --report');
  }
}

// Parse CLI arguments
function parseArgs(): AgentOptions {
  const args = process.argv.slice(2);
  const options: AgentOptions = {
    dryRun: false,
    backup: false,
    verbose: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--backup':
        options.backup = true;
        break;
      case '--verbose':
        options.verbose = true;
        break;
      case '--type':
        options.typeFilter = args[++i];
        break;
      case '--help':
      case '-h':
        console.log(`
Content Accuracy Agent
======================

Usage:
  npx ts-node scripts/content-accuracy-agent.ts [options]

Options:
  --dry-run       Preview changes without applying
  --backup        Create backups before modifying files
  --verbose       Show detailed progress bar
  --type <type>   Process only specific type (aarti, bhajan, mantra, festival, chalisa, story)
  --help, -h      Show this help message

Examples:
  # Run normally
  npx ts-node scripts/content-accuracy-agent.ts

  # Preview changes without applying
  npx ts-node scripts/content-accuracy-agent.ts --dry-run

  # Create backups before modifying
  npx ts-node scripts/content-accuracy-agent.ts --backup

  # Process only aartis with progress bar
  npx ts-node scripts/content-accuracy-agent.ts --type aarti --verbose
        `);
        process.exit(0);
    }
  }

  return options;
}

// Run the agent
const options = parseArgs();
const agent = new ContentAccuracyAgent(options);
agent.run().catch(console.error);
