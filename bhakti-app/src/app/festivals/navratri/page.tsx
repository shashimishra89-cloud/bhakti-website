import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "navratri",
  name: "Navratri",
  title: "Nine Nights of Goddess",
  description: "Navratri is a nine-night Hindu festival dedicated to the nine forms of Goddess Durga. Each night celebrates a different manifestation of the divine feminine, with fasting, dancing, and elaborate rituals.",
  duration: "9 nights + 1 day",
  icon: "💃",
  significance: "Worships the nine forms of Goddess Durga and celebrates the victory of good over evil.",
  season: "season-from-json",
  regions: ["Gujarat", "West Bengal", "Maharashtra", "Karnataka", "Tamil Nadu"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Navratri",
      content: "Navratri, meaning 'nine nights', is one of the most significant Hindu festivals celebrating the divine feminine power. It honors Goddess Durga in her nine different forms, each representing different aspects of feminine energy."
    },
    {
      type: "historical_significance",
      title: "Historical Significance",
      content: "Navratri has ancient roots in Hindu tradition and is mentioned in various scriptures. The festival celebrates the victory of Goddess Durga over the demon Mahishasura, symbolizing the triumph of good over evil and righteousness over wickedness."
    },
    {
      type: "stories",
      title: "The Nine Forms of Durga",
      content: "Each of the nine nights of Navratri is dedicated to one form of Goddess Durga, collectively known as Navadurga.",
      subsections: [
        {
          title: "Day 1: Shailaputri",
          content: "The daughter of the mountains, representing purity and nature. She rides a bull and holds a trident and lotus."
        },
        {
          title: "Day 2: Brahmacharini",
          content: "The ascetic form of Parvati, representing devotion and penance. She walks barefoot, holding a rosary and water pot."
        },
        {
          title: "Day 3: Chandraghanta",
          content: "The married form with a half-moon on her forehead, representing beauty and bravery. She rides a lion and has multiple weapons."
        },
        {
          title: "Day 4: Kushmanda",
          content: "The creator of the universe, believed to have created the cosmic egg with her smile. She rides a lion and has eight arms."
        },
        {
          title: "Day 5: Skandamata",
          content: "The mother of Lord Skanda (Kartikeya), representing motherly love. She rides a lion and holds her son in her lap."
        },
        {
          title: "Day 6: Katyayani",
          content: "The warrior goddess born to sage Katyayana, representing courage. She destroyed Mahishasura and rides a magnificent lion."
        },
        {
          title: "Day 7: Kalaratri",
          content: "The fierce form representing the destroyer of darkness and ignorance. Despite her fearsome appearance, she is auspicious and protective."
        },
        {
          title: "Day 8: Mahagauri",
          content: "The beautiful form representing purity and serenity. She rides a white bull and grants peace and prosperity."
        },
        {
          title: "Day 9: Siddhidatri",
          content: "The giver of all siddhis (supernatural powers) and blessings. She sits on a lotus and fulfills all desires of her devotees."
        }
      ]
    },
    {
      type: "rituals",
      title: "Rituals and Celebrations",
      content: "Navratri celebrations vary across regions but share common themes of devotion, fasting, and celebration.",
      subsections: [
        {
          title: "Garba and Dandiya",
          content: "In Gujarat, people perform Garba (circular dance) and Dandiya (stick dance) throughout the night. Women wear colorful traditional outfits and dance in circles around an earthen pot called 'garbo'."
        },
        {
          title: "Durga Puja",
          content: "In West Bengal, Navratri culminates in Durga Puja, where elaborate pandals are set up with beautiful idols of Goddess Durga. The last five days are particularly significant with grand celebrations."
        },
        {
          title: "Fasting and Prayers",
          content: "Devotees observe fasts during Navratri, consuming only satvik food (without onion, garlic, or non-vegetarian items). Special prayers and aartis are performed twice daily."
        },
        {
          title: "Kanya Puja",
          content: "On the eighth or ninth day, young girls (kanyas) are worshipped as manifestations of the goddess. They are fed special meals and given gifts as a form of respect."
        },
        {
          title: "Vijayadashami",
          content: "The tenth day, also known as Dussehra, celebrates the victory of good over evil. It marks the end of Navratri and the triumph of Lord Rama over Ravana."
        }
      ]
    }
  ]
};

export const metadata = {
  title: "Navratri Festival - Nine Nights of Goddess | Bhakti",
  description: "Complete guide to Navratri with nine forms of Goddess Durga, rituals, Garba dance, and celebrations. Learn about the nine-night festival.",
  keywords: ["navratri", "durga puja", "nine nights of goddess", "garba", "dandiya", "navadurga", "hindu festival", "goddess durga"],
};

export default function NavratriPage() {
  const festival = festivalData;
  
  if (!festival) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-orange-900">Bhakti</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-orange-600 font-semibold">Festivals</Link>
              <Link href="/aartis" className="text-orange-800 hover:text-orange-600 font-medium">Aartis</Link>
              <Link href="/bhajans" className="text-orange-800 hover:text-orange-600 font-medium">Bhajans</Link>
              <Link href="/chalisas" className="text-orange-800 hover:text-orange-600 font-medium">Chalisas</Link>
              <Link href="/mantras" className="text-orange-800 hover:text-orange-600 font-medium">Mantras</Link>
              <Link href="/stories" className="text-orange-800 hover:text-orange-600 font-medium">Stories</Link>
              <Link href="/gods" className="text-orange-800 hover:text-orange-600 font-medium">Gods</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={generateBreadcrumbs("festivals", festival.name)} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-8">
            <span className="text-8xl">{festival.icon}</span>
            <div className="text-left">
              <h1 className="text-5xl font-bold text-orange-900 mb-2">{festival.name}</h1>
              <p className="text-2xl text-orange-600 font-medium">{festival.title}</p>
            </div>
          </div>
          <p className="text-xl text-orange-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {festival.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-orange-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{festival.season}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{festival.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{festival.regions.length}+ Regions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Ad */}
      <BannerAd adSlot="1234567103" />

      {/* Main Content */}
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {festival.sections.map((section, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-3xl font-bold text-orange-900 mb-6">{section.title}</h2>
              <div className="prose prose-orange max-w-none">
                <p className="text-lg text-orange-700 leading-relaxed mb-6">{section.content}</p>
                
                {section.subsections && (
                  <div className="space-y-6 mt-8">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
                        <h3 className="text-xl font-bold text-orange-900 mb-3">{subsection.title}</h3>
                        <p className="text-orange-700 leading-relaxed">{subsection.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {index < festival.sections.length - 1 && <InContentAd adSlot={`123456710${index + 4}`} />}
            </div>
          ))}

          {/* Significance Section */}
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">Spiritual Significance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Heart className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">Divine Feminine Energy</h3>
                  <p className="text-orange-700">Navratri celebrates the power and various aspects of the divine feminine, representing creation, preservation, and transformation.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <BookOpen className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">Inner Transformation</h3>
                  <p className="text-orange-700">The nine forms represent the journey from ignorance to enlightenment, helping devotees overcome negative qualities and cultivate virtues.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Festivals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-orange-900 mb-8">Related Festivals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/festivals/diwali" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-orange-200">
                <div className="text-4xl mb-4 text-center">🪔</div>
                <h3 className="text-lg font-bold text-orange-900 text-center group-hover:text-orange-600">Diwali</h3>
                <p className="text-orange-600 text-center text-sm mt-2">Festival of Lights</p>
              </Link>
              <Link href="/festivals/ganesh-chaturthi" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-orange-200">
                <div className="text-4xl mb-4 text-center">🐘</div>
                <h3 className="text-lg font-bold text-orange-900 text-center group-hover:text-orange-600">Ganesh Chaturthi</h3>
                <p className="text-orange-600 text-center text-sm mt-2">Lord Ganesha's Birthday</p>
              </Link>
              <Link href="/festivals/holi" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-orange-200">
                <div className="text-4xl mb-4 text-center">🎨</div>
                <h3 className="text-lg font-bold text-orange-900 text-center group-hover:text-orange-600">Holi</h3>
                <p className="text-orange-600 text-center text-sm mt-2">Festival of Colors</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-900 to-red-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold">Bhakti</h3>
            </div>
            <p className="text-xl text-orange-200 mb-8 max-w-2xl mx-auto">
              A Sacred Space for Devotion
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Link href="/festivals" className="text-orange-200 hover:text-white transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-orange-200 hover:text-white transition-colors">Aartis</Link>
              <Link href="/bhajans" className="text-orange-200 hover:text-white transition-colors">Bhajans</Link>
              <Link href="/mantras" className="text-orange-200 hover:text-white transition-colors">Mantras</Link>
              <Link href="/stories" className="text-orange-200 hover:text-white transition-colors">Stories</Link>
            </div>
          </div>
          
          <div className="border-t border-orange-800 pt-8 text-center">
            <p className="text-orange-300 text-sm mb-4">
              © 2024 Bhakti. Preserving and sharing sacred traditions of Hindu culture.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <Link href="/privacy" className="text-orange-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-orange-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-orange-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
