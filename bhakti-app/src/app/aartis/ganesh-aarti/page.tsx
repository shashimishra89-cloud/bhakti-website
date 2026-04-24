"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Music, Sparkles, ChevronRight, Clock, Heart, BookOpen, Volume2 } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

const aartiData = {
  id: "ganesh-aarti",
  name: "Ganesh Aarti",
  title: "Jai Ganesh Jai Ganesh Deva",
  description: "The most beloved aarti dedicated to Lord Ganesha, the remover of obstacles and the god of wisdom.",
  deity: "Lord Ganesha",
fullAarti: {
    hindi: `जय गणेश जय गणेश देवा, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा।
एक दंत दयावंत, चार भुजा धारी।
मस्तक सिंदूर सोहे, मूसे की सवारी।
जय गणेश जय गणेश देवा, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा।
पान चढ़े फल चढ़े, और चढ़े मेवा।
लड्डुअन का भोग लगे, संत करें सेवा।
जय गणेश जय गणेश देवा, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा।
अंधन को आंख देत, कोढ़िन को काया।
बांझन को पुत्र देत, निर्धन को माया।
जय गणेश जय गणेश देवा, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा।
सूर श्याम शरण आए, सफल कीजे सेवा।
माता जाकी पार्वती, पिता महादेवा।
दीनन की लाज रखो, शंभु सुतकारी।
कामना को पूरण करो, जाऊं बलिहारी।
जय गणेश जय गणेश देवा, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा।
भगवान गणेश की जय, पार्वती के लल्ला की जय, ओम गं गणपतये नमः`,
  },
  verses: [
    {
      line: "जय गणेश जय गणेश देवा, जय गणेश देवा।",
      meaning: "Victory to Lord Ganesha, victory to the divine Lord Ganesha."
    },
    {
      line: "माता जाकी पार्वती, पिता महादेवा।",
      meaning: "Whose mother is Parvati and father is the great Lord Shiva."
    },
    {
      line: "एक दंत दयावंत, चार भुजा धारी।",
      meaning: "One-tusked, compassionate, bearer of four arms."
    },
    {
      line: "मस्तक सिंदूर सोहे, मूसे की सवारी।",
      meaning: "Vermilion adorns his forehead, riding on a mouse."
    },
    {
      line: "जय गणेश जय गणेश देवा, जय गणेश देवा।",
      meaning: "Victory to Lord Ganesha, victory to the divine Lord Ganesha."
    },
    {
      line: "माता जाकी पार्वती, पिता महादेवा।",
      meaning: "Whose mother is Parvati and father is the great Lord Shiva."
    },
    {
      line: "पान चढ़े फल चढ़े, और चढ़े मेवा।",
      meaning: "Betel leaves are offered, fruits are offered, and dry fruits too."
    },
    {
      line: "लड्डुअन का भोग लगे, संत करें सेवा।",
      meaning: "Laddus are offered as bhog, saints perform your service."
    },
    {
      line: "जय गणेश जय गणेश देवा, जय गणेश देवा।",
      meaning: "Victory to Lord Ganesha, victory to the divine Lord Ganesha."
    },
    {
      line: "माता जाकी पार्वती, पिता महादेवा।",
      meaning: "Whose mother is Parvati and father is the great Lord Shiva."
    },
    {
      line: "अंधन को आंख देत, कोढ़िन को काया।",
      meaning: "You give eyes to the blind, body to the leper."
    },
    {
      line: "बांझन को पुत्र देत, निर्धन को माया।",
      meaning: "You give children to the childless, wealth to the poor."
    },
    {
      line: "जय गणेश जय गणेश देवा, जय गणेश देवा।",
      meaning: "Victory to Lord Ganesha, victory to the divine Lord Ganesha."
    },
    {
      line: "माता जाकी पार्वती, पिता महादेवा।",
      meaning: "Whose mother is Parvati and father is the great Lord Shiva."
    },
    {
      line: "सूर श्याम शरण आए, सफल कीजे सेवा।",
      meaning: "Sur and Shyam have come to your shelter, make their service successful."
    },
    {
      line: "माता जाकी पार्वती, पिता महादेवा।",
      meaning: "Whose mother is Parvati and father is the great Lord Shiva."
    },
    {
      line: "दीनन की लाज रखो, शंभु सुतकारी।",
      meaning: "Protect the honor of the humble, O son of Lord Shambhu."
    },
    {
      line: "कामना को पूरण करो, जाऊं बलिहारी।",
      meaning: "Fulfill desires, I offer my life to you."
    },
    {
      line: "जय गणेश जय गणेश देवा, जय गणेश देवा।",
      meaning: "Victory to Lord Ganesha, victory to the divine Lord Ganesha."
    },
    {
      line: "माता जाकी पार्वती, पिता महादेवा।",
      meaning: "Whose mother is Parvati and father is the great Lord Shiva."
    },
    {
      line: "भगवान गणेश की जय, पार्वती के लल्ला की जय, ओम गं गणपतये नमः",
      meaning: "Victory to Lord Ganesha, victory to Parvati's son, Om Gam Ganapataye Namah."
    }
  ],
  meaning: "This aarti glorifies Lord Ganesha as the remover of obstacles and bestower of wisdom.",
  significance: "Ganesh Aarti is performed to seek the blessings of Lord Ganesha for removing obstacles, granting wisdom, and achieving success in all endeavors.",
  benefits: [
    "Removal of obstacles and challenges",
    "Wisdom and intellectual clarity", 
    "Success in new ventures and projects",
    "Protection from negative energies"
  ]
};

export default function GaneshAartiPage() {
  const aarti = aartiData;
  
  if (!aarti) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('aartis', aarti.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Bhakti
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-orange-600 font-semibold">Aartis</Link>
              <Link href="/bhajans" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Mantras</Link>
              <Link href="/stories" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Stories</Link>
              <Link href="/gods" className="text-orange-800 hover:text-orange-600 font-medium transition-colors">Gods</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl shadow-xl p-8 md:p-12 border border-orange-200">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full mb-4 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-orange-300 shadow-lg">
                  <span className="text-5xl">🪔</span>
                </div>
                <Music className="h-8 w-8 text-orange-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
                {aarti.name}
              </h1>
              <p className="text-xl text-orange-700 mb-2">{aarti.title}</p>
              <p className="text-gray-600 max-w-3xl mx-auto">{aarti.description}</p>
            </div>
          </div>
        </div>
      </section>

      <BannerAd />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
            <div className="flex items-center space-x-3 mb-2">
              <Heart className="w-5 h-5 text-orange-600" />
              <span className="font-medium">{aarti.deity}</span>
            </div>
            <p className="text-gray-600 text-sm">Deity</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="font-medium">5-10 min</span>
            </div>
            <p className="text-gray-600 text-sm">Duration</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
            <div className="flex items-center space-x-3 mb-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span className="font-medium">Traditional</span>
            </div>
            <p className="text-gray-600 text-sm">Type</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Significance</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">{aarti.significance}</p>
            <p className="text-gray-600 leading-relaxed">{aarti.meaning}</p>
          </div>
        </section>

        <InContentAd />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Complete Aarti</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="bg-orange-50 rounded-lg p-6">
              <p className="text-lg text-gray-800 font-medium leading-relaxed whitespace-pre-line text-center">
                {aarti.fullAarti.hindi}
              </p>
            </div>
          </div>
        </section>

        <InContentAd />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Line-by-Line Translation</h2>
          <div className="space-y-4">
            {aarti.verses.map((verse, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1 space-y-3">
                    <p className="text-lg text-gray-800 font-medium leading-relaxed">
                      {verse.line}
                    </p>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-orange-700">Meaning: </span>
                        {verse.meaning}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <BannerAd />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {aarti.benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-bold text-orange-800 mb-3">{benefit}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-900 mb-6">Related Aartis</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/aartis/durga-aarti" className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🔱</span>
                <h3 className="text-lg font-bold text-orange-800">Durga Aarti</h3>
              </div>
              <p className="text-gray-600 text-sm">Goddess Durga worship</p>
            </Link>
            
            <Link href="/aartis/krishna-aarti" className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🕉</span>
                <h3 className="text-lg font-bold text-orange-800">Krishna Aarti</h3>
              </div>
              <p className="text-gray-600 text-sm">Lord Krishna devotion</p>
            </Link>
            
            <Link href="/aartis/lakshmi-aarti" className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💰</span>
                <h3 className="text-lg font-bold text-orange-800">Lakshmi Aarti</h3>
              </div>
              <p className="text-gray-600 text-sm">Goddess of wealth</p>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-orange-900 to-red-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold">Bhakti</h3>
            </div>
            <p className="text-xl text-orange-200 mb-8 max-w-2xl mx-auto">
              A Sacred Space for Devotion
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Link href="/festivals" className="text-orange-200 hover:text-white transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-orange-200 hover:text-white transition-colors">Aartis</Link>
              <Link href="/bhajans" className="text-orange-200 hover:text-white transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-orange-200 hover:text-white transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-orange-200 hover:text-white transition-colors">Mantras</Link>
              <Link href="/stories" className="text-orange-200 hover:text-white transition-colors">Stories</Link>
            </div>
          </div>
          
          <div className="border-t border-orange-800 pt-8 text-center">
            <p className="text-orange-300 text-sm mb-4">
              © 2024 Bhakti. Preserving and sharing sacred traditions of Hindu culture.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <Link href="/privacy" className="text-orange-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-orange-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-orange-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
