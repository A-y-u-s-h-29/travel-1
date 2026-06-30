import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const filter = {};
    if (searchParams.get("status")) filter.status = searchParams.get("status");
    if (searchParams.get("category")) filter.category = searchParams.get("category");
    if (searchParams.get("featured") === "true") filter.isFeatured = true;

    const blogs = await Blog.find(filter)
      .sort({ updatedAt: -1 })
      .lean();

    const data = blogs.map((b) => ({
      ...b,
      _id: b._id.toString(),
      authorId: b.authorId ? b.authorId.toString() : null,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Auto-generate slug from title
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    // PUBLISHED-only validations
    if (body.status === "PUBLISHED") {
      if (!body.title) {
        return NextResponse.json(
          { success: false, error: "Title is required to publish" },
          { status: 400 }
        );
      }
      if (!body.metaDescription) {
        return NextResponse.json(
          { success: false, error: "Meta description is required to publish" },
          { status: 400 }
        );
      }
      if (!body.coverImageUrl) {
        return NextResponse.json(
          { success: false, error: "Cover image is required to publish" },
          { status: 400 }
        );
      }
      body.publishedAt = body.publishedAt || new Date();
    }

    // Duplicate slug check
    const existing = await Blog.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A blog with this slug already exists" },
        { status: 409 }
      );
    }

    const blog = await Blog.create(body);
    return NextResponse.json(
      { success: true, data: { ...blog.toObject(), _id: blog._id.toString() } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}