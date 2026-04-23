#!/usr/bin/env node
/**
 * Aarti Page Generator
 * Generates a new aarti page with consistent branding and structure
 * 
 * Usage:
 *   npx ts-node scripts/generate-aarti-page.ts <aarti-id> <deity-name>
 * 
 * Example:
 *   npx ts-node scripts/generate-aarti-page.ts saraswati-aarti "Goddess Saraswati"
 */

import * as fs from 'fs';
import * as path from 'path';

function generateAartiPage(aartiId: string, deityName: string) {
  const pageDir = path.join(process.cwd(), 'src', 'app', 'aartis', aartiId);
  const pageFile = path.join(pageDir, 'page.tsx');

  // Check if page already exists
  if (fs.existsSync(pageFile)) {
    console.error(`❌ Page already exists: ${pageFile}`);
    process.exit(1);
  }

  // Create directory
  fs.mkdirSync(pageDir, { recursive: true });

  // Generate page content
  const pageContent = `'use client';

import { AartiPageTemplate } from '@/components/AartiPageTemplate';

const aartiData = {
  id: "${aartiId}",
  name: "${deityName} Aarti",
  title: "Aarti Title Here",
  description: "Description of this aarti and its significance.",
  deity: "${deityName}",
  fullAarti: {
    hindi: \`Hindi lyrics here...
Line 1
Line 2
Line 3\`,
    english: \`English translation here...
Line 1
Line 2
Line 3\`
  },
  verses: [
    {
      line: "Hindi line 1",
      meaning: "English meaning 1"
    },
    {
      line: "Hindi line 2",
      meaning: "English meaning 2"
    }
  ],
  meaning: "Overall meaning of this aarti.",
  significance: "Significance and spiritual importance of this aarti.",
  benefits: [
    "Benefit 1",
    "Benefit 2",
    "Benefit 3",
    "Benefit 4"
  ],
  relatedAartis: [
    { id: "ganesh-aarti", name: "Ganesh Aarti", deity: "Lord Ganesha", icon: "🐘" },
    { id: "lakshmi-aarti", name: "Lakshmi Aarti", deity: "Goddess Lakshmi", icon: "💰" },
    { id: "durga-aarti", name: "Durga Aarti", deity: "Goddess Durga", icon: "👑" }
  ]
};

const themeColor = {
  primary: "orange",
  gradient: "from-orange-100 to-yellow-100",
  iconBg: "from-orange-400 to-orange-600",
  text: "orange-900",
  border: "orange-200"
};

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

export default function ${aartiId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Page() {
  return <AartiPageTemplate aarti={aartiData} themeColor={themeColor} />;
}
`;

  // Write page file
  fs.writeFileSync(pageFile, pageContent);

  console.log(`✅ Generated page: ${pageFile}`);
  console.log(`\n📝 Next steps:`);
  console.log(`1. Fill in the aarti data (hindi lyrics, english translation, verses)`);
  console.log(`2. Update themeColor if needed (current: orange theme)`);
  console.log(`3. Add the aarti to content/aartis/${aartiId}.json`);
  console.log(`4. Add entry to src/app/aartis/page.tsx`);
  console.log(`5. Run validation: npx ts-node scripts/validate-branding.ts`);
}

// Parse arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
Aarti Page Generator
====================

Usage:
  npx ts-node scripts/generate-aarti-page.ts <aarti-id> <deity-name>

Examples:
  npx ts-node scripts/generate-aarti-page.ts saraswati-aarti "Goddess Saraswati"
  npx ts-node scripts/generate-aarti-page.ts hanuman-aarti "Lord Hanuman"

The generated page will:
  - Use consistent branding (Header, Footer components)
  - Follow the standard aarti structure
  - Include Complete Aarti + Line-by-Line Translation sections
  - Be ready for content filling
`);
  process.exit(0);
}

const [aartiId, deityName] = args;

// Validate ID format
if (!/^[a-z0-9-]+$/.test(aartiId)) {
  console.error('❌ Invalid aarti ID. Use lowercase letters, numbers, and hyphens only.');
  process.exit(1);
}

generateAartiPage(aartiId, deityName);
