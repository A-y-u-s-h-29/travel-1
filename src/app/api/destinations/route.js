import { NextResponse } from "next/server";

import Destination from "@/models/Destination";
import { connectDB } from "@/lib/db";

// GET all destinations
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") === "true";

    const filter = activeOnly ? { isActive: true } : {};
    const destinations = await Destination.find(filter)
      .sort({ order: 1, name: 1 })
      .lean();

    return NextResponse.json({ success: true, data: destinations });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create destination
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Auto-generate slug if not provided
    if (!body.slug && body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    // Check duplicate
    const existing = await Destination.findOne({
      $or: [{ name: body.name }, { slug: body.slug }],
    });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Destination with this name or slug already exists" },
        { status: 409 }
      );
    }

    const destination = await Destination.create(body);
    return NextResponse.json(
      { success: true, data: destination },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}