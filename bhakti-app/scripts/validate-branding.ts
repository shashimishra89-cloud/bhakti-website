#!/usr/bin/env node
/**
 * Branding Validation Script
 * Ensures all pages follow consistent branding guidelines
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  file: string;
  issues: string[];
  warnings: string[];
  passed: boolean;
}

// Branding standards
const STANDARDS = {
  // Logo should be Sparkles icon in gradient circle
  logoPattern: /Sparkles.*className="h-5 w-5 text-white"/,
  
  // Brand name should use gradient text
  brandNamePattern: /bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent/,
  
  // Footer should use gradient background
  footerPattern: /bg-gradient-to-r from-orange-900 to-red-900/,
  
  // Logo icon should be 🪔 (diya emoji) not Hindi characters
  hindiCharacterPattern: /text-white text-3xl font-bold">[\u0900-\u097F]+<\/span>/,
  
  // Should use Header component or match header structure
  headerComponentPattern: /<Header/,
  
  // Should use Footer component or match footer structure
  footerComponentPattern: /<Footer/,
  
  // Navigation should have consistent styling
  navPattern: /text-orange-800 hover:text-orange-600 font-medium/,
};

class BrandingValidator {
  private srcDir: string;
  private results: ValidationResult[] = [];

  constructor() {
    this.srcDir = path.join(process.cwd(), 'src', 'app');
  }

  async run(): Promise<void> {
    console.log('🔍 Branding Validation\n');
    console.log('='.repeat(70));

    // Find all page.tsx files
    const pageFiles = this.findPageFiles(this.srcDir);
    
    console.log(`Found ${pageFiles.length} page files to validate\n`);

    for (const file of pageFiles) {
      const result = this.validateFile(file);
      this.results.push(result);
    }

    this.printSummary();
  }

  private findPageFiles(dir: string): string[] {
    const files: string[] = [];
    
    if (!fs.existsSync(dir)) return files;

    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Check for page.tsx in this directory
        const pageFile = path.join(fullPath, 'page.tsx');
        if (fs.existsSync(pageFile)) {
          files.push(pageFile);
        }
        // Recurse into subdirectories
        files.push(...this.findPageFiles(fullPath));
      }
    }
    
    return files;
  }

  private validateFile(filePath: string): ValidationResult {
    const content = fs.readFileSync(filePath, 'utf-8');
    const issues: string[] = [];
    const warnings: string[] = [];
    
    // Check for Hindi character logos (inconsistent branding)
    if (STANDARDS.hindiCharacterPattern.test(content)) {
      issues.push('❌ Uses Hindi character logo instead of 🪔 emoji');
    }

    // Check for Header component usage (recommended)
    if (!STANDARDS.headerComponentPattern.test(content)) {
      // Check if it at least has the correct manual header structure
      if (!content.includes('bg-gradient-to-br from-orange-500 to-red-600')) {
        issues.push('❌ Header missing gradient logo background');
      }
      if (!content.includes('bg-clip-text text-transparent')) {
        issues.push('❌ Brand name missing gradient text styling');
      }
    } else {
      warnings.push('✅ Uses Header component (recommended)');
    }

    // Check for Footer component usage (recommended)
    if (!STANDARDS.footerComponentPattern.test(content)) {
      // Check if it at least has the correct footer structure
      if (!content.includes('bg-gradient-to-r from-orange-900 to-red-900')) {
        issues.push('❌ Footer missing gradient background');
      }
    } else {
      warnings.push('✅ Uses Footer component (recommended)');
    }

    // Check navigation styling
    if (!content.includes('text-orange-800 hover:text-orange-600 font-medium')) {
      warnings.push('⚠️  Navigation may have inconsistent styling');
    }

    // Check for old inconsistent patterns
    if (content.includes('text-2xl">🪔')) {
      warnings.push('⚠️  Uses old logo style (🪔 in span), should use Sparkles icon');
    }

    // Specific checks for aarti pages
    if (filePath.includes('/aartis/') && !filePath.includes('/aartis/page.tsx')) {
      // Check for complete aarti structure
      if (!content.includes('Complete Aarti')) {
        issues.push('❌ Missing "Complete Aarti" section');
      }
      if (!content.includes('Line-by-Line Translation')) {
        issues.push('❌ Missing "Line-by-Line Translation" section');
      }
      if (!content.includes('verses.map')) {
        issues.push('❌ Missing verse-by-verse structure');
      }
    }

    return {
      file: path.relative(process.cwd(), filePath),
      issues,
      warnings,
      passed: issues.length === 0
    };
  }

  private printSummary(): void {
    console.log('\n' + '='.repeat(70));
    console.log('📊 VALIDATION SUMMARY\n');

    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.filter(r => !r.passed).length;
    const totalIssues = this.results.reduce((sum, r) => sum + r.issues.length, 0);
    const totalWarnings = this.results.reduce((sum, r) => sum + r.warnings.length, 0);

    console.log(`Total Files: ${this.results.length}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Total Issues: ${totalIssues}`);
    console.log(`⚠️  Total Warnings: ${totalWarnings}`);

    // Print failed files
    if (failed > 0) {
      console.log('\n❌ FILES WITH ISSUES:');
      console.log('-'.repeat(70));
      
      for (const result of this.results.filter(r => !r.passed)) {
        console.log(`\n📄 ${result.file}`);
        for (const issue of result.issues) {
          console.log(`   ${issue}`);
        }
      }
    }

    // Print warnings
    const filesWithWarnings = this.results.filter(r => r.warnings.length > 0);
    if (filesWithWarnings.length > 0) {
      console.log('\n⚠️  FILES WITH WARNINGS:');
      console.log('-'.repeat(70));
      
      for (const result of filesWithWarnings) {
        const nonComponentWarnings = result.warnings.filter(w => !w.includes('Uses'));
        if (nonComponentWarnings.length > 0) {
          console.log(`\n📄 ${result.file}`);
          for (const warning of nonComponentWarnings) {
            console.log(`   ${warning}`);
          }
        }
      }
    }

    // Print recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('-'.repeat(70));
    console.log('1. Use <Header activeNav="xxx" /> component for consistent header');
    console.log('2. Use <Footer /> component for consistent footer');
    console.log('3. Use <AartiPageTemplate /> for new aarti pages');
    console.log('4. Always use 🪔 (diya) emoji, never Hindi characters');
    console.log('5. Maintain gradient styling: from-orange-500 to-red-600');

    console.log('\n✅ Validation complete!');
    
    // Exit with error code if there are issues
    if (failed > 0) {
      process.exit(1);
    }
  }
}

// Run the validator
const validator = new BrandingValidator();
validator.run().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
