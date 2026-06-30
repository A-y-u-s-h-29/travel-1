'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PopupForm from './PopupForm';

const DestinationCard = ({ destination, index, direction, onBookNow }) => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const goToDetailPage = () => {
    if (destination && (destination.id || destination._id)) {
      const slug = destination.slug || destination.id || destination._id;
      router.push(`/user/destinations/${slug}`);
    }
  };

  // Whole-card click opens the detail page
  const handleCardClick = () => {
    goToDetailPage();
  };

  // Keep keyboard users able to open the card too (Enter / Space)
  const handleCardKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToDetailPage();
    }
  };

  const handleBookNow = (e) => {
    e.stopPropagation(); // don't also trigger the card's own click
    goToDetailPage();
    if (onBookNow) {
      onBookNow(destination);
    }
  };

  const handleEnquiry = (e) => {
    e.stopPropagation(); // don't navigate away, just open the popup
    setIsPopupOpen(true);
  };

  return (
    <>
      <div
        role="link"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-orange-100 hover:border-orange-300 overflow-hidden cursor-pointer"
        style={{
          animation: direction === 'left' 
            ? `slideLeft 0.5s ease-out ${index * 0.1}s both`
            : `slideRight 0.5s ease-out ${index * 0.1}s both`
        }}
      >
        {/* Image Container */}
        <div className="relative h-58  md:h-60 lg:h-64 overflow-hidden">
          <Image
            src={destination.image || '/images/placeholder.jpg'}
            alt={destination.title || 'Destination'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 45vw, 30vw"
            priority={index === 0}
          />
          
          {/* Rating Badge */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm font-medium text-orange-600 flex items-center gap-1 shadow-md">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {destination.rating || 4.5} ({destination.reviews || 0})
          </div>
          
          {/* Duration Badge */}
          {destination.duration && (
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-black/50 backdrop-blur-sm text-white text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {destination.duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-5">
          {/* Title and Price Row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1 flex-1">
              {destination.title || 'Untitled'}
            </h3>
            <div className="flex-shrink-0">
              <span className="text-sm sm:text-base md:text-lg font-bold text-orange-600">
                {destination.price || '₹ 0'}
              </span>
              <span className="text-gray-500 text-[8px] sm:text-xs ml-0.5">/Pers</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{destination.location || 'Unknown Location'}</span>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center gap-2 pt-2 sm:pt-3 md:pt-4 border-t-2 border-orange-100">
            <button
              onClick={handleBookNow}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Book Now
            </button>
            <button
              onClick={handleEnquiry}
              className="flex-1 bg-white hover:bg-orange-50 text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 border-2 border-orange-300 hover:border-orange-400 hover:shadow-md transform hover:scale-105"
            >
              Enquiry
            </button>
          </div>
        </div>

        {/* Animation Styles */}
        <style jsx>{`
          @keyframes slideLeft {
            0% {
              opacity: 0;
              transform: translateX(60px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          @keyframes slideRight {
            0% {
              opacity: 0;
              transform: translateX(-60px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
        `}</style>
      </div>

      {/* Full Page Popup Form */}
      <PopupForm 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        destinationName={destination.title || 'Destination'}
      />
    </>
  );
};

export default DestinationCard;