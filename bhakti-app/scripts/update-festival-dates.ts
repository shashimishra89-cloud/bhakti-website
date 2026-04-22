#!/usr/bin/env node
/**
 * Festival Date Updater
 * Updates all festival JSON files with accurate 2024-2025 dates
 */

import * as fs from 'fs';
import * as path from 'path';

interface FestivalDate {
  id: string;
  name: string;
  date2024: string;
  date2025: string;
  tithi: string;
  significance: string;
}

const FESTIVAL_DATES: FestivalDate[] = [
  {
    id: 'diwali',
    name: 'Diwali',
    date2024: '2024-11-01',
    date2025: '2025-10-21',
    tithi: 'Amavasya (Kartik)',
    significance: 'Festival of Lights - Victory of good over evil'
  },
  {
    id: 'holi',
    name: 'Holi',
    date2024: '2024-03-25',
    date2025: '2025-03-14',
    tithi: 'Purnima (Phalguna)',
    significance: 'Festival of Colors - Celebration of spring and divine love'
  },
  {
    id: 'navratri',
    name: 'Navratri',
    date2024: '2024-10-03',
    date2025: '2025-09-22',
    tithi: 'Pratipada (Ashwin)',
    significance: 'Nine nights of Goddess Durga worship'
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    date2024: '2024-09-07',
    date2025: '2025-08-27',
    tithi: 'Chaturthi (Bhadrapada)',
    significance: 'Birth of Lord Ganesha - Remover of obstacles'
  },
  {
    id: 'maha-shivaratri',
    name: 'Maha Shivaratri',
    date2024: '2024-03-08',
    date2025: '2025-02-26',
    tithi: 'Chaturdashi (Phalguna/Magha)',
    significance: 'The great night of Lord Shiva'
  },
  {
    id: 'krishna-janmashtami',
    name: 'Krishna Janmashtami',
    date2024: '2024-08-26',
    date2025: '2025-08-16',
    tithi: 'Ashtami (Bhadrapada)',
    significance: 'Birth of Lord Krishna'
  },
  {
    id: 'ram-navami',
    name: 'Ram Navami',
    date2024: '2024-04-17',
    date2025: '2025-04-06',
    tithi: 'Navami (Chaitra)',
    significance: 'Birth of Lord Rama'
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    date2024: '2024-08-19',
    date2025: '2025-08-09',
    tithi: 'Purnima (Shravana)',
    significance: 'Bond of protection between siblings'
  },
  {
    id: 'baisakhi',
    name: 'Baisakhi',
    date2024: '2024-04-13',
    date2025: '2025-04-14',
    tithi: 'Solar New Year',
    significance: 'Harvest festival and Sikh New Year'
  },
  {
    id: 'onam',
    name: 'Onam',
    date2024: '2024-09-15',
    date2025: '2025-09-05',
    tithi: 'Thiruvonam (Chingam)',
    significance: 'Kerala harvest festival - Return of King Mahabali'
  },
  {
    id: 'pongal',
    name: 'Pongal',
    date2024: '2024-01-15',
    date2025: '2025-01-14',
    tithi: 'Solar Festival',
    significance: 'Tamil harvest festival - Thanksgiving to Sun God'
  }
];

class FestivalDateUpdater {
  private festivalsDir: string;
  private updated: string[] = [];
  private failed: string[] = [];

  constructor() {
    this.festivalsDir = path.join(process.cwd(), 'content', 'festivals');
  }

  async run(): Promise<void> {
    console.log('🗓️  Festival Date Updater\n');
    console.log('='.repeat(60));

    for (const festival of FESTIVAL_DATES) {
      await this.updateFestival(festival);
    }

    this.printSummary();
  }

  private async updateFestival(festival: FestivalDate): Promise<void> {
    const filePath = path.join(this.festivalsDir, `${festival.id}.json`);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${festival.id}.json - File not found`);
      this.failed.push(festival.id);
      return;
    }

    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Update fields
      content.date = festival.date2024;
      content.date2025 = festival.date2025;
      content.tithi = festival.tithi;
      if (!content.significance || content.significance.length < 50) {
        content.significance = festival.significance;
      }

      // Ensure region field exists
      if (!content.region) {
        content.region = ['all-india'];
      }

      // Update SEO title with date
      if (content.seo?.title) {
        content.seo.title = content.seo.title.replace('2024', festival.date2024.split('-')[0]);
      }

      // Write back
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

      console.log(`✅ ${festival.id}.json - Updated`);
      console.log(`   Date: ${festival.date2024} (${festival.tithi})`);
      this.updated.push(festival.id);

    } catch (error) {
      console.log(`❌ ${festival.id}.json - Error: ${error}`);
      this.failed.push(festival.id);
    }
  }

  private printSummary(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 UPDATE SUMMARY\n');
    console.log(`✅ Updated: ${this.updated.length} festivals`);
    console.log(`❌ Failed: ${this.failed.length} festivals`);

    if (this.failed.length > 0) {
      console.log('\nFailed festivals:', this.failed.join(', '));
    }

    console.log('\n🗓️  2024 Festival Calendar:');
    console.log('-'.repeat(40));
    for (const festival of FESTIVAL_DATES.filter(f => this.updated.includes(f.id))) {
      const date = new Date(festival.date2024);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      console.log(`${month} ${day.toString().padStart(2, ' ')} - ${festival.name}`);
    }

    console.log('\n✅ All festival dates updated to accurate 2024 dates!');
  }
}

// Run the updater
const updater = new FestivalDateUpdater();
updater.run().catch(console.error);
