'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Heart,
  ArrowUp,
  Globe,
  Clock,
  Shield,
  Award,
  Users
} from 'lucide-react';
import PopupForm from './PopupForm';

export default function Footer() {
   const [isPopupOpen, setIsPopupOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FFFBEC] -mt-10 w-full overflow-x-hidden rounded-tl-4xl rounded-tr-4xl pop">
      {/* Top Image - 70vh */}
      <div className="relative bg-white w-full h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
        <Image
          src="/images/footer1.png"
          alt="Footer Top Image"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#291400] via-[#2a1500]/50 to-black/20" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0  pop flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Ready for Your Next Trip?
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-4 sm:mb-6">
            Join thousands of happy travelers who have explored the world with us.
            Your dream destination is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button      onClick={() => setIsPopupOpen(true)} className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
              Start Your Journey
            </button>
            <Link href="/user/destinations" className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base">
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer - Orange/Black Theme */}
      <div className="bg-gradient-to-b from-[#2a1500] to-[#1a0a00] text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Brand Section */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 flex-shrink-0" />
                <span className="text-xl sm:text-2xl font-bold text-white">
                  Delhi<span className="text-orange-500">Agra</span>
                </span>
              </div>
              <p className="text-orange-200/70 text-xs sm:text-sm leading-relaxed">
                Discover the agra most breathtaking destinations with our curated travel experiences.
                We make your dream vacation a reality.
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                <div className="flex items-center gap-1.5 sm:gap-2 text-orange-200/70 text-xs sm:text-sm">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                  <span>Award Winning</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-orange-200/70 text-xs sm:text-sm">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                  <span>100+ Tours</span>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
                <a 
                  href="#" 
                  className="bg-white/10 hover:bg-orange-500 p-1.5 sm:p-2 rounded-full transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-white/10 hover:bg-orange-500 p-1.5 sm:p-2 rounded-full transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-white/10 hover:bg-orange-500 p-1.5 sm:p-2 rounded-full transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-white/10 hover:bg-orange-500 p-1.5 sm:p-2 rounded-full transition-all duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-white/10 hover:bg-orange-500 p-1.5 sm:p-2 rounded-full transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 relative">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-orange-500"></span>
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                <li>
                  <Link href="/" className="text-orange-200/70 hover:text-orange-500 transition-colors text-xs sm:text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/user/destinations" className="text-orange-200/70 hover:text-orange-500 transition-colors text-xs sm:text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></span>
                    Destinations
                  </Link>
                </li>
                
                <li>
                  <Link href="/about" className="text-orange-200/70 hover:text-orange-500 transition-colors text-xs sm:text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-orange-200/70 hover:text-orange-500 transition-colors text-xs sm:text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/user/blog" className="text-orange-200/70 hover:text-orange-500 transition-colors text-xs sm:text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></span>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 relative">
                Contact Info
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-orange-500"></span>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3 text-orange-200/70 text-xs sm:text-sm">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>123 Travel Street, Adventure City, AC 12345</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-orange-200/70 text-xs sm:text-sm">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-orange-200/70 text-xs sm:text-sm">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                  <span className="break-all">info@travelhub.com</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-orange-200/70 text-xs sm:text-sm">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                  <span>Mon - Sun: 9:00 AM - 9:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 relative">
                Newsletter
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-orange-500"></span>
              </h3>
              <p className="text-orange-200/70 text-xs sm:text-sm mb-3 sm:mb-4">
                Subscribe to get special offers, travel tips, and updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 text-white placeholder:text-orange-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm border border-orange-500/20 min-w-0"
                />
                <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm whitespace-nowrap">
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Subscribe
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-3">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                <span className="text-orange-200/50 text-[10px] sm:text-xs">We never share your information</span>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
         
        </div>
      </div>

      {/* Bottom Image - 20vh */}
      <div className="relative bg-[#1A0A00] w-full h-[12vh] sm:h-[15vh] md:h-[18vh] lg:h-[20vh] overflow-hidden">
        <Image
          src="/images/footer2.png"
          alt="Footer Bottom Image"
          fill
          className="object-cover object-center"
        />
        <PopupForm 
                isOpen={isPopupOpen} 
                onClose={() => setIsPopupOpen(false)} 
              />
              
       
      </div>
      <div className="border-t border-orange-500/20 bg-[#1A0A00] px-4 sm:px-6 py-6 sm:py-8 ">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
    <p className="text-orange-200/50 text-[10px] sm:text-xs text-center sm:text-left">
      © {new Date().getFullYear()} TravelHub. All rights reserved.
      Made with <Heart className="inline w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500 mx-0.5 sm:mx-1" /> for travelers.
    </p>
    
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
      <Link href="/privacy" className="text-orange-200/50 hover:text-orange-500 transition-colors">
        Privacy Policy
      </Link>
      <span className="text-orange-500/30">|</span>
      <Link href="/terms" className="text-orange-200/50 hover:text-orange-500 transition-colors">
        Terms
      </Link>
      <span className="text-orange-500/30">|</span>
      <Link href="/cookies" className="text-orange-200/50 hover:text-orange-500 transition-colors">
        Cookies
      </Link>
    </div>

    {/* Scroll to Top Button */}
    <button
      onClick={scrollToTop}
      className="bg-orange-500 hover:bg-orange-600 text-white p-2 sm:p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30 flex-shrink-0"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  </div>
</div>
      
    </footer>
  );
}