"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen, Target } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "ram-navami",
  name: "Ram Navami",
  title: "Lord Rama's Birth",
  description: "Ram Navami celebrates the birth of Lord Rama, the seventh avatar of Lord Vishnu. This auspicious festival marks the appearance of Rama in Ayodhya to establish dharma and righteousness, celebrated with prayers, fasting, and devotional singing.",
  duration: "1 day",
  icon: "🏹",
  significance: "Celebrates the birth of Lord Rama, the embodiment of dharma, truth, and ideal human values, and the victory of righteousness over evil.",
  season: "season-from-json",
  regions: ["Ayodhya", "North India", "South India", "All India"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Ram Navami",
      content: "Ram Navami is one of the most important Hindu festivals celebrating the birth of Lord Rama, the ideal man, perfect king, and embodiment of dharma who established the principles of righteousness in the world."
    },
    {
      type: "spiritual_significance",
      title: "Spiritual Significance",
      content: "Lord Rama represents the perfect human being who embodies dharma, truth, compassion, and righteousness. His birth symbolizes the divine intervention to restore cosmic order and establish the path of righteous living."
    },
    {
      type: "birth_story",
      title: "The Divine Birth Story",
      content: "The story of Rama's birth is a divine tale of answered prayers, celestial intervention, and the fulfillment of cosmic destiny.",
      subsections: [
        {
          title: "King Dasharatha's Prayer and Yajna",
          content: "King Dasharatha of Ayodhya had three wives but no children, which caused him great sorrow. Following the advice of his guru Vashishtha, he performed the Putrakameshti Yajna (sacrifice for progeny). During this sacred fire ritual, the divine fire god Agni appeared and gave him a bowl of divine kheer (rice pudding). Agni instructed the king to distribute this kheer among his queens. This divine intervention was orchestrated by the gods themselves, who had decided to descend to Earth in human form to defeat the demon king Ravana and restore dharma.",
          hindi: "राजा दशरथ की प्रार्थना और यज्ञ",
          english: "King Dasharatha's Prayer and Yajna"
        },
        {
          title: "The Divine Conception and Birth",
          content: "After consuming the divine kheer, the queens conceived children. Queen Kaushalya gave birth to Rama at noon on the ninth day of the bright fortnight in the month of Chaitra. At the moment of Rama's birth, the entire cosmos rejoiced - flowers bloomed out of season, divine music filled the air, and all beings experienced a sense of peace and joy. The baby Rama was born with divine qualities, having a dark complexion like a rain cloud, eyes shaped like lotus petals, and a divine aura that filled the entire kingdom with bliss.",
          hindi: "दिव्य गर्भाधान और जन्म",
          english: "The Divine Conception and Birth"
        },
        {
          title: "Celestial Celebrations in Ayodhya",
          content: "The birth of Rama was celebrated with unprecedented joy throughout Ayodhya and the heavens. The streets were decorated with flowers and banners, musicians played divine melodies, and sweets were distributed to all. The gods showered flowers from heaven, and sages and saints blessed the newborn prince. King Dasharatha distributed wealth and clothes to the poor, and the entire kingdom celebrated for days. This celestial celebration marked the beginning of a new era of righteousness and divine presence on Earth.",
          hindi: "अयोध्या में दिव्य उत्सव",
          english: "Celestial Celebrations in Ayodhya"
        }
      ]
    },
    {
      type: "celebrations",
      title: "How Ram Navami is Celebrated",
      content: "Ram Navami is celebrated with great devotion across India, with regional variations in customs and traditions.",
      subsections: [
        {
          title: "Morning Prayers and Abhishekam",
          content: "Devotees wake early, take a ritual bath, and visit temples for special prayers. The idol of baby Rama is given a ceremonial bath (abhishekam) with milk, honey, yogurt, and sacred water. The idol is then dressed in new clothes and adorned with jewelry. Special prayers and hymns are recited, particularly from the Ramayana and the Vishnu Sahasranama. Many devotees observe a fast throughout the day, breaking it only after midnight with a simple meal of fruits and sweets.",
          hindi: "सुबह की प्रार्थना और अभिषेक",
          english: "Morning Prayers and Abhishekam"
        },
        {
          title: "Ramayana Recitation and Bhajans",
          content: "The day is marked by continuous recitation of the Ramayana epic in temples and homes. Devotional songs (bhajans) praising Lord Rama are sung throughout the day. Many communities organize Ramayana reading sessions where the entire epic is recited by multiple readers taking turns. The story of Rama's life, his virtues, and his teachings inspire devotees to follow the path of dharma. These recitations create a spiritual atmosphere and remind people of Rama's ideal qualities.",
          hindi: "रामायण पाठ और भजन",
          english: "Ramayana Recitation and Bhajans"
        },
        {
          title: "Rama Processions and Rath Yatras",
          content: "In many places, especially in Ayodhya, elaborate processions are organized where beautifully decorated idols of Rama, Sita, Lakshmana, and Hanuman are placed on chariots and taken through the streets. Devotees gather in large numbers to seek blessings and participate in the procession. The chariots are often accompanied by traditional music, dance performances, and distribution of prasad. These processions symbolize Rama's journey through life and his presence among his devotees.",
          hindi: "राम जुलूस और रथ यात्रा",
          english: "Rama Processions and Rath Yatras"
        },
        {
          title: "Community Meals and Charity",
          content: "Many temples and community organizations organize free meals (annadhanam) for devotees and the needy. People also engage in charitable activities, donating food, clothes, and money to the poor. Some communities organize competitions based on Ramayana stories, cultural programs, and spiritual discourses. These activities reflect Rama's teachings of compassion, generosity, and service to humanity, making the festival not just a religious celebration but a social service event.",
          hindi: "सामुदायिक भोज और दान",
          english: "Community Meals and Charity"
        }
      ]
    },
    {
      type: "foods",
      title: "Traditional Ram Navami Delicacies",
      content: "Special foods prepared for Ram Navami are simple, sattvic dishes that reflect Rama's simple and righteous nature.",
      subsections: [
        {
          title: "Panakam",
          hindi: "पणकम",
          english: "Jaggery Ginger Drink",
          content: "A traditional cooling drink made from jaggery, water, ginger, cardamom, and black pepper. Panakam is especially popular in South India during Ram Navami. The drink is prepared by dissolving jaggery in water, then adding crushed ginger, cardamom powder, and a pinch of black pepper. This refreshing beverage represents the simple yet nourishing lifestyle that Rama embodied. It's served to devotees in temples as prasad and helps maintain energy during the day-long fast and prayers."
        },
        {
          title: "Kheer",
          hindi: "क्षीर",
          english: "Rice Pudding",
          content: "A sweet pudding made from basmati rice, milk, sugar, and flavored with cardamom and saffron. Kheer holds special significance as it was the divine kheer that led to Rama's conception. The rice is slow-cooked in milk until tender, then sweetened and garnished with nuts and raisins. This sweet dish represents the sweetness of Rama's character and the divine sweetness of his teachings. It's often prepared in large quantities to distribute as prasad to all devotees."
        },
        {
          title: "Coconut Rice",
          hindi: "नारियल चावल",
          english: "Coconut Rice",
          content: "A simple yet delicious dish made from cooked rice mixed with grated coconut, mustard seeds, curry leaves, and mild spices. This dish reflects the South Indian traditions of Ram Navami celebrations. The use of coconut represents purity and simplicity, while the mild spices symbolize the balanced nature of Rama's personality. This dish is often served as part of the festive meal after breaking the fast, providing nourishment without being too heavy."
        },
        {
          title: "Vada Pappu",
          hindi: "वड़ा पप्पू",
          english: "Lentil Offering",
          content: "A simple preparation of soaked lentils (usually moong dal) offered to Lord Rama as naivedyam (offering). The lentils are soaked for a few hours, drained, and offered raw with jaggery or coconut. This simple offering represents the humility and simplicity that Rama valued. In many temples, this is the primary offering made to Rama on his birthday, symbolizing that devotion and purity are more important than elaborate preparations."
        }
      ]
    },
    {
      type: "spiritual_teachings",
      title: "Rama's Spiritual Teachings",
      content: "Lord Rama's life and teachings provide timeless wisdom for righteous living and spiritual evolution.",
      subsections: [
        {
          title: "Dharma - Righteous Living",
          content: "Rama's life exemplifies living according to dharma (righteousness). He upheld truth, justice, and moral values even in the face of extreme difficulties. His teachings emphasize that one should always choose the path of righteousness, regardless of personal cost or convenience."
        },
        {
          title: "Family Values and Relationships",
          content: "Rama demonstrated ideal relationships - as a son, brother, husband, and king. He showed how to balance personal duties with social responsibilities, maintaining love and respect in all relationships while upholding dharma."
        },
        {
          title: "Leadership and Governance",
          content: "As king, Rama established the concept of 'Rama Rajya' - an ideal kingdom where justice prevailed, citizens were happy, and righteousness governed all actions. His leadership teaches that power should be used for the welfare of all people."
        },
        {
          title: "Devotion and Surrender",
          content: "Rama's relationship with his devotees, particularly Hanuman, teaches the path of devotion (bhakti). He showed that pure devotion and surrender to the divine can overcome all obstacles and lead to spiritual liberation."
        }
      ]
    }
  ]
};

export default function RamNavamiPage() {
  const festival = festivalData;
  
  if (!festival) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('festivals', festival.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-900">Bhakti</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-blue-700 hover:text-blue-900 transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-blue-700 hover:text-blue-900 transition-colors">Aartis</Link>
              <Link href="/bhajans" className="text-blue-700 hover:text-blue-900 transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-blue-700 hover:text-blue-900 transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-blue-700 hover:text-blue-900 transition-colors">Mantras</Link>
              <Link href="/stories" className="text-blue-700 hover:text-blue-900 transition-colors">Stories</Link>
              <Link href="/gods" className="text-blue-700 hover:text-blue-900 transition-colors">Gods</Link>
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
          
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-xl p-8 md:p-12 border border-blue-200">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Target className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
                {festival.name}
              </h1>
              <p className="text-xl text-blue-700 mb-2">
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
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{festival.season}</span>
            </div>
            <p className="text-gray-600 text-sm">Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{festival.duration}</span>
            </div>
            <p className="text-gray-600 text-sm">Duration</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{festival.regions.length}+ Regions</span>
            </div>
            <p className="text-gray-600 text-sm">Celebrated in</p>
          </div>
        </div>

        {/* Significance Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Significance</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              {festival.significance}
            </p>
          </div>
        </section>

        <InContentAd />

        {/* Birth Story Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">The Divine Birth Story</h2>
          <div className="space-y-6">
            {festival.sections.find(s => s.type === 'birth_story')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-blue-900 mb-6">How Ram Navami is Celebrated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {festival.sections.find(s => s.type === 'celebrations')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Traditional Ram Navami Delicacies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'foods')?.subsections?.map((food, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  {food.title}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
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

        {/* Spiritual Teachings */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Rama's Spiritual Teachings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {festival.sections.find(s => s.type === 'spiritual_teachings')?.subsections?.map((teaching, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 mb-3">
                  {teaching.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {teaching.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Festivals */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Related Festivals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/festivals/krishna-janmashtami" className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🦚</span>
                <h3 className="text-lg font-bold text-blue-800">Krishna Janmashtami</h3>
              </div>
              <p className="text-gray-600 text-sm">Lord Krishna's Birth</p>
            </Link>
            
            <Link href="/festivals/diwali" className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🪔</span>
                <h3 className="text-lg font-bold text-blue-800">Diwali</h3>
              </div>
              <p className="text-gray-600 text-sm">Festival of Lights</p>
            </Link>
            
            <Link href="/festivals/navratri" className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💃</span>
                <h3 className="text-lg font-bold text-blue-800">Navratri</h3>
              </div>
              <p className="text-gray-600 text-sm">Nine Nights of Goddess</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-semibold">Bhakti</span>
          </div>
          <p className="text-blue-200">
            Celebrating the divine festivals of Sanatana Dharma with devotion and love
          </p>
          <div className="mt-6 space-x-6 flex justify-center">
            <Link href="/festivals" className="text-blue-200 hover:text-white transition-colors">
              Festivals
            </Link>
            <Link href="/aartis" className="text-blue-200 hover:text-white transition-colors">
              Aartis
            </Link>
            <Link href="/mantras" className="text-blue-200 hover:text-white transition-colors">
              Mantras
            </Link>
            <Link href="/stories" className="text-blue-200 hover:text-white transition-colors">
              Stories
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
