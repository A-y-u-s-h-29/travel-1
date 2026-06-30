import Link from "next/link";
import { Plus, Sparkles, LayoutDashboard, FileText, TrendingUp, Clock } from "lucide-react";
import BlogTable from "./components/BlogTable";

async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/blogs`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.data || [];
}

async function getStats() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/blogs/stats`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data.data || {};
  } catch {
    return {};
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const stats = await getStats();

  const published = blogs.filter(b => b.status === "PUBLISHED").length;
  const drafts = blogs.filter(b => b.status === "DRAFT").length;
  const inReview = blogs.filter(b => b.status === "IN_REVIEW").length;
  const scheduled = blogs.filter(b => b.status === "SCHEDULED").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">Blogs</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Blog Management
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Create, manage, and organize your blog content
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700">
                {published} Published
              </span>
            </div>
            <Link
              href="/admin/blogs/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Create Blog
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-indigo-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Blogs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{blogs.length}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
              <TrendingUp className="w-3 h-3" />
              <span>Total content pieces</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-emerald-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Published</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{published}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span>Live on website</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-amber-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Drafts</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{drafts}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                <div className="w-5 h-5 rounded-full border-2 border-amber-500/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>In progress</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-blue-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Review</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{inReview}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              <span>Awaiting approval</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Quick actions:</span>
          </div>
          <Link
            href="/admin/blogs/create"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors"
          >
            + New Post
          </Link>
          <button className="text-xs font-medium text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
            📊 Analytics
          </button>
          <button className="text-xs font-medium text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
            🏷️ Categories
          </button>
        </div>

        {/* Tips Banner */}
        {drafts > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <div className="p-1.5 bg-amber-100 rounded-lg flex-shrink-0">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                You have {drafts} draft{drafts > 1 ? 's' : ''} ready for review
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Take a moment to review and publish your pending content
              </p>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
          <BlogTable blogs={blogs} />
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Last updated: {new Date().toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{blogs.length} blogs</span>
            <span>•</span>
            <span>{published} published</span>
          </div>
        </div>
      </div>
    </div>
  );
}