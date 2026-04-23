import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "diwali",
  name: "Diwali",
  title: "Festival of Lights - Deepavali",
  description: "Diwali, also known as Deepavali, is the most celebrated Hindu festival symbolizing the victory of light over darkness, good over evil, and knowledge over ignorance. The festival spans five days, with each day having its own significance and rituals.",
  duration: "5 days",
  icon: "🪔",
  significance: "Celebrates the return of Lord Rama to Ayodhya after 14 years of exile and his victory over the demon king Ravana.",
  season: "autumn",
  regions: ["All India", "Nepal", "Mauritius", "Fiji", "Guyana", "Trinidad", "Malaysia", "Singapore"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Diwali",
      content: "Diwali, the festival of lights, is one of the most important Hindu festivals celebrated across India and worldwide. This five-day festival signifies the victory of light over darkness, good over evil, and knowledge over ignorance."
    },
    {
      type: "historical_significance",
      title: "Historical Significance",
      content: "Diwali has been celebrated for thousands of years and finds mention in ancient Hindu scriptures. The festival marks various historical events including Lord Rama's return to Ayodhya, Goddess Lakshmi's emergence during Samudra Manthan, and the victory of Lord Krishna over the demon Narakasura."
    },
    {
      type: "stories",
      title: "Famous Stories",
      content: "The most well-known story of Diwali is the return of Lord Rama, his wife Sita, and his brother Lakshmana to Ayodhya after 14 years of exile. The people of Ayodhya lit countless oil lamps (diyas) to illuminate their path and celebrate the triumph of good over evil.",
      subsections: [
        {
          title: "Lord Rama's Return",
          content: "After defeating the demon king Ravana and rescuing Sita, Lord Rama returned to Ayodhya. The entire kingdom celebrated by lighting diyas and decorating their homes."
        },
        {
          title: "Goddess Lakshmi",
          content: "Diwali also celebrates the emergence of Goddess Lakshmi during the churning of the cosmic ocean (Samudra Manthan). She is worshipped for wealth and prosperity."
        }
      ]
    },
    {
      type: "rituals",
      title: "Rituals and Celebrations",
      content: "Diwali celebrations span five days, each with its own significance and rituals.",
      subsections: [
        {
          title: "Day 1: Dhanteras",
          content: "The first day is dedicated to wealth and prosperity. People buy gold, silver, and new utensils as it is considered auspicious."
        },
        {
          title: "Day 2: Naraka Chaturdashi",
          content: "Also known as Choti Diwali, this day celebrates Lord Krishna's victory over the demon Narakasura."
        },
        {
          title: "Day 3: Diwali",
          content: "The main day of Diwali when Goddess Lakshmi is worshipped, homes are decorated with diyas and rangoli, and fireworks are enjoyed."
        },
        {
          title: "Day 4: Govardhan Puja",
          content: "This day celebrates Lord Krishna's lifting of Govardhan Hill to protect villagers from Indra's wrath."
        },
        {
          title: "Day 5: Bhai Dooj",
          content: "The final day celebrates the bond between brothers and sisters, similar to Raksha Bandhan."
        }
      ]
    }
  ]
};

export const metadata = {
  title: "Diwali Festival - Festival of Lights | Bhakti",
  description: "Complete guide to Diwali festival with rituals, stories, bhajans, aartis, recipes, and celebrations. Learn the significance of Festival of Lights.",
  keywords: ["diwali", "deepavali", "festival of lights", "lord rama", "goddess lakshmi", "hindu festival", "diwali celebrations", "diwali recipes"],
};

export default function DiwaliPage() {
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
            {festival.season && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span className="font-medium capitalize">{festival.season}</span>
              </div>
            )}
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
      <BannerAd adSlot="1234567100" />

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
              
              {index < festival.sections.length - 1 && <InContentAd adSlot={`123456710${index + 1}`} />}
            </div>
          ))}

          {/* Significance Section */}
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">Spiritual Significance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Heart className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">Inner Light</h3>
                  <p className="text-orange-700">Diwali reminds us to ignite the inner light of wisdom and dispel the darkness of ignorance.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <BookOpen className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">Knowledge Over Evil</h3>
                  <p className="text-orange-700">The festival symbolizes the victory of knowledge, righteousness, and virtue over evil.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Festivals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-orange-900 mb-8">Related Festivals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
