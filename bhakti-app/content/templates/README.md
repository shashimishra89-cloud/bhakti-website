# Content Templates

These templates provide the standardized structure for all content types in the Bhakti website.

## Quick Start

1. Copy the appropriate template file
2. Rename it with your content's ID (lowercase, hyphens)
3. Fill in all fields
4. Validate using: `npx ts-node scripts/validate-content.ts --file content/[type]/your-file.json`

## Templates Available

### 1. Aarti Template (`aarti-template.json`)
For devotional prayers sung during worship.
- Required: `aarti` section with hindi, english, meaning
- Optional: history, benefits, ritual, video sections

### 2. Bhajan Template (`bhajan-template.json`)
For devotional songs and hymns.
- Required: `bhajan` section with hindi, english, meaning
- Optional: story, history, benefits, video sections

### 3. Mantra Template (`mantra-template.json`)
For sacred Vedic mantras and chants.
- Required: `mantra` section with sanskrit, transliteration, meaning
- Optional: history, benefits, ritual, info sections
- Special field: `repetitionCount` (1-108)

### 4. Festival Template (`festival-template.json`)
For Hindu festivals and celebrations.
- Required: `date` (YYYY-MM-DD), `info`, `ritual` sections
- Optional: story, history, video sections
- Special fields: `tithi`, `region`, `rituals` array

### 5. Chalisa Template (`chalisa-template.json`)
For forty-verse devotional hymns.
- Required: Multiple `bhajan` sections for verses (Doha + 40 Chaupais)
- Optional: history, benefits, ritual sections
- Special field: `totalVerses` (must be 40)

### 6. Story Template (`story-template.json`)
For mythological and moral stories.
- Required: `story` section with full narrative
- Optional: shloka, info, video sections
- Special fields: `summary`, `moral`, `relatedDeities`

## Field Guidelines

### Common Fields (All Types)

| Field | Required | Format | Notes |
|-------|----------|--------|-------|
| `id` | ✅ | `lowercase-with-hyphens` | Unique identifier |
| `category` | ✅ | `aarti/bhajan/mantra/festival/chalisa/story` | Content type |
| `name` | ✅ | String | Display name |
| `title` | ✅ | 10-100 chars | Full title with keywords |
| `subtitle` | ❌ | <200 chars | Brief tagline |
| `description` | ✅ | 100-500 chars | SEO-optimized summary |
| `icon` | ✅ | Emoji | Representative emoji |
| `color` | ✅ | `from-X-Y to-A-B` | Tailwind gradient |
| `deity` | ✅ | String | Associated deity |
| `significance` | ✅ | 50-500 chars | Spiritual importance |
| `seo` | ✅ | Object | SEO metadata |
| `sections` | ✅ | Array | Content sections |

### SEO Object Structure

```json
{
  "seo": {
    "title": "50-70 characters, include keywords",
    "description": "50-160 characters, compelling summary",
    "keywords": ["3-20 relevant keywords"],
    "ogImage": "Full URL to social share image"
  }
}
```

### Section Types

| Type | Required Fields | Use For |
|------|-----------------|---------|
| `aarti` | hindi, english, meaning | Aarti lyrics |
| `bhajan` | hindi, english, meaning | Bhajan lyrics |
| `mantra` | sanskrit, transliteration, meaning | Mantra chanting |
| `shloka` | sanskrit, english, meaning | Vedic verses |
| `story` | content | Narratives |
| `ritual` | content, steps | Puja procedures |
| `history` | content | Historical info |
| `benefits` | items | Categorized benefits |
| `video` | videos | Video embeds |
| `info` | content | General information |

## Validation

Before submitting new content, run validation:

```bash
# Validate single file
npx ts-node scripts/validate-content.ts --file content/aartis/your-aarti.json

# Validate by type
npx ts-node scripts/validate-content.ts --type aarti

# Full site validation
npx ts-node scripts/validate-content.ts --report
```

## Quality Checklist

### Content Quality
- [ ] All required fields filled
- [ ] No placeholder text (like "Description here...")
- [ ] Accurate information verified
- [ ] Proper Hindi/Sanskrit text (no typos)
- [ ] Meaningful English translations
- [ ] At least 100 words per section

### SEO Optimization
- [ ] Title is 50-70 characters
- [ ] Description is 50-160 characters
- [ ] 3-20 relevant keywords
- [ ] Keywords in title and description
- [ ] Unique, compelling description

### Formatting
- [ ] Valid JSON syntax (use JSON validator)
- [ ] Proper Unicode for Hindi/Sanskrit
- [ ] Consistent formatting
- [ ] All URLs are valid
- [ ] Color follows gradient pattern

## Examples of Good Content

### Excellent Example
- `content/bhajans/hanuman-chalisa.json` - Best structured content
- `content/festivals/diwali.json` - Complete festival guide
- `content/mantras/om-mantra.json` - Well-documented mantra

### Common Mistakes to Avoid

1. ❌ Missing `category` field
2. ❌ Using old section types (`hero`, `lyrics`) instead of new typed sections
3. ❌ IDs with spaces or special characters
4. ❌ SEO descriptions under 50 or over 160 characters
5. ❌ Missing required sections for the content type

## Migration from Old Format

If you have old content that needs updating:

```bash
# Preview migration
npx ts-node scripts/validate-content.ts --migrate

# Apply migration
npx ts-node scripts/validate-content.ts --migrate --apply
```

## Need Help?

- Check the workflow guide: `.windsurf/workflows/content-validation.md`
- Run validation to see specific errors
- Use `feedback()` function to suggest schema improvements
- Review examples in each content folder
