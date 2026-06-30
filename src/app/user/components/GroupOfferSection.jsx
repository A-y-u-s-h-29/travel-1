'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Users, Phone, Mail, ArrowRight, Sparkles, CheckCircle, User } from 'lucide-react';

export default function GroupOfferSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    const errors = [];
    if (!form.name.trim()) errors.push('Name is required');
    if (!form.phone.trim()) errors.push('Phone is required');
    if (!form.email.trim()) errors.push('Email is required');
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.push('Please enter a valid email');
    }
    if (form.phone && !/^[\d\s+()-]{10,15}$/.test(form.phone.trim())) {
      errors.push('Please enter a valid phone number');
    }

    if (errors.length) {
      setError(errors.join('. '));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          source: 'group-offer-section',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit');

      setSubmitted(true);
      setForm({
        name: '',
        phone: '',
        email: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden pop rounded-t-4xl lg:rounded-t-[15vh] ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/group.png"
          alt="Group Tour Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left - Text Content */}
          <div className="text-white space-y-4 sm:space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-orange-400/30">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-orange-300 uppercase tracking-wider">
                Group Offer
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Bigger Group? Get
              <span className="block bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Special Offers Up to 10% Off!
              </span>
            </h2>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base max-w-lg">
              Experience Delhi & Agra with your group. Enjoy exclusive discounts, 
              dedicated guides, and customized itineraries for a memorable journey.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <Users className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs text-white/80">10+ People</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs text-white/80">Custom Itinerary</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs text-white/80">Dedicated Guide</span>
              </div>
            </div>
          </div>

          {/* Right - CTA Card with Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              // Success State
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">🎉 Enquiry Sent!</h3>
                <p className="text-white/60 text-sm">We'll reach out within 2 hours.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    Get a Callback
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm">
                    Fill in your details and we'll reach out within 2 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="text-xs font-semibold text-white/80 flex items-center gap-1.5 mb-1.5">
                      <User className="w-3.5 h-3.5 text-orange-400" />
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ravi Sharma"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="text-xs font-semibold text-white/80 flex items-center gap-1.5 mb-1.5">
                      <Phone className="w-3.5 h-3.5 text-orange-400" />
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="text-xs font-semibold text-white/80 flex items-center gap-1.5 mb-1.5">
                      <Mail className="w-3.5 h-3.5 text-orange-400" />
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ravi@example.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-400/30 rounded-xl px-3 py-2.5">
                      <span>⚠️</span>
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Get Callback Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-white/40 text-[10px] text-center">
                    🔒 Your information is secure. No spam.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-0" />
    </div>
  );
}