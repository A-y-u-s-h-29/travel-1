'use client';

import React from 'react';
import Image from 'next/image';

export default function GalleryPage() {
  // Left section images (2 images - top and bottom)
  const leftImages = [
    {
      id: 1,
      src: "/images/amber.jpg",
      alt: "Agra Fort",
      title: "Agra Fort",
    },
    {
      id: 2,
      src: "/images/Fatehpur.jpg",
      alt: "Fatehpur Sikri",
      title: "Fatehpur Sikri",
    },
  ];

  // Middle section images (1 image only)
  const middleImages = [
    {
      id: 3,
      src: "/images/taj.webp",
      alt: "Taj Mahal",
      title: "Taj Mahal",
    },
  ];

  // Right section images - Top 1, Bottom 2
  const rightTopImage = {
    id: 4,
    src: "/images/Mehtab.jpg",
    alt: "Mehtab Bagh",
    title: "Mehtab Bagh",
  };

  const rightBottomImages = [
    {
      id: 5,
      src: "/images/Itimad.jpg",
      alt: "Itimad-ud-Daulah",
      title: "Itimad-ud-Daulah",
    },
    {
      id: 6,
      src: "/images/Mariam.jpg",
      alt: "Mariam's Tomb",
      title: "Mariam's Tomb",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pop block lg:hidden ">
      
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-10">
        <div className="text-center">
          <span className="inline-block text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">
            Explore Gallery
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              Our Destinations
            </span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Discover the beauty of Agra through our curated collection
          </p>
        </div>
      </div>

      {/* Gallery Grid - 3 Sections */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          
          {/* LEFT SECTION - 2 images (top and bottom) */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {leftImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer flex-1"
                style={{
                  animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-[280px] overflow-hidden bg-orange-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform transition-all duration-300 z-10">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold group-hover:text-orange-300 transition-colors">
                      {image.title}
                    </h3>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg sm:text-xl font-bold">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MIDDLE SECTION - 1 image (full height) */}
          <div className="flex flex-col">
            {middleImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer flex-1"
                style={{
                  animation: `fadeIn 0.6s ease-out 0.2s both`,
                }}
              >
                <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden bg-orange-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform transition-all duration-300 z-10">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-orange-300 transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-sm text-white/80">Featured Destination</p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl sm:text-3xl font-bold">{image.title}</h3>
                      <p className="text-sm text-white/80">Explore more →</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SECTION - Top 1 image, Bottom 2 images */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Right Top - 1 image */}
            <div
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              style={{
                animation: `fadeIn 0.6s ease-out 0.3s both`,
              }}
            >
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-[280px] overflow-hidden bg-orange-100">
                <Image
                  src={rightTopImage.src}
                  alt={rightTopImage.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform transition-all duration-300 z-10">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold group-hover:text-orange-300 transition-colors">
                    {rightTopImage.title}
                  </h3>
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg sm:text-xl font-bold">{rightTopImage.title}</h3>
                    <p className="text-sm text-white/80">Click to explore</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Bottom - 2 images side by side */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 flex-1">
              {rightBottomImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                  style={{
                    animation: `fadeIn 0.6s ease-out ${0.4 + index * 0.1}s both`,
                  }}
                >
                  <div className="relative w-full h-[155px] sm:h-[180px] md:h-[200px] lg:h-[280px] overflow-hidden bg-orange-100">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white transform transition-all duration-300 z-10">
                      <h3 className="text-[10px] sm:text-xs md:text-sm font-bold group-hover:text-orange-300 transition-colors truncate">
                        {image.title}
                      </h3>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <div className="text-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 p-2">
                        <h3 className="text-xs sm:text-sm font-bold">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}