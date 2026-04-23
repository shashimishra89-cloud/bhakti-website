"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Music, Sparkles, ChevronRight, Clock, Heart, BookOpen } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

const aartiData = {
  id: "krishna-aarti",
  name: "Krishna Aarti",
  title: "Aarti Kunj Bihari Ki",
  description: "A melodious aarti dedicated to Lord Krishna, the divine cowherd and embodiment of love.",
  deity: "Lord Krishna",
  lyrics: {
    sanskrit: [
      "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की।",
      "गले में बैजंती माला, बजावै मुरली मधुर बाला।",
      "श्रवण में कुण्डल झलकाला, नंद के आनंद नंदलाला।",
      "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की।",
      "गन सम अंग कांति काली, राधिका चमक रही आली।",
      "लतन में ठाढ़े बनमाली, भ्रमर सी अलक, कस्तूरी तिलक।",
      "चरन छवि श्यामा प्यारी, गोपी जात प्यारी।",
      "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की।",
      "कनकमय मोर मुकुट बिलसै, देवता दरसन को तरसैं।",
      "गगन सों सुमन रासि बरसै, ग्वालिन दारसन को तरसैं।",
      "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की।",
      "जहां ते प्रकट भई गंगा, कलुष कलि राधारी।",
      "चमकती उज्ज्वल तट रेनू, बज राधिका चमक।",
      "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की।",
      "चरन छवि श्यामा प्यारी, गोपी जात प्यारी।",
      "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की।"
    ],
    translations: [
      {
        hindi: "ॐ कुंज बिहारी की आरती है।",
        english: "Om, this is the aarti of Kunj Bihari."
      },
      {
        hindi: "श्री गिरिधर कृष्ण मुरारी की आरती है।",
        english: "This is the aarti of Shri Giridhar Krishna Murari."
      },
      {
        hindi: "गले में वैजंती माला और मुरली बजा रहे हैं।",
        english: "You have Vaijayanti mala around your neck and play the flute."
      },
      {
        hindi: "श्रवण में कुण्डल और नंद के आनंद हैं।",
        english: "You have peacock feather in your crown and lotus in your ears."
      },
      {
        hindi: "गन सम अंग कांति काली और राधिका चमक रही हैं।",
        english: "Your body is blue like the sky and you wear yellow clothes."
      },
      {
        hindi: "लतन में ठाढ़े बनमाली और भ्रमर सी अलक हैं।",
        english: "You wear Banamali in your ears and have a lightning mark."
      },
      {
        hindi: "चरन छवि श्यामा प्यारी और गोपी जात हैं।",
        english: "You are served by Shyama and Gopi girls."
      },
      {
        hindi: "कनकमय मोर मुकुट बिलसै और देवता दरसन को तरसैं।",
        english: "Kanhaiya Mukut is your throne and Devaki looks after you."
      },
      {
        hindi: "गगन सों और सुमन रासि बरसै रहते हैं।",
        english: "Gagan and Sumran are always praising you."
      },
      {
        hindi: "जहां ते प्रकट भई गंगा और कलुष कलि राधारी हैं।",
        english: "You are the protector of the world and destroyer of Kaliya."
      },
      {
        hindi: "चमकती उज्ज्वल तट रेनू और बज राधिका चमक।",
        english: "Chamkari Ujjwal Tej Renoo and Vijay Rajdhani."
      },
      {
        hindi: "चरन छवि श्यामा प्यारी और गोपी जात हैं।",
        english: "You are served by Shyama and Gopi girls."
      },
      {
        hindi: "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की।",
        english: "Aarti of Kunj Bihari, Shri Giridhar Krishna Murari."
      }
    ]
  },
  meaning: "This aarti glorifies Lord Krishna as the divine cowherd who resides in Kunj (Vrindavan). It describes his enchanting form, his divine attributes, and his role as the protector and beloved of all beings.",
  significance: "Krishna Aarti is performed to seek the blessings of Lord Krishna for love, devotion, protection, and spiritual upliftment. It helps devotees connect with the divine love and compassion of Krishna.",
  benefits: [
    "Divine love and compassion",
    "Protection from evil forces",
    "Spiritual growth and devotion",
    "Peace and harmony in life"
  ]
};

export default function KrishnaAartiPage() {
  const aarti = aartiData;
  
  if (!aarti) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('aartis', aarti.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
              <div className="w-32 h-32 mx-auto mb-8 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full mb-4 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center border-4 border-blue-300 shadow-lg">
                  <span className="text-5xl">🪔</span>
                </div>
                <Music className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
                {aarti.name}
              </h1>
              <p className="text-xl text-blue-700 mb-2">
                {aarti.title}
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {aarti.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aarti Lyrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-200">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              {aarti.title}
            </h2>
            
            <div className="space-y-8 mb-12">
              {aarti.lyrics.sanskrit.map((shloka, index) => (
                <div key={index} className="text-center space-y-4">
                  <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                    {shloka}
                  </p>
                  {aarti.lyrics.translations[index] && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-blue-700 mb-2">Hindi:</p>
                          <p className="text-gray-700 leading-relaxed">{aarti.lyrics.translations[index].hindi}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700 mb-2">English:</p>
                          <p className="text-gray-700 leading-relaxed">{aarti.lyrics.translations[index].english}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <InContentAd />
            
            {/* Meaning and Significance */}
            <div className="mt-12 space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Meaning</h3>
                <p className="text-gray-700 leading-relaxed">{aarti.meaning}</p>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">Significance</h3>
                <p className="text-gray-700 leading-relaxed">{aarti.significance}</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {aarti.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Heart className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Aartis */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Related Aartis</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: "ganesh-aarti", name: "Ganesh Aarti", color: "orange" },
                { id: "durga-aarti", name: "Durga Aarti", color: "pink" },
                { id: "shiv-aarti", name: "Shiv Aarti", color: "blue" },
                { id: "lakshmi-aarti", name: "Lakshmi Aarti", color: "yellow" }
              ].map((related) => (
                <Link
                  key={related.id}
                  href={`/aartis/${related.id}`}
                  className={`p-4 rounded-lg border-2 border-${related.color}-200 bg-${related.color}-50 hover:bg-${related.color}-100 transition-all duration-300 group`}
                >
                  <div className="flex items-center space-x-2">
                    <Music className={`h-5 w-5 text-${related.color}-600`} />
                    <span className={`font-medium text-${related.color}-900 group-hover:text-${related.color}-700`}>
                      {related.name}
                    </span>
                    <ChevronRight className={`h-4 w-4 text-${related.color}-600 group-hover:text-${related.color}-700`} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BannerAd />
    </div>
  );
}
