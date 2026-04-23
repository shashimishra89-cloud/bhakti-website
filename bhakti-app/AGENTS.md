# Bhakti Content Agent

An AI agent skilled in creating and managing content for the Bhakti Hindu religious website.

## Capabilities

- Create new aarti, bhajan, mantra, festival, chalisa, and story content
- Generate properly formatted JSON content files with Hindi and English translations
- Validate content against the schema
- Update existing content with new information

## Content Structure

All content follows this base structure:

```json
{
  "id": "unique-slug",
  "name": "Display Name",
  "title": "Page Title",
  "subtitle": "Short description",
  "description": "Full description (100-500 chars)",
  "icon": "🪔",
  "color": "from-orange-400 to-red-500",
  "category": "aarti|bhajan|mantra|festival|chalisa|story",
  "difficulty": "beginner|intermediate|advanced",
  "deity": "Lord Rama",
  "significance": "Spiritual significance (50-500 chars)",
  "seo": {
    "title": "SEO Title",
    "description": "SEO Description (50-160 chars)",
    "keywords": ["keyword1", "keyword2"]
  },
  "sections": [
    {
      "type": "info|history|aarti|bhajan|mantra|ritual|benefits|video|story",
      "title": "Section Title",
      "content": "Section content",
      "hindi": "Hindi text (for aarti/bhajan/mantra sections)",
      "english": "English translation",
      "meaning": "Meaning explanation"
    }
  ]
}
```

## Content Type Color Schemes

| Type | Color |
|------|-------|
| aarti | from-orange-400 to-red-500 |
| bhajan | from-blue-400 to-indigo-500 |
| mantra | from-purple-400 to-pink-500 |
| festival | from-yellow-400 to-amber-500 |
| chalisa | from-red-400 to-orange-500 |
| story | from-green-400 to-teal-500 |

## Required Sections by Type

- **Aarti**: info, aarti, ritual (minimum)
- **Bhajan**: info, bhajan, benefits, ritual (minimum)
- **Mantra**: info, mantra, benefits (minimum)
- **Festival**: info, history, story, ritual (minimum)
- **Chalisa**: info, bhajan, benefits, ritual (minimum)
- **Story**: info, story (minimum)

## How to Create New Content

### 1. Aarti Content
Create file at `content/aartis/[name].json`:
```json
{
  "id": "ganesh-aarti",
  "name": "Ganesh Aarti",
  "title": "Jai Ganesh Jai Ganesh Deva",
  "subtitle": "Sacred devotional prayer",
  "description": "The most beloved aarti dedicated to Lord Ganesha...",
  "icon": "🪔",
  "color": "from-orange-400 to-red-500",
  "category": "aarti",
  "deity": "Lord Ganesha",
  "difficulty": "beginner",
  "significance": "Invokes Lord Ganesha's blessings for removing obstacles...",
  "seo": {
    "title": "Ganesh Aarti | Hindi Lyrics & Meaning",
    "description": "Complete Ganesh Aarti with lyrics in Hindi and English...",
    "keywords": ["ganesh aarti", "lord ganesha", "obstacle remover"]
  },
  "sections": [
    {
      "type": "info",
      "title": "About Ganesh Aarti",
      "content": "The Ganesh Aarti is a powerful devotional hymn..."
    },
    {
      "type": "aarti",
      "title": "Complete Aarti Lyrics",
      "content": "The complete lyrics...",
      "hindi": "जय गणेश जय गणेश देवा...",
      "english": "Victory to Ganesha, victory to Lord Ganesha...",
      "meaning": "This aarti praises Lord Ganesha..."
    },
    {
      "type": "ritual",
      "title": "How to Perform",
      "content": "Proper method...",
      "steps": ["Light the diya", "Offer flowers", "Sing aarti"],
      "materials": ["Diya", "Incense", "Flowers"],
      "bestTime": "Evening"
    }
  ]
}
```

### 2. Festival Content
Additional required fields for festivals:
```json
{
  "date": "2024-11-01",
  "tithi": "Amavasya",
  "region": ["all-india"],
  "rituals": ["Early morning puja", "Main ceremony"]
}
```

### 3. Mantra Content
Additional optional fields:
```json
{
  "repetitionCount": 108,
  "transliteration": "Om Namah Shivaya"
}
```

## Best Practices

1. **Translations**: Always include Hindi (Devanagari script) with English translation
2. **Meaning**: Add meaning/explanation for all devotional content
3. **SEO**: Include proper keywords (at least 3-10 keywords)
4. **Sections**: Minimum 2-3 sections per content
5. **Rituals**: Include proper steps and materials for any ritual sections
6. **Video**: Use actual YouTube embed IDs, not placeholder values

## Validation

Run validation to check content:
```bash
cd bhakti-app
npx ts-node scripts/validate-content.ts --type aarti
```

## Content Templates

Use templates from `content/templates/` directory to create new content with proper structure.

## Adding New Content to Site

1. Create JSON file in appropriate folder under `content/`
2. Run content accuracy agent to ensure proper format:
   ```bash
   npx ts-node scripts/content-accuracy-agent.ts --dry-run
   ```
3. Validate the content:
   ```bash
   npx ts-node scripts/validate-content.ts --type aarti
   ```
4. Build and test locally:
   ```bash
   npm run dev
   ```
5. Deploy to Cloudflare Pages