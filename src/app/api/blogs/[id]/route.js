import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id || id === "blogs") {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(id);

    // ObjectId => admin lookup (drafts allowed, no view increment)
    // Slug    => public lookup (only published, increments views)
    const blog = isObjectId
      ? await Blog.findById(id).lean()
      : await Blog.findOne({ slug: id, status: "PUBLISHED" }).lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    if (!isObjectId) {
      await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...blog,
        _id: blog._id.toString(),
        authorId: blog.authorId?.toString() ?? null,
        publishedAt: blog.publishedAt?.toISOString() ?? null,
        createdAt: blog.createdAt?.toISOString() ?? null,
        updatedAt: blog.updatedAt?.toISOString() ?? null,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching blog:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(id);

    // Find by _id (admin edit) or by slug (legacy/public use)
    const existingBlog = isObjectId
      ? await Blog.findById(id)
      : await Blog.findOne({ slug: id });

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Regenerate slug if title changed
    if (body.title && !body.slugManuallyEdited) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    // PUBLISHED-only validations
    if (body.status === "PUBLISHED") {
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
      if (!body.publishedAt) body.publishedAt = new Date();
    }

    // Duplicate slug check (exclude self)
    if (body.slug) {
      const duplicate = await Blog.findOne({
        _id: { $ne: existingBlog._id },
        slug: body.slug,
      });
      if (duplicate) {
        return NextResponse.json(
          { success: false, error: "A blog with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const blog = await Blog.findByIdAndUpdate(existingBlog._id, body, {
      new: true,
      runValidators: false,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...blog.toObject(),
        _id: blog._id.toString(),
      },
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(id);

    const blog = isObjectId
      ? await Blog.findByIdAndDelete(id)
      : await Blog.findOneAndDelete({ slug: id });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}