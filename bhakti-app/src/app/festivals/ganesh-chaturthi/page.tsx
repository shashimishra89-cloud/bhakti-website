import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "ganesh-chaturthi",
  name: "Ganesh Chaturthi",
  title: "Lord Ganesha's Birthday",
  description: "Ganesh Chaturthi is a vibrant Hindu festival celebrating the birth of Lord Ganesha, the elephant-headed god of wisdom, prosperity, and good fortune. The festival lasts for 10 days, culminating in the immersion of Ganesha idols in water.",
  duration: "10 days",
  icon: "🐘",
  significance: "Celebrates the birth of Lord Ganesha, the remover of obstacles and the god of wisdom and beginnings.",
  season: "season-from-json",
  regions: ["Maharashtra", "Goa", "Karnataka", "Tamil Nadu", "Andhra Pradesh"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Ganesh Chaturthi",
      content: "Ganesh Chaturthi is one of the most beloved Hindu festivals, especially in Maharashtra. It celebrates the arrival of Lord Ganesha to earth from Kailash Parvat with his mother Goddess Parvati."
    },
    {
      type: "historical_significance",
      title: "Historical Significance",
      content: "While Ganesh worship is ancient, the public celebration of Ganesh Chaturthi was popularized by Lokmanya Bal Gangadhar Tilak during the Indian independence movement in 1893. He transformed it into a large public event to unite people against British rule."
    },
    {
      type: "stories",
      title: "Birth of Lord Ganesha",
      content: "The most famous story associated with Ganesh Chaturthi is the birth of Lord Ganesha. Goddess Parvati created Ganesha from sandalwood paste and breathed life into him. She asked him to guard the entrance while she bathed.",
      subsections: [
        {
          title: "The Guardian",
          content: "When Lord Shiva returned and wanted to enter, Ganesha, not knowing who Shiva was, refused to let him pass. This led to a fierce confrontation."
        },
        {
          title: "Elephant Head",
          content: "In anger, Lord Shiva severed Ganesha's head. When Parvati saw this, she was devastated. To console her, Shiva promised to bring Ganesha back to life with the head of the first creature he found - an elephant."
        },
        {
          title: "Blessing and Wisdom",
          content: "Shiva not only restored Ganesha's life but also blessed him that no worship would begin without first invoking his name, making him the first deity to be worshipped."
        }
      ]
    },
    {
      type: "rituals",
      title: "Rituals and Celebrations",
      content: "Ganesh Chaturthi celebrations involve elaborate rituals and community participation.",
      subsections: [
        {
          title: "Installation of Idol",
          content: "The festival begins with the installation of clay idols of Lord Ganesha in homes and public pandals. The idols are decorated with flowers, ornaments, and offered modak (sweet dumplings)."
        },
        {
          title: "Pranapratishtha",
          content: "A ceremony to invoke life into the idol, followed by 16-step worship (Shodashopachara) including offering of flowers, durva grass, and modak."
        },
        {
          title: "Daily Aarti",
          content: "Twice daily aarti is performed - morning and evening - with devotees singing devotional songs and offering prayers."
        },
        {
          title: "Visarjan (Immersion)",
          content: "On the 10th day (Anant Chaturdashi), the idols are immersed in water bodies, symbolizing Ganesha's return to his divine abode."
        }
      ]
    }
  ]
};

export const metadata = {
  title: "Ganesh Chaturthi Festival | Bhakti",
  description: "Complete guide to Ganesh Chaturthi with rituals, stories, significance, and celebrations. Learn about Lord Ganesha's birthday festival.",
  keywords: ["ganesh chaturthi", "lord ganesha", "ganpati festival", "vinayaka chaturthi", "hindu festival", "ganesh immersion", "modak", "ganesh aarti"],
};

export default function GaneshChaturthiPage() {
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
      <BannerAd adSlot="1234567101" />

      {/* Main Content */}
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {festival.sections.map((section, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-3xl font-bold text-orange-900 mb-6">{section.title}</h2>
              <div className="prose prose-orange max-w-none">
                <p className="text-lg text-orange-700 leading-relaxed mb-6">{section.content}</p>
                
                {section.subsections && (
                  <div className="space-y-8 mt-8">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
                        <h3 className="text-xl font-bold text-orange-900 mb-3">{subsection.title}</h3>
                        <p className="text-orange-700 leading-relaxed">{subsection.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {index < festival.sections.length - 1 && <InContentAd adSlot={`123456710${index + 2}`} />}
            </div>
          ))}

          {/* Significance Section */}
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">Spiritual Significance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Heart className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">New Beginnings</h3>
                  <p className="text-orange-700">Lord Ganesha is worshipped first in all ceremonies as he removes obstacles and blesses new beginnings.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <BookOpen className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">Wisdom and Intellect</h3>
                  <p className="text-orange-700">The elephant head symbolizes wisdom, while the mouse represents the ego that must be controlled.</p>
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
              <Link href="/festivals/holi" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-orange-200">
                <div className="text-4xl mb-4 text-center">🎨</div>
                <h3 className="text-lg font-bold text-orange-900 text-center group-hover:text-orange-600">Holi</h3>
                <p className="text-orange-600 text-center text-sm mt-2">Festival of Colors</p>
              </Link>
              <Link href="/festivals/navratri" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-orange-200">
                <div className="text-4xl mb-4 text-center">💃</div>
                <h3 className="text-lg font-bold text-orange-900 text-center group-hover:text-orange-600">Navratri</h3>
                <p className="text-orange-600 text-center text-sm mt-2">Nine Nights of Goddess</p>
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
