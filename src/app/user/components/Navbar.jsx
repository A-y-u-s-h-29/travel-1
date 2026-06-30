'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import {
  Home,
  Info,
  MapPin,
  FileText,
  Phone,
  Calendar,
  User,
  Menu,
  X,
  BookOpen,
  ChevronRight,
  Compass ,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import PopupForm from './PopupForm';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
   const [isPopupOpen, setIsPopupOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/user/about', label: 'About Us', icon: User },
    { href: '/user/destinations', label: 'Destination', icon: Compass  },
    { href: '/user/blog', label: 'Blogs', icon: BookOpen },
    { href: '/user/contact', label: 'Contact', icon: Phone },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Check if link is active
  const isActive = (href) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all pop bg-[#FFFAEB] duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16  md:h-20">
            {/* Left - Logo with Sparkle Icon */}
        <Link
  href="/"
  className="flex items-center gap-3  transition-transform"
>
  <Image
    src="/images/logo.png"
    alt="Logo"
    width={80}
    height={80}
    className="object-contain w-35"
    priority
  />
</Link>

            {/* Center - Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2 border border-orange-300/30 rounded-full px-4 lg:px-6 py-1.5 backdrop-blur-sm bg-white/40 shadow-sm">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 text-sm font-medium px-3 lg:px-4 py-2 rounded-full transition-all duration-300 hover:bg-orange-500/10 hover:scale-105 ${
                      isActive(link.href) 
                        ? 'text-orange-600 bg-orange-500/10' 
                        : 'text-gray-700 hover:text-orange-600'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${
                      isActive(link.href) ? 'text-orange-600' : 'text-gray-500'
                    }`} />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right - Book Now Button */}
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => setIsPopupOpen(true)} className="hidden md:flex items-center gap-2 px-5 lg:px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95">
                <Calendar className="w-4 h-4" />
                Book Now
              </button>

              {/* Mobile Menu Button (Hamburger) */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg hover:bg-orange-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-orange-600" />
                ) : (
                  <Menu className="w-6 h-6 text-orange-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer - Slides from left */}
        <div
          className={`md:hidden fixed top-0 left-0 right-0 bottom-0 transition-all duration-300 transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ zIndex: 10000 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Drawer */}
          <div className="relative bg-white/95 backdrop-blur-lg shadow-2xl h-full w-4/5 max-w-sm p-6 border-r border-orange-200 overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-orange-500/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-orange-600" />
            </button>

            <div className="mt-8 flex flex-col gap-2">
              {/* Logo in mobile menu */}
            
              
              <div className="h-px bg-orange-200/50 mb-2" />
              
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-base ${
                      isActive(link.href)
                        ? 'bg-orange-500/10 text-orange-600'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive(link.href) ? 'text-orange-600' : 'text-gray-500'
                    }`} />
                    {link.label}
                    {isActive(link.href) && (
                      <ChevronRight className="w-4 h-4 ml-auto text-orange-600" />
                    )}
                  </Link>
                );
              })}
              <div className="h-px bg-orange-200/50 my-2" />
              <button 
                className="flex items-center justify-center gap-2 mt-2 px-4 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 w-full"
                onClick={closeMobileMenu}
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar - Premium Responsive Design */}
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9998] pop pb-[env(safe-area-inset-bottom)]">
  {/* Darker orange background */}
  <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 backdrop-blur-2xl border-t border-orange-500/30 shadow-[0_-8px_30px_-4px_rgba(234,88,12,0.4)]">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 via-transparent to-transparent pointer-events-none" />

    <div className="relative flex items-center justify-around h-[72px] px-2 max-w-7xl mx-auto">
      {/* First 2 nav links */}
      {navLinks.slice(0, 2).map((link) => {
        const Icon = link.icon;
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative flex flex-col items-center justify-center gap-1 
              px-2 py-2 rounded-2xl transition-all duration-300 
              min-w-[56px] group flex-1 active:scale-90
              ${active 
                ? 'text-white' 
                : 'text-orange-300/70 hover:text-white'
              }
            `}
          >
            {active && (
              <div className="absolute inset-0 bg-white/15 backdrop-blur-sm ring-1 ring-white/20 rounded-2xl -z-10 scale-105 shadow-lg shadow-black/20" />
            )}

            <div className={`
              relative transform transition-all duration-300
              ${active ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-110'}
            `}>
              <Icon className={`
                w-5 h-5 transition-all duration-300
               text-white
              `} />

             
            </div>

            <span className={`
              text-[10px] font-medium tracking-wide transition-all duration-300
              text-white
            `}>
              {link.label}
            </span>
          </Link>
        );
      })}

      {/* Book Now button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="relative flex-1 flex flex-col items-center justify-center group active:scale-95 transition-transform duration-200"
      >
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-black/30 rounded-full blur-md" />
        <div className="cta-glow-pulse absolute -mt-9 w-16 h-16 rounded-full bg-white/20 blur-xl -z-10" />

        <div className="relative -mt-9 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 border-[3px] border-white/30 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_10px_24px_-2px_rgba(0,0,0,0.5)] group-hover:scale-105 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Calendar className="relative w-6 h-6 text-white drop-shadow-sm transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
        </div>

        <span className="text-[10px] font-bold tracking-wide mt-1.5 text-white/90 transition-all duration-300 group-hover:tracking-wider">
          Book Now
        </span>
      </button>

      {/* Last 2 nav links */}
      {navLinks.slice(2, 4).map((link) => {
        const Icon = link.icon;
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative flex flex-col items-center justify-center gap-1 
              px-2 py-2 rounded-2xl transition-all duration-300 
              min-w-[56px] group flex-1 active:scale-90
              ${active 
                ? 'text-white' 
                : 'text-orange-300/70 hover:text-white'
              }
            `}
          >
            {active && (
              <div className="absolute inset-0 bg-white/15 backdrop-blur-sm ring-1 ring-white/20 rounded-2xl -z-10 scale-105 shadow-lg shadow-black/20" />
            )}

            <div className={`
              relative transform transition-all duration-300
              ${active ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-110'}
            `}>
              <Icon className={`
                w-5 h-5 transition-all duration-300
               text-white
              `} />

             
            </div>

            <span className={`
              text-[10px] font-medium tracking-wide transition-all duration-300
            text-white
            `}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  </div>

  <style jsx>{`
    @keyframes ctaGlowPulse {
      0%, 100% {
        opacity: 0.25;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.15);
      }
    }
    .cta-glow-pulse {
      animation: ctaGlowPulse 2.8s ease-in-out infinite;
    }
  `}</style>
</div>

      {/* Spacer for bottom navigation */}
      <div className="md:hidden h-[72px]" />
       <PopupForm 
              isOpen={isPopupOpen} 
              onClose={() => setIsPopupOpen(false)} 
            />
    </>
  );
}