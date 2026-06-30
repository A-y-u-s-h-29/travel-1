'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Users, 
  Star, 
  Award, 
  Clock, 
  Heart, 
  Shield, 
  Compass,
  Calendar,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Building2,
  User,
  Quote,
  Car,
  Camera,
  ShoppingBag,
  Sun,
  CloudRain,
  Thermometer,
  Info
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pop mb-10">
      
      {/* Hero Image - Responsive */}
      <div className="relative w-full h-[50vh] xs:h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh] xl:h-[100vh] overflow-hidden">
        <Image
          src="/images/about.png"
          alt="Delhi Agra Tour Packages - About Us"
          fill
          className="object-cover object-center"
          priority
        />
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white/10" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-xl px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full shadow-lg border border-orange-200 mb-3 sm:mb-4 md:mb-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-orange-600 uppercase tracking-widest">
              About Us
            </span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight max-w-4xl drop-shadow-lg px-2">
            Trending Delhi Agra{" "}
            <span className="text-orange-400 drop-shadow-lg block sm:inline">
              Tour Packages
            </span>
          </h1>

          <p className="text-white/90 mt-2 sm:mt-3 md:mt-4 max-w-2xl text-xs xs:text-sm sm:text-base md:text-lg font-light drop-shadow-lg px-2">
            Experience the magic of India's most iconic cities — from the vibrant streets of Delhi to the timeless beauty of the Taj Mahal.
          </p>

          {/* Stats Badges - Responsive */}
          <div className="mt-4 sm:mt-6 md:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 border border-orange-200 shadow-lg">
              <span className="text-orange-700 text-[10px] xs:text-xs sm:text-sm font-medium whitespace-nowrap">
                <Users className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 text-orange-500" />
                10,000+ Happy Travelers
              </span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 border border-orange-200 shadow-lg">
              <span className="text-orange-700 text-[10px] xs:text-xs sm:text-sm font-medium whitespace-nowrap">
                <Star className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 text-orange-500 fill-orange-500" />
                4.8 ★ Trust Rating
              </span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 border border-orange-200 shadow-lg">
              <span className="text-orange-700 text-[10px] xs:text-xs sm:text-sm font-medium whitespace-nowrap">
                <Clock className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 text-orange-500" />
                Since 2015
              </span>
            </div>
          </div>
        </div>

        {/* Wave Effect at Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-8 xs:h-10 sm:h-12 md:h-16 lg:h-20"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <path
              d="M0,40 C360,120 720,0 1080,60 C1260,90 1380,70 1440,50 L1440,120 L0,120 Z"
              fill="#ffffff"
              opacity="1"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 -mt-3 sm:-mt-4 md:-mt-6 lg:-mt-8 relative z-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-100 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          
          {/* Introduction Section */}
          <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <span className="inline-block bg-orange-500 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3">
                Welcome
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Trending Delhi Agra Tour Packages
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mt-2 sm:mt-3 rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 text-orange-700/70 text-xs xs:text-sm sm:text-base leading-relaxed">
              <p>
                There are short trips that will always feel great in the heart. One such journey is the suite of a <span className="font-semibold text-orange-600">Delhi Agra Tour Package</span>. It starts in an automobile by leaving the vibrant streets of Delhi, travelling on an open highway, you will be standing before the Taj Mahal in a couple of hours – the white dome glimmering softly in the early morning sunlight.
              </p>
              <p>
                Agra is not just a lesson of a monument. It is of red sandstone forts, and gardens beside the Yamuna, markets full of texture of colour, and tastes that are with you, even when you leave. A <span className="font-semibold text-orange-600">same day Delhi Agra tour</span> makes this all possible without a rush, with a chance to see – and time to breathe.
              </p>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 bg-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-orange-200">
            <div className="text-center mb-6 sm:mb-8">
              <span className="inline-block bg-orange-500 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3">
                Why Choose Us
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Why Choose a Delhi Agra Tour Package
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mt-2 sm:mt-3 rounded-full" />
            </div>

            <p className="text-orange-700/70 text-xs xs:text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-center mb-6 sm:mb-8">
              Travel is lighter when the details are cared for. A Delhi Agra Tour Package gives you more than transport and tickets. It gives you a rhythm. You can walk slowly in Delhi's old lanes, stand quietly at India Gate, and still reach Agra in time to watch the Taj Mahal glow at sunset.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl flex items-start gap-2 sm:gap-3 border border-orange-200 shadow-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs xs:text-sm font-semibold text-orange-800">Same Day Delhi Agra Tour</h4>
                  <p className="text-[10px] xs:text-xs text-orange-600/60 mt-0.5">For travellers with limited time.</p>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl flex items-start gap-2 sm:gap-3 border border-orange-200 shadow-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs xs:text-sm font-semibold text-orange-800">Taj Mahal Tour from Delhi</h4>
                  <p className="text-[10px] xs:text-xs text-orange-600/60 mt-0.5">Focus on Agra's crown jewel.</p>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl flex items-start gap-2 sm:gap-3 border border-orange-200 shadow-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs xs:text-sm font-semibold text-orange-800">Golden Triangle India Tour</h4>
                  <p className="text-[10px] xs:text-xs text-orange-600/60 mt-0.5">Delhi, Agra & Jaipur together.</p>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl flex items-start gap-2 sm:gap-3 border border-orange-200 shadow-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs xs:text-sm font-semibold text-orange-800">Weekend Packages</h4>
                  <p className="text-[10px] xs:text-xs text-orange-600/60 mt-0.5">Slow pace with markets & more.</p>
                </div>
              </div>
            </div>

            <p className="text-orange-600/60 text-[10px] xs:text-xs sm:text-sm mt-4 sm:mt-6 text-center max-w-2xl mx-auto">
              These packages allow you to see two cities without hurry. The car waits while you explore. The itinerary flows gently, leaving space for meals, markets, and moments of silence.
            </p>
          </section>

          {/* Best Places in Delhi */}
          <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <span className="inline-block bg-orange-500 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3">
                Explore Delhi
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Best Places to Visit in Delhi
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mt-2 sm:mt-3 rounded-full" />
            </div>

            <p className="text-orange-700/60 text-xs xs:text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-center mb-6 sm:mb-8">
              Delhi is not only a capital city. It is a museum of time where empires left their footprints.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Red Fort</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">The magnificent walls of emperors.</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">India Gate</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">A symbol of nationalism and pride.</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Qutub Minar</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">A 12th-century towering wonder.</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Lotus Temple</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Peace and silence within.</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Akshardham Temple</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Art, spirituality & cultural shows.</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Jama Masjid</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">One of India's largest mosques.</p>
              </div>
            </div>

            <p className="text-orange-600/50 text-[10px] xs:text-xs sm:text-sm mt-4 sm:mt-6 text-center max-w-2xl mx-auto">
              In Delhi, history and daily life walk side by side. A good package balances these visits so you see both the grandeur and the small details.
            </p>
          </section>

          {/* Best Places in Agra */}
          <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 bg-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-orange-200">
            <div className="text-center mb-6 sm:mb-8">
              <span className="inline-block bg-orange-500 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3">
                Explore Agra
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Best Places to Visit in Agra
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mt-2 sm:mt-3 rounded-full" />
            </div>

            <p className="text-orange-700/70 text-xs xs:text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-center mb-6 sm:mb-8">
              Agra, once the capital of the Mughal empire, still holds its heart in stone and marble.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 shadow-sm">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Taj Mahal</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Built by Shah Jahan for Mumtaz. Visit early for soft light, or at sunset.</p>
              </div>
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 shadow-sm">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Agra Fort</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">A red sandstone wonder with palaces and gardens.</p>
              </div>
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 shadow-sm">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Mehtab Bagh</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Across the Yamuna, frames the Taj like a mirror.</p>
              </div>
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 shadow-sm">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Baby Taj</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">A delicate tomb with fine marble inlay work.</p>
              </div>
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-orange-200 shadow-sm xs:col-span-2">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Fatehpur Sikri</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">The abandoned Mughal city with Buland Darwaza.</p>
              </div>
            </div>

            <p className="text-orange-600/60 text-[10px] xs:text-xs sm:text-sm mt-4 sm:mt-6 text-center max-w-2xl mx-auto">
              Every Delhi Agra Tour Package includes these highlights, giving enough time for the Taj, while also letting travellers see Agra's hidden gems.
            </p>
          </section>

          {/* Best Time to Visit */}
          <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <span className="inline-block bg-orange-500 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3">
                Plan Your Trip
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Best Time to Book
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mt-2 sm:mt-3 rounded-full" />
            </div>

            <p className="text-orange-700/60 text-xs xs:text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-center mb-6 sm:mb-8">
              The best time for a Delhi Agra Tour Package is between October and March.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 transition-all">
                <Thermometer className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Winter (Oct–Mar)</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Pleasant weather, perfect for sightseeing.</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 transition-all">
                <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Summer (Apr–Jun)</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Hot, but early starts make it comfortable.</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 transition-all xs:col-span-2 sm:col-span-1">
                <CloudRain className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Monsoon (Jul–Sep)</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Fewer crowds, fresh greenery, magical Taj views.</p>
              </div>
            </div>

            <p className="text-orange-600/50 text-[10px] xs:text-xs sm:text-sm mt-4 sm:mt-6 text-center max-w-2xl mx-auto">
              Every season offers a different face of Delhi and Agra. Start early, keep water handy, and allow the day to flow at its pace.
            </p>
          </section>

          {/* Travel Tips */}
          <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 bg-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-orange-200">
            <div className="text-center mb-6 sm:mb-8">
              <span className="inline-block bg-orange-500 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3">
                Travel Tips
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Travel Tips for Delhi & Agra Tour
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mt-2 sm:mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                  Before Traveling
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-[10px] xs:text-xs sm:text-sm text-orange-700/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Research attractions before traveling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Plan reservations as soon as possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Pack according to the weather</span>
                  </li>
                </ul>

                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm flex items-center gap-2 mt-3 sm:mt-4 mb-2 sm:mb-3">
                  <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                  Travel Transportation
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-[10px] xs:text-xs sm:text-sm text-orange-700/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Use our air-conditioned transport vehicles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Know your fare before using public transport</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm flex items-center gap-2 mb-2 sm:mb-3">
                  <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                  While Traveling
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-[10px] xs:text-xs sm:text-sm text-orange-700/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Be respectful at religious sites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Stay hydrated throughout the day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Remove shoes before entering temples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Use sunscreen and insect repellent</span>
                  </li>
                </ul>

                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm flex items-center gap-2 mt-3 sm:mt-4 mb-2 sm:mb-3">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                  Shopping Tips
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-[10px] xs:text-xs sm:text-sm text-orange-700/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Haggle respectfully in local markets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Look for authentic marble handicrafts</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Travel With Us */}
          <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <span className="inline-block bg-orange-500 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3">
                Our Commitment
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Why Travel with Us
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mt-2 sm:mt-3 rounded-full" />
            </div>

            <p className="text-orange-700/60 text-xs xs:text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-center mb-6 sm:mb-8">
              At Delhi Agra Tour Packages, we believe travel should be simple and meaningful.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <Car className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Clean, AC Cars</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">For your comfort and safety</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Experienced Drivers</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Know the routes and timings</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Balanced Itineraries</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Time for sightseeing and rest</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Heritage Guides</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">Available on request</p>
              </div>
              <div className="bg-orange-50/50 p-3 sm:p-4 md:p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all xs:col-span-2 lg:col-span-1">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm">Flexible Options</h4>
                <p className="text-[10px] xs:text-xs text-orange-600/60 mt-1">For families, couples, solo</p>
              </div>
            </div>

            <p className="text-orange-700/60 text-[10px] xs:text-xs sm:text-sm mt-4 sm:mt-6 text-center max-w-2xl mx-auto">
              Our focus is not just on monuments but on moments — sipping chai outside India Gate, buying sweets in Agra's bazaars, or watching the Taj reflect in Yamuna waters.
            </p>
          </section>

          {/* Final Word */}
          <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 bg-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-orange-200">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Final Word
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mt-2 sm:mt-3 rounded-full" />
            </div>

            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 text-orange-700/70 text-xs xs:text-sm sm:text-base leading-relaxed">
              <p>
                Delhi and Agra together provide a storyline of India's empire, devotion, and beauty. Delhi talks with forts, mosques, and modern roads. Agra whispers marble, gardens, and peaceful courtyards.
              </p>
              <p>
                A <span className="font-semibold text-orange-600">Delhi Agra Tour Package</span> unifies both worlds. It is travel and it is a memory home — that moment you stood and gazed at the Taj Mahal, explored the Red Fort inside and out, tasted jalebi in Chandni Chowk's busy street, or experienced the heavy weight of history around each corner.
              </p>
              <p className="italic text-orange-600/50">
                With each Delhi Agra Tour Package, the journey and experience are not rushed. It flows with you, at your pace, and ultimately leaves you with a continued story to tell and memory to hold on to.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center text-white">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              Book Your Delhi Agra Tour Today
            </h2>
            <p className="text-white/90 text-xs xs:text-sm sm:text-base max-w-2xl mx-auto mb-4 sm:mb-6">
              Experience the magic of the Taj Mahal and the vibrant streets of Delhi with our expertly crafted tour packages.
            </p>
            <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4">
              <a 
                href="tel:+917302265809" 
                className="bg-white text-orange-600 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold hover:shadow-xl hover:shadow-white/30 transition-all hover:scale-105 flex items-center gap-2 text-xs sm:text-sm md:text-base"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                +91 7302265809
              </a>
              <a 
                href="mailto:info@delhiagratour.com" 
                className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold hover:bg-white/30 transition-all hover:scale-105 flex items-center gap-2 text-xs sm:text-sm md:text-base"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                info@delhiagratour.com
              </a>
            </div>
          </section>

        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}