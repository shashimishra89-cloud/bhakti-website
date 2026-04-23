'use client';

import Link from 'next/link';
import { Music, Sparkles, ChevronRight, Clock, Heart, BookOpen } from 'lucide-react';
import { BannerAd, InContentAd } from '@/components/AdBlock';
import { Breadcrumbs, generateBreadcrumbs } from '@/components/Breadcrumbs';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface AartiVerse {
  line: string;
  meaning: string;
}

interface FullAarti {
  hindi: string;
  english: string;
}

interface AartiData {
  id: string;
  name: string;
  title: string;
  description: string;
  deity: string;
  fullAarti: FullAarti;
  verses: AartiVerse[];
  meaning: string;
  significance: string;
  benefits: string[];
  relatedAartis?: { id: string; name: string; deity: string; icon: string }[];
}

interface AartiPageTemplateProps {
  aarti: AartiData;
  themeColor: {
    primary: string; // e.g., "orange"
    gradient: string; // e.g., "from-orange-100 to-yellow-100"
    iconBg: string; // e.g., "from-orange-400 to-orange-600"
    text: string; // e.g., "orange-900"
    border: string; // e.g., "orange-200"
  };
}

export function AartiPageTemplate({ aarti, themeColor }: AartiPageTemplateProps) {
  const breadcrumbs = generateBreadcrumbs('aartis', aarti.name);

  // Helper to get Tailwind classes dynamically
  const getBgGradient = () => `bg-gradient-to-br ${themeColor.gradient}`;
  const getTextColor = () => `text-${themeColor.text}`;
  const getBorderColor = () => `border-${themeColor.border}`;

  return (
    <div className={`min-h-screen ${getBgGradient()}`}>
      {/* Header - Consistent across all pages */}
      <Header activeNav="aartis" />

      {/* Breadcrumbs & Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          
          <div className={`${getBgGradient()} rounded-2xl shadow-xl p-8 md:p-12 border ${getBorderColor()}`}>
            <div className="text-center">
              {/* Logo Icon - Always 🪔 for consistency */}
              <div className="w-32 h-32 mx-auto mb-8 flex flex-col items-center justify-center">
                <div className={`w-24 h-24 rounded-full mb-4 bg-gradient-to-br ${themeColor.iconBg} flex items-center justify-center border-4 ${getBorderColor()} shadow-lg`}>
                  <span className="text-5xl">🪔</span>
                </div>
                <Music className={`h-8 w-8 text-${themeColor.primary}-600`} />
              </div>
              
              <h1 className={`text-4xl md:text-6xl font-bold ${getTextColor()} mb-6`}>
                {aarti.name}
              </h1>
              <p className={`text-xl text-${themeColor.primary}-700 mb-2`}>{aarti.title}</p>
              <p className="text-gray-600 max-w-3xl mx-auto">{aarti.description}</p>
            </div>
          </div>
        </div>
      </section>

      <BannerAd />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className={`bg-white rounded-lg shadow-md p-6 border ${getBorderColor()}`}>
            <div className="flex items-center space-x-3 mb-2">
              <Heart className={`w-5 h-5 text-${themeColor.primary}-600`} />
              <span className="font-medium">{aarti.deity}</span>
            </div>
            <p className="text-gray-600 text-sm">Deity</p>
          </div>
          
          <div className={`bg-white rounded-lg shadow-md p-6 border ${getBorderColor()}`}>
            <div className="flex items-center space-x-3 mb-2">
              <Clock className={`w-5 h-5 text-${themeColor.primary}-600`} />
              <span className="font-medium">5-10 min</span>
            </div>
            <p className="text-gray-600 text-sm">Duration</p>
          </div>
          
          <div className={`bg-white rounded-lg shadow-md p-6 border ${getBorderColor()}`}>
            <div className="flex items-center space-x-3 mb-2">
              <BookOpen className={`w-5 h-5 text-${themeColor.primary}-600`} />
              <span className="font-medium">Traditional</span>
            </div>
            <p className="text-gray-600 text-sm">Type</p>
          </div>
        </div>

        {/* Significance Section */}
        <section className="mb-12">
          <h2 className={`text-3xl font-bold ${getTextColor()} mb-6`}>Significance</h2>
          <div className={`bg-white rounded-xl shadow-lg p-8 border ${getBorderColor()}`}>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">{aarti.significance}</p>
            <p className="text-gray-600 leading-relaxed">{aarti.meaning}</p>
          </div>
        </section>

        <InContentAd />

        {/* Complete Aarti Section */}
        <section className="mb-12">
          <h2 className={`text-3xl font-bold ${getTextColor()} mb-6`}>Complete Aarti</h2>
          <div className={`bg-white rounded-xl shadow-lg p-8 border ${getBorderColor()}`}>
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-semibold text-${themeColor.primary}-800 mb-4`}>Hindi</h3>
                <div className={`bg-${themeColor.primary}-50 rounded-lg p-6`}>
                  <p className={`text-lg text-gray-800 font-medium leading-relaxed whitespace-pre-line text-center`}>
                    {aarti.fullAarti.hindi}
                  </p>
                </div>
              </div>
              <div>
                <h3 className={`text-xl font-semibold text-${themeColor.primary}-800 mb-4`}>English Translation</h3>
                <div className={`bg-${themeColor.primary}-50 rounded-lg p-6`}>
                  <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line text-center">
                    {aarti.fullAarti.english}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InContentAd />

        {/* Line-by-Line Translation Section */}
        <section className="mb-12">
          <h2 className={`text-3xl font-bold ${getTextColor()} mb-6`}>Line-by-Line Translation</h2>
          <div className="space-y-4">
            {aarti.verses.map((verse, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg p-6 border ${getBorderColor()}`}>
                <div className="flex items-start gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 bg-${themeColor.primary}-100 rounded-full flex items-center justify-center text-${themeColor.primary}-600 font-semibold text-sm`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 space-y-3">
                    <p className="text-lg text-gray-800 font-medium leading-relaxed">
                      {verse.line}
                    </p>
                    <div className={`bg-${themeColor.primary}-50 rounded-lg p-4`}>
                      <p className="text-gray-700 leading-relaxed">
                        <span className={`font-semibold text-${themeColor.primary}-700`}>Meaning: </span>
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

        {/* Benefits Section */}
        <section className="mb-12">
          <h2 className={`text-3xl font-bold ${getTextColor()} mb-6`}>Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {aarti.benefits.map((benefit, index) => (
              <div key={index} className={`bg-gradient-to-br from-${themeColor.primary}-50 to-${themeColor.primary}-100 rounded-xl p-6 border ${getBorderColor()}`}>
                <h3 className={`text-lg font-bold text-${themeColor.primary}-800 mb-3`}>{benefit}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Related Aartis Section */}
        {aarti.relatedAartis && aarti.relatedAartis.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-3xl font-bold ${getTextColor()} mb-6`}>Related Aartis</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {aarti.relatedAartis.map((related) => (
                <Link
                  key={related.id}
                  href={`/aartis/${related.id}`}
                  className={`bg-white rounded-xl shadow-lg p-6 border ${getBorderColor()} hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{related.icon}</span>
                    <h3 className={`text-lg font-bold text-${themeColor.primary}-800`}>{related.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{related.deity}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer - Consistent across all pages */}
      <Footer />
    </div>
  );
}
