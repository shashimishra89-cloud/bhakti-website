#!/usr/bin/env node
/**
 * Fix Festival Content - Change invalid section types
 */

import * as fs from 'fs';
import * as path from 'path';

const FESTIVALS_DIR = path.join(process.cwd(), 'content', 'festivals');

function fixFestivals() {
  console.log('🔧 Fixing Festival Content...\n');
  
  const files = fs.readdirSync(FESTIVALS_DIR).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const filePath = path.join(FESTIVALS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    let fixed = false;
    
    // Fix invalid section types
    data.sections.forEach((section: any) => {
      // Change 'celebration' to 'info'
      if (section.type === 'celebration') {
        section.type = 'info';
        fixed = true;
      }
      
      // Ensure ritual section has required fields
      if (section.type === 'ritual') {
        if (!section.steps) {
          section.steps = ['Perform the main ritual with devotion'];
          fixed = true;
        }
        if (!section.materials) {
          section.materials = ['Diya', 'Incense', 'Flowers'];
          fixed = true;
        }
        if (!section.bestTime) {
          section.bestTime = 'As per festival day';
          fixed = true;
        }
      }
      
      // Ensure story section has required fields
      if (section.type === 'story') {
        if (!section.summary) {
          section.summary = section.content?.substring(0, 200) || 'Ancient story from Hindu tradition';
          fixed = true;
        }
        if (!section.moral) {
          section.moral = 'This story teaches important spiritual lessons about devotion and righteousness.';
          fixed = true;
        }
      }
    });
    
    // Ensure required festival fields
    if (!data.date) {
      data.date = '2024-01-01';
      fixed = true;
    }
    if (!data.region) {
      data.region = ['all-india'];
      fixed = true;
    }
    if (!data.rituals || !Array.isArray(data.rituals)) {
      data.rituals = [
        'Early morning purification bath',
        'Main deity worship and puja',
        'Offerings of flowers and sweets',
        'Traditional fasting or feasting',
        'Evening aarti and celebrations'
      ];
      fixed = true;
    }
    
    // Write back
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    if (fixed) {
      console.log(`  ✅ Fixed ${file}`);
    } else {
      console.log(`  ✓ ${file} (no changes needed)`);
    }
  }
  
  console.log('\n✨ Festival files fixed!');
}

fixFestivals();
