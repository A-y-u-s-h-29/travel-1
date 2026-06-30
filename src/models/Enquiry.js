import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    // Optional link to a package if enquiry came from a package page
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      default: null,
    },

    packageName: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "website",
    },

    status: {
      type: String,
      enum: ["new", "contacted", "converted", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

EnquirySchema.index({ status: 1 });
EnquirySchema.index({ createdAt: -1 });

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);