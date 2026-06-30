"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Save, ArrowLeft, Loader2, FileText, Search,
  Tag, Image, Star, Plus, X, Sparkles,
  Clock, User, Calendar, Eye, Globe, Info,
  CheckCircle, AlertCircle, Layers, Upload,
  Trash2, Image as ImageIcon
} from "lucide-react";

const STATUSES = [
  { value: "DRAFT", label: "Draft", color: "bg-gray-400", icon: "📝" },
  { value: "IN_REVIEW", label: "In Review", color: "bg-amber-400", icon: "🔍" },
  { value: "SCHEDULED", label: "Scheduled", color: "bg-blue-400", icon: "📅" },
  { value: "PUBLISHED", label: "Published", color: "bg-emerald-400", icon: "🚀" },
];

const CATEGORIES = [
  "Travel Tips",
  "Destination Guide",
  "Itinerary",
  "Culture & History",
  "Food & Dining",
  "Budget Travel",
  "Luxury Travel",
  "Photography",
  "FAQ",
  "News",
];

const initialState = {
  title: "",
  slug: "",
  metaDescription: "",
  canonicalUrl: "",
  excerpt: "",
  bodyJson: {},
  coverImageUrl: "",
  coverImageAlt: "",
  ogImageUrl: "",
  category: "",
  tags: [],
  authorName: "",
  status: "DRAFT",
  isFeatured: false,
  readingTimeMinutes: 1,
  scheduledFor: "",
};

function CharCounter({ value = "", min, max }) {
  const len = value.length;
  const ok = len >= min && len <= max;
  const pct = Math.min((len / max) * 100, 100);
  
  let color = "bg-emerald-400";
  let textColor = "text-emerald-600";
  if (!ok && len > max) { color = "bg-red-400"; textColor = "text-red-600"; }
  else if (!ok && len < min) { color = "bg-amber-400"; textColor = "text-amber-600"; }

  return (
    <div className="mt-1.5">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className={`font-medium ${textColor}`}>
          {len} characters
        </span>
        <span className="text-gray-400">{min}–{max} chars</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Tab({ active, onClick, icon: Icon, label, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200 scale-[1.02]"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
      {badge !== undefined && (
        <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
          active ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function SectionCard({ title, icon: Icon, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center gap-2">
        <div className="p-1.5 bg-indigo-100 rounded-lg">
          <Icon className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-6 space-y-5">
        {children}
      </div>
    </div>
  );
}

function InputGroup({ label, required, children, helper, error }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
        {label}
        {required && <span className="text-red-400">*</span>}
        {helper && (
          <span className="relative group cursor-help">
            <Info className="w-3.5 h-3.5 text-gray-400" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 w-48 text-center">
              {helper}
            </div>
          </span>
        )}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function StatusBadge({ status }) {
  const statusObj = STATUSES.find(s => s.value === status);
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
      <span className="text-sm">{statusObj?.icon}</span>
      <span className={`w-1.5 h-1.5 rounded-full ${statusObj?.color || 'bg-gray-400'}`} />
      <span className="text-sm font-medium text-gray-700">{statusObj?.label || status}</span>
    </div>
  );
}

export default function BlogForm({ blog = null }) {
  const router = useRouter();
  const isEdit = !!blog;
  const [tab, setTab] = useState("basic");
  const [formData, setFormData] = useState(isEdit ? { ...initialState, ...blog } : initialState);
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Auto slug
  useEffect(() => {
    if (!slugEdited && formData.title) {
      setFormData((p) => ({
        ...p,
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-"),
      }));
    }
  }, [formData.title, slugEdited]);

  function handle(e) {
    const { name, value, type, checked } = e.target;
    if (name === "slug") setSlugEdited(true);
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (t && !formData.tags.includes(t)) {
      setFormData((p) => ({ ...p, tags: [...p.tags, t] }));
    }
    setTagInput("");
  }

  function removeTag(t) {
    setFormData((p) => ({ ...p, tags: p.tags.filter((x) => x !== t) }));
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (!result.success) throw new Error(result.message);

      setFormData((prev) => ({
        ...prev,
        coverImageUrl: result.url,
      }));
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  function removeImage() {
    setFormData((prev) => ({ ...prev, coverImageUrl: "" }));
    setPreviewImage(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const url = isEdit ? `/api/blogs/${blog._id}` : "/api/blogs";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white placeholder:text-gray-400";
  const inpDark = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
      {/* Success/Error Messages */}
      {success && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 text-sm animate-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5" />
          <span>Blog {isEdit ? 'updated' : 'created'} successfully! Redirecting...</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Header with Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <StatusBadge status={formData.status} />
        </div>
        {formData.isFeatured && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200">
            <Star className="w-3.5 h-3.5" />
            Featured
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          {["basic", "seo", "media", "taxonomy"].map((t, i) => (
            <div key={t} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                tab === t ? "bg-indigo-600 text-white" :
                ["basic", "seo", "media", "taxonomy"].indexOf(tab) > i ? "bg-emerald-500 text-white" :
                "bg-gray-200 text-gray-500"
              }`}>
                {["basic", "seo", "media", "taxonomy"].indexOf(tab) > i ? "✓" : i + 1}
              </div>
              {i < 3 && <div className={`w-8 h-0.5 ${["basic", "seo", "media", "taxonomy"].indexOf(tab) > i ? "bg-emerald-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
        <span className="text-gray-400 text-xs ml-2">Step {["basic", "seo", "media", "taxonomy"].indexOf(tab) + 1}/4</span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
        <Tab active={tab === "basic"} onClick={() => setTab("basic")} icon={FileText} label="Basic" />
        <Tab active={tab === "seo"} onClick={() => setTab("seo")} icon={Search} label="SEO" />
        <Tab active={tab === "media"} onClick={() => setTab("media")} icon={Image} label="Media" />
        <Tab active={tab === "taxonomy"} onClick={() => setTab("taxonomy")} icon={Tag} label="Tags" badge={formData.tags.length} />
      </div>

      {/* ── BASIC TAB ── */}
      {tab === "basic" && (
        <SectionCard title="Basic Information" icon={FileText}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup label="Status">
              <select name="status" value={formData.status} onChange={handle} className={inp}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.icon} {s.label}
                  </option>
                ))}
              </select>
            </InputGroup>
            <InputGroup label="Category">
              <select name="category" value={formData.category} onChange={handle} className={inp}>
                <option value="">— Select category —</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </InputGroup>
          </div>

          <InputGroup label="Title" required helper="Compelling title for your blog post">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handle}
              required
              className={inp}
              placeholder="e.g. 10 Best Places to Visit in Delhi"
            />
          </InputGroup>

          <InputGroup label="Slug" helper="Auto-generated from title">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                /blog/
              </div>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handle}
                className={`${inp} pl-16 font-mono text-sm`}
                placeholder="your-blog-slug"
              />
            </div>
          </InputGroup>

          <InputGroup label="Excerpt" helper="Short summary shown on blog listing page">
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handle}
              rows={3}
              className={`${inp} resize-none`}
              placeholder="Write a compelling excerpt that captures the essence of your blog..."
            />
          </InputGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup label="Author Name">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handle}
                  className={`${inp} pl-10`}
                  placeholder="e.g. Gurudutt Sharma"
                />
              </div>
            </InputGroup>
            <InputGroup label="Reading Time">
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="readingTimeMinutes"
                  value={formData.readingTimeMinutes}
                  onChange={handle}
                  min={1}
                  className={`${inp} pl-10`}
                />
              </div>
            </InputGroup>
          </div>

          {formData.status === "SCHEDULED" && (
            <InputGroup label="Scheduled For">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="datetime-local"
                  name="scheduledFor"
                  value={formData.scheduledFor || ""}
                  onChange={handle}
                  className={`${inp} pl-10`}
                />
              </div>
            </InputGroup>
          )}

          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-amber-50/50 rounded-xl border border-amber-100">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-amber-400 transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
            </label>
            <div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-gray-700">Featured Post</span>
              </div>
              <p className="text-xs text-gray-500">Highlight this post on the homepage</p>
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── SEO TAB ── */}
      {tab === "seo" && (
        <SectionCard title="SEO & Metadata" icon={Search}>
          <InputGroup label="Meta Description" required helper="140–155 characters, include keyword + CTA">
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handle}
              rows={3}
              className={`${inp} resize-none`}
              placeholder="Write a compelling meta description that includes the primary keyword..."
            />
            <CharCounter value={formData.metaDescription} min={140} max={155} />
          </InputGroup>

          <InputGroup label="Canonical URL" helper="Leave blank to auto-set">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="canonicalUrl"
                value={formData.canonicalUrl}
                onChange={handle}
                className={`${inp} pl-10`}
                placeholder="https://example.com/your-canonical-url"
              />
            </div>
          </InputGroup>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="noindex"
                checked={formData.noindex}
                onChange={handle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-500 transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
            </label>
            <div>
              <span className="text-sm font-medium text-gray-700">No-index this page</span>
              <p className="text-xs text-gray-400">Exclude from search engine indexing</p>
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── MEDIA TAB ── */}
      {tab === "media" && (
        <SectionCard title="Media Assets" icon={Image}>
          <InputGroup label="Cover Image" required helper="Upload a high-quality image for your blog post">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={`${inp} cursor-pointer`}
                disabled={uploading}
              />
              {uploading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                </div>
              )}
            </div>
          </InputGroup>

          {(formData.coverImageUrl || previewImage) && (
            <div className="relative group rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50">
              <img
                src={previewImage || formData.coverImageUrl}
                alt={formData.coverImageAlt || "Cover image preview"}
                className="w-full max-h-64 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={removeImage}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => window.open(formData.coverImageUrl, '_blank')}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <ImageIcon className="w-3 h-3" />
                Preview
              </div>
            </div>
          )}

          <InputGroup label="Image Alt Text" helper="Descriptive alt text for accessibility and SEO">
            <input
              type="text"
              name="coverImageAlt"
              value={formData.coverImageAlt}
              onChange={handle}
              className={inp}
              placeholder="Descriptive alt text for the cover image"
            />
          </InputGroup>

          <InputGroup label="OG Image URL" helper="Open Graph image for social sharing (optional)">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="ogImageUrl"
                value={formData.ogImageUrl}
                onChange={handle}
                className={`${inp} pl-10`}
                placeholder="Defaults to cover image if not specified"
              />
            </div>
          </InputGroup>
        </SectionCard>
      )}

      {/* ── TAXONOMY TAB ── */}
      {tab === "taxonomy" && (
        <SectionCard title="Tags & Taxonomy" icon={Tag}>
          <InputGroup label="Tags" helper="Add relevant tags to categorize your content">
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                className={`${inp} flex-1`}
                placeholder="Type a tag and press Enter or click Add"
              />
              <button
                type="button"
                onClick={addTag}
                disabled={!tagInput.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-sm font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </InputGroup>

          {formData.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl min-h-[60px] border border-indigo-100">
              {formData.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 text-sm font-medium bg-white text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <span>#{t}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="p-0.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group-hover:scale-110"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
              <Tag className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm font-medium">No tags added yet</p>
              <p className="text-xs">Add tags to improve content discoverability</p>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{formData.tags.length} tags added</span>
            {formData.tags.length >= 5 && (
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">👍 Great job!</span>
            )}
          </div>
        </SectionCard>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? "Saving..." : isEdit ? "Update Blog" : "Publish Blog"}
        </button>
      </div>
    </form>
  );
}