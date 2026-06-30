'use client';

import React, { useEffect, useState } from 'react';
import { Search, MapPin, SlidersHorizontal, Compass, X, Clock, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';

export default function DestinationsPage() {
  const [packages, setPackages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeDestination, setActiveDestination] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 100000 });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/packages', { cache: 'no-store' });
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to load destinations');
        }

        const list = (data.data || []).map((pkg) => ({
          id: pkg._id,
          _id: pkg._id,
          slug: pkg.slug,
          title: pkg.name,
          location: pkg.mainDestination,
          image: pkg.featuredImage || '/images/placeholder.jpg',
          rating: pkg.rating || 4.5,
          reviews: pkg.reviewCount || 0,
          duration:
            pkg.durationDays && pkg.durationNights
              ? `${pkg.durationDays}D / ${pkg.durationNights}N`
              : pkg.duration || null,
          price: pkg.priceFrom || 0,
          priceDisplay: pkg.priceFrom
            ? `₹ ${Number(pkg.priceFrom).toLocaleString('en-IN')}`
            : 'Price on request',
          type: pkg.type || 'All',
          destination: pkg.mainDestination || 'All',
          createdAt: pkg.createdAt || new Date().toISOString(),
        }));

        setPackages(list);
        setFiltered(list);
        
        const prices = list.map(p => p.price).filter(p => p > 0);
        if (prices.length > 0) {
          const maxPrice = Math.max(...prices);
          setPriceRange({ min: 0, max: maxPrice });
          setSelectedPriceRange({ min: 0, max: maxPrice });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    let result = [...packages];

    if (activeType !== 'All') {
      result = result.filter(
        (pkg) => (pkg.type || '').toLowerCase() === activeType.toLowerCase()
      );
    }

    if (activeDestination !== 'All') {
      result = result.filter(
        (pkg) => (pkg.destination || '').toLowerCase() === activeDestination.toLowerCase()
      );
    }

    result = result.filter(
      (pkg) => pkg.price >= selectedPriceRange.min && pkg.price <= selectedPriceRange.max
    );

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.title?.toLowerCase().includes(q) ||
          pkg.location?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFiltered(result);
  }, [search, activeType, activeDestination, selectedPriceRange, packages, sortBy]);

  const types = [
    'All',
    ...Array.from(new Set(packages.map((p) => p.type).filter(Boolean))),
  ];

  const destinations = [
    'All',
    ...Array.from(new Set(packages.map((p) => p.destination).filter(Boolean))),
  ];

  const handlePriceChange = (type, value) => {
    setSelectedPriceRange(prev => ({
      ...prev,
      [type]: parseInt(value) || 0
    }));
  };

  const clearFilters = () => {
    setActiveType('All');
    setActiveDestination('All');
    setSearch('');
    setSortBy('default');
    setSelectedPriceRange({ min: 0, max: priceRange.max });
  };

  const getVisibleDestinations = () => {
    if (showAllDestinations) return destinations;
    return destinations.slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-white pop">
      {/* Hero Section */}
      <div 
        className="relative w-full h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh] xl:h-[100vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/des.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 z-10">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-full mb-3 sm:mb-4 border border-white/20">
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Explore Our Destinations
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
            Find Your Next Adventure
          </h1>
          <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Handpicked trips and experiences across the world&apos;s most
            breathtaking destinations.
          </p>

          <div className="mt-4 sm:mt-6 md:mt-8 max-w-xl mx-auto w-full px-2 sm:px-4">
            <div className="flex items-center gap-2 bg-white rounded-xl sm:rounded-2xl shadow-xl px-3 sm:px-4 py-2 sm:py-2.5 md:py-3">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by destination or trip name..."
                className="w-full bg-transparent outline-none text-xs sm:text-sm md:text-base text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>
          
        </div>
          <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 sm:h-16 md:h-20"
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

      {/* Mobile Filter Toggle */}
      <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-orange-100 px-4 py-4">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="w-full flex items-center justify-between bg-orange-50 hover:bg-orange-100 transition-colors rounded-xl px-4 py-2.5"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Filters & Sorting</span>
            {(activeType !== 'All' || activeDestination !== 'All' || sortBy !== 'default') && (
              <span className="ml-1 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
                {[activeType !== 'All' ? 1 : 0, activeDestination !== 'All' ? 1 : 0, sortBy !== 'default' ? 1 : 0].reduce((a, b) => a + b, 0)}
              </span>
            )}
          </div>
          {isMobileFilterOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 relative z-20">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 rounded-2xl sm:rounded-3xl md:rounded-4xl px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 bg-white shadow-lg">
          
          {/* Left Sidebar - Filters */}
          <div className={`
            w-full md:w-[25%] lg:w-[22%] xl:w-[20%] min-w-[180px] md:min-w-[200px]
            ${isMobileFilterOpen ? 'block' : 'hidden md:block'}
          `}>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-orange-100 p-3 sm:p-4 md:p-5 sticky top-20 md:top-24">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Filters</h3>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-xs text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear All
                </button>
              </div>

              {/* Sort By - Mobile Dropdown */}
              <div className="mb-4 md:mb-5">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Sort By</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-1">
                  {['default', 'latest', 'price-low', 'price-high', 'rating'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`text-left text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        sortBy === option
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-orange-50'
                      }`}
                    >
                      {option === 'default' ? 'Default' :
                       option === 'latest' ? 'Latest' :
                       option === 'price-low' ? 'Price: Low' :
                       option === 'price-high' ? 'Price: High' : 'Top Rated'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination Filter */}
              <div className="mb-4 md:mb-5">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Destination</h4>
                <div className="space-y-1 max-h-32 sm:max-h-40 overflow-y-auto scrollbar-thin">
                  {getVisibleDestinations().map((dest) => (
                    <button
                      key={dest}
                      onClick={() => setActiveDestination(dest)}
                      className={`w-full text-left text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        activeDestination === dest
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-orange-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{dest}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {destinations.length > 5 && (
                  <button
                    onClick={() => setShowAllDestinations(!showAllDestinations)}
                    className="mt-1 text-xs text-orange-500 hover:text-orange-600 font-medium"
                  >
                    {showAllDestinations ? 'Show Less' : `+${destinations.length - 5} More`}
                  </button>
                )}
              </div>

              {/* Type Filter */}
              <div className="mb-4 md:mb-5">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Trip Type</h4>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 md:flex-col md:space-y-1">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`flex-shrink-0 md:w-full text-left text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        activeType === type
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-orange-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Price Range</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <label className="text-xs text-gray-500">Min: ₹{selectedPriceRange.min.toLocaleString()}</label>
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedPriceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="w-full h-1.5 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Max: ₹{selectedPriceRange.max.toLocaleString()}</label>
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedPriceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="w-full h-1.5 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 bg-orange-50 px-2 sm:px-3 py-1.5 rounded-lg">
                    <span>₹{selectedPriceRange.min.toLocaleString()}</span>
                    <span>to</span>
                    <span>₹{selectedPriceRange.max.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Active Filters Summary */}
              {(activeType !== 'All' || activeDestination !== 'All' || search || sortBy !== 'default' || selectedPriceRange.min > 0 || selectedPriceRange.max < priceRange.max) && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-orange-100">
                  <p className="text-xs text-gray-500 mb-1.5">Active Filters:</p>
                  <div className="flex flex-wrap gap-1">
                    {sortBy !== 'default' && (
                      <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                        {sortBy === 'latest' ? 'Latest' : 
                         sortBy === 'price-low' ? 'Price: Low' :
                         sortBy === 'price-high' ? 'Price: High' : 'Top Rated'}
                        <button onClick={() => setSortBy('default')} className="hover:text-orange-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {activeDestination !== 'All' && (
                      <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                        <MapPin className="w-2.5 h-2.5" />
                        {activeDestination}
                        <button onClick={() => setActiveDestination('All')} className="hover:text-orange-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {activeType !== 'All' && (
                      <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                        {activeType}
                        <button onClick={() => setActiveType('All')} className="hover:text-orange-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {search && (
                      <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                        "{search.length > 10 ? search.slice(0, 10) + '...' : search}"
                        <button onClick={() => setSearch('')} className="hover:text-orange-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Cards */}
          <div className="w-full md:w-[75%] lg:w-[78%] xl:w-[80%]">
            {/* Results Count */}
            <div className="mb-3 sm:mb-4 flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs sm:text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filtered.length}</span> destinations
              </p>
              {sortBy !== 'default' && (
                <span className="text-xs text-orange-500 font-medium">
                  Sorted by: {sortBy === 'latest' ? 'Latest' : 
                             sortBy === 'price-low' ? 'Price (Low)' :
                             sortBy === 'price-high' ? 'Price (High)' : 'Top Rated'}
                </span>
              )}
            </div>

            {/* Grid */}
            {loading && (
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl sm:rounded-2xl border-2 border-orange-100 overflow-hidden animate-pulse"
                  >
                    <div className="h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 bg-orange-100" />
                    <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
                      <div className="h-3 sm:h-4 bg-orange-100 rounded w-3/4" />
                      <div className="h-2 sm:h-3 bg-orange-100 rounded w-1/2" />
                      <div className="h-6 sm:h-8 bg-orange-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="text-center py-12 sm:py-16 md:py-24">
                <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                  Something went wrong: {error}
                </p>
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="text-center py-12 sm:py-16 md:py-24">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-200 mx-auto mb-2 sm:mb-3 md:mb-4" />
                <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                  No destinations found. Try adjusting your filters.
                </p>
              </div>
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {filtered.map((destination, index) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    index={index}
                    direction={index % 2 === 0 ? 'left' : 'right'}
                  />
                ))}
              </div>
            )}
          </div>
          
        </div>
      
      </div>
        <div className='mt-10'></div>
    </div>
  );
}