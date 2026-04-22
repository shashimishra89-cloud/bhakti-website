#!/usr/bin/env node
/**
 * Fix Mantra Content - Add missing sanskrit and transliteration fields
 */

import * as fs from 'fs';
import * as path from 'path';

const MANTRAS_DIR = path.join(process.cwd(), 'content', 'mantras');

// Correct mantra data
const MANTRA_DATA: Record<string, { sanskrit: string; transliteration: string }> = {
  'om-mantra': {
    sanskrit: 'ॐ',
    transliteration: 'Om'
  },
  'gayatri-mantra': {
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    transliteration: 'Om bhur bhuvah swah tat-savitur varenyam bhargo devasya dheemahi dhiyo yo nah prachodayat'
  },
  'om-namah-shivaya': {
    sanskrit: 'ॐ नमः शिवाय',
    transliteration: 'Om Namah Shivaya'
  }
};

function fixMantras() {
  console.log('🔧 Fixing Mantra Content...\n');
  
  const files = fs.readdirSync(MANTRAS_DIR).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const filePath = path.join(MANTRAS_DIR, file);
    const id = file.replace('.json', '');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    const mantraInfo = MANTRA_DATA[id];
    if (!mantraInfo) {
      console.log(`  ⚠️  No fix data for ${file}`);
      continue;
    }
    
    // Find the mantra section
    const mantraSection = data.sections.find((s: any) => s.type === 'mantra');
    if (mantraSection) {
      // Remove english field (not in schema)
      delete mantraSection.english;
      
      // Add sanskrit and transliteration
      mantraSection.sanskrit = mantraInfo.sanskrit;
      mantraSection.transliteration = mantraInfo.transliteration;
      
      // Ensure meaning exists
      if (!mantraSection.meaning) {
        mantraSection.meaning = 'This mantra holds deep spiritual significance and brings peace to the devotee.';
      }
      
      console.log(`  ✅ Fixed ${file}`);
    } else {
      console.log(`  ⚠️  No mantra section found in ${file}`);
    }
    
    // Write back
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
  
  console.log('\n✨ Mantra files fixed!');
}

fixMantras();
