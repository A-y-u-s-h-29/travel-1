import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    // --- Core ---
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { 
  type: String, 
  trim: true,
  default: '',
  maxlength: [500, "Description cannot exceed 500 characters"]
},

    // --- SEO ---
    metaDescription: { type: String, trim: true },
    canonicalUrl: { type: String, trim: true },
    ogImageUrl: { type: String },
    ogImageAlt: { type: String },
    noindex: { type: Boolean, default: false },

    // --- Content ---
    excerpt: { type: String, trim: true }, // short summary shown in listing
    bodyJson: { type: mongoose.Schema.Types.Mixed, default: {} }, // rich text JSON
    coverImageUrl: { type: String },
    coverImageAlt: { type: String },

    // --- Taxonomy ---
    category: { type: String, trim: true }, // e.g. "Travel Tips", "Destination Guide"
    tags: [{ type: String, trim: true }],

    // --- Author ---
    authorName: { type: String, trim: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },

    // --- Status & Dates ---
    status: {
      type: String,
      enum: ["DRAFT", "IN_REVIEW", "SCHEDULED", "PUBLISHED"],
      default: "DRAFT",
    },
    scheduledFor: { type: Date },
    publishedAt: { type: Date },

    // --- Reading time (auto-calculated) ---
    readingTimeMinutes: { type: Number, default: 1 },

    // --- Featured ---
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BlogSchema.index({ slug: 1 }, { unique: true });
BlogSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);