import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/models/Content";

// Statuses jisme strict SEO validation lagti hai
const STRICT_STATUSES = ["PUBLISHED", "IN_REVIEW"];

// ── GET all contents ──────────────────────────────────────────────────────────
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const filter = {};
    if (searchParams.get("status"))  filter.status  = searchParams.get("status");
    if (searchParams.get("type"))    filter.type     = searchParams.get("type");
    if (searchParams.get("section")) filter.section  = searchParams.get("section");

    const contents = await Content.find(filter)
      .populate("authorId", "fullName")
      .sort({ updatedAt: -1 })
      .lean();

    const data = contents.map((c) => ({
      ...c,
      _id: c._id.toString(),
      authorId: c.authorId
        ? { ...c.authorId, _id: c.authorId._id.toString() }
        : null,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ── POST create content ───────────────────────────────────────────────────────
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // ── Auto-generate slug ──
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

  

    // ── Duplicate slug check ──
    if (body.slug && body.section) {
      const existing = await Content.findOne({
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

    // ── Set publish date ──
    if (body.status === "PUBLISHED" && !body.datePublished) {
      body.datePublished = new Date();
    }

    const content = await Content.create(body);

    return NextResponse.json(
      {
        success: true,
        data: {
          ...content.toObject(),
          _id: content._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contents error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}