"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, MapPin, CheckCircle, XCircle, Loader2, Hash, Globe } from "lucide-react";

export default function DestinationTable({ destinations }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  async function handleDelete(id, name) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setShowDeleteModal(null);
      router.refresh();
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (!destinations?.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-blue-50 rounded-full">
            <MapPin className="w-12 h-12 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">No destinations yet</h3>
            <p className="text-sm text-gray-500 mt-1">Start by adding your first destination</p>
          </div>
          <Link
            href="/admin/destinations/create"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/30"
          >
            Add Destination
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Destination
                </div>
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3.5">
                <div className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  Slug
                </div>
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3.5">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Location
                </div>
              </th>
             
              <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3.5">
                Status
              </th>
              <th className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {destinations.map((d) => (
              <tr key={d._id} className="group hover:bg-gray-50/50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{d.name}</div>
                    {d.description && (
                      <div className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-xs">
                        {d.description}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-mono">
                    {d.slug}
                  </code>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {[d.state, d.country].filter(Boolean).join(", ") || "—"}
                </td>
               
                <td className="px-6 py-4">
                  {d.isActive ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <XCircle className="w-3 h-3" /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/destinations/edit/${d._id}`}
                      className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setShowDeleteModal(d)}
                      disabled={deletingId === d._id}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === d._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-xl">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Delete Destination</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-red-600">
                Are you sure you want to delete <span className="font-semibold">"{showDeleteModal.name}"</span>?
                <br />
                <span className="text-xs text-red-400 mt-1 block">
                  All associated packages will be affected.
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal._id, showDeleteModal.name)}
                disabled={deletingId === showDeleteModal._id}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50"
              >
                {deletingId === showDeleteModal._id ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </div>
                ) : (
                  'Delete Destination'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}