import Link from "next/link";
import { Calendar, Sparkles, ChevronRight } from "lucide-react";
import { BannerAd } from "@/components/AdBlock";

// Festival data
const festivals = [
  {
    id: "diwali",
    name: "Diwali",
    title: "Festival of Lights",
    description: "The Hindu festival of lights, symbolizing the victory of light over darkness, good over evil, and knowledge over ignorance.",
    icon: "🪔",
    color: "from-orange-400 to-yellow-500",
    season: "autumn",
    duration: "5 days"
  },
  {
    id: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    title: "Lord Ganesha's Birthday",
    description: "Celebration of the birth of Lord Ganesha, the remover of obstacles and the god of wisdom.",
    icon: "🐘",
    color: "from-green-400 to-teal-500",
    season: "monsoon",
    duration: "10 days"
  },
  {
    id: "holi",
    name: "Holi",
    title: "Festival of Colors",
    description: "The vibrant festival of colors celebrating the arrival of spring and the victory of good over evil.",
    icon: "🎨",
    color: "from-pink-400 to-purple-500",
    season: "spring",
    duration: "2 days"
  },
  {
    id: "navratri",
    name: "Navratri",
    title: "Nine Nights of Goddess",
    description: "Nine nights dedicated to the nine forms of Goddess Durga, celebrated with dance and devotion.",
    icon: "💃",
    color: "from-red-400 to-orange-500",
    season: "autumn",
    duration: "9 nights"
  },
  {
    id: "baisakhi",
    name: "Baisakhi",
    title: "Harvest Festival",
    description: "Punjabi harvest festival marking the Sikh new year and celebrating the spring harvest.",
    icon: "🌾",
    color: "from-yellow-400 to-orange-500",
    season: "spring",
    duration: "1 day"
  },
  {
    id: "krishna-janmashtami",
    name: "Krishna Janmashtami",
    title: "Lord Krishna's Birth",
    description: "Celebration of the birth of Lord Krishna, the eighth avatar of Lord Vishnu.",
    icon: "🦚",
    color: "from-blue-400 to-indigo-500",
    season: "monsoon",
    duration: "1 day"
  },
  {
    id: "maha-shivaratri",
    name: "Maha Shivaratri",
    title: "Great Night of Shiva",
    description: "The most auspicious night dedicated to Lord Shiva, celebrated with fasting and vigil.",
    icon: "🔱",
    color: "from-purple-400 to-pink-500",
    season: "winter",
    duration: "1 night"
  },
  {
    id: "onam",
    name: "Onam",
    title: "Harvest Festival of Kerala",
    description: "Traditional harvest festival of Kerala celebrating the return of King Mahabali.",
    icon: "🛶️",
    color: "from-amber-400 to-yellow-500",
    season: "monsoon",
    duration: "10 days"
  },
  {
    id: "pongal",
    name: "Pongal",
    title: "Tamil Harvest Festival",
    description: "Four-day Tamil harvest festival thanking the Sun God for a bountiful harvest.",
    icon: "🌾",
    color: "from-orange-400 to-red-500",
    season: "winter",
    duration: "4 days"
  },
  {
    id: "raksha-bandhan",
    name: "Raksha Bandhan",
    title: "Bond of Protection",
    description: "Festival celebrating the sacred bond between brothers and sisters.",
    icon: "👫",
    color: "from-green-400 to-teal-500",
    season: "monsoon",
    duration: "1 day"
  },
  {
    id: "ram-navami",
    name: "Ram Navami",
    title: "Lord Rama's Birth",
    description: "Celebration of the birth of Lord Rama, the seventh avatar of Lord Vishnu.",
    icon: "🏹",
    color: "from-blue-400 to-indigo-500",
    season: "spring",
    duration: "1 day"
  }
];

export const metadata = {
  title: "Hindu Festivals - Complete Guide | Bhakti",
  description: "Explore rich heritage of Hindu festivals with detailed information, rituals, and significance. Discover Diwali, Holi, Navratri, Ganesh Chaturthi and more.",
  keywords: ["hindu festivals", "diwali", "holi", "navratri", "ganesh chaturthi", "hindu celebrations", "indian festivals"],
};

export default function FestivalsPage() {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-8">
            <span className="text-8xl">🎉</span>
            <div className="text-left">
              <h1 className="text-5xl font-bold text-orange-900 mb-2">Hindu Festivals</h1>
              <p className="text-2xl text-orange-600 font-medium">Sacred Celebrations of Faith</p>
            </div>
          </div>
          <p className="text-xl text-orange-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore the rich heritage of Hindu festivals with detailed information, rituals, and significance. Discover Diwali, Holi, Navratri, Ganesh Chaturthi and more.
          </p>
        </div>
      </section>

      {/* AdSense */}
      <BannerAd adSlot="1234567894" />

      {/* Festivals Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-orange-900 mb-4">
              Major Hindu Festivals
            </h2>
            <p className="text-xl text-orange-700 max-w-2xl mx-auto">
              Explore the most celebrated festivals in Hinduism, each with unique traditions and spiritual significance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {festivals.map((festival) => (
              <Link 
                key={festival.id}
                href={`/festivals/${festival.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                <div className={`h-48 bg-gradient-to-br ${festival.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{festival.icon}</span>
                  </div>
                </div>
                
                <div className="text-center p-6">
                  <h3 className="text-xl font-bold text-orange-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {festival.name}
                  </h3>
                  <p className="text-orange-600 text-sm group-hover:text-orange-500 transition-colors">
                    {festival.title}
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs">Explore</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-1 px-6 pb-4 text-orange-500">
                  <span className="text-sm">⏱</span>
                  <span className="text-sm">{festival.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">Regional Celebrations</h2>
            <p className="text-lg text-orange-700 mb-6">
              Hindu festivals vary greatly across different regions of India, each with unique customs, traditions, and timing. From the grand celebrations of North India to the vibrant festivities of the South, every region has its own special way of honoring the divine.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
                <h3 className="text-xl font-bold text-orange-900 mb-3">North India</h3>
                <p className="text-orange-700">
                  Celebrates Diwali, Holi, and Navratri with grand community gatherings, traditional sweets, and elaborate rituals.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
                <h3 className="text-xl font-bold text-orange-900 mb-3">South India</h3>
                <p className="text-orange-700">
                  Known for Pongal, Onam, and Ayyappan festivals with unique cultural traditions and temple celebrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <p className="text-orange-300 text-sm mb-4">
              A Sacred Space for Devotion
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Link href="/festivals" className="text-orange-200 hover:text-white transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-orange-200 hover:text-white transition-colors">Aartis</Link>
              <Link href="/bhajans" className="text-orange-200 hover:text-white transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-orange-200 hover:text-white transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-orange-200 hover:text-white transition-colors">Mantras</Link>
              <Link href="/stories" className="text-orange-200 hover:text-white transition-colors">Stories</Link>
            </div>
          </div>
          <div className="border-t border-orange-800 pt-8 text-center">
            <p className="text-orange-300 text-sm mb-4">
              2024 Bhakti. Preserving and sharing sacred traditions of Hindu culture.
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
