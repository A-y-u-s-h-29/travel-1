'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Award,
  MessageCircle,
  Calendar,
  CheckCircle,
  Sparkles,
  Compass,
  Globe,
  ArrowRight,
  User,
  Quote,
  Send,
  ThumbsUp,
  Shield,
  Heart,
  Building2,
  Car,
  Train
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pop mb-10">
      
      {/* Hero Image - 80vh */}
      <div className="relative w-full h-[60vh] sm:h-[80vh] pop md:h-[100vh] overflow-hidden">
        <Image
          src="/images/contect.png"
          alt="Contact Delhi Agra Tour Packages"
          fill
          className="object-cover object-center"
          priority
        />
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white/10" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl px-4 sm:px-6 py-2 rounded-full shadow-lg border border-orange-200 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
              Contact Us
            </span>
            <Sparkles className="w-4 h-4 text-orange-500" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-bold text-white leading-tight max-w-4xl drop-shadow-lg">
            Plan Your{" "}
            <span className="text-orange-400 drop-shadow-lg">
              Delhi Agra Tour
            </span>
          </h1>


          {/* Quick Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a 
              href="https://wa.me/917302265809" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Plan on WhatsApp
            </a>
            <a 
              href="tel:+917302265809" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Call Us Now
            </a>
          </div>

          {/* Stats Badges */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 border border-orange-200 shadow-lg">
              <span className="text-orange-700 text-xs sm:text-sm font-medium">
                <Users className="inline w-4 h-4 mr-1.5 text-orange-500" />
                10,000+ Happy Travelers
              </span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 border border-orange-200 shadow-lg">
              <span className="text-orange-700 text-xs sm:text-sm font-medium">
                <Star className="inline w-4 h-4 mr-1.5 text-orange-500 fill-orange-500" />
                4.8 / 5 Average Rating
              </span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 border border-orange-200 shadow-lg">
              <span className="text-orange-700 text-xs sm:text-sm font-medium">
                <Award className="inline w-4 h-4 mr-1.5 text-orange-500" />
                Since 2015
              </span>
            </div>
          </div>
        </div>

        {/* Wave Effect at Bottom */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 md:-mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-6 sm:p-8 md:p-10 lg:p-12">
          
          {/* Reach Us Section */}
          <section className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-10">
              <span className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
                Reach Us Anytime
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Choose How to Connect
              </h2>
              <p className="text-orange-600/60 text-sm mt-2 max-w-2xl mx-auto">
                Every message lands with a real travel expert, not a call centre. We know every route, monument, and hidden gem in Delhi & Agra.
              </p>
              <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* WhatsApp */}
              <div className="bg-orange-50/50 p-5 sm:p-6 rounded-2xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all text-center">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-orange-800 text-sm">WhatsApp — Fastest</h4>
                <p className="text-xs text-orange-600/60 mt-1">+91 73022 65809</p>
                <p className="text-[10px] text-orange-500 mt-1">Average reply: under 10 minutes</p>
                <a 
                  href="https://wa.me/917302265809" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                >
                  Chat now
                </a>
              </div>

              {/* Call */}
              <div className="bg-orange-50/50 p-5 sm:p-6 rounded-2xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all text-center">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-orange-800 text-sm">Call Us Directly</h4>
                <p className="text-xs text-orange-600/60 mt-1">+91 73006 20809</p>
                <p className="text-[10px] text-orange-500 mt-1">Mon–Sun, 7 AM – 9 PM IST</p>
                <a 
                  href="tel:+917300620809" 
                  className="mt-3 inline-block bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                >
                  Call now
                </a>
              </div>

              {/* Email */}
              <div className="bg-orange-50/50 p-5 sm:p-6 rounded-2xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all text-center">
                <div className="w-14 h-14 bg-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-orange-800 text-sm">Email Us</h4>
                <p className="text-xs text-orange-600/60 mt-1 break-all">delhiagratour@gmail.com</p>
                <p className="text-[10px] text-orange-500 mt-1">Reply within 3–4 hours</p>
                <a 
                  href="mailto:delhiagratour@gmail.com" 
                  className="mt-3 inline-block bg-orange-400 hover:bg-orange-500 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                >
                  Send email
                </a>
              </div>

              {/* Address */}
              <div className="bg-orange-50/50 p-5 sm:p-6 rounded-2xl border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all text-center">
                <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-orange-800 text-sm">Our Address</h4>
                <p className="text-xs text-orange-600/60 mt-1 leading-relaxed">
                  Delhi Agra Tour & Travel<br />
                  New Delhi, India 110001
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </section>

          {/* Operating Hours */}
          <section className="mb-12 sm:mb-16 bg-orange-50 rounded-3xl p-6 sm:p-8 md:p-10 border border-orange-200">
            <div className="text-center mb-8">
              <span className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
                Operating Hours
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                We're Here When You Need Us
              </h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-white p-5 rounded-xl text-center border border-orange-200 shadow-sm">
                <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-sm">Monday – Friday</h4>
                <p className="text-xs text-orange-600/60 mt-1">7:00 AM – 9:00 PM</p>
              </div>
              <div className="bg-white p-5 rounded-xl text-center border border-orange-200 shadow-sm">
                <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-sm">Saturday – Sunday</h4>
                <p className="text-xs text-orange-600/60 mt-1">7:00 AM – 9:00 PM</p>
              </div>
              <div className="bg-white p-5 rounded-xl text-center border border-orange-200 shadow-sm">
                <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800 text-sm">Public Holidays</h4>
                <p className="text-xs text-orange-600/60 mt-1">Open (All major holidays)</p>
              </div>
            </div>
            <p className="text-orange-600/50 text-xs text-center mt-4">
              WhatsApp outside hours — we reply on next open.
            </p>
          </section>

          {/* What We Do */}
          <section className="mb-12 sm:mb-16">
            <div className="text-center mb-8">
              <span className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
                Our Services
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                How Delhi Agra Tour & Travel Helps You
              </h2>
              <p className="text-orange-600/60 text-sm mt-2 max-w-2xl mx-auto">
                From a same-day tour to a week-long golden triangle journey — we handle every detail so your trip is seamless.
              </p>
              <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-orange-50/50 p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-orange-800 text-sm">Custom Itinerary Planning</h4>
                <p className="text-xs text-orange-600/60 mt-1">Personalised day-by-day plans built around your preferences, timings, and budget.</p>
              </div>
              <div className="bg-orange-50/50 p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-orange-800 text-sm">Tour Package Booking</h4>
                <p className="text-xs text-orange-600/60 mt-1">Same-day, weekend, and golden triangle packages with AC transport.</p>
              </div>
              <div className="bg-orange-50/50 p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-orange-800 text-sm">Group & Family Tours</h4>
                <p className="text-xs text-orange-600/60 mt-1">Dedicated guides for family reunions, corporate groups, and school trips.</p>
              </div>
              <div className="bg-orange-50/50 p-5 rounded-xl text-center border border-orange-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-orange-800 text-sm">24/7 On-Trip Support</h4>
                <p className="text-xs text-orange-600/60 mt-1">Your guide's number stays active throughout your trip. Real-time help for any change.</p>
              </div>
            </div>
          </section>

          {/* Message from Guide */}
          <section className="mb-12 sm:mb-16 bg-orange-50 rounded-3xl p-6 sm:p-8 md:p-10 border border-orange-200">
            <div className="text-center mb-6">
              <span className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
                A Message from Your Guide
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-800">
                Meet Gurudutt — Your Delhi Agra Expert
              </h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                    <User className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                </div>
                <div className="flex-1">
                  <Quote className="w-6 h-6 text-orange-300 mb-2" />
                  <p className="text-orange-700/80 text-sm sm:text-base leading-relaxed">
                    I have been organizing Delhi Agra tours since 2015 — helping travelers experience the magic of the Taj Mahal, the grandeur of the Red Fort, and the vibrant streets of Delhi. When you contact Delhi Agra Tour & Travel, you speak to me or one of my hand-trained local guides, not a booking agent. We know the best times to visit the Taj, which routes avoid traffic, and where to find the best local food. Tell us when you're coming. We'll take care of everything else.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <span className="flex items-center gap-1 text-orange-600 text-sm">
                      <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                      4.8 — 500+ reviews
                    </span>
                    <span className="flex items-center gap-1 text-orange-600 text-sm">
                      <Users className="w-4 h-4 text-orange-500" />
                      10,000+ travelers served since 2015
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-xl border border-orange-200 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-800 text-sm">Verified Local Guides</h4>
                    <p className="text-xs text-orange-600/60">Every guide is from Delhi/Agra and verified by our team. No third-party contractors.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-orange-200 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-800 text-sm">No Advance Payment Risk</h4>
                    <p className="text-xs text-orange-600/60">We confirm your booking before any payment. No hidden charges.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WhatsApp CTA */}
          <section className="relative">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-8 sm:p-12 text-center text-white">
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6">
                <div className="bg-green-500 rounded-full p-2 sm:p-3 shadow-lg animate-pulse">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                Plan Your Delhi Agra Tour on WhatsApp
              </h2>
              <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto mb-6">
                Click below to start a chat with a real travel expert. Share your dates, group size, and preferences — we'll build your personalised itinerary free of charge.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://wa.me/917302265809" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:shadow-white/30 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Plan on WhatsApp
                </a>
                <a 
                  href="tel:+917300620809" 
                  className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Us Now
                </a>
              </div>
              <p className="text-white/70 text-xs mt-4">
                Online now — reply within 30 minutes
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}