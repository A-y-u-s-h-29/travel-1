import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Star,
  ChevronRight,
  Home,
  Compass,
  Sun,
  Moon,
  Sunset,
  Tag,
  Gauge,
  Images,
  CalendarClock,
} from "lucide-react";
import DestinationActions from "./DestinationActions";

const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

function formatPrice(pkg) {
  const symbol = CURRENCY_SYMBOLS[pkg.currency] || pkg.currency || "₹";
  if (pkg.priceFrom && pkg.priceTo && pkg.priceTo !== pkg.priceFrom) {
    return `${symbol}${Number(pkg.priceFrom).toLocaleString("en-IN")} - ${symbol}${Number(
      pkg.priceTo
    ).toLocaleString("en-IN")}`;
  }
  if (pkg.priceFrom) {
    return `${symbol}${Number(pkg.priceFrom).toLocaleString("en-IN")}`;
  }
  return "Price on request";
}

function formatDuration(pkg) {
  if (pkg.durationDays) {
    return `${pkg.durationDays}D / ${pkg.durationNights || 0}N`;
  }
  return pkg.duration || "Flexible";
}

async function getPackage(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/packages/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.success) return null;

    return data.data;
  } catch (err) {
    console.error("Error fetching package:", err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) {
    return { title: "Trip Not Found" };
  }

  return {
    title: pkg.metaTitle || pkg.name,
    description: pkg.metaDescription || pkg.shortDescription,
  };
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) {
    notFound();
  }

  const hasRating = pkg.rating > 0 && pkg.reviewCount > 0;
  const galleryThumbs = pkg.galleryImages?.slice(0, 4) || [];
  const hasGallery = galleryThumbs.length > 0;
  const remainingCount = (pkg.galleryImages?.length || 0) - galleryThumbs.length;
  const hasHighlightsOrItinerary =
    pkg.highlights?.length > 0 || pkg.itinerary?.length > 0;

  return (
    <div className="min-h-screen bg-white pop">
      {/* Breadcrumb */}
     {/* Breadcrumb - Responsive Enhanced */}
<div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 ">
  <nav className="flex items-center gap-1.5 lg:mt-15 sm:gap-2 text-xs sm:text-sm text-gray-400 overflow-x-auto scrollbar-hide whitespace-nowrap" aria-label="Breadcrumb">
    <Link 
      href="/" 
      className="flex items-center gap-1 sm:gap-1.5 hover:text-orange-600 transition-colors duration-200 flex-shrink-0"
    >
      <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span className="hidden xs:inline">Home</span>
    </Link>
    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-300 flex-shrink-0" />
    <Link 
      href="/user/destinations" 
      className="hover:text-orange-600 transition-colors duration-200 flex-shrink-0"
    >
      Destinations
    </Link>
    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-300 flex-shrink-0" />
    <span className="text-gray-700 font-medium truncate max-w-[120px] xs:max-w-[160px] sm:max-w-[200px] md:max-w-[300px]">
      {pkg.name}
    </span>
  </nav>
</div>

      {/* Hero + Gallery — large photo on the left, 2x2 thumbnail grid on the right */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
        <div
          className={`grid grid-cols-1 gap-3 ${
            hasGallery ? "lg:grid-cols-[1.6fr_1fr] lg:h-[28rem]" : ""
          }`}
        >
          {/* Main hero image */}
          <div
            className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl ${
              hasGallery ? "h-72 sm:h-96 lg:h-full" : "h-72 sm:h-96 md:h-[28rem]"
            }`}
          >
            <Image
              src={pkg.featuredImage || "/images/placeholder.jpg"}
              alt={pkg.name}
              fill
              className="object-cover"
              priority
              sizes={hasGallery ? "(max-width: 1024px) 100vw, 60vw" : "100vw"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Top-left badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                <Tag className="w-3.5 h-3.5" />
                {pkg.type}
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                <Gauge className="w-3.5 h-3.5" />
                {pkg.difficulty}
              </span>
            </div>

            {/* Bottom title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                {pkg.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {pkg.mainDestination}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {formatDuration(pkg)}
                </span>
                {hasRating && (
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {pkg.rating.toFixed(1)} ({pkg.reviewCount} reviews)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Gallery thumbnails — 2x2 grid beside the hero */}
          {hasGallery && (
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-72 sm:h-80 lg:h-full">
              {galleryThumbs.map((img, i) => {
                const isLast = i === galleryThumbs.length - 1;
                return (
                  <div
                    key={img._id || i}
                    className="relative rounded-xl sm:rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || pkg.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1024px) 50vw, 20vw"
                    />
                    {isLast && remainingCount > 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm flex items-center gap-1.5">
                          <Images className="w-4 h-4" /> +{remainingCount} more
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Overview (left) + Price / Booking sidebar (right) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Overview */}
          <div className="lg:col-span-2 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 sm:p-8 border border-orange-200/50 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-500" /> Overview
            </h2>
            {pkg.shortDescription && (
              <p className="text-gray-700 font-medium mb-2">{pkg.shortDescription}</p>
            )}
            {pkg.description && (
              <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
            )}
          </div>

          {/* Right: Price + quick info + actions */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="bg-orange-50/60 border border-orange-100 rounded-2xl p-5 sm:p-6 space-y-5">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Starting from</p>
                <p className="text-2xl font-bold text-orange-600">{formatPrice(pkg)}</p>
                <p className="text-xs text-gray-400">per person</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Group Size
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {pkg.minPax} - {pkg.maxPax}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Availability
                  </p>
                  <p className="text-sm font-semibold text-emerald-600 capitalize">
                    {pkg.availability}
                  </p>
                </div>
              </div>

              <DestinationActions destinationName={pkg.name} />
            </div>
          </div>
        </div>
      </div>

      {/* Trip Highlights (left) + Day-by-Day Itinerary (right) */}
   {hasHighlightsOrItinerary && (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
    {/* Unified container with alternating layout */}
    <div className="bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-3xl p-5 sm:p-6 md:p-8 border border-orange-200/50 shadow-lg shadow-orange-500/5">
      
      {/* If both highlights and itinerary exist, show as integrated sections */}
      {pkg.highlights?.length > 0 && pkg.itinerary?.length > 0 ? (
        <div className="space-y-8">
          
          {/* Highlights - Compact Grid */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Highlights</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent" />
              <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">
                {pkg.highlights.length}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pkg.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-gray-100/80 hover:border-orange-300 rounded-xl px-3.5 py-2.5 transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                >
                  <div className="w-5 h-5 rounded-full bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider with icon */}
          <div className="relative flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
            <div className="bg-orange-100 p-1.5 rounded-full">
              <CalendarClock className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
          </div>

          {/* Itinerary - Compact Timeline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Itinerary</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent" />
              <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">
                {pkg.itinerary.length} Days
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pkg.itinerary.map((day, index) => (
                <div
                  key={day._id || day.day}
                  className="group bg-white/90 backdrop-blur-sm border border-gray-100/80 hover:border-orange-300 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    {/* Compact day badge */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center text-sm font-bold shadow-md group-hover:shadow-orange-500/25 transition-all duration-300 group-hover:scale-105">
                        {day.day}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm group-hover:text-orange-600 transition-colors">
                        {day.title}
                      </h3>
                      
                      {day.description && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {day.description}
                        </p>
                      )}

                      {day.activities?.length > 0 && (
                        <div className="mt-2 space-y-0.5">
                          {day.activities.slice(0, 2).map((act, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                              <span className="text-orange-400 flex-shrink-0">•</span>
                              <span className="truncate">{act}</span>
                            </div>
                          ))}
                          {day.activities.length > 2 && (
                            <div className="text-xs text-orange-400 font-medium">
                              +{day.activities.length - 2} more
                            </div>
                          )}
                        </div>
                      )}

                      {/* Compact meal tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-gray-100">
                        {day.meals?.breakfast && (
                          <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                            <Sun className="w-2.5 h-2.5" /> B
                          </span>
                        )}
                        {day.meals?.lunch && (
                          <span className="flex items-center gap-1 text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">
                            <Sunset className="w-2.5 h-2.5" /> L
                          </span>
                        )}
                        {day.meals?.dinner && (
                          <span className="flex items-center gap-1 text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                            <Moon className="w-2.5 h-2.5" /> D
                          </span>
                        )}
                        {day.overnight && (
                          <span className="flex items-center gap-1 text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full truncate max-w-[80px]">
                            <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                            <span className="truncate">{day.overnight}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // If only one exists, show it full width
        <div className="space-y-6">
          {pkg.highlights?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⭐</span>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Trip Highlights</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent" />
                <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">
                  {pkg.highlights.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {pkg.highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-gray-100/80 rounded-xl px-3.5 py-2.5 hover:border-orange-300 transition-all duration-200 hover:shadow-md group"
                  >
                    <div className="w-5 h-5 rounded-full bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center flex-shrink-0 transition-colors">
                      <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {pkg.itinerary?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CalendarClock className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Day-by-Day Itinerary</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent" />
                <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">
                  {pkg.itinerary.length} Days
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.itinerary.map((day) => (
                  <div
                    key={day._id || day.day}
                    className="bg-white/90 backdrop-blur-sm border border-gray-100/80 rounded-xl p-4 hover:border-orange-300 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
                          {day.day}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm">{day.title}</h3>
                        {day.description && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{day.description}</p>
                        )}
                        {day.activities?.length > 0 && (
                          <div className="mt-2 space-y-0.5">
                            {day.activities.slice(0, 2).map((act, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                                <span className="text-orange-400 flex-shrink-0">•</span>
                                <span className="truncate">{act}</span>
                              </div>
                            ))}
                            {day.activities.length > 2 && (
                              <div className="text-xs text-orange-400 font-medium">
                                +{day.activities.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)}
      {/* Inclusions / Exclusions */}
    {(pkg.inclusions?.length > 0 || pkg.exclusions?.length > 0) && (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    <div className="bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-3xl border border-orange-200/50 p-5 sm:p-6 md:p-8 shadow-lg shadow-orange-500/5">
      
      {/* Unified header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">Inclusions & Exclusions</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent" />
        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">
          {pkg.inclusions?.length || 0} In / {pkg.exclusions?.length || 0} Out
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        
        {/* Inclusions */}
        {pkg.inclusions?.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-emerald-200/50 hover:border-emerald-300 transition-all duration-200 hover:shadow-md hover:shadow-emerald-500/5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm sm:text-base">What's Included</h4>
              <span className="ml-auto text-[10px] font-medium text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {pkg.inclusions.length}
              </span>
            </div>
            <ul className="space-y-2">
              {pkg.inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm group">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {pkg.exclusions?.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-red-200/50 hover:border-red-300 transition-all duration-200 hover:shadow-md hover:shadow-red-500/5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm sm:text-base">What's Not Included</h4>
              <span className="ml-auto text-[10px] font-medium text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full">
                {pkg.exclusions.length}
              </span>
            </div>
            <ul className="space-y-2">
              {pkg.exclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm group">
                  <div className="w-5 h-5 rounded-full bg-red-100 group-hover:bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                    <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* If only one section exists, add a placeholder for balance */}
        {(!pkg.inclusions?.length && pkg.exclusions?.length > 0) && (
          <div className="hidden md:block" />
        )}
        {(pkg.inclusions?.length > 0 && !pkg.exclusions?.length) && (
          <div className="hidden md:block" />
        )}
        
      </div>
    </div>
  </div>
)}

     {/* Good to Know - Enhanced */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
  <div className="bg-gradient-to-br from-gray-50/80 to-white rounded-2xl border border-gray-100/80 p-5 sm:p-6">
    
    {/* Header with icon */}
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <span>📋</span> Good to Know
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
      <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
        Essential Info
      </span>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      
      {/* Cancellation Policy */}
      <div className="group bg-white hover:bg-gradient-to-br hover:from-orange-50/50 hover:to-amber-50/50 rounded-xl p-4 border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Cancellation</p>
            <p className="text-sm font-semibold text-gray-800 capitalize mt-0.5">
              {pkg.cancellationPolicy || 'Flexible'}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">Policy applies</p>
          </div>
        </div>
      </div>
      
      {/* Booking Lead Time */}
      <div className="group bg-white hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-cyan-50/50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 transition-colors">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Lead Time</p>
            <p className="text-sm font-semibold text-gray-800">
              {pkg.bookingLeadTime || 7} day{pkg.bookingLeadTime !== 1 ? "s" : ""}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">In advance</p>
          </div>
        </div>
      </div>
      
      {/* Group Type */}
      <div className="group bg-white hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-pink-50/50 rounded-xl p-4 border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center flex-shrink-0 transition-colors">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Group Type</p>
            <p className="text-sm font-semibold text-gray-800 capitalize">
              {pkg.type || 'Private'}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">Travel style</p>
          </div>
        </div>
      </div>
      
      {/* Best Season / Additional Info */}
      <div className="group bg-white hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-teal-50/50 rounded-xl p-4 border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center flex-shrink-0 transition-colors">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Best Season</p>
            <p className="text-sm font-semibold text-gray-800">
              {pkg.bestSeason || 'Year Round'}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">Recommended</p>
          </div>
        </div>
      </div>
      
    </div>
    
    {/* Quick tip bar */}
    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          {pkg.minPax || 2}-{pkg.maxPax || 20} Pax
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          {pkg.durationDays || 5} Days
        </span>
      </div>
      <span className="text-[10px] text-orange-500 bg-orange-50 px-3 py-1 rounded-full font-medium">
        ⚡ Book early for best price
      </span>
    </div>
    
  </div>
</div>
    </div>
  );
}