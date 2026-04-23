"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen, Sun } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "pongal",
  name: "Pongal",
  title: "Tamil Harvest Festival",
  description: "Pongal is the four-day Tamil harvest festival thanking the Sun God for a bountiful harvest. This auspicious festival marks the beginning of the Tamil month Thai and is celebrated with traditional cooking, colorful decorations, and joyous community gatherings.",
  duration: "4 days",
  icon: "🌾",
  significance: "Expresses gratitude to the Sun God, nature, and cattle for providing agricultural prosperity and marks the beginning of the Tamil harvest season.",
  season: "season-from-json",
  regions: ["Tamil Nadu", "Sri Lanka", "Singapore", "Malaysia", "Mauritius"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Pongal",
      content: "Pongal is the most important festival for Tamil farmers, celebrating the harvest season and expressing gratitude to nature's elements that make agriculture possible."
    },
    {
      type: "spiritual_significance",
      title: "Spiritual Significance",
      content: "Pongal represents the deep connection between humans, nature, and the divine. It teaches us to be grateful for nature's bounty and to honor the elements that sustain life."
    },
    {
      type: "four_days",
      title: "The Four Days of Pongal",
      content: "Pongal is celebrated over four days, each with its own significance and traditional rituals.",
      subsections: [
        {
          title: "Bhogi Pongal - Day of Discarding",
          content: "The first day, Bhogi Pongal, is dedicated to discarding the old and welcoming the new. People clean their homes thoroughly and burn unwanted items in a bonfire, symbolizing the destruction of evil and negative influences. This represents letting go of past mistakes and starting fresh. Families decorate their homes with colorful rangoli (kolam) designs using rice flour, and mango leaves are hung at doorways as auspicious symbols. The day sets the tone for renewal and purification, preparing hearts and homes for the auspicious days ahead.",
          hindi: "भोगी पोंगल - त्याग का दिन",
          english: "Bhogi Pongal - Day of Discarding"
        },
        {
          title: "Surya Pongal - Thanksgiving to Sun God",
          content: "The second day, Surya Pongal, is the main day dedicated to worshipping the Sun God (Surya). Families wake early, wear traditional clothes, and prepare the special Pongal dish in earthen pots. The rice is cooked with milk and jaggery until it overflows, symbolizing abundance and prosperity. The moment the Pongal overflows, people shout 'Pongalo Pongal' in joy. This overflowing represents the bountiful harvest and divine blessings. The prepared dish is first offered to the Sun God, then shared with family and neighbors, symbolizing community harmony and gratitude.",
          hindi: "सूर्य पोंगल - सूर्य भगवान को धन्यवाद",
          english: "Surya Pongal - Thanksgiving to Sun God"
        },
        {
          title: "Mattu Pongal - Honoring Cattle",
          content: "The third day, Mattu Pongal, is dedicated to honoring cattle, particularly cows and bulls, which are essential for agriculture. Cattle are bathed, decorated with colorful garlands, bells, and painted horns. Their foreheads are marked with sacred symbols. Special prayers are offered, and traditional cattle races (Jallikattu) are organized in some areas. The Pongal dish prepared on this day is first offered to the cattle before being consumed by humans. This day expresses gratitude to these gentle animals for their hard work in the fields and their contribution to agricultural prosperity.",
          hindi: "माट्टू पोंगल - पशुओं का सम्मान",
          english: "Mattu Pongal - Honoring Cattle"
        },
        {
          title: "Kaanum Pongal - Day of Social Gathering",
          content: "The fourth and final day, Kaanum Pongal, is dedicated to social gatherings and family bonding. People visit relatives and friends, exchange gifts, and share meals. Many families go to beaches, parks, or picnic spots to enjoy the day together. Young women pray for the well-being of their brothers, similar to Raksha Bandhan. Traditional games, folk dances, and cultural performances are organized in communities. This day strengthens social bonds and celebrates the joy of community life, marking a joyful conclusion to the harvest festival.",
          hindi: "कानुम पोंगल - सामाजिक सम्मेलन का दिन",
          english: "Kaanum Pongal - Day of Social Gathering"
        }
      ]
    },
    {
      type: "celebrations",
      title: "Pongal Traditions and Customs",
      content: "Pongal celebrations are marked by vibrant traditions that reflect Tamil culture and agricultural heritage.",
      subsections: [
        {
          title: "Kolam - Traditional Floor Art",
          content: "Kolam is the traditional art of drawing geometric patterns on the floor using rice flour. During Pongal, women create elaborate kolam designs at the entrance of their homes. These designs are not just decorative but serve as welcoming symbols for prosperity and good fortune. The rice flour used also feeds birds and insects, symbolizing harmony with nature. Kolam patterns range from simple dots and lines to complex geometric designs and floral motifs. This daily practice during Pongal represents the artistic expression and spiritual devotion of Tamil households.",
          hindi: "कोलम - पारंपरिक फर्श कला",
          english: "Kolam - Traditional Floor Art"
        },
        {
          title: "Traditional Attire and Jewelry",
          content: "During Pongal, people dress in their finest traditional clothes. Men wear veshti (dhoti) and shirts, while women wear colorful silk sarees with gold jewelry. The bright colors represent the joy and prosperity of the harvest season. Women adorn themselves with traditional gold jewelry including mangalsutra, bangles, earrings, and waist belts. The traditional attire not only honors cultural heritage but also creates a festive atmosphere. Many families buy new clothes specifically for Pongal, symbolizing new beginnings and prosperity.",
          hindi: "पारंपरिक परिधान और आभूषण",
          english: "Traditional Attire and Jewelry"
        },
        {
          title: "Jallikattu - Bull Taming Sport",
          content: "Jallikattu is a traditional bull-taming sport conducted in Tamil Nadu during Pongal, particularly in the Madurai region. Bulls are released into a crowd, and brave participants try to grab the bull's hump and ride it as long as possible. This ancient sport tests courage, strength, and skill. While controversial due to animal welfare concerns, it remains an integral part of Pongal celebrations in many rural areas. The sport symbolizes the human-animal relationship and the bravery required in agricultural life. Winners are rewarded with prizes and community recognition.",
          hindi: "जल्लीकट्टू - सांड़ पकड़ने का खेल",
          english: "Jallikattu - Bull Taming Sport"
        },
        {
          title: "Community Feasts and Sharing",
          content: "Community sharing is central to Pongal celebrations. The Pongal dish is prepared in large quantities and shared with neighbors, relatives, and the needy. Community kitchens are organized where people cook together and share meals. This practice strengthens social bonds and ensures that everyone can participate in the celebration. The act of sharing food represents the abundance of the harvest and the importance of community welfare. Many temples and community organizations organize free meals (annadhanam) during Pongal, emphasizing the spiritual value of feeding others.",
          hindi: "सामुदायिक भोज और साझेदारी",
          english: "Community Feasts and Sharing"
        }
      ]
    },
    {
      type: "foods",
      title: "Traditional Pongal Delicacies",
      content: "Pongal cuisine celebrates the harvest season with dishes made from fresh agricultural produce.",
      subsections: [
        {
          title: "Sakkarai Pongal",
          hindi: "सक्करै पोंगल",
          english: "Sweet Pongal",
          content: "The signature dish of Pongal, made from newly harvested rice, moong dal, jaggery, and ghee. The rice and dal are cooked together until soft, then sweetened with jaggery and flavored with cardamom. The dish is garnished with cashews and raisins fried in ghee. This sweet dish is first offered to the Sun God as naivedyam (offering) before being shared with family. The sweetness represents the joy of harvest, while the use of new rice symbolizes gratitude for the agricultural bounty. Each household prepares this dish in earthen pots over traditional stoves, maintaining authenticity and tradition."
        },
        {
          title: "Ven Pongal",
          hindi: "वेन पोंगल",
          english: "Savory Pongal",
          content: "The savory version of Pongal, made from rice and moong dal cooked with salt, pepper, cumin, and generous amounts of ghee. This dish is often prepared for breakfast during Pongal and served with sambar and coconut chutney. The simplicity of the dish represents the humble beginnings of agricultural life, while the rich flavor of ghee and spices symbolizes prosperity. Ven Pongal is nutritious and provides energy for the day's celebrations. Many families prepare both sweet and savory versions to offer variety and balance in their festive meals."
        },
        {
          title: "Avial",
          hindi: "अवियल",
          english: "Mixed Vegetable Curry",
          content: "A traditional mixed vegetable dish made from seasonal vegetables like pumpkin, carrots, beans, and drumsticks, cooked in coconut milk and seasoned with curry leaves and coconut oil. The vegetables are cut into uniform pieces and cooked until tender. Avial represents the diversity of the harvest and the importance of using seasonal produce. The use of coconut milk reflects the tropical climate of South India. This nutritious dish complements the rich Pongal dishes and provides essential vitamins and minerals from the fresh harvest."
        },
        {
          title: "Payasam",
          hindi: "पायसम",
          english: "Rice Pudding",
          content: "A sweet dessert made from rice, milk, sugar, and cardamom, often garnished with nuts and raisins. Payasam is prepared in large quantities during Pongal and served as a special treat. The creamy texture and sweet flavor represent the sweetness of life and the abundance of the harvest. Some variations include vermicelli (semiya payasam) or lentils (paruppu payasam). This dessert is often served in banana leaves, adding traditional flavor and authenticity to the festive meal."
        }
      ]
    },
    {
      type: "cultural_significance",
      title: "Cultural and Agricultural Significance",
      content: "Pongal represents the deep connection between Tamil culture, agriculture, and spiritual traditions.",
      subsections: [
        {
          title: "Agricultural Heritage",
          content: "Celebrates Tamil Nadu's agricultural traditions and the importance of farming in rural life"
        },
        {
          title: "Environmental Harmony",
          content: "Teaches respect for nature and the importance of sustainable agricultural practices"
        },
        {
          title: "Family Values",
          content: "Strengthens family bonds through shared rituals, meals, and celebrations"
        },
        {
          title: "Cultural Identity",
          content: "Preserves and promotes Tamil cultural heritage, language, and traditional practices"
        }
      ]
    }
  ]
};

export default function PongalPage() {
  const festival = festivalData;
  
  if (!festival) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('festivals', festival.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-orange-900">Bhakti</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-orange-700 hover:text-orange-900 transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-orange-700 hover:text-orange-900 transition-colors">Aartis</Link>
              <Link href="/bhajans" className="text-orange-700 hover:text-orange-900 transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-orange-700 hover:text-orange-900 transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-orange-700 hover:text-orange-900 transition-colors">Mantras</Link>
              <Link href="/stories" className="text-orange-700 hover:text-orange-900 transition-colors">Stories</Link>
              <Link href="/gods" className="text-orange-700 hover:text-orange-900 transition-colors">Gods</Link>
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
          
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl shadow-xl p-8 md:p-12 border border-orange-200">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Sun className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
                {festival.name}
              </h1>
              <p className="text-xl text-orange-700 mb-2">
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
          <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="font-medium">{festival.season}</span>
            </div>
            <p className="text-gray-600 text-sm">Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="font-medium">{festival.duration}</span>
            </div>
            <p className="text-gray-600 text-sm">Duration</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="font-medium">{festival.regions.length}+ Regions</span>
            </div>
            <p className="text-gray-600 text-sm">Celebrated in</p>
          </div>
        </div>

        {/* Significance Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Significance</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              {festival.significance}
            </p>
          </div>
        </section>

        <InContentAd />

        {/* Four Days Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-900 mb-6">The Four Days of Pongal</h2>
          <div className="space-y-6">
            {festival.sections.find(s => s.type === 'four_days')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
                <h3 className="text-xl font-bold text-orange-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-orange-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Pongal Traditions and Customs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {festival.sections.find(s => s.type === 'celebrations')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
                <h3 className="text-xl font-bold text-orange-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-orange-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Traditional Pongal Delicacies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'foods')?.subsections?.map((food, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                <h3 className="text-lg font-bold text-orange-800 mb-2">
                  {food.title}
                </h3>
                <p className="text-orange-600 font-medium mb-2">
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
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Cultural and Agricultural Significance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'cultural_significance')?.subsections?.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-bold text-orange-800 mb-3">
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
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Related Festivals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/festivals/onam" className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🛶️</span>
                <h3 className="text-lg font-bold text-orange-800">Onam</h3>
              </div>
              <p className="text-gray-600 text-sm">Harvest Festival of Kerala</p>
            </Link>
            
            <Link href="/festivals/baisakhi" className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🌾</span>
                <h3 className="text-lg font-bold text-orange-800">Baisakhi</h3>
              </div>
              <p className="text-gray-600 text-sm">Harvest Festival</p>
            </Link>
            
            <Link href="/festivals/makar-sankranti" className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🪁</span>
                <h3 className="text-lg font-bold text-orange-800">Makar Sankranti</h3>
              </div>
              <p className="text-gray-600 text-sm">Harvest Festival</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-orange-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-semibold">Bhakti</span>
          </div>
          <p className="text-orange-200">
            Celebrating the divine festivals of Sanatana Dharma with devotion and love
          </p>
          <div className="mt-6 space-x-6 flex justify-center">
            <Link href="/festivals" className="text-orange-200 hover:text-white transition-colors">
              Festivals
            </Link>
            <Link href="/aartis" className="text-orange-200 hover:text-white transition-colors">
              Aartis
            </Link>
            <Link href="/mantras" className="text-orange-200 hover:text-white transition-colors">
              Mantras
            </Link>
            <Link href="/stories" className="text-orange-200 hover:text-white transition-colors">
              Stories
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
