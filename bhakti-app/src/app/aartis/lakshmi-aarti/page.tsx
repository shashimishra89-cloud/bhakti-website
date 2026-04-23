"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Music, Sparkles, ChevronRight, Clock, Heart, BookOpen } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

const aartiData = {
  id: "lakshmi-aarti",
  name: "Lakshmi Aarti",
  title: "Om Jai Lakshmi Mata",
  description: "A divine aarti dedicated to Goddess Lakshmi, the goddess of wealth, prosperity, and fortune.",
  deity: "Goddess Lakshmi",
  fullAarti: {
    hindi: `ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।
तुमको निसिदिन ध्यावत, हरि विष्णु विधाता॥
ॐ जय लक्ष्मी माता॥
उमा, रुद्रानी, पार्वती, जगत की माता।
सृष्टि की रचया, ब्रह्मा विष्णु महेशा॥
ॐ जय लक्ष्मी माता॥
कमल, गटक, बेल, पत्र, सुगंध चम्पा।
फल, फूल, धूप, दीप, नैवेद्य भोजना॥
ॐ जय लक्ष्मी माता॥
शंख, चक्र, गदा, पद्म, हाथ में सुशोभित।
वरदाभय, मुद्रा, शुभ, मंगल प्रदायिनी॥
ॐ जय लक्ष्मी माता॥
सोने का थाल, चाँदी का प्याला।
रतन की माला, गहने, श्रृंगार सजा॥
ॐ जय लक्ष्मी माता॥`
  },
  verses: [
    { line: "ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।", meaning: "Om, victory to Mother Lakshmi, victory to Mother Lakshmi." },
    { line: "तुमको निसिदिन ध्यावत, हरि विष्णु विधाता॥", meaning: "Lord Vishnu, the creator, meditates upon you daily." },
    { line: "ॐ जय लक्ष्मी माता॥", meaning: "Om, victory to Mother Lakshmi." },
    { line: "उमा, रुद्रानी, पार्वती, जगत की माता।", meaning: "Uma, Rudrani, Parvati, you are the mother of the world." },
    { line: "सृष्टि की रचया, ब्रह्मा विष्णु महेशा॥", meaning: "Creator of the universe, along with Brahma, Vishnu, and Mahesh." },
    { line: "ॐ जय लक्ष्मी माता॥", meaning: "Om, victory to Mother Lakshmi." },
    { line: "कमल, गटक, बेल, पत्र, सुगंध चम्पा।", meaning: "Lotus, wood apple, bel leaves, fragrant champak flowers." },
    { line: "फल, फूल, धूप, दीप, नैवेद्य भोजना॥", meaning: "Fruits, flowers, incense, lamps, and food offerings." },
    { line: "ॐ जय लक्ष्मी माता॥", meaning: "Om, victory to Mother Lakshmi." },
    { line: "शंख, चक्र, गदा, पद्म, हाथ में सुशोभित।", meaning: "Conch, discus, mace, and lotus adorn your hands." },
    { line: "वरदाभय, मुद्रा, शुभ, मंगल प्रदायिनी॥", meaning: "Varada and Abhaya mudras, giver of auspiciousness." },
    { line: "ॐ जय लक्ष्मी माता॥", meaning: "Om, victory to Mother Lakshmi." },
    { line: "सोने का थाल, चाँदी का प्याला।", meaning: "Golden plate and silver cup." },
    { line: "रतन की माला, गहने, श्रृंगार सजा॥", meaning: "Garland of gems, jewelry, and beautiful adornments." },
    { line: "ॐ जय लक्ष्मी माता॥", meaning: "Om, victory to Mother Lakshmi." }
  ],
      {
        hindi: "हरि विष्णु विधाता आपको निसिदिन ध्यावत हैं।",
        english: "Lord Vishnu, the creator, meditates upon you daily."
      },
      {
        hindi: "जय लक्ष्मी माता...",
        english: "Victory to Mother Lakshmi..."
      },
      {
        hindi: "उमा, रुद्रानी, पार्वती, जगत की माता हैं।",
        english: "Uma, Rudrani, Parvati, you are the mother of the world."
      },
      {
        hindi: "सृष्टि की रचया, ब्रह्मा विष्णु महेशा हैं।",
        english: "Creator of the universe, along with Brahma, Vishnu, and Mahesh."
      },
      {
        hindi: "जय लक्ष्मी माता...",
        english: "Victory to Mother Lakshmi..."
      },
      {
        hindi: "कमल, गटक, बेल, पत्र, सुगंध चम्पा हैं।",
        english: "Lotus, wood apple, bel leaves, fragrant champak flowers."
      },
      {
        hindi: "फल, फूल, धूप, दीप, नैवेद्य भोजना हैं।",
        english: "Fruits, flowers, incense, lamps, and food offerings."
      },
      {
        hindi: "जय लक्ष्मी माता...",
        english: "Victory to Mother Lakshmi..."
      },
      {
        hindi: "शंख, चक्र, गदा, पद्म, हाथ में सुशोभित हैं।",
        english: "Conch, discus, mace, and lotus adorn your hands."
      },
      {
        hindi: "वरदाभय, मुद्रा, शुभ, मंगल प्रदायिनी हैं।",
        english: "Varada and Abhaya mudras, giver of auspiciousness."
      },
      {
        hindi: "जय लक्ष्मी माता...",
        english: "Victory to Mother Lakshmi..."
      },
      {
        hindi: "सोने का थाल, चाँदी का प्याला हैं।",
        english: "Golden plate and silver cup."
      },
      {
        hindi: "रतन की माला, गहने, श्रृंगार सजा हैं।",
        english: "Garland of gems, jewelry, and beautiful adornments."
      }
    ]
  },
  meaning: "This aarti glorifies Goddess Lakshmi as the divine mother who brings wealth, prosperity, and auspiciousness. It describes her various forms and attributes, emphasizing her role as the bestower of fortune and the protector of the universe.",
  significance: "Lakshmi Aarti is performed to seek the blessings of Goddess Lakshmi for wealth, prosperity, success, and happiness. It helps devotees connect with the divine energy of abundance and fortune.",
  benefits: [
    "Wealth and prosperity",
    "Success in business and career",
    "Peace and happiness in family",
    "Removal of financial obstacles"
  ]
};

export default function LakshmiAartiPage() {
  const aarti = aartiData;
  
  if (!aarti) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('aartis', aarti.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
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
              <Link href="/bhajans" className="text-yellow-700 hover:text-yellow-900 transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-yellow-700 hover:text-yellow-900 transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-yellow-700 hover:text-yellow-900 transition-colors">Mantras</Link>
              <Link href="/stories" className="text-yellow-700 hover:text-yellow-900 transition-colors">Stories</Link>
              <Link href="/gods" className="text-yellow-700 hover:text-yellow-900 transition-colors">Gods</Link>
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
          
          <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl shadow-xl p-8 md:p-12 border border-yellow-200">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-4 border-yellow-300 shadow-lg">
                  <span className="text-5xl">🪔</span>
                </div>
                <Music className="h-8 w-8 text-yellow-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-900 mb-6">
                {aarti.name}
              </h1>
              <p className="text-xl text-yellow-700 mb-2">{aarti.title}</p>
              <p className="text-gray-600 max-w-3xl mx-auto">{aarti.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Aarti Lyrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-yellow-200">
            <h2 className="text-3xl font-bold text-yellow-900 mb-8 text-center">
              {aarti.title}
            </h2>
            
            {/* Full Aarti at Top */}
            <div className="mb-12">
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <p className="text-lg text-gray-800 font-medium leading-relaxed whitespace-pre-line text-center">
                  {aarti.fullAarti.hindi}
                </p>
              </div>
            </div>
            
            <div className="space-y-8 mb-12">
              {aarti.verses.map((verse, index) => (
                <div key={index} className="text-center space-y-4">
                  <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                    {verse.line}
                  </p>
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-semibold text-yellow-700">Meaning: </span>
                      {verse.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <InContentAd />
            
            {/* Meaning and Significance */}
            <div className="mt-12 space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-900 mb-4">Meaning</h3>
                <p className="text-gray-700 leading-relaxed">{aarti.meaning}</p>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Significance</h3>
                <p className="text-gray-700 leading-relaxed">{aarti.significance}</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-yellow-900 mb-6 text-center">Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {aarti.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Heart className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-1" />
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
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-200">
            <h2 className="text-2xl font-bold text-yellow-900 mb-6">Related Aartis</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: "ganesh-aarti", name: "Ganesh Aarti", color: "orange" },
                { id: "durga-aarti", name: "Durga Aarti", color: "pink" },
                { id: "shiv-aarti", name: "Shiv Aarti", color: "blue" },
                { id: "krishna-aarti", name: "Krishna Aarti", color: "purple" }
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
