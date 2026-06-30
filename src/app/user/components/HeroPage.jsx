// app/page.tsx
"use client";


import EnquiryForm from "./Enquiry";

export default function HeroPage() {
  return (
    <main className="min-h-screen relative bg-gradient-to-br from-orange-50 via-amber-50 to-white pop">
      {/* Navbar - Fixed at top */}
     

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 md:pt-14 pb-14 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 xl:gap-12 items-center mt-3">
          {/* LEFT SECTION - 60% */}
          <div className="lg:col-span-3 flex flex-col gap-5 lg:gap-6">
            {/* Premium Badge */}
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs tracking-wider px-4 py-1.5 md:px-5 md:py-2 rounded-full shadow-lg shadow-orange-500/40 whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                ✦ Explore Agra
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold">
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Discover The Divine
                </span>
                <br />
                <span className="text-gray-800">Beauty of Agra</span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-gray-700 text-sm md:text-base lg:text-md max-w-md leading-relaxed">
              Explore the timeless beauty of the Taj Mahal,
              and the rich heritage of Mughal architecture.
            </p>

            {/* Stats Bar */}
           <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-10 py-3 border-y-2 border-orange-200">
  <div className="flex items-center gap-2 md:gap-3 justify-center sm:justify-start">
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <div>
      <p className="text-xl md:text-2xl font-black text-gray-800">20+</p>
      <p className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap">Historical Sites</p>
    </div>
  </div>

  <div className="flex items-center gap-2 md:gap-3 justify-center sm:justify-start">
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <div>
      <p className="text-xl md:text-2xl font-black text-gray-800">50+</p>
      <p className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap">Temples & Shrines</p>
    </div>
  </div>

  <div className="flex items-center gap-2 md:gap-3 justify-center sm:justify-start">
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div>
      <p className="text-xl md:text-2xl font-black text-gray-800">5M+</p>
      <p className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap">Annual Visitors</p>
    </div>
  </div>
</div>

            {/* Location Tags */}
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {["Taj Mahal", "Mariam Tomb", "Agra Fort", "Fatehpur Sikri", "Mehta Bagh"].map((loc) => (
                <span key={loc} className="px-3 py-1 md:px-4 md:py-1.5 bg-orange-100 text-orange-700 text-[10px] md:text-xs font-medium rounded-full border border-orange-300 whitespace-nowrap">
                  {loc}
                </span>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-[10px] md:text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Trusted by 50,000+ Travelers
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Best Price Guarantee
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                24/7 Customer Support
              </span>
            </div>
          </div>

          {/* RIGHT SECTION - 40% — EnquiryForm */}
          <div className="lg:col-span-2">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </main>
  );
}