// components/EnquiryForm.tsx
"use client";

import { useState } from "react";

// SVG Icons as components - Premium Design
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

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errors = [];
    if (!form.name.trim()) errors.push("Name is required");
    if (!form.phone.trim()) errors.push("Phone is required");
    if (!form.email.trim()) errors.push("Email is required");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.push("Please enter a valid email address");
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
          source: "enquiry-form",
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit");
      
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
      });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-orange-200/50 p-8 text-center shadow-2xl shadow-orange-500/10">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Enquiry Sent! 🎉</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          We'll reach out within 2 hours to plan your perfect trip.
        </p>
        <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
          <p className="text-sm text-orange-600 font-medium">
            ✈️ Your adventure awaits!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-orange-200/50 p-6 md:p-6 shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-shadow duration-300 mt-5 pop">
      {/* Header */}
      <div className="text-center mb-3">
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <UserIcon /> Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all disabled:opacity-50"
            disabled={isSubmitting}
            autoFocus
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <PhoneIcon /> Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            required
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all disabled:opacity-50"
            disabled={isSubmitting}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <MailIcon /> Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ravi@example.com"
            required
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

        {/* Submit Button - Premium */}
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
    </div>
  );
}