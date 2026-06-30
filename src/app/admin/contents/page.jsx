import Link from "next/link";
import { Plus, LayoutGrid, List } from "lucide-react";
import { connectDB } from "@/lib/db";
import Content from "@/models/Content";
import ContentTable from "./components/ContentTable";

async function getContents() {
  try {
    await connectDB();
    const contents = await Content.find({})
      .sort({ updatedAt: -1 })
      .lean();

    // Handle empty results
    if (!contents || contents.length === 0) {
      return [];
    }

    // Safely map contents with error handling
    return contents.map((c) => {
      try {
        return {
          ...c,
          _id: c._id?.toString() || 'unknown',
          authorId: c.authorId ? { 
            ...c.authorId, 
            _id: c.authorId._id?.toString() || 'unknown' 
          } : null,
          faqs: (c.faqs || []).map((f) => ({ 
            ...f, 
            _id: f._id?.toString() || 'unknown' 
          })),
          internalLinks: (c.internalLinks || []).map((l) => ({ 
            ...l, 
            _id: l._id?.toString() || 'unknown' 
          })),
          reviewerId: c.reviewerId?.toString() || null,
        };
      } catch (mapError) {
        console.error("Error mapping content:", c._id, mapError);
        // Return basic version
        return {
          ...c,
          _id: c._id?.toString() || 'unknown',
          faqs: [],
          internalLinks: [],
        };
      }
    });
  } catch (error) {
    console.error("Error fetching contents:", error);
    return [];
  }
}

export default async function ContentsPage() {
  const contents = await getContents();



  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <LayoutGrid className="w-5 h-5 text-indigo-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Content Library
                </h1>
              </div>
              <p className="text-sm text-gray-500 mt-1 ml-1">
                Manage and organize your content pages
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white">
              <Link
                href="/admin/contents/create"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                New Page
              </Link>
            </div>
          </div>
        </div>

       

        {/* Table Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">All Pages</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {contents.length}
              </span>
            </div>
          </div>
          <ContentTable contents={contents} />
        </div>
      </div>
    </div>
  );
}