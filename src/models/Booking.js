import mongoose from "mongoose";

const { Schema } = mongoose;

export const BOOKING_STATUSES = ["Pending", "Paid", "Cancelled", "Refunded"];
export const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

const BookingSchema = new Schema(
  {
    // Human-readable unique booking reference, e.g. "BK-240613-7421"
    bookingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    // References to the package & specific departure batch being booked
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
   

    // Customer information
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Trip details
    travelers: {
      // Number of PAX on this booking
      type: Number,
      required: true,
      min: 1,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      default: "INR",
    },
    amount: {
      // Total amount for the booking, in `currency`
      type: Number,
      required: true,
      min: 0,
    },

    // Lifecycle status fields
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: "Pending",
      index: true,
    },
    bookingStatus: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "Pending",
      index: true,
    },

    // Payment gateway references
    gatewayOrderId: {
      type: String,
      trim: true,
      default: null,
    },
    gatewayPaymentId: {
      type: String,
      trim: true,
      default: null,
    },

    // Linked downstream/upstream records
    invoiceId: {
      type: String,
      trim: true,
      default: null,
    },
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Helpful compound index for the admin list search/filter combo
BookingSchema.index({ customerName: "text", bookingId: "text" });

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);