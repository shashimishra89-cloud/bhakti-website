"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen, ChevronDown } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";
import { useState } from "react";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "holi",
  name: "Holi",
  title: "Festival of Colors",
  description: "Holi is the vibrant Hindu festival of colors celebrating the arrival of spring, the eternal love of Radha and Krishna, and the victory of good over evil. People celebrate by throwing colored powder, dancing, and sharing sweets.",
  duration: "2 days",
  icon: "🎨",
  significance: "Celebrates the divine love of Radha and Krishna, the arrival of spring, and the victory of good over evil.",
  season: "spring",
  regions: ["North India", "Nepal", "Bangladesh", "Pakistan", "Mauritius", "Fiji"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Holi",
      content: "Holi, known as the festival of colors, is one of the most joyous and vibrant Hindu festivals. It marks the arrival of spring and celebrates the eternal love between Radha and Krishna."
    },
    {
      type: "spiritual_significance",
      title: "Spiritual Significance of Holi",
      content: "Holi represents the triumph of good over evil, light over darkness, and the arrival of spring. The festival teaches us about forgiveness, new beginnings, and the power of divine love."
    },
    {
      type: "stories",
      title: "Sacred Stories of Holi",
      content: "Holi is associated with several beautiful stories from Hindu mythology, each teaching important moral lessons about devotion, love, and divine protection.",
      subsections: [
        {
          title: "Prahlada and Holika",
          content: "The most revered story of Holi originates from ancient Hindu scriptures, particularly the Bhagavata Purana. King Hiranyakashipu, through intense penance, received a boon from Lord Brahma that made him virtually invincible - he could not be killed by man or beast, day or night, inside or outside, with weapons or bare hands. Arrogant with power, he demanded that everyone in his kingdom worship him as the supreme deity. However, his own son Prahlada remained a staunch devotee of Lord Vishnu, refusing to worship his father. Enraged by his son's devotion, Hiranyakashipu subjected Prahlada to numerous cruel punishments, but the boy remained unharmed due to Vishnu's divine protection. Finally, Hiranyakashipu's sister Holika, who had a boon making her immune to fire, tricked Prahlada into sitting with her on a burning pyre. As the flames rose, Prahlada chanted Vishnu's name with unwavering faith. Miraculously, Holika's boon failed because she had used it for evil purposes, and she was consumed by the fire while Prahlada emerged unscathed, protected by divine intervention. This divine event symbolizes the eternal truth that devotion and righteousness always triumph over evil and arrogance. The Holika Dahan ceremony, where bonfires are lit the night before Holi, commemorates this victory of good over evil.",
          hindi: "प्रहलाद और होलिका की कथा",
          english: "The Victory of Devotion Over Evil"
        },
        {
          title: "Radha and Krishna's Divine Love",
          content: "The most beloved aspect of Holi celebrates the divine love (Leela) between Lord Krishna and Radha in the sacred land of Vrindavan. According to folklore, young Krishna, with his dark complexion, was once playfully jealous of Radha's fair beauty. His mother Yashoda playfully suggested that he could color Radha's face with colors to make her complexion match his. Krishna, along with his friends (gopas), playfully applied colors to Radha and her friends (gopis), who in turn colored Krishna's face. This divine play became the foundation of Holi's color-throwing tradition. The story represents the spiritual truth that divine love transcends all physical appearances and social barriers. In Vrindavan and Mathura, this aspect of Holi is celebrated for weeks with great devotion. The famous 'Phoolon Ki Holi' (Flower Holi) at Banke Bihari Temple in Vrindavan, where flowers are thrown instead of colors, and the 'Lathmar Holi' in Barsana, where women playfully beat men with sticks, reenact Krishna's playful encounters with Radha and the gopis. This divine love story teaches us that true devotion and love are color-blind and celebrate the divine presence in every soul.",
          hindi: "राधा-कृष्ण का दिव्य प्रेम",
          english: "The Eternal Love of Radha and Krishna"
        },
        {
          title: "Kamadeva's Revival",
          content: "An often-overlooked but significant story associated with Holi involves Kamadeva, the god of love and desire. According to Hindu mythology, when Goddess Sati immolated herself in her father Daksha's yajna, Lord Shiva was so overcome with grief that he renounced all worldly affairs and went into deep meditation in the Himalayas. This created imbalance in the universe as creation itself depended on Shiva's union with Shakti. The gods, concerned about cosmic order, sent Kamadeva to awaken Shiva from his meditation. Kamadeva shot his arrow of flowers at Shiva, which disturbed his meditation. Enraged, Shiva opened his third eye and burned Kamadeva to ashes with his fiery gaze. However, realizing Kamadeva's noble intentions, Shiva later granted him a boon that while his physical form was destroyed, he would continue to exist as an invisible force of love and desire. Holi is celebrated as the day when Kamadeva was revived, marking the return of love and passion to the world. This story symbolizes the victory of love over destruction and the importance of balancing spiritual discipline with worldly responsibilities. It reminds us that love and desire, when pure and devoted, are essential aspects of divine creation.",
          hindi: "कामदेव का पुनर्जीवन",
          english: "The Resurrection of the God of Love"
        }
      ]
    },
    {
      type: "celebrations",
      title: "How Holi is Celebrated",
      content: "Holi celebrations span two days with distinct rituals and traditions across different regions of India.",
      subsections: [
        {
          title: "Holika Dahan - Bonfire Ceremony",
          content: "The first night of Holi involves the Holika Dahan ceremony, where bonfires are lit to symbolize the burning of evil. People gather around the fire, perform rituals, and offer prayers for the destruction of their inner evils.",
          hindi: "होलिका दहन",
          english: "The Burning of Evil"
        },
        {
          title: "Rangwali Holi - Playing with Colors",
          content: "The second day is the main celebration where people play with colors. Streets come alive with people throwing colored powder (gulal) and colored water, dancing to traditional songs, and sharing festive foods.",
          hindi: "रंगाली होली",
          english: "The Festival of Colors"
        },
        {
          title: "Traditional Holi Foods",
          content: "Special Holi delicacies include gujiya (sweet dumplings), mathri (savory snacks), thandai (cooling drink), and various sweets that are shared among family and friends.",
          hindi: "होली के व्यंजन",
          english: "Traditional Holi Delicacies"
        },
        {
          title: "Regional Celebrations",
          content: "In regions like Mathura and Vrindavan, Holi celebrations last for over a week with special events like Lathmar Holi, where women playfully beat men with sticks, reenacting Krishna's playful encounters with the gopis.",
          hindi: "क्षेत्रीय उत्सव",
          english: "Regional Holi Traditions"
        }
      ]
    },
    {
      type: "foods",
      title: "Traditional Holi Delicacies",
      content: "Holi is celebrated with various traditional foods that hold cultural and religious significance.",
      subsections: [
        {
          title: "Gujiya",
          hindi: "गुझिया",
          english: "Sweet Dumplings",
          content: "Traditional crescent-shaped sweet dumplings that are quintessential to Holi celebrations. Made with refined flour (maida) or whole wheat flour, stuffed with sweet khoya (milk solids) mixed with dried fruits, nuts, and cardamom powder. The dough is kneaded with ghee and milk, then shaped into half-moons with the filling inside. Deep-fried to golden perfection in pure ghee until crispy on outside and soft inside. Often garnished with pistachios and almonds. These sweets represent the sweetness of relationships and the joy of sharing during festivals. Each region has its variation - some use semolina (sooji) instead of khoya, while others add coconut or mawa. The preparation is a family ritual where women gather days before Holi to make these delicacies together."
        },
        {
          title: "Thandai",
          hindi: "ठंडाई",
          english: "Cooling Drink",
          content: "A refreshing, cooling beverage essential for Holi celebrations, especially during the color play when people are outdoors in the sun. Made from full-fat milk, yogurt, and sugar, flavored with aromatic spices like cardamom, black pepper, and fennel seeds. The special ingredient is bhang (cannabis leaves) in some traditional preparations, though many families make it without. The drink is garnished with rose petals, saffron strands, and sometimes almond paste. Thandai helps balance the body's heat during spring season and provides energy during the energetic celebrations. The name literally means 'cooling' in Hindi, and it's believed to have medicinal properties that help prevent heat strokes during outdoor festivities."
        },
        {
          title: "Malpua",
          hindi: "मालपुआ",
          english: "Sweet Fritters",
          content: "Traditional Indian pancakes that are crispy on edges and soft in the center, beloved during Holi and other festivals. Made from a batter of flour, semolina, and mashed bananas or yogurt, sweetened with sugar or jaggery. Flavored with cardamom and sometimes saffron for aroma and color. The batter is poured as small rounds in hot ghee and fried until golden brown. Some variations include adding coconut or khoya to the batter for richness. Malpuas are often served with rabri (thickened sweet milk) or sugar syrup. In some regions, they're made with rice flour instead of wheat flour. These sweet fritters symbolize prosperity and are distributed as prasad (blessed food) in many communities during Holi."
        },
        {
          title: "Dahi Vada",
          hindi: "दही वड़ा",
          english: "Savory Lentil Fritters",
          content: "Popular savory snack that provides a perfect balance to the sweet dishes during Holi. Made from urad dal (black gram) or moong dal (green gram) that's soaked for several hours and then ground into a thick batter. The batter is seasoned with ginger, green chilies, cumin seeds, and salt, then whipped to incorporate air for lightness. Round-shaped dumplings are deep-fried until golden and crispy, then soaked in water to soften. Finally, they're served in thick, seasoned yogurt (dahi) garnished with tamarind chutney, mint-coriander chutney, roasted cumin powder, and chaat masala. Some variations include adding spinach or beetroot to the batter for color and nutrition. This cooling dish helps balance the heat from spicy foods and outdoor activities during Holi celebrations."
        }
      ]
    },
    {
      type: "colors_meaning",
      title: "The Spiritual Meaning of Holi Colors",
      content: "Each color used during Holi has deep spiritual significance and represents different aspects of life and divinity.",
      subsections: [
        {
          title: "Red",
          hindi: "लाल",
          english: "Red Color",
          content: "Love & Energy - Represents the divine love of Radha and Krishna, symbolizing passion and energy."
        },
        {
          title: "Yellow", 
          hindi: "पीला",
          english: "Yellow Color",
          content: "Prosperity & Turmeric - Represents prosperity, happiness, and the sacred turmeric used in rituals."
        },
        {
          title: "Green",
          hindi: "हरा",
          english: "Green Color", 
          content: "Renewal - Represents spring, new beginnings, and the rejuvenation of nature."
        },
        {
          title: "Blue",
          hindi: "नीला",
          english: "Blue Color",
          content: "Krishna Consciousness - Represents Lord Krishna's divine consciousness and the infinite sky."
        }
      ]
    },
    {
      type: "eco_friendly",
      title: "Eco-Friendly Holi Celebration",
      content: "Celebrating Holi responsibly while honoring its spiritual significance and protecting the environment.",
      subsections: [
        {
          title: "Use Natural Colors",
          content: "Opt for natural, organic colors made from flowers and herbs instead of chemical dyes that can harm skin and environment."
        },
        {
          title: "Respect Consent",
          content: "Always ask for permission before applying colors to others, especially children and elders who may not wish to participate."
        },
        {
          title: "Protect Animals",
          content: "Avoid using colors that may harm animals. Keep pets indoors during color play and clean up any spills properly."
        },
        {
          title: "Stay Hydrated",
          content: "Drink plenty of water and stay hydrated during outdoor celebrations, especially when playing in the sun."
        }
      ]
    }
  ]
};

export default function HoliPage() {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [expandedFood, setExpandedFood] = useState<number | null>(null);

  const festival = festivalData;
  
  if (!festival) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('festivals', festival.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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

      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 opacity-20">
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute top-10 left-10 w-32 h-32 bg-red-300 rounded-full opacity-30 animate-bounce"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-300 rounded-full opacity-30 animate-bounce delay-100"></div>
            <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-pink-300 rounded-full opacity-30 animate-bounce delay-200"></div>
            <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-green-300 rounded-full opacity-30 animate-bounce delay-300"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-12 border border-orange-200">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-6">
              होली - Holi
            </h1>
            
            <div className="space-y-4 text-lg">
              <p className="text-2xl font-semibold text-orange-800">
                वसन्तोत्सवोऽयं रंगोत्सवः प्रेमोत्सवश्च।
              </p>
              <p className="text-xl text-orange-700">
                होली – रंगों का उत्सव, प्रेम और भक्ति का पर्व।
              </p>
              <p className="text-lg text-gray-700 font-medium">
                Holi – The Festival of Colors, Divine Love, and Spiritual Renewal
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <div className="animate-bounce">
                <ChevronDown className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Holi Celebrations
              </h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                <img 
                    src="/holi-celebration.svg" 
                    alt="Holi celebration with colors and people throwing colored powder"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Vibrant Color Celebrations
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      People gather in streets and open spaces to celebrate Holi by throwing colored powder (gulal) and water colors at each other, dancing to traditional drums, and sharing festive foods.
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Banner Ad */}
        <BannerAd />

        {/* Significance Section - 3 Columns */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-orange-900 mb-12">
            Significance of Holi
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Spiritual Significance */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-orange-100">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">
                  Spiritual Significance
                </h3>
                <p className="text-orange-600 font-medium">
                  आध्यात्मिक महत्व
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The victory of Prahlada's devotion over Holika's evil, symbolizing triumph of good over evil and power of unwavering faith in the divine.
              </p>
            </div>

            {/* Seasonal Significance */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-orange-100">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">
                  Seasonal Significance
                </h3>
                <p className="text-orange-600 font-medium">
                  ऋतु महत्व
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Marks the arrival of spring, celebrating agricultural renewal, new harvests, and rejuvenation of nature after winter's dormancy.
              </p>
            </div>

            {/* Social Significance */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-orange-100">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">
                  Social Significance
                </h3>
                <p className="text-orange-600 font-medium">
                  सामाजिक महत्व
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Brings communities together, breaks down social barriers, and promotes forgiveness, unity, and celebration of human relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BannerAd />

      {/* Mythological Stories - Accordion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-orange-900 mb-12">
            Sacred Stories of Holi
          </h2>
          
          <div className="space-y-6">
            {festival.sections.find(s => s.type === 'stories')?.subsections?.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100">
                <button
                  onClick={() => setExpandedStory(expandedStory === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-orange-50 transition-colors"
                >
                  <div>
                    <h3 className="text-xl font-bold text-orange-800 mb-1">
                      {story.title}
                    </h3>
                    <p className="text-orange-600 font-medium">
                      {(story as any).hindi || ''}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {(story as any).english || ''}
                    </p>
                  </div>
                  <ChevronDown 
                    className={`h-6 w-6 text-orange-500 transition-transform ${
                      expandedStory === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {expandedStory === index && (
                  <div className="px-8 pb-6 border-t border-orange-100">
                    <div className="pt-4">
                      <div className="w-full h-1 bg-gradient-to-r from-orange-200 via-pink-200 to-yellow-200 rounded-full mb-4"></div>
                      
                      {/* Hindi Version */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-orange-900 mb-3">
                          {(story as any).hindi || ''}
                        </h4>
                        <p className="text-gray-700 leading-relaxed text-right">
                          {story.title === "Prahlada and Holika" && "होली की सबसे पूजनीय कथा प्राचीन हिंदू ग्रंथों, विशेष रूप से भागवत पुराण से उत्पन्न होती है। राजा हिरण्यकश्यपु, जिसने तपस्या के माध्यम से भगवान ब्रह्मा से एक वरदान प्राप्त किया था, जिससे वह लगभग अजेय हो गया - उसे मनुष्य या पशु, दिन या रात, अंदर या बाहर, हथियारों या नंगे हाथों से नहीं मारा जा सकता था। शक्ति से अहंकारी, उसने अपने राज्य में हर किसी से यह मांग की वे उसे सर्वोच्च देवता के रूप में पूजें। हालाँकि, उसका अपना बेटा प्रहलाद भगवान विष्णु का एक कट्टर भक्त बना रहा, अपने पिता की पूजा करने से इनकार करता रहा। अपने बेटे की भक्ति से क्रुद्ध होकर, हिरण्यकश्यपु ने प्रहलाद को कई क्रूर दंडों के अधीन किया, लेकिन विष्णु के दिव्य संरक्षण के कारण लड़का अहत्ता रहा। अंत में, हिरण्यकश्यपु की बहन होलिका, जिसे आग से प्रतिरक्षा का वरदान था, ने प्रहलाद को धोखे से जलती हुई चिता पर अपने साथ बैठने के लिए लुभाया। जैसे ही लपटें ऊंची उठीं, प्रहलाद ने अटूट विश्वास के साथ विष्णु का नाम जप किया। चमत्कारिक रूप से, होलिका का वरदान असफल हो गया क्योंकि उसने इसका उपयोग बुरे उद्देश्यों के लिए किया था, और वह आग में जल गई जबकि प्रहलाद दिव्य हस्तक्षेप से सुरक्षित रहते हुए बाहर निकला। यह दिव्य घटना शाश्वत सत्य का प्रतीक है कि भक्ति और धार्मिकता हमेशा बुराई और अहंकार पर विजय प्राप्त करती है। होलिका दहन समारोह, जहां होली की पूर्व संध्या पर अग्नियाँ जलाई जाती हैं, इसी अच्छाई पर बुराई की जीत का स्मरण करता है।"}
                          {story.title === "Radha and Krishna's Divine Love" && "होली का सबसे प्रिय पहलू भगवान कृष्ण और राधा के बीच दिव्य प्रेम (लीला) का जश्न मनाता है जो वृंदावन की पवित्र भूमि में हुआ था। लोककथाओं के अनुसार, युवा कृष्ण, अपने गहरे रंग के साथ, एक बार राधा के निष्पक्ष सौंदर्य से खेलते हुए ईर्ष्यालु थे। उनकी मां यशोदा ने खेल के तौर पर सुझाव दिया कि वे राधा के चेहरे को रंगों से रंग सकते हैं ताकि उनका रंग उनके रंग से मेल खाए। कृष्ण, अपने दोस्तों (गोपों) के साथ, ने राधा और उनकी सहेलियों (गोपियों) को खेल के तौर पर रंग लगाया, जिन्होंने बदले में कृष्ण के चेहरे को रंग लगाया। यह दिव्य खेल होली के रंग फेंकने की परंपरा की नींव बन गया। कहानी आध्यात्मिक सत्य का प्रतिनिधित्व करती है कि दिव्य प्रेम सभी शारीरिक रूपों और सामाजिक बाधाओं से परे है। वृंदावन और मथुरा में, होली का यह पहलू हफ्तों तक महान भक्ति के साथ मनाया जाता है। वृंदावन में बांके बिहारी मंदिर में प्रसिद्ध 'फूलों की होली' (फूल होली), जहां रंगों के बजाय फूल फेंके जाते हैं, और बरसाना में 'लठमार होली', जहां महिलाएं पुरुषों को डंडों से खेल के तौर पर मारती हैं, कृष्ण के राधा और गोपियों के साथ खेलने को फिर से निभाती हैं। यह दिव्य प्रेम कहानी हमें सिखाती है कि असली भक्ति और प्रेम रंग-अंधे होते हैं और हर आत्मा में दिव्य उपस्थिति का जश्न मनाते हैं।"}
                          {story.title === "Kamadeva's Revival" && "होली से जुड़ी एक अक्सर नजरअंदाज की गई लेकिन महत्वपूर्ण कहानी में कामदेव, प्रेम और इच्छा के देवता शामिल हैं। हिंदू पौराणिक कथाओं के अनुसार, जब देवी सती ने अपने पिता दक्ष के यज्ञ में आत्मदाह किया, तो भगवान शिव इतने दुखी हो गए कि उन्होंने सभी सांसारिक मामलों का त्याग कर दिया और हिमालय में गहरी ध्यान में चले गए। इससे ब्रह्मांड में असंतुलन पैदा हुआ क्योंकि सृजन ही शिव और शक्ति के मिलन पर निर्भर था। देवता, ब्रह्मांडीय व्यवस्था के बारे में चिंतित, कामदेव को शिव को ध्यान से जगाने के लिए भेजा। कामदेव ने शिव पर फूलों का तीर चलाया, जिससे उनका ध्यान भंग हुआ। क्रुद्ध होकर, शिव ने अपनी तीसरी आँख खोली और अपनी आग वाली दृष्टि से कामदेव को राख में जला दिया। हालाँकि, कामदेव के भद्र इरादों को महसूस करते हुए, शिव ने बाद में उन्हें एक वरदान दिया कि जबकि उनका शारीरिक रूप नष्ट हो गया था, वे प्रेम और इच्छा के अदृश्य बल के रूप में अस्तित्व में रहेंगे। होली उस दिन के रूप में मनाई जाती है जब कामदेव पुनर्जीवित हुए थे, दुनिया में प्रेम और जुनून की वापसी को चिह्नित करते हुए। यह कहानी नष्ट पर प्रेम की जीत और आध्यात्मिक अनुशासन को सांसारिक जिम्मेदारियों के साथ संतुलित करने के महत्व का प्रतीक है। यह हमें याद दिलाता है कि प्रेम और इच्छा, जब शुद्ध और भक्तिपूर्ण होती हैं, तो वे दिव्य सृजन के आवश्यक पहलू हैं।"}
                        </p>
                      </div>
                      
                      {/* Separator */}
                      <div className="flex items-center justify-center my-6">
                        <div className="w-full h-px bg-orange-200"></div>
                        <span className="px-4 text-orange-500 text-sm font-medium">●</span>
                        <div className="w-full h-px bg-orange-200"></div>
                      </div>
                      
                      {/* English Version */}
                      <div>
                        <h4 className="text-lg font-bold text-orange-900 mb-3">
                          {(story as any).english || ''}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {story.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <InContentAd />

      {/* Regional Celebrations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-orange-900 mb-12">
            How Holi is Celebrated
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-orange-900 mb-4">
                Mathura & Vrindavan
              </h3>
              <p className="text-orange-700 mb-4 font-medium">
                मथुरा और वृन्दावन
              </p>
              <p className="text-gray-700 leading-relaxed">
                The heartland of Holi celebrations, where festivities last for weeks. The famous Lathmar Holi of Barsana and the grand celebrations at Banke Bihari Temple attract devotees from worldwide.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-100 to-green-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-orange-900 mb-4">
                Modern Celebrations
              </h3>
              <p className="text-orange-700 mb-4 font-medium">
                आधुनिक उत्सव
              </p>
              <p className="text-gray-700 leading-relaxed">
                Community gatherings, color parties in parks and societies, and cultural programs that bring people together across all ages and backgrounds to celebrate the joy of Holi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Foods - 4 Card Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-yellow-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-orange-900 mb-12">
            Traditional Holi Delicacies
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'foods')?.subsections?.map((food, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-orange-100">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">
                    {food.title}
                  </h3>
                  <p className="text-orange-600 font-medium mb-2">
                    {(food as any).hindi || ''}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    {(food as any).english || ''}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {food.content}
                  </p>
                  
                  <button
                    onClick={() => setExpandedFood(expandedFood === index ? null : index)}
                    className="mt-4 w-full text-orange-600 hover:text-orange-800 font-medium text-sm flex items-center justify-center"
                  >
                    {expandedFood === index ? 'Hide Details' : 'How it\'s prepared'}
                    <ChevronDown 
                      className={`ml-2 h-4 w-4 transition-transform ${
                        expandedFood === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedFood === index && (
                    <div className="mt-4 pt-4 border-t border-orange-100">
                      <p className="text-gray-600 text-sm mb-3">
                        {food.title === 'Gujiya' && "The preparation begins 2-3 days before Holi. Khoya is prepared by reducing milk to solids, then mixed with finely chopped nuts, cardamom powder, and sugar. The dough is made with flour, ghee, and milk, rested for 30 minutes, then rolled thin. Filling is placed, edges sealed with water, and deep-fried in medium-hot ghee until golden. The key is maintaining the right oil temperature - too hot burns the outside, too cool makes them oily."}
                        {food.title === 'Thandai' && "Prepared by soaking almonds, poppy seeds, melon seeds, and fennel seeds overnight, then grinding into fine paste. Milk is boiled with this paste, sugar, and cardamom. Served chilled with garnish of rose petals and saffron. Some families add a pinch of black pepper for warmth. The drink should be prepared fresh and consumed within 24 hours for best taste and medicinal properties."}
                        {food.title === 'Malpua' && "Batter is prepared by mixing flour with semolina, mashed bananas, and yogurt. Sugar and cardamom are added for sweetness and aroma. The batter rests for 1-2 hours to ferment slightly. Small ladles of batter are poured into hot ghee, spreading naturally into round shapes. Fried until golden brown on both sides, then drained on paper towels. For extra richness, some add khoya or coconut to the batter."}
                        {food.title === 'Dahi Vada' && "Dal is soaked for 4-6 hours, then ground with ginger, green chilies, and salt to a thick batter. The batter is whipped vigorously for 5-10 minutes to incorporate air. Small vadas are fried in hot oil until golden. Immediately soaked in warm water for 15-20 minutes to soften, then gently squeezed and placed in seasoned yogurt. Garnished with spices and chutneys just before serving."}
                      </p>
                      <div className="text-xs text-gray-500 mt-2">
                        <strong>Key Ingredients:</strong> {
                          food.title === 'Gujiya' ? "Flour, khoya, nuts, cardamom, ghee, sugar" :
                          food.title === 'Thandai' ? "Milk, yogurt, almonds, fennel, cardamom, rose petals" :
                          food.title === 'Malpua' ? "Flour, semolina, banana, sugar, ghee, cardamom" :
                          "Urad dal, yogurt, ginger, chilies, cumin, spices"
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BannerAd />

      {/* Interactive Colors Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-orange-900 mb-12">
            The Spiritual Meaning of Colors
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {festival.sections.find(s => s.type === 'colors_meaning')?.subsections?.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(selectedColor === color.title ? null : color.title)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedColor === color.title 
                    ? 'border-orange-500 bg-orange-50 scale-105' 
                    : 'border-orange-200 bg-white hover:border-orange-300'
                }`}
              >
                <div 
                  className={`w-16 h-16 rounded-full mx-auto mb-4 ${
                    color.title === 'Red' ? 'bg-red-400' :
                    color.title === 'Yellow' ? 'bg-yellow-400' :
                    color.title === 'Green' ? 'bg-green-400' :
                    'bg-blue-400'
                  }`}
                ></div>
                <h3 className="text-lg font-bold text-orange-800 mb-1">
                  {color.title}
                </h3>
                <p className="text-orange-600 text-sm">
                  {(color as any).hindi || ''}
                </p>
              </button>
            ))}
          </div>
          
          {selectedColor && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-orange-900 mb-4">
                {selectedColor}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {festival.sections.find(s => s.type === 'colors_meaning')?.subsections?.find(c => c.title === selectedColor)?.content}
              </p>
            </div>
          )}
        </div>
      </section>

      <InContentAd />

      {/* Eco-Friendly Holi */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-orange-900 mb-12">
            Eco-Friendly Holi Celebration
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'eco_friendly')?.subsections?.map((tip, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                <div className="w-12 h-12 bg-green-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-orange-800 mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
