'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import DestinationCard from './DestinationCard';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayRef = useRef(null);
  
  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    duration: 20,
    dragFree: false,
    containScroll: 'trimSnaps',
  });

  // Fallback data with Package schema fields
  const fallbackDestinations = [
    {
      id: 1,
      title: "Taj Mahal Sunrise Tour",
      location: "Agra, India",
      price: "$89",
      image: "/images/taj.webp",
      rating: 4.8,
      reviews: 124,
      type: "luxury",
      highlights: ["Sunrise View", "Private Guide", "Breakfast Included"],
      inclusions: ["Hotel Pickup", "Guide", "Entry Fees"],
      availability: "available",
      maxPax: 10,
    },
    {
      id: 2,
      title: "Agra Heritage Trail",
      location: "Agra, India",
      price: "$99",
      image: "/images/amber.jpg",
      rating: 4.9,
      reviews: 203,
      type: "cultural",
      highlights: ["Heritage Sites", "Local Guide", "Lunch Included"],
      inclusions: ["Transport", "Guide", "Meals"],
      availability: "available",
      maxPax: 15,
    },
    {
      id: 3,
      title: "Fatehpur Sikri Day Trip",
      location: "Fatehpur Sikri, India",
      price: "$70",
      image: "/images/Fatehpur.jpg",
      rating: 4.7,
      reviews: 156,
      type: "historical",
      highlights: ["Ancient City", "Architecture Tour", "Photo Stop"],
      inclusions: ["Transport", "Guide", "Water"],
      availability: "available",
      maxPax: 12,
    },
    {
      id: 4,
      title: "Mughal Grand Circuit",
      location: "Agra, India",
      price: "$120",
      image: "/images/Mehtab.jpg",
      rating: 4.9,
      reviews: 189,
      type: "premium",
      highlights: ["Multiple Monuments", "Luxury Transport", "Fine Dining"],
      inclusions: ["AC Transport", "Guide", "Meals", "Entry Fees"],
      availability: "available",
      maxPax: 8,
    },
    {
      id: 5,
      title: "Wildlife Safari Adventure",
      location: "Bharatpur, India",
      price: "$150",
      image: "/images/Moti.jpg",
      rating: 4.8,
      reviews: 145,
      type: "adventure",
      highlights: ["Jungle Safari", "Bird Watching", "Nature Walk"],
      inclusions: ["Safari Jeep", "Guide", "Refreshments"],
      availability: "available",
      maxPax: 6,
    },
    {
      id: 6,
      title: "Spiritual Journey Tour",
      location: "Vrindavan, India",
      price: "$95",
      image: "/images/Mankameshwar.png",
      rating: 4.9,
      reviews: 210,
      type: "spiritual",
      highlights: ["Temple Visit", "Spiritual Guide", "Puja Ceremony"],
      inclusions: ["Transport", "Guide", "Prasad"],
      availability: "available",
      maxPax: 20,
    }
  ];

  // Fetch destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/packages');
        
        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }
        
        const result = await response.json();
        
        let packagesData = [];
        
        if (result.success && result.data) {
          if (Array.isArray(result.data)) {
            packagesData = result.data;
          }
        } else if (Array.isArray(result)) {
          packagesData = result;
        } else if (result.data && Array.isArray(result.data)) {
          packagesData = result.data;
        }
        
        if (packagesData.length > 0) {
          const mappedData = packagesData.map((item, idx) => ({
            id: item._id || item.id || `temp-${idx}`,
            title: item.name || item.title || 'Untitled',
            location: item.mainDestination || item.location || 'Unknown Location',
            price: item.priceFrom 
              ? `${item.currency || '₹'} ${item.priceFrom}` 
              : item.price 
                ? `${item.currency || '$'} ${item.price}` 
                : '₹ 0',
            image: item.featuredImage || item.image || '/images/placeholder.jpg',
            rating: item.rating || 4.5,
            reviews: item.reviewCount || item.reviews || 0,
            description: item.shortDescription || item.description || '',
            duration: item.duration || '',
            durationDays: item.durationDays || 1,
            durationNights: item.durationNights || 0,
            highlights: item.highlights || [],
            inclusions: item.inclusions || [],
            exclusions: item.exclusions || [],
            categoryId: item.categoryId || null,
            type: item.type || 'private',
            availability: item.availability || 'available',
            slug: item.slug || '',
            galleryImages: item.galleryImages || [],
            videoUrl: item.videoUrl || '',
            minPax: item.minPax || 1,
            maxPax: item.maxPax || 20,
            original: item,
            isFeatured: idx < 2,
          }));
          
          setDestinations(mappedData);
        } else {
          setDestinations(fallbackDestinations);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError(err.message || 'Something went wrong');
        setDestinations(fallbackDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Embla carousel event handlers
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('init', onInit);
    onInit();
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('init', onInit);
    };
  }, [emblaApi, onSelect, onInit]);

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      if (emblaApi && isPlaying) {
        emblaApi.scrollNext();
      }
    }, 3000); // Change slide every 3 seconds
  }, [emblaApi, isPlaying]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Handle autoplay start/stop
  useEffect(() => {
    if (emblaApi && destinations.length > 0) {
      if (isPlaying) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    }
    return () => {
      stopAutoplay();
    };
  }, [emblaApi, destinations.length, isPlaying, startAutoplay, stopAutoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => {
    if (isPlaying) {
      stopAutoplay();
    }
  }, [isPlaying, stopAutoplay]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      startAutoplay();
    }
  }, [isPlaying, startAutoplay]);

  // Navigation functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      stopAutoplay();
      emblaApi.scrollPrev();
      if (isPlaying) {
        setTimeout(() => startAutoplay(), 5000);
      }
    }
  }, [emblaApi, stopAutoplay, startAutoplay, isPlaying]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      stopAutoplay();
      emblaApi.scrollNext();
      if (isPlaying) {
        setTimeout(() => startAutoplay(), 5000);
      }
    }
  }, [emblaApi, stopAutoplay, startAutoplay, isPlaying]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) {
      stopAutoplay();
      emblaApi.scrollTo(index);
      if (isPlaying) {
        setTimeout(() => startAutoplay(), 5000);
      }
    }
  }, [emblaApi, stopAutoplay, startAutoplay, isPlaying]);

  const handleBookNow = (destination) => {
    console.log('Book now clicked for:', destination.title);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-b from-orange-50 via-white to-amber-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && destinations.length === 0) {
    return (
      <div className="bg-gradient-to-b from-orange-50 via-white to-amber-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If no destinations to show
  if (destinations.length === 0) {
    return (
      <div className="bg-gradient-to-b from-orange-50 via-white to-amber-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">No destinations available.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-gradient-to-b from-orange-50 via-white to-amber-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pop overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Heading & Navigation Row */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <div className="flex  lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
          {/* Left Side - Heading */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-3">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-orange-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                {isPlaying ? 'Explore Now' : 'Paused'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                Find Popular
              </span>
              <br className="sm:hidden" />
              <span className="text-gray-800"> Destinations</span>
            </h2>
          </div>

          {/* Right Side - Navigation Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Play/Pause Button */}
         
            <button
              onClick={scrollPrev}
              className="group bg-white hover:bg-orange-50 text-orange-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={scrollNext}
              className="group bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Embla Carousel Container */}
      <div className="max-w-7xl mx-auto relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 sm:-ml-5 md:-ml-6">
            {destinations.map((dest, index) => (
              <div 
                key={dest.id || index} 
                className="flex-[0_0_100%] min-w-0 pl-4 sm:pl-5 md:pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="h-full">
                  <DestinationCard
                    destination={dest}
                    index={index}
                    direction="left"
                    onBookNow={handleBookNow}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

       

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index 
                  ? 'w-8 bg-gradient-to-r from-orange-500 to-amber-500 shadow-md' 
                  : 'w-2 bg-gray-300 hover:bg-orange-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Add custom animation for progress bar */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 3s linear infinite;
        }
      `}</style>
    </div>
  );
}