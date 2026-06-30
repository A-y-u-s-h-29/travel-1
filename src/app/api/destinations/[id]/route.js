import { NextResponse } from "next/server";

import Destination from "@/models/Destination";
import { connectDB } from "@/lib/db";

// GET single destination
export async function GET(request, { params }) {
  try {
    await connectDB();
    const destination = await Destination.findById(params.id).lean();
    if (!destination) {
      return NextResponse.json(
        { success: false, error: "Destination not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: destination });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; // ← await zaroori hai Next.js 15 mein
    const body = await request.json();

    if (body.name && !body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    // Duplicate check — apne aap ko exclude karo
    const existing = await Destination.findOne({
      _id: { $ne: id }, // ← yeh line critical hai
      $or: [
        ...(body.name ? [{ name: body.name }] : []),
        ...(body.slug ? [{ slug: body.slug }] : []),
      ],
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Another destination with this name or slug already exists" },
        { status: 409 }
      );
    }

    const destination = await Destination.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!destination) {
      return NextResponse.json(
        { success: false, error: "Destination not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: destination });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE destination
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; // ← Next.js 15 fix
    
    const destination = await Destination.findByIdAndDelete(id);
    if (!destination) {
      return NextResponse.json(
        { success: false, error: "Destination not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Destination deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}