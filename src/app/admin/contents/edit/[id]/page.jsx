import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { connectDB } from "@/lib/db";
import Content from "@/models/Content";
import ContentForm from "../../components/ContentForm";

// ── Safe getContent ───────────────────────────────────────────────────────────
async function getContent(id) {
  await connectDB();
  try {
    const content = await Content.findById(id).lean();
    if (!content) return null;

    return {
      ...content,
      _id: content._id?.toString() ?? null,
      authorId: content.authorId?.toString() ?? null,
      reviewerId: content.reviewerId?.toString() ?? null,

      // Safe mapping — crash nahi hoga agar _id missing ho
      faqs: (content.faqs || []).map((f) => ({
        ...f,
        _id: f._id?.toString() ?? crypto.randomUUID(),
      })),
      internalLinks: (content.internalLinks || []).map((l) => ({
        ...l,
        _id: l._id?.toString() ?? crypto.randomUUID(),
      })),

      // Date fields — plain string mein convert karo (serialization error avoid)
      createdAt: content.createdAt?.toISOString() ?? null,
      updatedAt: content.updatedAt?.toISOString() ?? null,
      datePublished: content.datePublished?.toISOString() ?? null,
      scheduledFor: content.scheduledFor?.toISOString() ?? null,
    };
  } catch (e) {
    console.error("getContent error:", e);
    return null;
  }
}

// ── Page Component ────────────────────────────────────────────────────────────
export default async function EditContentPage({ params }) {
  const { id } = await params;
  const content = await getContent(id);

  if (!content) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
          <Link
            href="/admin/contents"
            className="hover:text-gray-600 transition-colors"
          >
            Contents
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-600 truncate max-w-xs">
            {content.title || content.h1 || "Untitled"}
          </span>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Edit Content</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Update the details for this content page
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                    content.status === "PUBLISHED"
                      ? "bg-emerald-50 text-emerald-600"
                      : content.status === "IN_REVIEW"
                      ? "bg-blue-50 text-blue-600"
                      : content.status === "SCHEDULED"
                      ? "bg-purple-50 text-purple-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {content.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <ContentForm content={content} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>All fields marked with * are required for publishing</span>
          </div>
          <Link
            href="/admin/contents"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Back to all pages
          </Link>
        </div>
      </div>
    </div>
  );
}