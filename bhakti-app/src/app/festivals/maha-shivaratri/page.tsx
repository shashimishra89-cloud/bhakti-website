"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen, Moon } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "maha-shivaratri",
  name: "Maha Shivaratri",
  title: "Great Night of Shiva",
  description: "Maha Shivaratri is the most auspicious festival dedicated to Lord Shiva, celebrated with great devotion and spiritual fervor. Devotees observe fast, perform night-long vigils, and offer prayers to seek the blessings of the destroyer of evil and the transformer of the universe.",
  duration: "1 night",
  icon: "🔱",
  significance: "Celebrates the divine marriage of Shiva and Parvati, and the night when Shiva performed the Tandava dance of creation, preservation, and destruction.",
  season: "season-from-json",
  regions: ["All India", "Nepal", "Southeast Asia"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Maha Shivaratri",
      content: "Maha Shivaratri, the Great Night of Lord Shiva, is one of the most spiritually significant festivals in Hinduism. This sacred night is dedicated to worshiping Lord Shiva, the supreme deity of transformation, meditation, and cosmic consciousness."
    },
    {
      type: "spiritual_significance",
      title: "Spiritual Significance",
      content: "Maha Shivaratri represents the convergence of divine consciousness and human awareness. It is believed that on this night, the northern hemisphere of the planet is positioned in such a way that there is a natural upsurge of energy in the human system, making it an auspicious time for spiritual practices."
    },
    {
      type: "legends",
      title: "Sacred Legends of Shivaratri",
      content: "Several legends explain the significance of Maha Shivaratri, each highlighting different aspects of Lord Shiva's divine nature and his relationship with devotees.",
      subsections: [
        {
          title: "The Samudra Manthan Legend",
          content: "During the churning of the cosmic ocean (Samudra Manthan), a deadly poison called Halahala emerged, threatening to destroy the entire universe. The gods and demons, unable to handle this poison, approached Lord Shiva for help. In his infinite compassion, Shiva drank the entire poison but held it in his throat, which turned blue due to the toxin's effect. This earned him the name 'Neelkanth' (the blue-throated one). The gods and devotees stayed awake all night, caring for Shiva and praying for his well-being. This night of vigil and devotion is celebrated as Maha Shivaratri.",
          hindi: "समुद्र मंथन की कथा",
          english: "The Ocean Churning Legend"
        },
        {
          title: "Shiva-Parvati Divine Marriage",
          content: "According to another legend, Maha Shivaratri commemorates the divine marriage of Lord Shiva and Goddess Parvati. After severe penance and devotion, Parvati won Shiva's heart and hand in marriage. Their union represents the sacred balance between masculine and feminine energies, consciousness and nature, destruction and creation. On this night, devotees celebrate this divine union through rituals and prayers, seeking the blessings of both deities for marital harmony and spiritual growth.",
          hindi: "शिव-पार्वती का दिव्य विवाह",
          english: "The Divine Marriage of Shiva and Parvati"
        },
        {
          title: "The Tandava Dance of Creation",
          content: "Maha Shivaratri also celebrates Lord Shiva's cosmic dance (Tandava) on the night of his manifestation. The Tandava represents the cosmic cycles of creation, preservation, and destruction. Shiva's dance symbolizes the eternal rhythm of the universe and the continuous flow of cosmic energy. Devotees who stay awake and meditate on this night are believed to connect with this cosmic consciousness and receive spiritual liberation.",
          hindi: "सृजन का तांडव नृत्य",
          english: "The Tandava Dance of Creation"
        }
      ]
    },
    {
      type: "celebrations",
      title: "How Maha Shivaratri is Celebrated",
      content: "Maha Shivaratri is celebrated with intense devotion, fasting, and night-long vigils across India and beyond.",
      subsections: [
        {
          title: "Fasting and Abstinence",
          content: "Devotees observe a strict fast throughout the day and night, abstaining from all grains, salt, and sometimes even water. The fast is not just physical but also spiritual, involving control over senses and thoughts. Many devotees consume only fruits, milk, and specific fasting foods. This purification of body and mind prepares the devotee for deeper spiritual experiences during the night-long worship.",
          hindi: "व्रत और संयम",
          english: "Fasting and Abstinence"
        },
        {
          title: "Shivalinga Abhishekam",
          content: "The central ritual of Maha Shivaratri is the Abhishekam (ceremonial bathing) of the Shivalinga. Devotees bathe the Shivalinga with various sacred substances including milk, yogurt, honey, ghee, sugar, and water, each representing different aspects of life and devotion. The Abhishekam is performed while chanting Vedic mantras, especially the 'Om Namah Shivaya' mantra. This ritual purifies the devotee's sins and invokes Shiva's blessings.",
          hindi: "शिवलिंग अभिषेक",
          english: "Shivalinga Ceremonial Bathing"
        },
        {
          title: "Night-long Vigil (Jagran)",
          content: "Devotees stay awake throughout the night, engaging in spiritual practices. The night is divided into four Praharas (quarters), each dedicated to different forms of worship. During each Prahar, devotees perform Abhishekam, offer bilva leaves (sacred to Shiva), chant mantras, and sing devotional songs. The vigil symbolizes overcoming darkness and ignorance through spiritual awareness.",
          hindi: "रात्रि जागरण",
          english: "Night-long Spiritual Vigil"
        },
        {
          title: "Bilva Leaf Offering",
          content: "The bilva (bael) leaf is extremely sacred to Lord Shiva. According to scriptures, offering a bilva leaf to Shiva on Maha Shivaratri is equivalent to performing thousands of years of penance. The trifoliate shape of the bilva leaf represents the three aspects of Shiva - creation, preservation, and destruction, as well as the three gunas (qualities) of nature. Devotees collect these leaves and offer them with devotion during the puja.",
          hindi: "बिल्व पत्र अर्पण",
          english: "Sacred Bilva Leaf Offering"
        }
      ]
    },
    {
      type: "foods",
      title: "Traditional Shivaratri Foods",
      content: "Special foods prepared for Maha Shivaratri are simple, sattvic (pure) foods that support spiritual practices and fasting.",
      subsections: [
        {
          title: "Thandai",
          hindi: "ठंडाई",
          english: "Cooling Milk Drink",
          content: "A traditional cooling beverage made from milk, almonds, poppy seeds, melon seeds, and cardamom. Thandai is especially popular during Maha Shivaratri as it helps maintain energy during fasting and has cooling properties that balance the body. The nuts and seeds provide essential nutrients while the milk offers protein. Some variations include bhang (cannabis) for spiritual purposes, though many families prepare it without. The drink is served chilled and garnished with saffron and rose petals."
        },
        {
          title: "Sabudana Khichdi",
          hindi: "साबुदाना खिचड़ी",
          english: "Sago Porridge",
          content: "A light yet nutritious dish made from sago pearls, potatoes, and peanuts. Sabudana is rich in carbohydrates and provides sustained energy during fasting. The sago is soaked and cooked with potatoes, peanuts, and mild spices. This dish is easy to digest and keeps the stomach light, making it ideal for fasting days. It's often served with yogurt or lemon pickle for added flavor."
        },
        {
          title: "Kuttu ki Puri",
          hindi: "कुट्टू की पूरी",
          english: "Buckwheat Flatbread",
          content: "Traditional fasting bread made from buckwheat flour, which is gluten-free and highly nutritious. The dough is made with buckwheat flour, potatoes, and rock salt, then rolled into puris and deep-fried in ghee. Buckwheat is rich in fiber, protein, and essential minerals, making it perfect for fasting. These puris are served with potato curry or yogurt, providing a complete meal that sustains energy throughout the day."
        },
        {
          title: "Makhana Kheer",
          hindi: "मखाना क्षीर",
          english: "Fox Nut Pudding",
          content: "A creamy dessert made from fox nuts (makhana), milk, and sugar. Makhanas are low in calories and high in protein, making them ideal for fasting. They are roasted and then cooked in milk with sugar and cardamom until soft and creamy. This kheer is not only delicious but also provides essential nutrients during fasting. It's often garnished with chopped nuts and saffron for added richness and visual appeal."
        }
      ]
    },
    {
      type: "spiritual_practices",
      title: "Spiritual Practices and Benefits",
      content: "Maha Shivaratri offers unique opportunities for spiritual growth and transformation through specific practices.",
      subsections: [
        {
          title: "Meditation and Mantra Chanting",
          content: "The night is considered ideal for meditation as the natural energies support spiritual practices. Chanting 'Om Namah Shivaya' and the Mahamrityunjaya mantra is believed to bring peace and liberation. The vibrations created by these chants purify the environment and the practitioner's consciousness."
        },
        {
          title: "Rudraksha Wearing",
          content: "Wearing Rudraksha beads on this night is considered highly auspicious. Different mukhis (faces) of Rudraksha have different benefits, from peace to prosperity. The beads are believed to connect the wearer directly with Shiva's consciousness and protect from negative energies."
        },
        {
          title: "Charity and Service",
          content: "Performing acts of charity and selfless service on Maha Shivaratri is believed to multiply spiritual benefits. Donating to the poor, feeding the hungry, and serving at Shiva temples are considered meritorious acts that please Lord Shiva."
        },
        {
          title: "Spiritual Significance of Fasting",
          content: "Fasting on Maha Shivaratri is not just physical abstinence but a spiritual discipline. It helps control the senses, purify the body, and focus the mind on spiritual practices. The fast is believed to cleanse past karmas and prepare the devotee for higher consciousness."
        }
      ]
    }
  ]
};

export default function MahaShivaratriPage() {
  const festival = festivalData;
  
  if (!festival) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('festivals', festival.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-purple-900">Bhakti</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-purple-700 hover:text-purple-900 transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-purple-700 hover:text-purple-900 transition-colors">Aartis</Link>
              <Link href="/bhajans" className="text-purple-700 hover:text-purple-900 transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-purple-700 hover:text-purple-900 transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-purple-700 hover:text-purple-900 transition-colors">Mantras</Link>
              <Link href="/stories" className="text-purple-700 hover:text-purple-900 transition-colors">Stories</Link>
              <Link href="/gods" className="text-purple-700 hover:text-purple-900 transition-colors">Gods</Link>
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
          
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-xl p-8 md:p-12 border border-purple-200">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Moon className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-6">
                {festival.name}
              </h1>
              <p className="text-xl text-purple-700 mb-2">
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
          <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="font-medium">{festival.season}</span>
            </div>
            <p className="text-gray-600 text-sm">Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="font-medium">{festival.duration}</span>
            </div>
            <p className="text-gray-600 text-sm">Duration</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <span className="font-medium">{festival.regions.length}+ Regions</span>
            </div>
            <p className="text-gray-600 text-sm">Celebrated in</p>
          </div>
        </div>

        {/* Significance Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Significance</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              {festival.significance}
            </p>
          </div>
        </section>

        <InContentAd />

        {/* Legends Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Sacred Legends of Shivaratri</h2>
          <div className="space-y-6">
            {festival.sections.find(s => s.type === 'legends')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-purple-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-purple-900 mb-6">How Maha Shivaratri is Celebrated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {festival.sections.find(s => s.type === 'celebrations')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-purple-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Traditional Shivaratri Foods</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'foods')?.subsections?.map((food, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                <h3 className="text-lg font-bold text-purple-800 mb-2">
                  {food.title}
                </h3>
                <p className="text-purple-600 font-medium mb-2">
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

        {/* Spiritual Practices */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Spiritual Practices and Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {festival.sections.find(s => s.type === 'spiritual_practices')?.subsections?.map((practice, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-purple-800 mb-3">
                  {practice.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {practice.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Festivals */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Related Festivals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/festivals/ganesh-chaturthi" className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🐘</span>
                <h3 className="text-lg font-bold text-purple-800">Ganesh Chaturthi</h3>
              </div>
              <p className="text-gray-600 text-sm">Lord Ganesha's Birthday</p>
            </Link>
            
            <Link href="/festivals/navratri" className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💃</span>
                <h3 className="text-lg font-bold text-purple-800">Navratri</h3>
              </div>
              <p className="text-gray-600 text-sm">Nine Nights of Goddess</p>
            </Link>
            
            <Link href="/festivals/krishna-janmashtami" className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🦚</span>
                <h3 className="text-lg font-bold text-purple-800">Krishna Janmashtami</h3>
              </div>
              <p className="text-gray-600 text-sm">Lord Krishna's Birth</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-semibold">Bhakti</span>
          </div>
          <p className="text-purple-200">
            Celebrating the divine festivals of Sanatana Dharma with devotion and love
          </p>
          <div className="mt-6 space-x-6 flex justify-center">
            <Link href="/festivals" className="text-purple-200 hover:text-white transition-colors">
              Festivals
            </Link>
            <Link href="/aartis" className="text-purple-200 hover:text-white transition-colors">
              Aartis
            </Link>
            <Link href="/mantras" className="text-purple-200 hover:text-white transition-colors">
              Mantras
            </Link>
            <Link href="/stories" className="text-purple-200 hover:text-white transition-colors">
              Stories
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
