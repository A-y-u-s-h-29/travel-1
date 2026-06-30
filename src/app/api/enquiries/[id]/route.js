import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

// GET /api/enquiries/[id]
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/enquiries/[id]  (mainly used to update status)
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const enquiry = await Enquiry.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/enquiries/[id]
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    await Enquiry.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}