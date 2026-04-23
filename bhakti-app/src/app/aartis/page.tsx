import Link from "next/link";
import { Music, Sparkles, ChevronRight } from "lucide-react";
import { BannerAd } from "@/components/AdBlock";

export const metadata = {
  title: "Hindu Aartis - Bhakti",
  description: "Collection of Hindu aartis and devotional prayers. Find complete lyrics, meanings, and significance of various aartis dedicated to different deities.",
  keywords: ["hindu aartis", "devotional songs", "aarti lyrics", "ganesh aarti", "lakshmi aarti", "shiv aarti", "durga aarti"],
};

// Aarti data
const aartis = [
  {
    id: "ganesh-aarti",
    name: "Ganesh Aarti",
    title: "Jai Ganesh Jai Ganesh Deva",
    description: "The most beloved aarti dedicated to Lord Ganesha, the remover of obstacles and the god of wisdom.",
    icon: "🐘",
    color: "from-red-400 to-orange-500",
    deity: "Lord Ganesha"
  },
  {
    id: "lakshmi-aarti",
    name: "Lakshmi Aarti",
    title: "Om Jai Lakshmi Mata",
    description: "A devotional prayer to Goddess Lakshmi, the goddess of wealth, fortune, and prosperity.",
    icon: "💰",
    color: "from-yellow-400 to-amber-500",
    deity: "Goddess Lakshmi"
  },
  {
    id: "shiv-aarti",
    name: "Shiv Aarti",
    title: "Om Jai Shiv Omkara",
    description: "A powerful aarti dedicated to Lord Shiva, the supreme deity of destruction and transformation.",
    icon: "🔱",
    color: "from-blue-400 to-indigo-500",
    deity: "Lord Shiva"
  },
  {
    id: "durga-aarti",
    name: "Durga Aarti",
    title: "Om Jai Durga Mata",
    description: "A prayer to Goddess Durga, the divine mother who protects and destroys evil.",
    icon: "👑",
    color: "from-pink-400 to-purple-500",
    deity: "Goddess Durga"
  },
  {
    id: "krishna-aarti",
    name: "Krishna Aarti",
    title: "Om Jai Shri Krishna",
    description: "A devotional aarti to Lord Krishna, the god of love, wisdom, and divine play.",
    icon: "🎵",
    color: "from-purple-400 to-pink-500",
    deity: "Lord Krishna"
  },
  {
    id: "hanuman-aarti",
    name: "Hanuman Aarti",
    title: "Aarti Kije Hanuman Lala",
    description: "A powerful prayer to Lord Hanuman, the devotee of Lord Rama known for strength and devotion.",
    icon: "💪",
    color: "from-orange-400 to-red-500",
    deity: "Lord Hanuman"
  }
];

export default function AartisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Bhakti
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-orange-600 font-semibold">Aartis</Link>
              <Link href="/bhajans" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Mantras</Link>
              <Link href="/stories" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Stories</Link>
              <Link href="/gods" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Gods</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-3 mb-8">
            <Music className="w-12 h-12 text-orange-600" />
            <h1 className="text-5xl font-bold text-orange-900">Hindu Aartis</h1>
          </div>
          <p className="text-xl text-orange-700 mb-8 max-w-2xl mx-auto">
            Experience the divine through sacred aartis - devotional prayers that connect us with the divine 
            and fill our hearts with spiritual bliss and devotion.
          </p>
        </div>
      </section>

      {/* AdSense */}
      <BannerAd adSlot="1234567896" />

      {/* Aartis Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aartis.map((aarti) => (
              <Link 
                key={aarti.id}
                href={`/aartis/${aarti.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                <div className={`h-48 bg-gradient-to-br ${aarti.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{aarti.icon}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-orange-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {aarti.name}
                      </h3>
                      <p className="text-orange-600 font-medium">{aarti.title}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-orange-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  
                  <p className="text-orange-700 mb-4 line-clamp-3">
                    {aarti.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-orange-600">
                    <span>🙏</span>
                    <span>{aarti.deity}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-orange-900 mb-4">More Aartis Coming Soon</h2>
            <p className="text-lg text-orange-700 mb-6">
              We're expanding our collection with more aartis including Saraswati Aarti, 
              Satyanarayan Aarti, and many more regional and traditional aartis.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <span>Back to Home</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
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
            <p className="text-xl text-orange-200 mb-8 max-w-2xl mx-auto">
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
