import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

// GET /api/enquiries?status=new&search=john
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/enquiries  (used by the public enquiry/contact form)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const enquiry = await Enquiry.create(body);

    return NextResponse.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}