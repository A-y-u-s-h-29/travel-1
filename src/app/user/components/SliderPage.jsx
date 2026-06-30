'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function SliderPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    { id: 1, src: '/images/taj.webp', alt: 'Taj Mahal', title: 'Taj Mahal', location: 'Agra, India' },
    { id: 2, src: '/images/tajwalk.jpg', alt: 'Taj Nature Walk', title: 'Taj Nature Walk', location: 'Agra, India' },
    { id: 3, src: '/images/Chini.jpg', alt: 'Chini Ka Rauza', title: 'Chini Ka Rauza', location: 'Agra, India' },
    { id: 4, src: '/images/Mankameshwar.png', alt: 'Mankameshwar Temple', title: 'Mankameshwar Temple', location: 'Agra, India' },
    { id: 5, src: '/images/Moti.jpg', alt: 'Moti Masjid Agra Fort', title: 'Moti Masjid Agra Fort', location: 'Agra, India' },
    { id: 6, src: '/images/amber.jpg', alt: 'Agra Fort', title: 'Agra Fort', location: 'Agra, India' },
    { id: 7, src: '/images/Fatehpur.jpg', alt: 'Fatehpur Sikri', title: 'Fatehpur Sikri', location: 'Agra, India' },
    { id: 8, src: '/images/Mehtab.jpg', alt: 'Mehtab Bagh', title: 'Mehtab Bagh', location: 'Agra, India' },
    { id: 9, src: '/images/Itimad.jpg', alt: 'Itimad-ud-Daulah', title: 'Itimad-ud-Daulah', location: 'Agra, India' },
    { id: 10, src: '/images/Mariam.jpg', alt: "Mariam's Tomb", title: "Mariam's Tomb", location: 'Agra, India' },
  ];

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setItemsPerView(1); // 1 image on very small phones
      } else if (window.innerWidth < 640) {
        setItemsPerView(2); // 2 images on mobile
      } else if (window.innerWidth < 768) {
        setItemsPerView(3); // 3 images on small tablets
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4); // 4 images on tablets
      } else {
        setItemsPerView(5); // 5 images on large screens
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get current visible images - step by step
  const getVisibleImages = useCallback(() => {
    const result = [];
    const startIdx = currentIndex % images.length;
    
    for (let i = 0; i < itemsPerView; i++) {
      const index = (startIdx + i) % images.length;
      result.push({
        ...images[index],
        uniqueKey: `${images[index].id}-${currentIndex}-${i}`
      });
    }
    return result;
  }, [currentIndex, images, itemsPerView]);

  const visibleImages = getVisibleImages();

  // Navigation - Previous/Next
  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, images.length]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, images.length]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  // Auto-slide - step by step without refreshing
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isTransitioning, images.length]);

  const currentSlide = currentIndex % images.length;
  const totalSlides = images.length;

  return (
    <div className="w-full pop bg-[#FFFAEC] py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      
      {/* Heading Section - Responsive */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-18">
          {/* Left Icon - Hidden on very small screens */}
          <div className="hidden sm:block w-10 h-10 md:w-12 md:h-12 lg:w-30 lg:h-40">
            <Image
              src="/images/tag1.webp"
              alt="Adventure icon"
              width={80}
              height={80}
               quality={90}
              className="object-contain w-full h-full"
            />
          </div>
          
          <div className="flex-1 sm:flex-none">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-light text-gray-700 mb-1 sm:mb-2 md:mb-4">
              Discover Adventures
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold">
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                That Fit You
              </span>
            </h2>
          </div>
          
          {/* Right Icon - Hidden on very small screens */}
          <div className="hidden sm:block w-10 h-10 md:w-12 md:h-12 lg:w-40 lg:h-40">
            <Image
              src="/images/tag2.webp"
              alt="Adventure icon"
              width={80}
              height={80}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Slider Container - Full Width */}
      <div className="w-full max-w-full mx-auto relative px-1 sm:px-2 md:px-4 mt-10">
        
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-orange-600 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-orange-600 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      
        {/* Images Grid - Responsive */}
        <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleImages.map((image, index) => (
            <div 
              key={image.uniqueKey}
              className="group transition-all duration-500 ease-in-out"
            >
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-tl-2xl sm:rounded-tl-3xl md:rounded-tl-full rounded-tr-2xl sm:rounded-tr-3xl md:rounded-tr-full shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border-2 border-orange-100 hover:border-orange-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index === 0}
                  sizes="(max-width: 480px) 90vw, (max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 18vw"
                  quality={90}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Title - Always visible on mobile, hover on desktop */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white transform transition-all duration-300">
                  <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold truncate group-hover:text-orange-300 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-white/80 truncate opacity-0 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.location}
                  </p>
                </div>

                {/* Step indicator badge */}
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-orange-500/80 text-white text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full backdrop-blur-sm">
                  {image.id}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators - Responsive */}
        <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 mt-4 sm:mt-5 md:mt-6 lg:mt-8 flex-wrap px-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'w-4 sm:w-5 md:w-6 lg:w-8 bg-orange-500' 
                  : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-orange-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}