import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // SEO
    metaTitle: {
      type: String,
      maxlength: 60,
    },

    metaDescription: {
      type: String,
      maxlength: 160,
    },

    // Description
    shortDescription: {
      type: String,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
    },

    // Pricing
    priceFrom: {
      type: Number,
      required: true,
      min: 0,
    },

    priceTo: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      enum: ["INR", "USD", "EUR", "GBP"],
      default: "INR",
    },

    // Duration
    duration: {
      type: String,
      required: true,
    },

    durationDays: {
      type: Number,
      default: 1,
    },

    durationNights: {
      type: Number,
      default: 0,
    },

    // Category
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    type: {
      type: String,
      enum: [
        "private",
        "group",
        "luxury",
        "budget",
        "family",
        "honeymoon",
        "adventure",
      ],
      default: "private",
    },

    difficulty: {
      type: String,
      enum: ["easy", "moderate", "difficult"],
      default: "easy",
    },

    // Destination
    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
      },
    ],

    mainDestination: {
      type: String,
      required: true,
    },

    // Itinerary
    itinerary: [
      {
        day: Number,

        title: String,

        description: String,

        activities: [String],

        overnight: String,

        meals: {
          breakfast: Boolean,
          lunch: Boolean,
          dinner: Boolean,
        },
      },
    ],

    // Package Details
    highlights: [String],

    inclusions: [String],

    exclusions: [String],

    // Images
    featuredImage: {
      type: String,
      required: true,
    },

    galleryImages: [
      {
        url: String,
        alt: String,
        caption: String,
      },
    ],

    videoUrl: String,

    // Availability
    availability: {
      type: String,
      enum: ["available", "limited", "sold_out", "upcoming"],
      default: "available",
    },

    minPax: {
      type: Number,
      default: 1,
    },

    maxPax: {
      type: Number,
      default: 20,
    },

    // Booking
    bookingLeadTime: {
      type: Number,
      default: 7,
    },

    cancellationPolicy: {
      type: String,
      enum: [
        "flexible",
        "moderate",
        "strict",
        "super_strict",
      ],
      default: "moderate",
    },

    // Status
    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "archived",
        "deleted",
      ],
      default: "draft",
    },

    publishedAt: Date,

    // Statistics
    views: {
      type: Number,
      default: 0,
    },

    bookings: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


PackageSchema.index({ status: 1 });
PackageSchema.index({ categoryId: 1 });
PackageSchema.index({ createdAt: -1 });

// Prevent model overwrite in Next.js
export default mongoose.models.Package ||
  mongoose.model("Package", PackageSchema);