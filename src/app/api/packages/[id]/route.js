import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";
import mongoose from "mongoose";

function getIdentifierFromUrl(request) {
  const url = new URL(request.url);
  const segments = url.pathname.split("/").filter(Boolean);
  return segments[segments.length - 1];
}

export async function GET(request) {
  try {
    await connectDB();
    const identifier = getIdentifierFromUrl(request);
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

    const pkg = isObjectId
      ? await Package.findById(identifier)
      : await Package.findOne({ slug: identifier });

    if (!pkg) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pkg });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const identifier = getIdentifierFromUrl(request);
    const body = await request.json();
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

    const pkg = isObjectId
      ? await Package.findByIdAndUpdate(identifier, body, { new: true, runValidators: true })
      : await Package.findOneAndUpdate({ slug: identifier }, body, { new: true, runValidators: true });

    if (!pkg) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pkg });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const identifier = getIdentifierFromUrl(request);
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

    const pkg = isObjectId
      ? await Package.findByIdAndDelete(identifier)
      : await Package.findOneAndDelete({ slug: identifier });

    if (!pkg) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}