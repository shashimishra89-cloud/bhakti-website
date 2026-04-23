"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen, Feather } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "krishna-janmashtami",
  name: "Krishna Janmashtami",
  title: "Lord Krishna's Birth",
  description: "Krishna Janmashtami celebrates the birth of Lord Krishna, the eighth avatar of Lord Vishnu. This joyous festival commemorates the divine appearance of Krishna in Mathura to defeat evil and establish dharma, celebrated with midnight prayers, fasting, and devotional songs.",
  duration: "1 day",
  icon: "🦚",
  significance: "Celebrates the birth of Lord Krishna, the embodiment of divine love, wisdom, and the destroyer of evil forces.",
  season: "season-from-json",
  regions: ["Mathura", "Vrindavan", "Maharashtra", "South India", "All India"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Krishna Janmashtami",
      content: "Krishna Janmashtami is one of the most beloved Hindu festivals, celebrating the divine birth of Lord Krishna, who descended to Earth to protect dharma and guide humanity through his teachings and divine play."
    },
    {
      type: "spiritual_significance",
      title: "Spiritual Significance",
      content: "Lord Krishna represents the perfect blend of divine and human qualities. His birth symbolizes the victory of good over evil, light over darkness, and the establishment of righteousness in the world."
    },
    {
      type: "birth_story",
      title: "The Divine Birth Story",
      content: "The story of Krishna's birth is a miraculous tale of divine intervention and the triumph of dharma over adharma.",
      subsections: [
        {
          title: "The Prophecy and Evil King Kansa",
          content: "The story begins with the tyrant King Kansa of Mathura, who heard a divine prophecy that his death would come at the hands of his sister Devaki's eighth son. Enraged and fearful, Kansa imprisoned his sister Devaki and her husband Vasudeva. He mercilessly killed their first six children as soon as they were born. The seventh child, Balarama, was miraculously transferred to the womb of Rohini, Vasudeva's other wife. When the eighth child, Krishna, was born in the prison cell of Mathura at midnight, the entire world was filled with divine presence and miraculous events.",
          hindi: "भविष्यवाणी और दुष्ट राजा कंस",
          english: "Prophecy and the Evil King Kansa"
        },
        {
          title: "The Miraculous Birth at Midnight",
          content: "At the stroke of midnight on the eighth day of the dark fortnight in Bhadrapada month, Lord Krishna appeared in his divine four-armed form, adorned with the conch, discus, mace, and lotus. The prison gates opened miraculously, and the guards fell into a deep sleep. Vasudeva, following divine instruction, carried the newborn Krishna across the raging Yamuna river, which parted to allow safe passage. He reached Gokul and exchanged Krishna with the newborn daughter of Yashoda and Nanda, then returned to the prison with the baby girl.",
          hindi: "आधी रात की दिव्य जन्म कथा",
          english: "The Miraculous Midnight Birth"
        },
        {
          title: "Krishna in Gokul - Divine Childhood",
          content: "In Gokul, Krishna grew up as Yashoda's son, performing countless divine plays (leelas) that revealed his true nature. From drinking the forest fire to protect his cowherd friends, to lifting the Govardhan hill on his little finger to protect the villagers from Indra's wrath, Krishna's childhood was filled with miracles. He defeated demons like Putana, Bakasura, and Kaliya Nag, establishing his divine supremacy while maintaining the innocence of a child. These leelas continue to inspire devotion and teach spiritual lessons.",
          hindi: "गोकुल में कृष्ण - दिव्य बचपन",
          english: "Krishna in Gokul - Divine Childhood"
        }
      ]
    },
    {
      type: "celebrations",
      title: "How Janmashtami is Celebrated",
      content: "Krishna Janmashtami is celebrated with great devotion and enthusiasm across India, with regional variations in customs and traditions.",
      subsections: [
        {
          title: "Midnight Birth Celebration",
          content: "Devotees observe a strict fast throughout the day, breaking it only at midnight when Krishna is believed to have been born. Temples are beautifully decorated, and the idol of baby Krishna is placed in a cradle. At midnight, devotees gather for special prayers, sing devotional songs, and rock the cradle while chanting 'Jai Kanhaiya Lal'. The atmosphere is filled with spiritual energy as devotees welcome the divine birth with flowers, incense, and offerings.",
          hindi: "आधी रात की जन्मोत्सव",
          english: "Midnight Birth Celebration"
        },
        {
          title: "Dahi Handi Festival",
          content: "In Maharashtra and Gujarat, Janmashtami is celebrated as Dahi Handi, commemorating Krishna's childhood mischief of stealing butter. Young men form human pyramids to break earthen pots filled with butter and curd, hung at great heights. This event symbolizes unity, teamwork, and the joy of Krishna's divine play. The breaking of the pot represents breaking the ego and achieving spiritual goals through collective effort and devotion.",
          hindi: "दही हांडी उत्सव",
          english: "Dahi Handi Festival"
        },
        {
          title: "Rasa Lila Performances",
          content: "In Mathura, Vrindavan, and other parts of North India, traditional Rasa Lila performances depict Krishna's divine play with the gopis (cowherd girls). These dance-drama performances recreate the spiritual love between Krishna and his devotees, symbolizing the soul's yearning for union with the divine. The performances are accompanied by traditional music and are an integral part of Janmashtami celebrations in the Braj region.",
          hindi: "रास लीला प्रस्तुतियाँ",
          english: "Rasa Lila Performances"
        },
        {
          title: "Temple Decorations and Abhishekam",
          content: "Temples are elaborately decorated with flowers, lights, and traditional decorations. The idol of Krishna is bathed (abhishekam) with milk, honey, yogurt, and ghee, then dressed in new clothes and jewelry. Special offerings of butter, sugar candy (misri), fruits, and traditional sweets are made to the deity. Devotees chant Krishna's names, read from the Bhagavata Purana, and participate in kirtans throughout the day and night.",
          hindi: "मंदिर सजावट और अभिषेक",
          english: "Temple Decorations and Abhishekam"
        }
      ]
    },
    {
      type: "foods",
      title: "Traditional Janmashtami Delicacies",
      content: "Janmashtami celebrations feature special foods that are traditionally offered to Lord Krishna and then distributed as prasad to devotees.",
      subsections: [
        {
          title: "Makhan Mishri",
          hindi: "मक्खन मिश्री",
          english: "Butter and Sugar Crystals",
          content: "Lord Krishna's favorite offering, consisting of fresh white butter (makhan) and sugar crystals (misri). This simple yet delicious offering represents the pure love and devotion of the gopis and symbolizes the sweetness of divine love. The butter is often shaped into small balls and decorated with silver leaf, while the misri crystals represent the crystallized devotion of the heart. This prasad is believed to bring the same joy that Krishna experienced while stealing butter from the gopis' homes."
        },
        {
          title: "Panjiri",
          hindi: "पंजीरी",
          english: "Sweet Nutritious Powder",
          content: "A traditional North Indian sweet made from whole wheat flour, ghee, sugar, and dry fruits. The wheat flour is roasted in ghee until golden and fragrant, then mixed with powdered sugar, chopped nuts, and cardamom. This nutritious sweet is believed to provide strength and energy, just as Krishna provided strength to his devotees. Panjiri is often shaped into small laddoos or served as a powder, and is considered especially auspicious when offered to Krishna on his birthday."
        },
        {
          title: "Kheer",
          hindi: "क्षीर",
          english: "Rice Pudding",
          content: "A creamy rice pudding made from basmati rice, milk, sugar, and flavored with cardamom and saffron. The rice is slow-cooked in milk until tender, then sweetened and garnished with nuts and raisins. This sweet dish represents the sweet nectar of divine love and is often prepared in large quantities to distribute as prasad. Some families add rose water or kewra essence for additional fragrance, making it a fitting offering for the divine celebration."
        },
        {
          title: "Malpua",
          hindi: "मालपुआ",
          english: "Sweet Pancakes",
          content: "Traditional sweet pancakes made from flour, milk, and sugar, deep-fried in ghee and soaked in sugar syrup. These soft, fluffy pancakes are Krishna's favorite and are often prepared in large quantities for Janmashtami celebrations. The malpuas are sometimes stuffed with khoya or coconut for extra richness and are served hot or cold. This sweet delicacy represents the joy and sweetness of Krishna's divine presence in our lives."
        }
      ]
    },
    {
      type: "spiritual_teachings",
      title: "Krishna's Spiritual Teachings",
      content: "Lord Krishna's life and teachings continue to guide humanity on the path of righteousness, love, and spiritual evolution.",
      subsections: [
        {
          title: "Bhagavad Gita - Divine Wisdom",
          content: "The Bhagavad Gita, delivered by Krishna to Arjuna on the battlefield of Kurukshetra, contains timeless spiritual wisdom. Krishna teaches about karma yoga (the path of selfless action), bhakti yoga (the path of devotion), and jnana yoga (the path of knowledge). His famous words 'Yada yada hi dharmasya glanir bhavati bharata' promise that he will descend whenever righteousness declines, offering hope and divine protection to humanity."
        },
        {
          title: "Divine Love and Bhakti",
          content: "Krishna's relationship with his devotees exemplifies pure, unconditional love. His teachings emphasize that devotion should be selfless, without expectation of reward. The gopis' love for Krishna represents the highest form of bhakti, where the soul completely surrenders to the divine. Krishna teaches that through love and devotion, one can overcome all obstacles and attain union with the divine."
        },
        {
          title: "Karma and Dharma",
          content: "Krishna's life demonstrates the importance of performing one's duty (dharma) without attachment to results. As a charioteer, warrior, philosopher, and friend, Krishna fulfilled every role perfectly while maintaining his divine nature. He teaches that one should perform righteous actions without being attached to the fruits, dedicating all actions to the divine."
        },
        {
          title: "Balance of Spiritual and Material Life",
          content: "Krishna represents the perfect balance between spiritual wisdom and worldly engagement. As a king, warrior, philosopher, and lover, he shows that one can lead a complete life while remaining spiritually centered. His teachings guide householders to perform their duties while maintaining spiritual awareness, making his teachings relevant for people in all walks of life."
        }
      ]
    }
  ]
};

export default function KrishnaJanmashtamiPage() {
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
          
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-xl p-8 md:p-12 border border-blue-200">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Feather className="h-12 w-12 text-white" />
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
          <h2 className="text-3xl font-bold text-blue-900 mb-6">How Janmashtami is Celebrated</h2>
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
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Traditional Janmashtami Delicacies</h2>
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
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Krishna's Spiritual Teachings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {festival.sections.find(s => s.type === 'spiritual_teachings')?.subsections?.map((teaching, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
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
            <Link href="/festivals/holi" className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🎨</span>
                <h3 className="text-lg font-bold text-blue-800">Holi</h3>
              </div>
              <p className="text-gray-600 text-sm">Festival of Colors</p>
            </Link>
            
            <Link href="/festivals/ganesh-chaturthi" className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🐘</span>
                <h3 className="text-lg font-bold text-blue-800">Ganesh Chaturthi</h3>
              </div>
              <p className="text-gray-600 text-sm">Lord Ganesha's Birthday</p>
            </Link>
            
            <Link href="/festivals/ram-navami" className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🏹</span>
                <h3 className="text-lg font-bold text-blue-800">Ram Navami</h3>
              </div>
              <p className="text-gray-600 text-sm">Lord Rama's Birth</p>
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
