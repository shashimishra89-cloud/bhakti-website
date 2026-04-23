"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Music, Sparkles, ChevronRight, Clock, Heart, BookOpen } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

const aartiData = {
  id: "durga-aarti",
  name: "Durga Mata Ki Aarti | मां दुर्गा की आरती, जय अंबे गौरी जय श्यामा गौरी....",
  title: "Om Jai Durga Mata",
  description: "A prayer to Goddess Durga, the divine mother who protects and destroys evil.",
  deity: "Goddess Durga",
  lyrics: {
    hindi: [
      "जय अंबे गौरी, मैया जय श्यामा गौरी।",
      "तुमको निशिदिन ध्यावत, हरि ब्रह्मा शिवरी॥ ओम जय अंबे गौरी",
      "मांग सिन्दूर विराजत, टीको मृगमद कोत।",
      "उज्जवल से दोउ नैना, चन्द्रवदन नीको॥ ओम जय अंबे गौरी",
      "केहरि वाहन राजत, रक्ताम्बर राज।",
      "रक्तपुष्प गल माला, कण्ठन पर साजै॥ ओम जय अंबे गौरी",
      "केहरि वाहन राजत, खड्ग खप्परधारी।",
      "सुर नर मुनि-जन सेवत, तिनके दुखहारी॥ ओम जय अंबे गौरी",
      "कानन कुण्डल शोभित, नासाग्रे मोती।",
      "कोटिक चन्द्र दिवाकर, सम राजत ज्योति॥ ओम जय अंबे गौरी",
      "शुम्भ-निशुम्भ बिदारे, महिषासुर घाती।",
      "धूम्र विलोचन नैना, निशिदिन माताती॥ ओम जय अंबे गौरी",
      "चण्ड-मुण्ड संहारे, शोणित बीज हरे।",
      "ब्रह्मा रुद्राणी तुम कमला रानी।",
      "आगम-निगम-बखानी, तुम शिव पटरानी॥ ओम जय अंबे गौरी",
      "चौंसठ योगिनी मंगल गावत, नृत्य करत भैरूं।",
      "बाजत ताल मृदंगा, अरु बाजत डमरु॥ ओम जय अंबे गौरी",
      "तुम ही जग की माता, तुम ही हो भरता।",
      "भक्तन की दुख हरता, सुख सम्पत्ति करता॥ ओम जय अंबे गौरी",
      "भुजा चार अति शोभित, वर-मुद्रा धारी।",
      "मनवान्छित फल पावत, सेवत नर-नारी॥ ओम जय अंबे गौरी",
      "कंचन थाल विराजत, अगर कपूर बाती।",
      "श्रीमालकेतु में राजत, कोटि रतन ज्योति॥ ओम जय अंबे गौरी",
      "श्री अम्बेजी की आरती, जो कोई नर गावै।",
      "कहत शिवानन्द स्वामी, सुख सम्पत्ति पावै॥ ओम जय अंबे गौरी, ओम जय अंबे गौरी",
      "जोर से बोलो जय माता दी, सारे बोले जय माता दी।",
      "बोल सांचे दरबार की जय",
      "जयकारा शेरावाली का बोल सांचे दरबार की जय"
    ],
    translations: [
      {
        hindi: "ॐ हे दुर्गा माता, जय हो आपकी।",
        english: "Om, victory to Mother Durga, victory to Mother Durga."
      },
      {
        hindi: "सुख और संपत्ति देने वाली, जय हो आपकी।",
        english: "Giver of happiness and wealth, victory to you."
      },
      {
        hindi: "जय दुर्गा माता...",
        english: "Victory to Mother Durga..."
      },
      {
        hindi: "जय अंबे जगदम्बे, संसार की माँ।",
        english: "Victory to Mother Ambika, mother of the universe."
      },
      {
        hindi: "भवानी और भुवनेश्वरी, जय हो।",
        english: "Bhavani and Bhuvaneshwari, victory to you."
      },
      {
        hindi: "जय अंबे जगदम्बे...",
        english: "Victory to Mother Ambika..."
      },
      {
        hindi: "शुंभ और निशुंभ का विनाश करने वाली।",
        english: "Destroyer of Shumbh and Nishumbh demons."
      },
      {
        hindi: "महिषासुर को मारने वाली।",
        english: "Slayer of buffalo demon Mahishasur."
      },
      {
        hindi: "जय अंबे जगदम्बे...",
        english: "Victory to Mother Ambika..."
      },
      {
        hindi: "चंड और मुंड का विनाश करने वाली।",
        english: "Destroyer of Chand and Mund demons."
      },
      {
        hindi: "रक्तबीज का वध करने वाली।",
        english: "Slayer of demon Raktabeej."
      },
      {
        hindi: "जय अंबे जगदम्बे...",
        english: "Victory to Mother Ambika..."
      },
      {
        hindi: "दक्ष की प्रजा का वध करने वाली।",
        english: "Destroyer of Daksha's progeny."
      },
      {
        hindi: "चामुंडा देवी, जय हो।",
        english: "Chandika and Chamunda, victory to you."
      },
      {
        hindi: "जय अंबे जगदम्बे...",
        english: "Victory to Mother Ambika..."
      },
      {
        hindi: "कालिका और भद्रकाली, जय हो।",
        english: "Kalika and Bhadrakali, victory to you."
      },
      {
        hindi: "शांति देने वाली, जय हो।",
        english: "Giver of peace, victory to you."
      },
      {
        hindi: "जय अंबे जगदम्बे...",
        english: "Victory to Mother Ambika..."
      },
      {
        hindi: "जय दुर्गा माता, जय हो आपकी।",
        english: "Victory to Mother Durga, victory to you."
      }
    ]
  },
  meaning: "This aarti glorifies Goddess Durga as the supreme mother who protects her devotees and destroys evil forces. It describes her various forms and victories over demons like Shumbh, Nishumbh, and Mahishasur, emphasizing her role as the protector of the universe.",
  significance: "Durga Aarti is performed to seek the blessings of Goddess Durga for protection, prosperity, and the destruction of obstacles. It helps devotees connect with the divine feminine energy and receive her maternal protection.",
  benefits: [
    "Protection from negative energies and evil forces",
    "Prosperity and success in endeavors",
    "Inner strength and courage",
    "Blessings for family well-being"
  ]
};

export default function DurgaAartiPage() {
  const aarti = aartiData;
  
  if (!aarti) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('aartis', aarti.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-pink-600" />
              <h1 className="text-2xl font-bold text-pink-900">Bhakti</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-pink-700 hover:text-pink-900 transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-pink-700 hover:text-pink-900 transition-colors">Aartis</Link>
              <Link href="/bhajans" className="text-pink-700 hover:text-pink-900 transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-pink-700 hover:text-pink-900 transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-pink-700 hover:text-pink-900 transition-colors">Mantras</Link>
              <Link href="/stories" className="text-pink-700 hover:text-pink-900 transition-colors">Stories</Link>
              <Link href="/gods" className="text-pink-700 hover:text-pink-900 transition-colors">Gods</Link>
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
          
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-xl p-8 md:p-12 border border-pink-200">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full mb-4 bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center border-4 border-red-300 shadow-lg">
                  <span className="text-5xl">🪔</span>
                </div>
                <Music className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-pink-900 mb-6">
                {aarti.name}
              </h1>
              <p className="text-xl text-pink-700 mb-2">
                {aarti.title}
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {aarti.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <BannerAd />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Aarti Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border border-pink-100">
            <div className="flex items-center space-x-3 mb-2">
              <Heart className="w-5 h-5 text-pink-600" />
              <span className="font-medium">{aarti.deity}</span>
            </div>
            <p className="text-gray-600 text-sm">Deity</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-pink-100">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-pink-600" />
              <span className="font-medium">5-10 min</span>
            </div>
            <p className="text-gray-600 text-sm">Duration</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-pink-100">
            <div className="flex items-center space-x-3 mb-2">
              <BookOpen className="w-5 h-5 text-pink-600" />
              <span className="font-medium">Traditional</span>
            </div>
            <p className="text-gray-600 text-sm">Type</p>
          </div>
        </div>

        {/* Significance Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pink-900 mb-6">Significance</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-pink-100">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {aarti.significance}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {aarti.meaning}
            </p>
          </div>
        </section>

        <InContentAd />

        {/* Hindi Aarti */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pink-900 mb-6">हिंदी आरती (Hindi Aarti)</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-pink-100">
            <div className="space-y-3">
              {aarti.lyrics.hindi.map((line: string, index: number) => (
                <p key={index} className="text-lg text-gray-700 font-medium leading-relaxed text-center">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        <InContentAd />

        {/* Translations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pink-900 mb-6">आरती अनुवाद (Aarti Translations)</h2>
          <div className="space-y-8 mb-12">
            {aarti.lyrics.hindi.map((line, index: number) => (
              <div key={index} className="text-center space-y-4">
                <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                  {line}
                </p>
                {aarti.lyrics.translations[index] && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-red-700 mb-2">Hindi:</p>
                        <p className="text-gray-700 leading-relaxed">{aarti.lyrics.translations[index].hindi}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-red-700 mb-2">English:</p>
                        <p className="text-gray-700 leading-relaxed">{aarti.lyrics.translations[index].english}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <BannerAd />

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pink-900 mb-6">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {aarti.benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                <h3 className="text-lg font-bold text-pink-800 mb-3">
                  {benefit}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Related Aartis */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pink-900 mb-6">Related Aartis</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/aartis/ganesh-aarti" className="bg-white rounded-xl shadow-lg p-6 border border-pink-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🐘</span>
                <h3 className="text-lg font-bold text-pink-800">Ganesh Aarti</h3>
              </div>
              <p className="text-gray-600 text-sm">Lord Ganesha</p>
            </Link>
            
            <Link href="/aartis/lakshmi-aarti" className="bg-white rounded-xl shadow-lg p-6 border border-pink-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💰</span>
                <h3 className="text-lg font-bold text-pink-800">Lakshmi Aarti</h3>
              </div>
              <p className="text-gray-600 text-sm">Goddess Lakshmi</p>
            </Link>
            
            <Link href="/aartis/shiv-aarti" className="bg-white rounded-xl shadow-lg p-6 border border-pink-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🔱</span>
                <h3 className="text-lg font-bold text-pink-800">Shiv Aarti</h3>
              </div>
              <p className="text-gray-600 text-sm">Lord Shiva</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-pink-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-semibold">Bhakti</span>
          </div>
          <p className="text-pink-200">
            Celebrating the divine festivals of Sanatana Dharma with devotion and love
          </p>
          <div className="mt-6 space-x-6 flex justify-center">
            <Link href="/festivals" className="text-pink-200 hover:text-white transition-colors">
              Festivals
            </Link>
            <Link href="/aartis" className="text-pink-200 hover:text-white transition-colors">
              Aartis
            </Link>
            <Link href="/mantras" className="text-pink-200 hover:text-white transition-colors">
              Mantras
            </Link>
            <Link href="/stories" className="text-pink-200 hover:text-white transition-colors">
              Stories
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
