// components/PopupEnquiry.jsx
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// SVG Icons - Premium Design
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.5 5L21 5l-2.5 5L21 15l-5.5-2.5L11 15l2.5-5L11 5l5.5 2.5L19 3z" />
  </svg>
);

export default function PopupEnquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-open after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    const errors = [];
    if (!form.name.trim()) errors.push("Name is required");
    if (!form.phone.trim()) errors.push("Phone is required");
    if (!form.email.trim()) errors.push("Email is required");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.push("Please enter a valid email");
    }
    if (form.phone && !/^[\d\s+()-]{10,15}$/.test(form.phone.trim())) {
      errors.push("Please enter a valid phone number");
    }

    if (errors.length) {
      setError(errors.join(". "));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          source: "popup-enquiry",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit");

      setSubmitted(true);
      setForm({ name: "", phone: "", email: "" });

      // Close after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        document.body.style.overflow = 'unset';
      }, 3000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const popupContent = (
    <>
      {/* Backdrop - Premium Blur */}
      <div
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm animate-fadeIn pop "
        onClick={handleClose}
      />

      {/* Popup - Premium Design */}
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 animate-slideUp mt-10">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden border border-orange-100/50">
          
          {/* Decorative top bar with shimmer */}
          <div className="h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-[length:200%_100%] animate-shimmer" />

          {/* Close button - Premium */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-all duration-200 p-1.5 rounded-full hover:bg-gray-100 z-10"
            aria-label="Close"
          >
            <CloseIcon />
          </button>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {submitted ? (
              // Success State - Premium
              <div className="text-center py-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Enquiry Sent! 🎉</h3>
                <p className="text-sm text-gray-500">We'll reach out within 2 hours.</p>
                <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-sm text-orange-600 font-medium">
                    ✈️ Your adventure awaits!
                  </p>
                </div>
              </div>
            ) : (
              // Form State - Premium
              <>
                {/* Header */}
                <div className="text-center mb-3 pop">
                  <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100 mb-3">
                    <SparkleIcon />
                    <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                      Free Quote
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Get a{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                      Free Travel Quote
                    </span>
                  </h2>
                 
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
                      <UserIcon /> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all disabled:opacity-50"
                      disabled={isSubmitting}
                      autoFocus
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
                      <PhoneIcon /> Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all disabled:opacity-50"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
                      <MailIcon /> Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ravi@example.com"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all disabled:opacity-50"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                      <span className="text-red-500">⚠️</span>
                      {error}
                    </div>
                  )}

                  {/* Submit Button - Premium with Shimmer */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon />
                        Send Enquiry
                      </>
                    )}
                  </button>

                
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );

  return createPortal(popupContent, document.body);
}