"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Globe, AlignLeft, Hash, ToggleLeft, Loader2, Save, ArrowLeft } from "lucide-react";

const initialState = {
  name: "",
  slug: "",
  state: "",
  country: "India",
  description: "",
  isActive: true,
  order: 0,
};

export default function DestinationForm({ destination = null }) {
  const router = useRouter();
  const isEdit = !!destination;

  const [formData, setFormData] = useState(
    isEdit ? { ...initialState, ...destination } : initialState
  );
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from name
  useEffect(() => {
    if (!slugEdited && formData.name) {
      const auto = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setFormData((prev) => ({ ...prev, slug: auto }));
    }
  }, [formData.name, slugEdited]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === "slug") setSlugEdited(true);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEdit
        ? `/api/destinations/${destination._id}`
        : "/api/destinations";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      router.push("/admin/destinations");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400";
  const labelClass = "block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5";

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isEdit ? "Edit Destination" : "Create New Destination"}
              </h2>
              <p className="text-sm text-gray-500">
                {isEdit ? "Update destination details" : "Add a new destination to your travel packages"}
              </p>
            </div>
          </div>
        </div>

        {/* Name + Slug row */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                <MapPin className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                Destination Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="e.g., Agra"
              />
            </div>

            <div>
              <label className={labelClass}>
                <Hash className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={`${inputClass} font-mono text-xs`}
                placeholder="e.g., agra"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Used in URLs · lowercase, hyphens only
              </p>
            </div>
          </div>
        </div>

        {/* State + Country */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                <Globe className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., Uttar Pradesh"
              />
            </div>

            <div>
              <label className={labelClass}>
                <Globe className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={inputClass}
                placeholder="India"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <label className={labelClass}>
            <AlignLeft className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
            Short Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Brief description shown in dropdowns and listings..."
          />
        </div>

        {/* Order + Active */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-full sm:w-40">
              <label className={labelClass}>Display Order</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min={0}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200" />
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5" />
              </label>
              <span className="text-sm font-medium text-gray-700">
                {formData.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl w-full sm:w-auto"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? "Saving..." : isEdit ? "Update Destination" : "Create Destination"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}