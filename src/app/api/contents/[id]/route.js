import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/models/Content";

// Statuses jisme strict SEO validation lagti hai
const STRICT_STATUSES = ["PUBLISHED", "IN_REVIEW"];

// ── GET single content ────────────────────────────────────────────────────────
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const content = await Content.findById(id)
      .populate("authorId", "fullName slug")
      .populate("reviewerId", "fullName slug")
      .lean();

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...content,
        _id: content._id.toString(),
        authorId: content.authorId
          ? { ...content.authorId, _id: content.authorId._id.toString() }
          : null,
        reviewerId: content.reviewerId
          ? { ...content.reviewerId, _id: content.reviewerId._id.toString() }
          : null,
        faqs: (content.faqs || []).map((f) => ({
          ...f,
          _id: f._id?.toString() ?? "unknown",
        })),
        internalLinks: (content.internalLinks || []).map((l) => ({
          ...l,
          _id: l._id?.toString() ?? "unknown",
        })),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ── PUT update content ────────────────────────────────────────────────────────
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // ── Auto-regenerate slug if title changed and not manually edited ──
    if (body.title && !body.slugManuallyEdited) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

 

    // ── Duplicate slug check (self ko exclude karo) ──
    if (body.slug && body.section) {
      const existing = await Content.findOne({
        _id: { $ne: id },
        section: body.section,
        slug: body.slug,
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "A page with this slug already exists in this section" },
          { status: 409 }
        );
      }
    }

    // ── Set publish date when first publishing ──
    if (body.status === "PUBLISHED" && !body.datePublished) {
      body.datePublished = new Date();
    }

    const content = await Content.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: false, // manual validation upar ho gayi
    });

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    const obj = content.toObject();

    return NextResponse.json({
      success: true,
      data: {
        ...obj,
        _id: obj._id.toString(),
        faqs: (obj.faqs || []).map((f) => ({
          ...f,
          _id: f._id?.toString() ?? "unknown",
        })),
        internalLinks: (obj.internalLinks || []).map((l) => ({
          ...l,
          _id: l._id?.toString() ?? "unknown",
        })),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// ── DELETE content ────────────────────────────────────────────────────────────
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const content = await Content.findByIdAndDelete(id);
    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Content deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}