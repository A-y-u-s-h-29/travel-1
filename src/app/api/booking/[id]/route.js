import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Booking, {
  BOOKING_STATUSES,
  PAYMENT_STATUSES,
} from "@/models/Booking";

/** Finds a booking by Mongo _id if valid, otherwise falls back to bookingId. No population — safe to mutate & save. */
async function findBookingRaw(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const byMongoId = await Booking.findById(id);
    if (byMongoId) return byMongoId;
  }
  return Booking.findOne({ bookingId: id });
}

/** Same lookup as above, but populates related package/departure display fields for read-only views. */
async function findBookingPopulated(id) {
  const populateOpts = [
    { path: "packageId", select: "name" },
   
  ];

  if (mongoose.Types.ObjectId.isValid(id)) {
    const byMongoId = await Booking.findById(id).populate(populateOpts);
    if (byMongoId) return byMongoId;
  }
  return Booking.findOne({ bookingId: id }).populate(populateOpts);
}

/** GET /api/bookings/:id */
export async function GET(request, { params }) {
  try {
    await connectDB();
 const { id } = await params;
    const booking = await findBookingPopulated(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("GET /api/bookings/:id error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch booking." },
      { status: 500 }
    );
  }
}

/** PUT /api/bookings/:id — partial update, commonly used to progress the booking lifecycle */
export async function PUT(request, { params }) {
  try {
    await connectDB();
  const { id } = await params;
    const body = await request.json();

    if (body.bookingStatus && !BOOKING_STATUSES.includes(body.bookingStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid bookingStatus." },
        { status: 400 }
      );
    }

    if (body.paymentStatus && !PAYMENT_STATUSES.includes(body.paymentStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid paymentStatus." },
        { status: 400 }
      );
    }
   

    const booking = await findBookingRaw(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    // Never allow bookingId or _id to be overwritten via this endpoint.
    const { bookingId, _id, ...updatableFields } = body;

    Object.assign(booking, updatableFields);
    await booking.save();

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("PUT /api/bookings/:id error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to update booking." },
      { status: 500 }
    );
  }
}

/** DELETE /api/bookings/:id */
export async function DELETE(request, { params }) {
  try {
    await connectDB();
  const { id } = await params;
    const booking = await findBookingRaw(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    await booking.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/bookings/:id error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete booking." },
      { status: 500 }
    );
  }
}