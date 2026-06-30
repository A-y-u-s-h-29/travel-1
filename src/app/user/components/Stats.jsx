// components/ExperienceSection.jsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import PopupForm from './PopupForm';

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { id: 2, number: "12K+", label: "Successful Journey" },
    { id: 4, number: "7+", label: "Years Of Experience" },
    { id: 5, number: "5000+", label: "Customers" },
  ];

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animated counter for numbers
  const [animatedStats, setAnimatedStats] = useState({});

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat) => {
        const target = stat.number;
        const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        const suffix = target.replace(/[0-9.]/g, '');
        let step = 0;
        const duration = 2000;
        const steps = 60;
        const increment = numericValue / steps;

        const timer = setInterval(() => {
          step++;
          if (step <= steps) {
            const value = Math.round(increment * step);
            setAnimatedStats((prev) => ({
              ...prev,
              [stat.id]: value + suffix
            }));
          } else {
            setAnimatedStats((prev) => ({
              ...prev,
              [stat.id]: target
            }));
            clearInterval(timer);
          }
        }, duration / steps);

        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  return (
    <>
      <div 
        ref={sectionRef}
        className="min-h-screen bg-[#FFFAEC] pop py-16 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Section - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-200/50">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/amber.jpg"
                  alt="Adventure Experience"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-300/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl"></div>
          </div>

          {/* Right Section - Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Heading */}
            <div>
              <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold mb-2">
                Our Experience
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-gray-800">Our Stories Have</span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Adventures
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
              We are experienced in bringing adventures to stay their journey, 
              with all outdoor destinations in the world as our specialties. 
              Start your adventure now! Nature has already called you!
            </p>

            {/* Stats Grid - 3 columns */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              {stats.map((stat) => (
                <div 
                  key={stat.id}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-600">
                    {isVisible ? (animatedStats[stat.id] || stat.number) : stat.number}
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                    {stat.label}
                  </p>
                  <div className="w-8 h-0.5 bg-orange-300 mx-auto mt-2 opacity-50 group-hover:w-12 transition-all duration-300"></div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => setIsPopupOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start Your Adventure Now →
            </button>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      <PopupForm 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
}