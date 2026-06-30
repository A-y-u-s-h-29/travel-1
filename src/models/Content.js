import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema({
  group: { type: String, trim: true },
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  schemaEligible: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

const InternalLinkSchema = new mongoose.Schema({
  toSlug: { type: String, required: true },
  toTitle: { type: String },
  anchor: { type: String, required: true },
  context: {
    type: String,
    enum: ["BODY", "HUB", "SPOKE", "LATERAL", "COMMERCIAL_BRIDGE"],
    default: "BODY",
  },
});

const ContentSchema = new mongoose.Schema(
  {
    // --- Type & Section ---
    type: {
      type: String,
      enum: [
        "PACKAGE",
        "ATTRACTION",
        "GUIDE",
        "ROUTE",
        "AUDIENCE",
        "EVENT",
        "TRUST",
      ],
      required: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },

    // --- Core SEO Fields ---
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // ✅ minlength/maxlength hataya — validation sirf API pe hogi
    title: {
      type: String,
      trim: true,
      default: "",
    },

    // ✅ minlength/maxlength hataya — validation sirf API pe hogi
    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },

    canonicalUrl: { type: String, trim: true },
    h1: { type: String, trim: true, default: "" },

    // ✅ required hataya — DRAFT mein empty allowed
    tldr: {
      type: String,
      default: "",
    },

    // --- Body ---
    bodyJson: { type: mongoose.Schema.Types.Mixed, default: {} },

    // --- Media ---
    heroImageUrl: { type: String, default: "" },
    heroImageAlt: { type: String, default: "" },
    ogImageUrl: { type: String, default: "" },

    // --- Relations ---
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },

    // --- FAQs ---
    faqs: [FaqSchema],

    // --- Internal Links ---
    internalLinks: [InternalLinkSchema],

    // --- External Citations ---
    externalCitations: [{ type: String, trim: true }],

    // --- Status & Workflow ---
    status: {
      type: String,
      enum: ["DRAFT", "IN_REVIEW", "SCHEDULED", "PUBLISHED"],
      default: "DRAFT",
    },
    noindex: { type: Boolean, default: false },
    scheduledFor: { type: Date },
    datePublished: { type: Date },
    dateModified: { type: Date },

    // --- Content Audit ---
    staleFlag: { type: Boolean, default: false },

    // --- Package-specific data ---
    packageData: { type: mongoose.Schema.Types.Mixed },

    // --- Attraction-specific data ---
    attractionData: { type: mongoose.Schema.Types.Mixed },

    // --- Schema Override ---
    schemaOverrideJson: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

ContentSchema.index({ section: 1, slug: 1 }, { unique: true });
ContentSchema.index({ type: 1, status: 1 });

ContentSchema.pre("save", function () {
  this.dateModified = new Date();
});

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);