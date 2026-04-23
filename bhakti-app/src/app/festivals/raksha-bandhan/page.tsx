"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Sparkles, ChevronRight, Clock, MapPin, Heart, BookOpen, Users } from "lucide-react";
import { BannerAd, InContentAd } from "@/components/AdBlock";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";

// Static data - in production this would be loaded from JSON
const festivalData = {
  id: "raksha-bandhan",
  name: "Raksha Bandhan",
  title: "Bond of Protection",
  description: "Raksha Bandhan is the beautiful festival celebrating the sacred bond between brothers and sisters. Sisters tie rakhi (sacred threads) on their brothers' wrists, praying for their well-being, while brothers promise to protect their sisters throughout life.",
  duration: "1 day",
  icon: "👫",
  significance: "Celebrates the eternal bond of love, protection, and duty between brothers and sisters, strengthening family relationships.",
  season: "season-from-json",
  regions: ["North India", "West India", "All India", "Nepal", "Mauritius"],
  sections: [
    {
      type: "hero",
      title: "Welcome to Raksha Bandhan",
      content: "Raksha Bandhan is one of the most heartwarming festivals in Hindu culture, celebrating the beautiful relationship between brothers and sisters through the sacred thread of protection and love."
    },
    {
      type: "spiritual_significance",
      title: "Spiritual Significance",
      content: "Raksha Bandhan represents the divine duty of protection and the sacred bond of love. It teaches us about responsibility, care, and the importance of family relationships in spiritual growth."
    },
    {
      type: "legends",
      title: "Sacred Legends and Stories",
      content: "Several beautiful legends from Hindu mythology explain the origin and significance of Raksha Bandhan.",
      subsections: [
        {
          title: "Draupadi and Krishna",
          content: "The most famous story of Raksha Bandhan involves Lord Krishna and Draupadi. During the Mahabharata, when Krishna hurt his finger while fighting the evil king Shishupala, Draupadi immediately tore a piece of her saree and tied it around his finger to stop the bleeding. Deeply moved by this gesture of love and care, Krishna promised to protect her always. Years later, when Draupadi was being dishonored in the Kaurava court, Krishna's divine intervention saved her dignity by miraculously providing an endless saree. This story established the tradition of rakhi as a symbol of protection and brotherly love.",
          hindi: "द्रौपदी और कृष्ण",
          english: "Draupadi and Krishna"
        },
        {
          title: "Queen Karnavati and Emperor Humayun",
          content: "A historical legend tells of Queen Karnavati of Chittor, who faced imminent invasion by Bahadur Shah of Gujarat. Unable to defend her kingdom alone, she sent a rakhi to Emperor Humayun, the Mughal ruler, seeking his protection. Touched by the sisterly bond and honor of the rakhi, Humayun immediately marched to protect her. Though he arrived too late to save Chittor, the gesture established that rakhi transcends religious and cultural boundaries, representing universal brotherhood and protection.",
          hindi: "रानी कर्णावती और सम्राट हुमायूँ",
          english: "Queen Karnavati and Emperor Humayun"
        },
        {
          title: "Yama and the Yamuna",
          content: "According to mythology, Yama, the god of death, was blessed by his sister Yamuna when she tied a rakhi on him. Touched by this gesture, Yama granted her immortality and declared that any brother who receives a rakhi from his sister and promises to protect her would also be blessed with long life and prosperity. This divine story established the spiritual significance of rakhi as a bond that transcends even death and brings divine blessings to both siblings.",
          hindi: "यम और यमुना",
          english: "Yama and the Yamuna"
        }
      ]
    },
    {
      type: "celebrations",
      title: "How Raksha Bandhan is Celebrated",
      content: "Raksha Bandhan celebrations are filled with love, rituals, and family gatherings that strengthen the sibling bond.",
      subsections: [
        {
          title: "The Rakhi Tying Ceremony",
          content: "The main ritual begins with sisters preparing a thali (plate) containing rakhi, roli (vermilion), chawal (rice grains), sweets, and a diya (lamp). The ceremony starts with a prayer, followed by the sister applying a tilak (vermilion mark) on her brother's forehead and tying the rakhi on his wrist. While tying the rakhi, she prays for her brother's long life, health, and prosperity. The brother, in turn, gives gifts and promises to protect his sister from all harm. This simple yet profound ritual symbolizes the eternal bond of love and protection.",
          hindi: "राखी बांधने की रस्म",
          english: "The Rakhi Tying Ceremony"
        },
        {
          title: "Traditional Gifts and Blessings",
          content: "After the rakhi tying ceremony, brothers give gifts to their sisters as a token of love and appreciation. Traditional gifts include clothes, jewelry, money, sweets, and other items the sister desires. Modern celebrations include gadgets, books, and experiential gifts. The exchange of gifts is not materialistic but represents the brother's commitment to his sister's happiness and well-being. Sisters also prepare special dishes and sweets for their brothers, showing their love through culinary expressions.",
          hindi: "पारंपरिक उपहार और आशीर्वाद",
          english: "Traditional Gifts and Blessings"
        },
        {
          title: "Family Gatherings and Feasts",
          content: "Raksha Bandhan is an occasion for family reunions and celebrations. Families gather to celebrate together, sharing meals and creating memories. Special dishes are prepared, including sweets like kheer, barfi, and laddoos. The atmosphere is filled with joy as cousins and extended family members also participate in the celebrations. These gatherings strengthen not just the sibling bond but the entire family fabric, creating a network of love and support that extends beyond the immediate brother-sister relationship.",
          hindi: "पारिवारिक सम्मेलन और भोज",
          english: "Family Gatherings and Feasts"
        },
        {
          title: "Regional Variations",
          content: "Different regions celebrate Raksha Bandhan with unique customs. In Maharashtra, the festival is known as Narali Purnima, and fishermen worship the sea god Varuna. In Uttarakhand, it's called Janopurnima, where people change their sacred threads (jano). In Odisha and West Bengal, sisters tie rakhi on their brothers' wrists, but also celebrate the bond of friendship. These regional variations show how the core value of protection and love adapts to local cultures while maintaining its spiritual essence.",
          hindi: "क्षेत्रीय विविधताएँ",
          english: "Regional Variations"
        }
      ]
    },
    {
      type: "foods",
      title: "Traditional Raksha Bandhan Delicacies",
      content: "Special sweets and dishes prepared for Raksha Bandhan symbolize the sweetness of the sibling relationship.",
      subsections: [
        {
          title: "Kheer",
          hindi: "क्षीर",
          english: "Rice Pudding",
          content: "A creamy dessert made from basmati rice, milk, sugar, and flavored with cardamom and saffron. Kheer is traditionally prepared for Raksha Bandhan as it represents the sweet and smooth relationship between siblings. The rice is slow-cooked in milk until tender, then sweetened and garnished with nuts and raisins. This dessert is often prepared in large quantities to share with family and neighbors, symbolizing the abundance of love and the importance of sharing happiness with others."
        },
        {
          title: "Barfi",
          hindi: "बर्फी",
          english: "Milk Fudge",
          content: "A dense milk-based sweet made from condensed milk, sugar, and ghee, often flavored with cardamom and garnished with nuts. Barfi comes in various varieties including plain, chocolate, pista, and coconut. This sweet represents the solid, unbreakable bond between siblings. The process of making barfi requires patience and precision, symbolizing the care and attention needed to maintain strong family relationships throughout life."
        },
        {
          title: "Ladoo",
          hindi: "लड्डू",
          english: "Sweet Balls",
          content: "Round sweets made from gram flour (besan), semolina (rava), or coconut, mixed with sugar and ghee. Ladoos are shaped into perfect spheres, representing the completeness and perfection of the sibling bond. The round shape also symbolizes the cyclical nature of life and relationships. Different regions have their own varieties, but all represent the same love and affection that siblings share for each other."
        },
        {
          title: "Namkeen Paratha",
          hindi: "नमकीन पराठा",
          english: "Savory Flatbread",
          content: "A savory flatbread stuffed with spiced potatoes, peas, or lentils, served with yogurt and pickles. While Raksha Bandhan is known for sweets, savory dishes like namkeen paratha balance the meal and represent the different aspects of sibling relationships - sometimes sweet, sometimes savory, but always nourishing and essential. The stuffing represents the hidden love and care that siblings have for each other, even when not explicitly expressed."
        }
      ]
    },
    {
      type: "modern_significance",
      title: "Modern Significance and Adaptations",
      content: "Raksha Bandhan has evolved to embrace modern values while maintaining its core spiritual essence.",
      subsections: [
        {
          title: "Virtual Celebrations",
          content: "In the digital age, siblings separated by distance celebrate through video calls, online rakhi delivery, and virtual ceremonies. Technology has helped maintain the tradition across borders and time zones."
        },
        {
          title: "Eco-Friendly Rakhis",
          content: "Modern celebrations emphasize sustainability with rakhis made from recycled materials, seeds, and natural fibers, promoting environmental consciousness."
        },
        {
          title: "Social Rakhi",
          content: "The concept has expanded to include tying rakhi to soldiers, environmental causes, and social initiatives, extending the bond of protection to society."
        },
        {
          title: "Gender-Inclusive Celebrations",
          content: "Modern interpretations include sisters protecting brothers and same-gender siblings celebrating their bond, emphasizing mutual care and protection."
        }
      ]
    }
  ]
};

export default function RakshaBandhanPage() {
  const festival = festivalData;
  
  if (!festival) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs('festivals', festival.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-900">Bhakti</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/festivals" className="text-green-700 hover:text-green-900 transition-colors">Festivals</Link>
              <Link href="/aartis" className="text-green-700 hover:text-green-900 transition-colors">Aartis</Link>
              <Link href="/bhajans" className="text-green-700 hover:text-green-900 transition-colors">Bhajans</Link>
              <Link href="/chalisas" className="text-green-700 hover:text-green-900 transition-colors">Chalisas</Link>
              <Link href="/mantras" className="text-green-700 hover:text-green-900 transition-colors">Mantras</Link>
              <Link href="/stories" className="text-green-700 hover:text-green-900 transition-colors">Stories</Link>
              <Link href="/gods" className="text-green-700 hover:text-green-900 transition-colors">Gods</Link>
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
          
          <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl shadow-xl p-8 md:p-12 border border-green-200">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-6">
                {festival.name}
              </h1>
              <p className="text-xl text-green-700 mb-2">
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
          <div className="bg-white rounded-lg shadow-md p-6 border border-green-100">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="font-medium">{festival.season}</span>
            </div>
            <p className="text-gray-600 text-sm">Date</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-green-100">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="font-medium">{festival.duration}</span>
            </div>
            <p className="text-gray-600 text-sm">Duration</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-green-100">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="font-medium">{festival.regions.length}+ Regions</span>
            </div>
            <p className="text-gray-600 text-sm">Celebrated in</p>
          </div>
        </div>

        {/* Significance Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Significance</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              {festival.significance}
            </p>
          </div>
        </section>

        <InContentAd />

        {/* Legends Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Sacred Legends and Stories</h2>
          <div className="space-y-6">
            {festival.sections.find(s => s.type === 'legends')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-green-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-green-900 mb-6">How Raksha Bandhan is Celebrated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {festival.sections.find(s => s.type === 'celebrations')?.subsections?.map((subsection, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {subsection.title}
                </h3>
                <p className="text-green-600 font-medium mb-3">
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
          <h2 className="text-3xl font-bold text-green-900 mb-6">Traditional Raksha Bandhan Delicacies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'foods')?.subsections?.map((food, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  {food.title}
                </h3>
                <p className="text-green-600 font-medium mb-2">
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

        {/* Modern Significance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Modern Significance and Adaptations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festival.sections.find(s => s.type === 'modern_significance')?.subsections?.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-green-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Festivals */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Related Festivals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/festivals/bhai-dooj" className="bg-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">👫</span>
                <h3 className="text-lg font-bold text-green-800">Bhai Dooj</h3>
              </div>
              <p className="text-gray-600 text-sm">Brother-Sister Festival</p>
            </Link>
            
            <Link href="/festivals/diwali" className="bg-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🪔</span>
                <h3 className="text-lg font-bold text-green-800">Diwali</h3>
              </div>
              <p className="text-gray-600 text-sm">Festival of Lights</p>
            </Link>
            
            <Link href="/festivals/navratri" className="bg-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💃</span>
                <h3 className="text-lg font-bold text-green-800">Navratri</h3>
              </div>
              <p className="text-gray-600 text-sm">Nine Nights of Goddess</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-semibold">Bhakti</span>
          </div>
          <p className="text-green-200">
            Celebrating the divine festivals of Sanatana Dharma with devotion and love
          </p>
          <div className="mt-6 space-x-6 flex justify-center">
            <Link href="/festivals" className="text-green-200 hover:text-white transition-colors">
              Festivals
            </Link>
            <Link href="/aartis" className="text-green-200 hover:text-white transition-colors">
              Aartis
            </Link>
            <Link href="/mantras" className="text-green-200 hover:text-white transition-colors">
              Mantras
            </Link>
            <Link href="/stories" className="text-green-200 hover:text-white transition-colors">
              Stories
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
