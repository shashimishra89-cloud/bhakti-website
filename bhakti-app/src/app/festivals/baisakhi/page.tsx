"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen, Wheat } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "baisakhi",
  name: "Baisakhi",
  title: "Harvest Festival",
  description: "Baisakhi is the vibrant Punjabi harvest festival marking the Sikh New Year and celebrating the spring harvest. It commemorates the formation of the Khalsa Panth by Guru Gobind Singh and is celebrated with joyous festivities, traditional dances, and religious ceremonies.",
  duration: "1 day",
  icon: "🌾",
  significance: "Marks the Sikh New Year, celebrates the spring harvest, and commemorates the formation of the Khalsa Panth.",
  season: "season-from-json",
  regions: ["Punjab", "Haryana", "Delhi", "Parts of North India"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Baisakhi",
      content: "Baisakhi, also known as Vaisakhi, is one of the most significant festivals in Punjab, marking the harvest season and the Sikh New Year with great enthusiasm and religious fervor."
    },
    {
      type: "spiritual_significance",
      title: "Spiritual Significance of Baisakhi",
      content: "Baisakhi holds immense religious importance for Sikhs as it commemorates the day when Guru Gobind Singh established the Khalsa Panth in 1699, transforming the Sikh community into a collective body of initiated warriors."
    },
    {
      type: "historical_significance",
      title: "Historical Significance",
      content: "The festival marks two major events: the harvest celebration and the establishment of the Khalsa. On this day in 1699, Guru Gobind Singh founded the Khalsa Panth at Anandpur Sahib.",
      subsections: [
        {
          title: "The Khalsa Establishment",
          content: "On Baisakhi day in 1699, Guru Gobind Singh called a gathering of Sikhs at Anandpur Sahib. He asked for volunteers willing to sacrifice their lives for the faith. Five brave men came forward, who were later known as the Panj Piare (Five Beloved Ones). These five were initiated into the Khalsa brotherhood through the Amrit ceremony, establishing the order of the Khalsa - saint-soldiers committed to protecting the weak and upholding righteousness.",
          hindi: "खालसा पंथ की स्थापना",
          english: "The Foundation of Khalsa Brotherhood"
        },
        {
          title: "Harvest Celebration",
          content: "Baisakhi traditionally marks the time when farmers harvest their Rabi crops. The golden fields of wheat sway in the spring breeze, symbolizing prosperity and abundance. Farmers thank God for the bountiful harvest and celebrate with traditional songs and dances. The festival represents the joy of reaping what was sown, both literally in fields and metaphorically in spiritual life.",
          hindi: "फसल उत्सव",
          english: "The Harvest Celebration"
        },
        {
          title: "Agricultural Significance",
          content: "For the agricultural communities of Punjab, Baisakhi is the most important festival of the year. It marks the end of the harvest season and the beginning of the new financial year for farmers. The golden wheat fields are ready for harvesting, and the entire community comes together to celebrate this agricultural milestone with gratitude and joy.",
          hindi: "कृषि महत्व",
          english: "Agricultural Importance"
        }
      ]
    },
    {
      type: "celebrations",
      title: "How Baisakhi is Celebrated",
      content: "Baisakhi celebrations are marked by vibrant festivities, religious ceremonies, and community gatherings that showcase the rich Punjabi culture and Sikh traditions.",
      subsections: [
        {
          title: "Gurdwara Visits",
          content: "Devotees visit Gurdwaras early in the morning for special prayers. The Guru Granth Sahib is bathed and placed on its throne, and hymns are sung throughout the day. Karah Prasad (sweet pudding) is distributed to all devotees as a blessing.",
          hindi: "गुरुद्वारा दर्शन",
          english: "Gurdwara Pilgrimage"
        },
        {
          title: "Nagar Kirtan Processions",
          content: "Colorful processions called Nagar Kirtan are organized in cities and villages. The Panj Piare lead the procession, followed by devotees singing hymns and displaying traditional martial arts. The streets are decorated and people distribute sweets and refreshments.",
          hindi: "नगर कीर्तन जुलूस",
          english: "Religious Processions"
        },
        {
          title: "Bhangra and Giddha",
          content: "Traditional Punjabi folk dances Bhangra (performed by men) and Giddha (performed by women) are central to Baisakhi celebrations. Dancers dressed in colorful traditional attire perform energetic dances to the beat of dhol drums, celebrating the joy of harvest.",
          hindi: "भांगड़ा और गिद्दा",
          english: "Traditional Folk Dances"
        },
        {
          title: "Community Feasts",
          content: "Langar (community kitchen) is organized at Gurdwaras where free meals are served to all regardless of caste, creed, or social status. Special Baisakhi delicacies are prepared and shared with family and friends.",
          hindi: "सामुदायिक भोज",
          english: "Community Meals"
        }
      ]
    },
    {
      type: "foods",
      title: "Traditional Baisakhi Delicacies",
      content: "Baisakhi is celebrated with various traditional Punjabi dishes that reflect the agricultural abundance and cultural richness of the region.",
      subsections: [
        {
          title: "Kada Prasad",
          hindi: "कड़ा प्रसाद",
          english: "Sacred Pudding",
          content: "A sweet pudding made from whole wheat flour, ghee, and sugar. This sacred offering is prepared in Gurdwaras and distributed to all devotees as a blessing. The preparation involves roasting wheat flour in ghee until golden, then adding sugar and water to create a smooth, sweet pudding. It represents the sweetness of devotion and the warmth of community."
        },
        {
          title: "Sarson ka Saag with Makki ki Roti",
          hindi: "सरसों का साग और मक्की की रोटी",
          english: "Mustard Greens with Corn Bread",
          content: "The quintessential Punjabi dish made from mustard greens cooked with spices, served with cornmeal flatbread. The saag is slow-cooked for hours to develop deep flavors, while makki ki roti is cooked on clay tandoors. This dish represents the agricultural bounty of Punjab and is traditionally enjoyed during the harvest season."
        },
        {
          title: "Pindi Chana",
          hindi: "पिंडी चना",
          english: "Spiced Chickpeas",
          content: "A traditional dish from Rawalpindi region, made from dried chickpeas cooked with aromatic spices. The chickpeas are soaked overnight and cooked with onions, tomatoes, and traditional Punjabi spices. This protein-rich dish is often served with puris or kulchas during Baisakhi celebrations."
        },
        {
          title: "Lassi",
          hindi: "लस्सी",
          english: "Yogurt Drink",
          content: "A refreshing yogurt-based drink that's a staple in Punjabi households. Made by blending yogurt with water, sugar, and sometimes rose water or cardamom. Sweet lassi is served chilled in tall glasses, often topped with malai (cream). This cooling beverage helps balance the spicy foods during spring celebrations."
        }
      ]
    },
    {
      type: "cultural_significance",
      title: "Cultural Significance",
      content: "Baisakhi represents the cultural identity of Punjab and showcases the region's rich traditions, music, dance, and community values.",
      subsections: [
        {
          title: "Agricultural Heritage",
          content: "Celebrates Punjab's agricultural prosperity and farming traditions"
        },
        {
          title: "Sikh Identity",
          content: "Strengthens Sikh religious and cultural identity through Khalsa traditions"
        },
        {
          title: "Community Unity",
          content: "Brings people together across social and economic boundaries"
        },
        {
          title: "Cultural Preservation",
          content: "Preserves and promotes Punjabi folk arts, music, and dance forms"
        }
      ]
    }
  ]
};

export default function BaisakhiPage() {
  const festival = festivalData;
  
  if (!festival) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('festivals', festival.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-yellow-600" />
              <h1 className="text-2xl font-bold text-yellow-900">Bhakti</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-yellow-700 hover:text-yellow-900 transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-yellow-700 hover:text-yellow-900 transition-colors">Aartis</Link>
              <Link href="/mantras" className="text-yellow-700 hover:text-yellow-900 transition-colors">Mantras</Link>
              <Link href="/stories" className="text-yellow-700 hover:text-yellow-900 transition-colors">Stories</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-xl p-8 md:p-12 border border-yellow-200">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Wheat className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-900 mb-6">
                {festival.name}
              </h1>
              <p className="text-xl text-yellow-700 mb-2">
                {festival.title}
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {festival.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <BannerAd />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Festival Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border border-yellow-100">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">{festival.season}</span>
            </div>
            <p className="text-gray-600 text-sm">Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-yellow-100">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">{festival.duration}</span>
            </div>
            <p className="text-gray-600 text-sm">Duration</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-yellow-100">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">{festival.regions.length}+ Regions</span>
            </div>
            <p className="text-gray-600 text-sm">Celebrated in</p>
          </div>
        </div>

        {/* Significance Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-900 mb-6">Significance</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-yellow-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              {festival.significance}
            </p>
          </div>
        </section>

        <InContentAd />

        {/* Historical Significance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-900 mb-6">Historical Significance</h2>
          <div className="space-y-6">
            {festival.sections.find(s => s.type === 'historical_significance')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-yellow-100">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-yellow-600 font-medium mb-3">
                  {subsection.hindi}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {subsection.english}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {subsection.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Celebrations Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-900 mb-6">How Baisakhi is Celebrated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {festival.sections.find(s => s.type === 'celebrations')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-yellow-100">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-yellow-600 font-medium mb-3">
                  {subsection.hindi}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {subsection.english}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {subsection.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        <BannerAd />

        {/* Traditional Foods */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-900 mb-6">Traditional Baisakhi Delicacies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'foods')?.subsections?.map((food, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-yellow-100">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">
                  {food.title}
                </h3>
                <p className="text-yellow-600 font-medium mb-2">
                  {food.hindi}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  {food.english}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {food.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        <InContentAd />

        {/* Cultural Significance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-900 mb-6">Cultural Significance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'cultural_significance')?.subsections?.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Festivals */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-900 mb-6">Related Festivals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/festivals/holi" className="bg-white rounded-xl shadow-lg p-6 border border-yellow-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🎨</span>
                <h3 className="text-lg font-bold text-yellow-800">Holi</h3>
              </div>
              <p className="text-gray-600 text-sm">Festival of Colors</p>
            </Link>
            
            <Link href="/festivals/diwali" className="bg-white rounded-xl shadow-lg p-6 border border-yellow-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🪔</span>
                <h3 className="text-lg font-bold text-yellow-800">Diwali</h3>
              </div>
              <p className="text-gray-600 text-sm">Festival of Lights</p>
            </Link>
            
            <Link href="/festivals/ganesh-chaturthi" className="bg-white rounded-xl shadow-lg p-6 border border-yellow-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🐘</span>
                <h3 className="text-lg font-bold text-yellow-800">Ganesh Chaturthi</h3>
              </div>
              <p className="text-gray-600 text-sm">Lord Ganesha's Birthday</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-yellow-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-semibold">Bhakti</span>
          </div>
          <p className="text-yellow-200">
            Celebrating the divine festivals of Sanatana Dharma with devotion and love
          </p>
          <div className="mt-6 space-x-6 flex justify-center">
            <Link href="/festivals" className="text-yellow-200 hover:text-white transition-colors">
              Festivals
            </Link>
            <Link href="/aartis" className="text-yellow-200 hover:text-white transition-colors">
              Aartis
            </Link>
            <Link href="/mantras" className="text-yellow-200 hover:text-white transition-colors">
              Mantras
            </Link>
            <Link href="/stories" className="text-yellow-200 hover:text-white transition-colors">
              Stories
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
