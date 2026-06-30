import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking, {
  BOOKING_STATUSES,
  PAYMENT_STATUSES,
} from "@/models/Booking";
import Package from "@/models/Package";
/**
 * GET /api/bookings
 *
 * Query params (all optional):
 *   - search          matches against bookingId (case-insensitive, partial)
 *   - customerName    matches against customerName (case-insensitive, partial)
 *   - bookingStatus   exact match, one of BOOKING_STATUSES
 *   - paymentStatus   exact match, one of PAYMENT_STATUSES
 *   - page            default 1
 *   - limit           default 20
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim();
    const customerName = searchParams.get("customerName")?.trim();
    const bookingStatus = searchParams.get("bookingStatus")?.trim();
    const paymentStatus = searchParams.get("paymentStatus")?.trim();

    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "20", 10), 1),
      100
    );

    const query = {};

    if (search) {
      query.bookingId = { $regex: search, $options: "i" };
    }

    if (customerName) {
      query.customerName = { $regex: customerName, $options: "i" };
    }

    if (bookingStatus && BOOKING_STATUSES.includes(bookingStatus)) {
      query.bookingStatus = bookingStatus;
    }

    if (paymentStatus && PAYMENT_STATUSES.includes(paymentStatus)) {
      query.paymentStatus = paymentStatus;
    }

    const total = await Booking.countDocuments(query);

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      // Pull in just the display fields the list view needs from related collections
      .populate("packageId", "name")
     
      .lean();

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(Math.ceil(total / limit), 1),
      },
    });
  } catch (error) {
    console.error("GET /api/booking error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Creates a new booking. Generates a bookingId automatically if one
 * is not supplied by the caller.
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const required = [
      "packageId",
    
      "customerName",
      "email",
      "phone",
      "travelers",
      "amount",
    ];

    const missing = required.filter((field) => {
      const value = body[field];
      return value === undefined || value === null || value === "";
    });

    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required field(s): ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const bookingId = body.bookingId || generateBookingId();

    const booking = await Booking.create({
      bookingId,
      packageId: body.packageId,
      
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      travelers: body.travelers,
      currency: body.currency || "INR",
      amount: body.amount,
      paymentStatus: body.paymentStatus || "Pending",
      bookingStatus: body.bookingStatus || "Pending",
      gatewayOrderId: body.gatewayOrderId || null,
      gatewayPaymentId: body.gatewayPaymentId || null,
      invoiceId: body.invoiceId || null,
      leadId: body.leadId || null,
    });

    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/bookings error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A booking with this bookingId already exists." },
        { status: 409 }
      );
    }

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create booking." },
      { status: 500 }
    );
  }
}

/** Generates a readable, sufficiently-unique booking reference. */
function generateBookingId() {
  const datePart = new Date()
    .toISOString()
    .slice(2, 10)
    .replace(/-/g, ""); // YYMMDD
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4 digits
  return `BK-${datePart}-${randomPart}`;
}