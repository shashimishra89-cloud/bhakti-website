"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Music, Sparkles, ChevronRight, Clock, Heart, BookOpen } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

const aartiData = {
  id: "shiv-aarti",
  name: "Shiv Aarti",
  title: "Om Jai Shiv Omkara",
  description: "A powerful aarti dedicated to Lord Shiva, the supreme deity of destruction and transformation.",
  deity: "Lord Shiva",
  lyrics: {
    sanskrit: [
      "ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।",
      "ब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा॥",
      "ओम जय शिव ओंकारा॥",
      "एकानन चतुरानन पञ्चानन राजे।",
      "हंसासन गरूडासन वृषवाहन साजे॥",
      "ओम जय शिव ओंकारा॥",
      "दो भुज चार चतुर्भुज दसभुज अति सोहे।",
      "त्रिगुण रूप निरखत त्रिभुवन जन मोहे॥",
      "ओम जय शिव ओंकारा॥",
      "अक्षमाला वनमाला मुण्डमालाधारी।",
      "त्रिपुरारी कंसारी कर माला धारी॥",
      "ओम जय शिव ओंकारा॥",
      "श्वेताम्बर पीताम्बर बाघंबर अंगे।",
      "सनकादिक गरुडादिक भूतादिक संगे॥"
    ],
    translations: [
      {
        hindi: "ॐ हे शिव, जय हो आपकी।",
        english: "Om, victory to Lord Shiva, victory to Lord Shiva."
      },
      {
        hindi: "ब्रह्मा, विष्णु, और महेश्वर आपके अंग हैं।",
        english: "Brahma, Vishnu, and Maheshwar are your forms."
      },
      {
        hindi: "जय शिव ओंकारा...",
        english: "Victory to Lord Shiva..."
      },
      {
        hindi: "एक दांत, चार भुजाओं वाले, पंचमुख वाले।",
        english: "One-tusked, four-armed, five-faced one."
      },
      {
        hindi: "हंसात्यक और गरूड़ा आपके वाहन हैं।",
        english: "Hasasya and Garuda are your vehicles."
      },
      {
        hindi: "जय शिव ओंकारा...",
        english: "Victory to Lord Shiva..."
      },
      {
        hindi: "दोनों भुजाओं वाले, सब अति सुंदर हैं।",
        english: "Two-armed, all are beautiful."
      },
      {
        hindi: "त्रिगुण रूप से त्रिभुवनों को मोहित है।",
        english: "Your three forms fascinate the three worlds."
      },
      {
        hindi: "जय शिव ओंकारा...",
        english: "Victory to Lord Shiva..."
      },
      {
        hindi: "अक्षमाला, वनमाला, और मुण्डमाला आपकी शक्तियां हैं।",
        english: "Akshmala, Vanmala, and Mundmala are your powers."
      },
      {
        hindi: "त्रिपुरारी की कंकण आपकी गले माला है।",
        english: "Tripurari's garland is around your neck."
      },
      {
        hindi: "जय शिव ओंकारा...",
        english: "Victory to Lord Shiva..."
      },
      {
        hindi: "श्वेताम्बर, पीताम्बर, और बाघंबर आपके अंग हैं।",
        english: "White, yellow, and tiger are your forms."
      },
      {
        hindi: "सनकादिक, गरूड़ादिक, और भूतादिक आपके संग हैं।",
        english: "Sankadik, Garudadik, and Bhutadik are your companions."
      }
    ]
  },
  meaning: "This aarti glorifies Lord Shiva as the supreme being who is beyond all attributes (Niranjan). It describes his various forms and manifestations, emphasizing his eternal nature and his role as the ultimate reality.",
  significance: "Shiv Aarti is performed to seek the blessings of Lord Shiva for spiritual growth, destruction of evil, and transformation of consciousness. It helps devotees connect with the divine energy of Shiva.",
  benefits: [
    "Spiritual purification and transformation",
    "Removal of obstacles and negative energies",
    "Inner peace and mental clarity",
    "Blessings for spiritual progress"
  ]
};

export default function ShivAartiPage() {
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
                <div className="w-24 h-24 rounded-full mb-4 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-blue-300 shadow-lg">
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
                { id: "krishna-aarti", name: "Krishna Aarti", color: "blue" },
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
