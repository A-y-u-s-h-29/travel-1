'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Star, Users, Award, Clock, MapPin, Shield, Sparkles } from 'lucide-react';
import PopupForm from './PopupForm';

export default function MeetGuideSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  return (
    <>
      <div className="bg-[#FFFAEC] py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 pop overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-100 px-3 sm:px-4 py-1.5 rounded-full border border-orange-200 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-[8px] xs:text-[10px] sm:text-xs font-bold text-orange-600 uppercase tracking-wider">
                Meet Your Guide
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              Meet <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Gurudutt</span>
            </h2>
            <p className="text-gray-500 text-xs xs:text-sm sm:text-base mt-2 max-w-2xl mx-auto px-2">
              Your Delhi Agra Tour Expert — Born to guide, built for travel
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-orange-500/10 border border-orange-100/50 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              
              {/* Left - Image Section */}
              <div className="relative min-h-[250px] xs:min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px]">
                <Image
                  src="/images/FoundersImage.avif"
                  alt="Gurudutt - Delhi Agra Tour Guide"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Verified Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-lg border border-orange-200 flex items-center gap-1.5 sm:gap-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                  <span className="text-[8px] xs:text-[10px] sm:text-xs font-bold text-orange-600 whitespace-nowrap">VERIFIED LOCAL</span>
                </div>
                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-lg border border-orange-200 flex items-center gap-1.5 sm:gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-[8px] xs:text-[10px] sm:text-xs font-bold text-gray-700 whitespace-nowrap">4.8 ★ Google Rating</span>
                </div>
              </div>

              {/* Right - Content Section */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
                {/* Title */}
                <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1.5 sm:mb-2">
                  Not just a tour operator — 
                  <span className="text-orange-600 block"> your Delhi Agra Expert</span>
                </h3>
                
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  Gurudutt has been helping travelers experience the magic of Delhi and Agra since 2015. 
                  Born and raised in India, he knows every monument, every route, and every hidden gem 
                  that makes your journey unforgettable.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                  <div className="bg-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-orange-100">
                    <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-orange-600">10K+</div>
                    <div className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500">Travelers Guided</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-orange-100">
                    <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-orange-600">7+</div>
                    <div className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500">Years Experience</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-orange-100">
                    <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-orange-600">4.8 ★</div>
                    <div className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500">Google Rating</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-orange-100">
                    <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-orange-600">100%</div>
                    <div className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500">Satisfaction</div>
                  </div>
                </div>

                {/* Founder Info */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                    G
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-800">Gurudutt</p>
                    <p className="text-[10px] xs:text-[11px] sm:text-xs text-gray-500 truncate">Founder · Delhi Agra Tour Packages</p>
                  </div>
                </div>

                {/* YouTube Video CTA */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-200">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2">
                        Everything a first-time visitor should know about Delhi & Agra
                      </p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-red-600 font-medium">Watch on YouTube</span>
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-400">·</span>
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-green-600 font-medium">Free</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white text-[8px] xs:text-[9px] sm:text-xs font-semibold px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full transition-all hover:scale-105">
                      Watch Now
                    </button>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => setIsPopupOpen(true)} 
                  className="mt-3 sm:mt-4 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs xs:text-sm sm:text-base py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Plan Your Delhi Agra Tour with Gurudutt →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <PopupForm 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
}