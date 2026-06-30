"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Save, ArrowLeft, Loader2, Eye, EyeOff,
  FileText, Search, AlignLeft, Link2, Plus, Trash2,
  ChevronDown, ChevronRight, CheckCircle, AlertCircle,
  Info, Globe, Hash, Calendar, Tag, Layers
} from "lucide-react";

const PAGE_TYPES = [
  "PACKAGE", "ATTRACTION", "GUIDE", "ROUTE", "AUDIENCE", "EVENT", "TRUST",
];

const SECTIONS = [
  "delhi", "agra", "guides", "tours-for", "packages", "trust", "events",
];

const STATUSES = ["DRAFT", "IN_REVIEW", "SCHEDULED", "PUBLISHED"];

const initialState = {
  type: "GUIDE",
  section: "guides",
  slug: "",
  title: "",
  metaDescription: "",
  h1: "",
  tldr: "",
  bodyJson: {},
  heroImageUrl: "",
  heroImageAlt: "",
  canonicalUrl: "",
  noindex: false,
  status: "DRAFT",
  externalCitations: [""],
  faqs: [],
  internalLinks: [],
};

function wordCount(str = "") {
  if (!str || typeof str !== "string") return 0;
  return str
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

// ── Counter Bar ──────────────────────────────────────
function Counter({ value, min, max, label, type = "chars" }) {
  const len = type === "words" ? wordCount(value) : (value || "").length;
  const ok = len >= min && len <= max;
  const pct = Math.min((len / max) * 100, 100);

  let color = "bg-emerald-400";
  let textColor = "text-emerald-600";
  let bgColor = "bg-emerald-50";

  if (!ok && len > max) {
    color = "bg-red-400";
    textColor = "text-red-600";
    bgColor = "bg-red-50";
  } else if (!ok && len < min && len > 0) {
    color = "bg-amber-400";
    textColor = "text-amber-600";
    bgColor = "bg-amber-50";
  } else if (len === 0) {
    color = "bg-gray-300";
    textColor = "text-gray-400";
    bgColor = "bg-gray-50";
  }

  return (
    <div className="mt-1.5">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className={`font-medium ${textColor}`}>
          {len} {type}
        </span>
        <span className="text-gray-400">{min}–{max} {type}</span>
      </div>
      <div className={`h-1.5 w-full ${bgColor} rounded-full overflow-hidden border border-gray-100`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Tab Button ───────────────────────────────────────
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

// ── Section Card ─────────────────────────────────────
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

// ── Input Group ──────────────────────────────────────
function InputGroup({ label, required, children, helper, error }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
        {label}
        {required && <span className="text-red-400">*</span>}
        {helper && (
          <span className="relative group cursor-help">
            <Info className="w-3.5 h-3.5 text-gray-400" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 w-48 text-center z-10">
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

// ── Array Item Card ──────────────────────────────────
function ArrayItemCard({ children, onRemove, index, title }) {
  return (
    <div className="group relative border border-gray-200 rounded-xl p-5 bg-gray-50/30 hover:bg-gray-50/50 transition-all hover:border-indigo-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400">
          {title || `Item #${index + 1}`}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════
export default function ContentForm({ content = null }) {
  const router = useRouter();
  const isEdit = !!content;
  const [tab, setTab] = useState("basic");
  const [formData, setFormData] = useState(
    isEdit ? { ...initialState, ...content } : initialState
  );
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto slug from title
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

  // Citations
  function setCitation(i, val) {
    const arr = [...formData.externalCitations];
    arr[i] = val;
    setFormData((p) => ({ ...p, externalCitations: arr }));
  }
  function addCitation() {
    setFormData((p) => ({ ...p, externalCitations: [...p.externalCitations, ""] }));
  }
  function removeCitation(i) {
    setFormData((p) => ({
      ...p,
      externalCitations: p.externalCitations.filter((_, idx) => idx !== i),
    }));
  }

  // FAQs
  function addFaq() {
    setFormData((p) => ({
      ...p,
      faqs: [...p.faqs, { group: "", question: "", answer: "", schemaEligible: false, order: p.faqs.length }],
    }));
  }
  function updateFaq(i, field, val) {
    const arr = [...formData.faqs];
    arr[i] = { ...arr[i], [field]: val };
    setFormData((p) => ({ ...p, faqs: arr }));
  }
  function removeFaq(i) {
    setFormData((p) => ({ ...p, faqs: p.faqs.filter((_, idx) => idx !== i) }));
  }

  // Internal Links
  function addLink() {
    setFormData((p) => ({
      ...p,
      internalLinks: [...p.internalLinks, { toSlug: "", toTitle: "", anchor: "", context: "BODY" }],
    }));
  }
  function updateLink(i, field, val) {
    const arr = [...formData.internalLinks];
    arr[i] = { ...arr[i], [field]: val };
    setFormData((p) => ({ ...p, internalLinks: arr }));
  }
  function removeLink(i) {
    setFormData((p) => ({ ...p, internalLinks: p.internalLinks.filter((_, idx) => idx !== i) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const url = isEdit ? `/api/contents/${content._id}` : "/api/contents";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          externalCitations: formData.externalCitations.filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/contents");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
      {/* Success/Error Messages */}
      {success && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 text-sm animate-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5" />
          <span>Content {isEdit ? "updated" : "created"} successfully! Redirecting...</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Content" : "Create New Content"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit ? "Update your content page details" : "Fill in the details to create a new content page"}
          </p>
        </div>
        <div className="flex items-center gap-3">
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
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? "Saving..." : isEdit ? "Update Content" : "Save Content"}
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          {["basic", "seo", "faqs", "links"].map((t, i) => (
            <div key={t} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                tab === t ? "bg-indigo-600 text-white" :
                ["basic", "seo", "faqs", "links"].indexOf(tab) > i ? "bg-emerald-500 text-white" :
                "bg-gray-200 text-gray-500"
              }`}>
                {["basic", "seo", "faqs", "links"].indexOf(tab) > i ? "✓" : i + 1}
              </div>
              {i < 3 && (
                <div className={`w-8 h-0.5 ${
                  ["basic", "seo", "faqs", "links"].indexOf(tab) > i ? "bg-emerald-500" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>
        <span className="text-gray-400 text-xs ml-2">
          Step {["basic", "seo", "faqs", "links"].indexOf(tab) + 1}/4
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
        <Tab active={tab === "basic"} onClick={() => setTab("basic")} icon={FileText} label="Basic" />
        <Tab active={tab === "seo"} onClick={() => setTab("seo")} icon={Search} label="SEO" />
        <Tab active={tab === "faqs"} onClick={() => setTab("faqs")} icon={AlignLeft} label="FAQs" badge={formData.faqs.length} />
        <Tab active={tab === "links"} onClick={() => setTab("links")} icon={Link2} label="Links" badge={formData.internalLinks.length} />
      </div>

      {/* ── BASIC TAB ── */}
      {tab === "basic" && (
        <SectionCard title="Basic Information" icon={FileText}>
          {/* Type + Section + Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InputGroup label="Page Type" required>
              <select name="type" value={formData.type} onChange={handle} className={inp}>
                {PAGE_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </InputGroup>
            <InputGroup label="Section" required>
              <select name="section" value={formData.section} onChange={handle} className={inp}>
                {SECTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </InputGroup>
            <InputGroup label="Status">
              <select name="status" value={formData.status} onChange={handle} className={inp}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </InputGroup>
          </div>

          {/* H1 — ✅ required hataya */}
          <InputGroup label="H1 Heading" helper="Main heading displayed on the page">
            <input
              type="text"
              name="h1"
              value={formData.h1}
              onChange={handle}
              className={inp}
              placeholder="e.g. The Ultimate Guide to Agra"
            />
          </InputGroup>

          {/* TL;DR — ✅ required hataya, Counter sirf visual */}
          <InputGroup label="TL;DR" helper="40–55 word summary shown after H1">
            <textarea
              name="tldr"
              value={formData.tldr}
              onChange={handle}
              rows={3}
              className={`${inp} resize-none`}
              placeholder="Write a concise summary of the page content..."
            />
           
          </InputGroup>

          {/* Hero image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup label="Hero Image URL">
              <input
                type="text"
                name="heroImageUrl"
                value={formData.heroImageUrl}
                onChange={handle}
                className={inp}
                placeholder="https://images.example.com/hero.jpg"
              />
            </InputGroup>
            <InputGroup label="Hero Image Alt">
              <input
                type="text"
                name="heroImageAlt"
                value={formData.heroImageAlt}
                onChange={handle}
                className={inp}
                placeholder="Descriptive alt text for accessibility"
              />
            </InputGroup>
          </div>

          {/* Scheduled for */}
          {formData.status === "SCHEDULED" && (
            <InputGroup label="Scheduled For">
              <input
                type="datetime-local"
                name="scheduledFor"
                value={formData.scheduledFor || ""}
                onChange={handle}
                className={inp}
              />
            </InputGroup>
          )}

          {/* Noindex */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
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

      {/* ── SEO TAB ── */}
      {tab === "seo" && (
        <SectionCard title="SEO & Metadata" icon={Search}>
          {/* Title */}
          <InputGroup label="Title Tag" helper="20–60 characters, primary keyword first">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handle}
              className={inp}
              placeholder="Primary Keyword First | Brand Name"
            />
            <Counter value={formData.title} min={20} max={60} label="chars" />
          </InputGroup>

          {/* Slug */}
          <InputGroup label="Slug" helper="Auto-generated from title">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                /{formData.section}/
              </div>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handle}
                className={`${inp} pl-20 font-mono text-sm`}
                placeholder="your-page-slug"
              />
            </div>
          </InputGroup>

          {/* Meta description */}
          <InputGroup label="Meta Description" helper="140–155 characters, include keyword + CTA">
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handle}
              rows={3}
              className={`${inp} resize-none`}
              placeholder="Write a compelling meta description that includes the primary keyword..."
            />
            <Counter value={formData.metaDescription} min={140} max={155} label="chars" />
          </InputGroup>

          {/* Canonical */}
          <InputGroup label="Canonical URL" helper="Leave blank to auto-set">
            <input
              type="text"
              name="canonicalUrl"
              value={formData.canonicalUrl}
              onChange={handle}
              className={inp}
              placeholder="https://example.com/your-canonical-url"
            />
          </InputGroup>

          {/* External Citations */}
          <InputGroup label="External Citations" helper="2–5 authoritative sources">
            <div className="space-y-3">
              {formData.externalCitations.map((url, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setCitation(i, e.target.value)}
                    className={`${inp} flex-1`}
                    placeholder="https://authoritative-source.com/article"
                  />
                  <button
                    type="button"
                    onClick={() => removeCitation(i)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addCitation}
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Citation
              </button>
            </div>
          </InputGroup>
        </SectionCard>
      )}

      {/* ── FAQS TAB ── */}
      {tab === "faqs" && (
        <SectionCard title="FAQs" icon={AlignLeft}>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Target: 50 FAQs · Answer 40–80 words each</p>
            <button
              type="button"
              onClick={addFaq}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              Add FAQ
            </button>
          </div>

          {formData.faqs.length === 0 && (
            <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
              <AlignLeft className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No FAQs yet</p>
              <p className="text-sm">Click "Add FAQ" to start building your FAQ section</p>
            </div>
          )}

          <div className="space-y-4">
            {formData.faqs.map((faq, i) => (
              <ArrayItemCard key={i} index={i} onRemove={() => removeFaq(i)} title={`FAQ #${i + 1}`}>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={faq.group}
                    onChange={(e) => updateFaq(i, "group", e.target.value)}
                    className={inp}
                    placeholder="Group (e.g. Timing, Booking, Pricing)"
                  />
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                    className={inp}
                    placeholder="Question"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    rows={3}
                    className={`${inp} resize-none`}
                    placeholder="Answer (40–80 words)"
                  />
                  <Counter value={faq.answer} min={40} max={80} label="words" type="words" />
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={faq.schemaEligible}
                      onChange={(e) => updateFaq(i, "schemaEligible", e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Include in FAQPage JSON-LD schema
                  </label>
                </div>
              </ArrayItemCard>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── LINKS TAB ── */}
      {tab === "links" && (
        <SectionCard title="Internal Links" icon={Link2}>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Min 3 body links · No orphan pages</p>
            <button
              type="button"
              onClick={addLink}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </button>
          </div>

          {formData.internalLinks.length === 0 && (
            <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
              <Link2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No internal links yet</p>
              <p className="text-sm">Add at least 3 internal links for SEO</p>
            </div>
          )}

          <div className="space-y-4">
            {formData.internalLinks.map((link, i) => (
              <ArrayItemCard key={i} index={i} onRemove={() => removeLink(i)} title={`Link #${i + 1}`}>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={link.toSlug}
                      onChange={(e) => updateLink(i, "toSlug", e.target.value)}
                      className={inp}
                      placeholder="Target slug (e.g. taj-mahal)"
                    />
                    <input
                      type="text"
                      value={link.anchor}
                      onChange={(e) => updateLink(i, "anchor", e.target.value)}
                      className={inp}
                      placeholder="Anchor text (descriptive)"
                    />
                  </div>
                  <select
                    value={link.context}
                    onChange={(e) => updateLink(i, "context", e.target.value)}
                    className={inp}
                  >
                    {["BODY", "HUB", "SPOKE", "LATERAL", "COMMERCIAL_BRIDGE"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </ArrayItemCard>
            ))}
          </div>
        </SectionCard>
      )}
    </form>
  );
}