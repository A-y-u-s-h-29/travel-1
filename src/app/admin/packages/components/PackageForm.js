"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ← IMPORTANT: Import Link from next/link
import DestinationSelect from "@/app/admin/destinations/components/DestinationSelect";
import { 
  Plus, 
  Trash2, 
  Save, 
  Loader2,
  Image,
  Clock,
  Tag,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  FileText,
  Settings,
  Eye,
  Globe,
  LayoutDashboard
} from "lucide-react";

import GalleryForm from "./GalleryForm";
import ItineraryForm from "./ItineraryForm";

export default function PackageForm({ packageData = null }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeSections, setActiveSections] = useState({
    basic: true,
    seo: false,
    description: false,
    pricing: false,
    duration: false,
    availability: false,
    booking: false,
    status: false,
    highlights: false,
    inclusions: false,
    exclusions: false,
  });

  const [formData, setFormData] = useState({
    name: packageData?.name || "",
    slug: packageData?.slug || "",
    metaTitle: packageData?.metaTitle || "",
    metaDescription: packageData?.metaDescription || "",
    shortDescription: packageData?.shortDescription || "",
    description: packageData?.description || "",
    priceFrom: packageData?.priceFrom || "",
    priceTo: packageData?.priceTo || "",
    currency: packageData?.currency || "INR",
    duration: packageData?.duration || "",
    durationDays: packageData?.durationDays || "",
    durationNights: packageData?.durationNights || "",
    categoryId: packageData?.categoryId || "",
    type: packageData?.type || "private",
    difficulty: packageData?.difficulty || "easy",
    mainDestination: packageData?.mainDestination || "",
    destinations: packageData?.destinations || [],
    highlights: packageData?.highlights || [""],
    inclusions: packageData?.inclusions || [""],
    exclusions: packageData?.exclusions || [""],
    featuredImage: packageData?.featuredImage || "",
    galleryImages: packageData?.galleryImages || [],
    videoUrl: packageData?.videoUrl || "",
    itinerary: packageData?.itinerary || [],
    availability: packageData?.availability || "available",
    minPax: packageData?.minPax || 1,
    maxPax: packageData?.maxPax || 20,
    bookingLeadTime: packageData?.bookingLeadTime || 7,
    cancellationPolicy: packageData?.cancellationPolicy || "moderate",
    status: packageData?.status || "draft",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.log("Failed to load categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  const toggleSection = (section) => {
    setActiveSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = packageData ? `/api/packages/${packageData._id}` : "/api/packages";
      const method = packageData ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!result.success) {
        alert(result.message);
        return;
      }
      alert(packageData ? "Package Updated Successfully" : "Package Created Successfully");
      router.push("/admin/packages");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title, section }) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between group"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <span className="text-gray-400 text-xl">
        {activeSections[section] ? "−" : "+"}
      </span>
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto text-black">
      {/* ===== BREADCRUMB ===== */}
      <div className="flex items-center gap-2 text-sm">
        <Link 
          href="/admin/dashboard" 
          className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <span className="text-gray-300">/</span>
        <Link 
          href="/admin/packages" 
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          Packages
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">
          {packageData ? "Edit" : "Create"}
        </span>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {packageData ? "Edit Package" : "Create New Package"}
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              Fill in the details below to {packageData ? "update" : "create"} your package
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => router.push("/admin/packages")}
              className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2.5 text-sm font-medium text-blue-600 bg-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {packageData ? "Update" : "Create"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={FileText} title="Basic Information" section="basic" />
        </div>
        {activeSections.basic && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Package Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Himalayan Adventure"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., himalayan-adventure"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">URL-friendly identifier</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Destination <span className="text-red-500">*</span>
                </label>
                <DestinationSelect
                  value={formData.mainDestination}
                  onChange={(val) => setFormData(prev => ({ ...prev, mainDestination: val }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Category
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Package Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="private">Private</option>
                  <option value="group">Group</option>
                  <option value="luxury">Luxury</option>
                  <option value="budget">Budget</option>
                  <option value="family">Family</option>
                  <option value="honeymoon">Honeymoon</option>
                  <option value="adventure">Adventure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="difficult">Difficult</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={Globe} title="SEO" section="seo" />
        </div>
        {activeSections.seo && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="SEO optimized title (50-60 characters)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Meta Description
              </label>
              <textarea
                rows={3}
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="SEO optimized description (150-160 characters)"
              />
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={FileText} title="Description" section="description" />
        </div>
        {activeSections.description && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Short Description
              </label>
              <textarea
                rows={3}
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Brief overview of the package"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Description
              </label>
              <textarea
                rows={8}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Detailed description of the package"
              />
            </div>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={DollarSign} title="Pricing" section="pricing" />
        </div>
        {activeSections.pricing && (
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price From
                </label>
                <input
                  type="number"
                  name="priceFrom"
                  value={formData.priceFrom}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price To
                </label>
                <input
                  type="number"
                  name="priceTo"
                  value={formData.priceTo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Duration */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={Clock} title="Duration" section="duration" />
        </div>
        {activeSections.duration && (
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="4 Days / 3 Nights"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Days
                </label>
                <input
                  type="number"
                  name="durationDays"
                  value={formData.durationDays}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nights
                </label>
                <input
                  type="number"
                  name="durationNights"
                  value={formData.durationNights}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={Calendar} title="Availability" section="availability" />
        </div>
        {activeSections.availability && (
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="available">Available</option>
                  <option value="limited">Limited</option>
                  <option value="sold_out">Sold Out</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Users className="w-4 h-4 inline mr-1" />
                  Min Pax
                </label>
                <input
                  type="number"
                  name="minPax"
                  value={formData.minPax}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Users className="w-4 h-4 inline mr-1" />
                  Max Pax
                </label>
                <input
                  type="number"
                  name="maxPax"
                  value={formData.maxPax}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="20"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={Settings} title="Booking Information" section="booking" />
        </div>
        {activeSections.booking && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Booking Lead Time (Days)
                </label>
                <input
                  type="number"
                  name="bookingLeadTime"
                  value={formData.bookingLeadTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="7"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Cancellation Policy
                </label>
                <select
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="flexible">Flexible</option>
                  <option value="moderate">Moderate</option>
                  <option value="strict">Strict</option>
                  <option value="super_strict">Super Strict</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={Eye} title="Status" section="status" />
        </div>
        {activeSections.status && (
          <div className="p-6">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full md:w-1/3 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        )}
      </div>

      {/* Highlights */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={Plus} title="Highlights" section="highlights" />
        </div>
        {activeSections.highlights && (
          <div className="p-6">
            <div className="space-y-3">
              {formData.highlights.map((item, index) => (
                <div key={index} className="flex gap-3 items-center group">
                  <span className="text-blue-500 font-bold">•</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange("highlights", index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`Highlight ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("highlights", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("highlights")}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Highlight
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inclusions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={Plus} title="Inclusions" section="inclusions" />
        </div>
        {activeSections.inclusions && (
          <div className="p-6">
            <div className="space-y-3">
              {formData.inclusions.map((item, index) => (
                <div key={index} className="flex gap-3 items-center group">
                  <span className="text-green-500 font-bold">✓</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange("inclusions", index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`Inclusion ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("inclusions", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("inclusions")}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Inclusion
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exclusions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <SectionHeader icon={Plus} title="Exclusions" section="exclusions" />
        </div>
        {activeSections.exclusions && (
          <div className="p-6">
            <div className="space-y-3">
              {formData.exclusions.map((item, index) => (
                <div key={index} className="flex gap-3 items-center group">
                  <span className="text-red-500 font-bold">✗</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange("exclusions", index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`Exclusion ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("exclusions", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("exclusions")}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Exclusion
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Gallery */}
      <GalleryForm formData={formData} setFormData={setFormData} />

      {/* Itinerary */}
      <ItineraryForm formData={formData} setFormData={setFormData} />

      {/* Footer Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          <span className="text-red-500">*</span> Required fields
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => router.push("/admin/packages")}
            className="flex-1 sm:flex-none px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {packageData ? "Update Package" : "Create Package"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}