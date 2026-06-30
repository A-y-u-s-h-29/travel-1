import Link from "next/link";
import { 
  ChevronRight, LayoutDashboard, FileText, BookOpen,CheckCircle, 
  Edit, Sparkles, Calendar, Eye, Clock, ArrowLeft,
  Save, RefreshCw, Share2, ExternalLink, PenTool
} from "lucide-react";
import BlogForm from "../../components/BlogForm";
import { notFound } from "next/navigation";

async function getBlog(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/blogs/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!data.success) {
    return null;
  }

  return data.data;
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getStatusColor(status) {
  const colors = {
    PUBLISHED: "text-emerald-600 bg-emerald-50 border-emerald-200",
    IN_REVIEW: "text-blue-600 bg-blue-50 border-blue-200",
    SCHEDULED: "text-purple-600 bg-purple-50 border-purple-200",
    DRAFT: "text-gray-600 bg-gray-50 border-gray-200",
  };
  return colors[status] || colors.DRAFT;
}

function getStatusIcon(status) {
  const icons = {
    PUBLISHED: CheckCircle,
    IN_REVIEW: Eye,
    SCHEDULED: Calendar,
    DRAFT: Clock,
  };
  return icons[status] || Clock;
}

export default async function EditBlogPage({ params }) {
  const { id } = await params;

  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  const StatusIcon = getStatusIcon(blog.status);

  return (
    <div className="min-h-screen text-black bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-1.5 text-gray-400 hover:text-indigo-600 transition-colors group"
          >
            <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <Link 
            href="/admin/blogs" 
            className="text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            Blogs
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-700 font-semibold flex items-center gap-1.5">
            <Edit className="w-4 h-4 text-indigo-500" />
            Edit Blog
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg shadow-indigo-200/50 ring-4 ring-indigo-50">
                <PenTool className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
                  Edit Blog Post
                </h1>
                <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
                  Update your blog content and settings
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {blog.title?.length > 30 ? blog.title.substring(0, 30) + '...' : blog.title}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* Status Badge */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(blog.status)}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{blog.status}</span>
            </div>

            {/* View Live Button */}
            {blog.status === "PUBLISHED" && (
              <Link
                href={`/blog/${blog.slug}`}
                target="_blank"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Live
              </Link>
            )}

            {/* Last Updated */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 bg-white border border-gray-200 rounded-full">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Updated {formatDate(blog.updatedAt)}</span>
            </div>
          </div>
        </div>


        {/* Tips Banner - Conditional */}
        {blog.status === "DRAFT" && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <div className="p-1.5 bg-amber-100 rounded-lg flex-shrink-0">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                ✍️ This post is currently a draft
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Review your changes and publish when you're ready to share with your audience
              </p>
            </div>
          </div>
        )}

        {blog.status === "IN_REVIEW" && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <div className="p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                👀 This post is under review
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                The content is being reviewed by the editorial team. You can still make changes.
              </p>
            </div>
          </div>
        )}

        {blog.status === "SCHEDULED" && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50/50 border border-purple-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <div className="p-1.5 bg-purple-100 rounded-lg flex-shrink-0">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                📅 This post is scheduled to be published
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Scheduled for {formatDate(blog.scheduledFor || blog.updatedAt)}
              </p>
            </div>
          </div>
        )}

        {blog.status === "PUBLISHED" && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <div className="p-1.5 bg-emerald-100 rounded-lg flex-shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                🚀 This post is published and live
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Published on {formatDate(blog.publishedAt || blog.updatedAt)}
              </p>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden transition-all hover:shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Edit className="w-4 h-4 text-indigo-600" />
                  Edit Content
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Make changes to your blog post content and metadata
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Auto-save</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>Editing</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <BlogForm blog={blog} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              All fields marked with <span className="text-red-400">*</span> are required
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span>Blog ID: #{blog._id?.substring(0, 8)}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/blogs"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to all blogs
            </Link>
            <button className="text-xs text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Share2 className="w-3 h-3" />
              Share
            </button>
            <button className="text-xs text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Save className="w-3 h-3" />
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}