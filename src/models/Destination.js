import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      default: "India",
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    heroImage: {
      type: String, // URL or S3 key
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);




export default mongoose.models.Destination ||
  mongoose.model("Destination", DestinationSchema);