"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Pencil, Trash2, FileText, CheckCircle,
  Clock, AlertCircle, Eye, Star, Loader2,
  Calendar, User, Tag, ArrowUp, ArrowDown,
  Copy, ExternalLink, MoreVertical, BookOpen
} from "lucide-react";

const STATUS_STYLES = {
  PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  IN_REVIEW: "bg-blue-50 text-blue-700 border-blue-200",
  SCHEDULED: "bg-purple-50 text-purple-700 border-purple-200",
  DRAFT: "bg-gray-50 text-gray-600 border-gray-200",
};

const STATUS_ICONS = {
  PUBLISHED: CheckCircle,
  IN_REVIEW: Eye,
  SCHEDULED: Clock,
  DRAFT: AlertCircle,
};

const STATUS_LABELS = {
  PUBLISHED: "Published",
  IN_REVIEW: "In Review",
  SCHEDULED: "Scheduled",
  DRAFT: "Draft",
};

export default function BlogTable({ blogs }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [sortField, setSortField] = useState("updatedAt");
  const [sortDirection, setSortDirection] = useState("desc");

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setShowModal(null);
      router.refresh();
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(date) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function getStatusIcon(status) {
    return STATUS_ICONS[status] || AlertCircle;
  }

  if (!blogs?.length) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
        <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-3xl">
            <FileText className="w-16 h-16 text-indigo-400" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">No blogs yet</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
              Start writing your first blog post and share your insights with the world
            </p>
          </div>
          <Link
            href="/admin/blogs/create"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-2xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <BookOpen className="w-4 h-4" />
            Create Your First Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-gray-100/50">
      {/* Table Header with Stats */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-900">All Blogs</span>
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
              {blogs.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{blogs.filter(b => b.status === "PUBLISHED").length} Published</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{blogs.filter(b => b.status === "DRAFT").length} Drafts</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                <div className="flex items-center gap-1.5">
                  Title
                  <button className="p-0.5 hover:bg-gray-200 rounded transition-colors">
                    <ArrowUp className="w-3 h-3" />
                  </button>
                </div>
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                Category
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                <div className="flex items-center gap-1.5">
                  Author
                  <User className="w-3 h-3" />
                </div>
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                <div className="flex items-center gap-1.5">
                  Date
                  <Calendar className="w-3 h-3" />
                </div>
              </th>
             
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {blogs.map((b) => {
              const Icon = getStatusIcon(b.status);
              return (
                <tr 
                  key={b._id} 
                  className="group hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-transparent transition-all duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200/50 flex items-center justify-center overflow-hidden">
                        {b.coverImageUrl ? (
                          <img 
                            src={b.coverImageUrl} 
                            alt={b.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => e.target.style.display = "none"}
                          />
                        ) : (
                          <FileText className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 line-clamp-1 hover:text-indigo-600 transition-colors">
                          {b.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <code className="text-xs text-gray-400 font-mono">/blog/{b.slug}</code>
                          {b.excerpt && (
                            <>
                              <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                              <span className="text-xs text-gray-400 line-clamp-1 max-w-xs">
                                {b.excerpt}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {b.category ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200">
                        <Tag className="w-3 h-3" />
                        {b.category}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-xs font-semibold text-indigo-600">
                        {b.authorName ? b.authorName.charAt(0).toUpperCase() : "?"}
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {b.authorName || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${STATUS_STYLES[b.status] || STATUS_STYLES.DRAFT}`}>
                      <Icon className="w-3 h-3" />
                      {STATUS_LABELS[b.status] || b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-500">
                      {formatDate(b.updatedAt)}
                    </div>
                  </td>
                 
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/blog/${b.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/blogs/edit/${b._id}`}
                        className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setShowModal(b)}
                        disabled={deletingId === b._id}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                      >
                        {deletingId === b._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Showing <span className="font-medium text-gray-700">{blogs.length}</span> blogs
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Export
          </button>
          <button className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-4 bg-gradient-to-br from-red-50 to-red-100/50 rounded-3xl mb-4">
                <Trash2 className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Delete Blog Post</h3>
              <p className="text-sm text-gray-500 mt-1">This action cannot be undone</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-5 mb-6 border border-red-100">
              <p className="text-sm text-gray-700">
                Are you sure you want to delete 
                <span className="font-semibold text-gray-900 block mt-1">
                  "{showModal.title}"?
                </span>
              </p>
              {showModal.publishedAt && (
                <p className="text-xs text-gray-500 mt-2">
                  Published on {formatDate(showModal.publishedAt)}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(null)} 
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showModal._id)}
                disabled={deletingId === showModal._id}
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-2xl transition-all shadow-lg shadow-red-200 hover:shadow-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingId === showModal._id ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                  </span>
                ) : (
                  "Delete Permanently"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}