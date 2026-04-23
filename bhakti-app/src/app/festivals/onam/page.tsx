"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen, Ship } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "onam",
  name: "Onam",
  title: "Harvest Festival of Kerala",
  description: "Onam is the vibrant harvest festival of Kerala, celebrating the return of the legendary King Mahabali. This ten-day festival showcases Kerala's rich cultural heritage through elaborate feasts, traditional dances, boat races, and floral decorations.",
  duration: "10 days",
  icon: "🛶️",
  significance: "Celebrates the annual visit of King Mahabali and marks the harvest season in Kerala, symbolizing prosperity and cultural unity.",
  season: "season-from-json",
  regions: ["Kerala", "Malayali communities worldwide"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Onam",
      content: "Onam is the most important festival of Kerala, celebrating the golden age when King Mahabali ruled the land. It's a time of joy, unity, and cultural expression, bringing together people from all walks of life."
    },
    {
      type: "legend",
      title: "The Legend of Mahabali",
      content: "The story of Onam centers around the benevolent demon king Mahabali, whose reign was considered a golden age of prosperity and equality.",
      subsections: [
        {
          title: "King Mahabali's Golden Reign",
          content: "King Mahabali was a powerful yet generous ruler who controlled all three worlds - heaven, earth, and underworld. Despite being a demon king, he was beloved by his subjects for his just and compassionate rule. During his reign, there was no poverty, crime, or discrimination. Everyone was equal, prosperous, and happy. The kingdom flourished with abundance, and truth and righteousness prevailed everywhere. This period is remembered as Kerala's golden age, and Mahabali is celebrated as the ideal ruler who put his people's welfare above everything else.",
          hindi: "राजा महाबली का स्वर्ण शासन",
          english: "King Mahabali's Golden Reign"
        },
        {
          title: "Vamana Avatar and Mahabali's Sacrifice",
          content: "The growing popularity of Mahabali concerned the gods, who felt threatened by his power. Lord Vishnu took his fifth avatar as Vamana, a dwarf Brahmin, to restore cosmic balance. Vamana approached Mahabali during a yajna and asked for three paces of land. Generous Mahabali granted the wish despite warnings from his guru Shukracharya. Vamana then grew to cosmic proportions - with one step he covered the earth, with the second he covered heaven, and for the third step, Mahabali offered his own head. Pleased by his selflessness, Vishnu granted Mahabali the boon to visit his kingdom once every year, which is celebrated as Onam.",
          hindi: "वामन अवतार और महाबली का बलिदान",
          english: "Vamana Avatar and Mahabali's Sacrifice"
        },
        {
          title: "Onam - The Annual Homecoming",
          content: "Onam celebrates Mahabali's annual visit to his beloved kingdom. According to legend, Mahabali returns to Kerala during Onam to see his people and ensure their well-being. People decorate their homes with floral carpets (Pookkalam) to welcome their beloved king, prepare elaborate feasts (Onasadya), and participate in cultural events to recreate the prosperity of Mahabali's reign. The festival symbolizes the victory of good over evil, the importance of sacrifice, and the eternal bond between a ruler and his subjects.",
          hindi: "ओणम - वार्षिक घर वापसी",
          english: "Onam - The Annual Homecoming"
        }
      ]
    },
    {
      type: "celebrations",
      title: "How Onam is Celebrated",
      content: "Onam celebrations span ten days, each with its own significance and traditional activities.",
      subsections: [
        {
          title: "Pookkalam - Floral Carpets",
          content: "The most visible symbol of Onam is the Pookkalam, intricate floral carpets laid at the entrance of homes. Starting from Atham day (first day), families create these beautiful designs using various flowers like marigolds, chrysanthemums, and jasmine. Each day the Pookkalam grows larger and more elaborate, symbolizing the growing excitement for Mahabali's arrival. The floral designs often depict traditional motifs, religious symbols, and scenes from mythology. Creating Pookkalam is a community activity that brings families and neighbors together, fostering unity and creativity.",
          hindi: "पूक्कलम - फूलों की चटाई",
          english: "Pookkalam - Floral Carpets"
        },
        {
          title: "Onasadya - The Grand Feast",
          content: "Onasadya is the elaborate vegetarian feast served on Thiruvonam day (the main day). Traditionally served on banana leaves, the feast includes 26 or more dishes, each with specific nutritional and symbolic significance. The meal begins with parippu (dal curry) and ghee, followed by sambar, avial, thoran, olan, pachadi, and various pickles and papads. The feast ends with payasam (sweet pudding). The Onasadya represents the prosperity of Mahabali's reign and the abundance of the harvest. It's a communal meal where people of all castes and communities sit together, symbolizing equality and unity.",
          hindi: "ओणसद्य - भव्य भोज",
          english: "Onasadya - The Grand Feast"
        },
        {
          title: "Vallam Kali - Snake Boat Races",
          content: "Vallam Kali (boat races) are the most spectacular events of Onam, held in rivers and backwaters across Kerala. The most famous is the Nehru Trophy Boat Race on Punnamada Lake. These long, narrow boats (Chundan Vallam) can carry over 100 rowers who move in perfect synchronization to the rhythm of Vanchipattu (boat songs). The boats are decorated like snakes with ornamental heads and tails. These races showcase Kerala's maritime heritage, teamwork, and competitive spirit. The events attract thousands of spectators and are broadcast nationwide.",
          hindi: "वल्लम कलि - सांप नाव दौड़",
          english: "Vallam Kali - Snake Boat Races"
        },
        {
          title: "Traditional Arts and Performances",
          content: "Onam showcases Kerala's rich cultural heritage through various art forms. Kathakali performances depict stories from mythology with elaborate makeup and costumes. Mohiniyattam, the graceful dance form of Kerala, tells tales of love and devotion. Kummattikali (mask dance) and Pulikali (tiger dance) are folk performances where artists wear colorful costumes and entertain crowds. Traditional music like Chenda Melam and Panchavadyam create the festive atmosphere. These performances preserve and promote Kerala's artistic traditions while entertaining the masses during the festival.",
          hindi: "पारंपरिक कलाएँ और प्रस्तुतियाँ",
          english: "Traditional Arts and Performances"
        }
      ]
    },
    {
      type: "foods",
      title: "Traditional Onam Delicacies",
      content: "Onam cuisine is a celebration of Kerala's culinary diversity, featuring dishes that represent the state's agricultural abundance and cultural heritage.",
      subsections: [
        {
          title: "Avial",
          hindi: "अवियल",
          english: "Mixed Vegetable Curry",
          content: "A signature Kerala dish made from a variety of vegetables like pumpkin, carrots, beans, drumsticks, and raw bananas, cooked in coconut milk and seasoned with curry leaves and coconut oil. The vegetables are cut into uniform pieces and cooked until tender but not mushy. Avial represents the unity in diversity of Kerala society, where different vegetables come together to create a harmonious dish. The use of coconut milk and curry leaves gives it a distinct Kerala flavor. This nutritious dish is an essential part of Onasadya and is believed to bring balance and harmony."
        },
        {
          title: "Thoran",
          hindi: "थोरन",
          english: "Dry Vegetable Stir-fry",
          content: "A dry preparation of vegetables like cabbage, beans, or carrots, finely chopped and stir-fried with grated coconut, mustard seeds, and curry leaves. The vegetables are cooked until crisp-tender, maintaining their nutritional value and texture. Thoran represents the simplicity and elegance of Kerala cuisine, where minimal ingredients create maximum flavor. Each household has its own variation, using seasonal vegetables available during harvest time. This dish is light yet flavorful and complements the richer dishes in the Onasadya."
        },
        {
          title: "Olan",
          hindi: "ओलन",
          english: "Light Coconut Curry",
          content: "A subtle and light dish made from ash gourd (white pumpkin) and red cowpeas cooked in coconut milk. The dish is minimally seasoned with green chilies, curry leaves, and a touch of coconut oil. Olan represents the gentle and nurturing aspect of Kerala cuisine, where the natural flavors of ingredients are enhanced rather than overpowered. The ash gourd provides a cooling effect, while the cowpeas add protein. This dish is particularly refreshing during the warm Onam season and balances the spicier elements of the feast."
        },
        {
          title: "Palada Payasam",
          hindi: "पलाडा पायसम",
          english: "Rice Pudding with Noodles",
          content: "The crowning glory of Onasadya, this sweet delicacy is made from rice noodles (ada) cooked in sweetened milk and flavored with cardamom. The ada is prepared from rice flour, rolled into thin sheets, and cut into small pieces before cooking. The milk is reduced with sugar until thick and creamy, then the ada is added and cooked until tender. Garnished with roasted cashews and raisins, this dessert represents the sweetness of life and the prosperity of the harvest. Palada Payasam is so beloved that it's often served throughout the Onam season, not just on the main feast day."
        }
      ]
    },
    {
      type: "cultural_significance",
      title: "Cultural and Social Significance",
      content: "Onam transcends religious boundaries and has become a secular festival celebrating Kerala's cultural identity and agricultural heritage.",
      subsections: [
        {
          title: "Harvest Celebration",
          content: "Onam marks the end of the monsoon season and the beginning of the harvest time, celebrating nature's bounty and agricultural prosperity."
        },
        {
          title: "Cultural Unity",
          content: "The festival brings together people of all religions and communities, showcasing Kerala's secular traditions and social harmony."
        },
        {
          title: "Artistic Expression",
          content: "Onam provides a platform for traditional arts, crafts, and cultural performances, preserving Kerala's rich artistic heritage."
        },
        {
          title: "Economic Activity",
          content: "The festival boosts local economy through tourism, handicrafts sales, and increased demand for traditional products and services."
        }
      ]
    }
  ]
};

export default function OnamPage() {
  const festival = festivalData;
  
  if (!festival) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('festivals', festival.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-bold text-amber-900">Bhakti</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-amber-700 hover:text-amber-900 transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-amber-700 hover:text-amber-900 transition-colors">Aartis</Link>
              <Link href="/mantras" className="text-amber-700 hover:text-amber-900 transition-colors">Mantras</Link>
              <Link href="/stories" className="text-amber-700 hover:text-amber-900 transition-colors">Stories</Link>
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
          
          <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl shadow-xl p-8 md:p-12 border border-amber-200">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Ship className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
                {festival.name}
              </h1>
              <p className="text-xl text-amber-700 mb-2">
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
          <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span className="font-medium">{festival.season}</span>
            </div>
            <p className="text-gray-600 text-sm">Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span className="font-medium">{festival.duration}</span>
            </div>
            <p className="text-gray-600 text-sm">Duration</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span className="font-medium">{festival.regions.length}+ Regions</span>
            </div>
            <p className="text-gray-600 text-sm">Celebrated in</p>
          </div>
        </div>

        {/* Significance Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Significance</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              {festival.significance}
            </p>
          </div>
        </section>

        <InContentAd />

        {/* Legend Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">The Legend of Mahabali</h2>
          <div className="space-y-6">
            {festival.sections.find(s => s.type === 'legend')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-amber-100">
                <h3 className="text-xl font-bold text-amber-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-amber-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-amber-900 mb-6">How Onam is Celebrated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {festival.sections.find(s => s.type === 'celebrations')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-amber-100">
                <h3 className="text-xl font-bold text-amber-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-amber-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Traditional Onam Delicacies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'foods')?.subsections?.map((food, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-amber-100">
                <h3 className="text-lg font-bold text-amber-800 mb-2">
                  {food.title}
                </h3>
                <p className="text-amber-600 font-medium mb-2">
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
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Cultural and Social Significance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'cultural_significance')?.subsections?.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-amber-800 mb-3">
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
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Related Festivals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/festivals/baisakhi" className="bg-white rounded-xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🌾</span>
                <h3 className="text-lg font-bold text-amber-800">Baisakhi</h3>
              </div>
              <p className="text-gray-600 text-sm">Harvest Festival</p>
            </Link>
            
            <Link href="/festivals/pongal" className="bg-white rounded-xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🌾</span>
                <h3 className="text-lg font-bold text-amber-800">Pongal</h3>
              </div>
              <p className="text-gray-600 text-sm">Tamil Harvest Festival</p>
            </Link>
            
            <Link href="/festivals/holi" className="bg-white rounded-xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🎨</span>
                <h3 className="text-lg font-bold text-amber-800">Holi</h3>
              </div>
              <p className="text-gray-600 text-sm">Festival of Colors</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-semibold">Bhakti</span>
          </div>
          <p className="text-amber-200">
            Celebrating the divine festivals of Sanatana Dharma with devotion and love
          </p>
          <div className="mt-6 space-x-6 flex justify-center">
            <Link href="/festivals" className="text-amber-200 hover:text-white transition-colors">
              Festivals
            </Link>
            <Link href="/aartis" className="text-amber-200 hover:text-white transition-colors">
              Aartis
            </Link>
            <Link href="/mantras" className="text-amber-200 hover:text-white transition-colors">
              Mantras
            </Link>
            <Link href="/stories" className="text-amber-200 hover:text-white transition-colors">
              Stories
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
