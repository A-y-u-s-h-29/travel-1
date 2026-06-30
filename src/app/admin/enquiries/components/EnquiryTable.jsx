"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Trash2, RefreshCw, ChevronRight } from "lucide-react";

import EnquiryStatusBadge from "./EnquiryStatusBadge";
import DeleteModal from "./DeleteModal";

export default function EnquiryTable({ filters }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (filters?.status) params.set("status", filters.status);
      if (filters?.search) params.set("search", filters.search);

      const res = await fetch(`/api/enquiries?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (error) {
      console.log("Failed to load enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.status, filters?.search]);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const res = await fetch(`/api/enquiries/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setDeleteId(null);
      fetchEnquiries();
    } finally {
      setDeleting(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-[#1a5a9a]" />
        <p className="mt-3 text-sm text-[#4a6a8a]">Loading enquiries...</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-[#dce6f0] bg-white shadow-sm transition-all hover:shadow-md">
        {/* Table Header with Count */}
        <div className="flex items-center justify-between border-b border-[#e8edf2] bg-[#f8faff] px-5 py-3">
          <span className="text-sm font-medium text-[#0a2a4a]">
            {enquiries.length} Enquiries
          </span>
          <button
            onClick={fetchEnquiries}
            className="inline-flex items-center gap-1.5 text-sm text-[#1a5a9a] transition-colors hover:text-[#0e4a7a]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8edf2] bg-[#fafcfe] text-left text-xs uppercase tracking-wider text-[#4a6a8a]">
                <th className="px-5 py-3.5 font-semibold">Name</th>
                <th className="px-5 py-3.5 font-semibold">Email</th>
                <th className="px-5 py-3.5 font-semibold">Phone</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
                <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0f4f9]">
              {enquiries.map((enquiry) => (
                <tr
                  key={enquiry._id}
                  className="group transition-colors hover:bg-[#f8faff]"
                >
                  {/* Name */}
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-[#0a2a4a]">
                      {enquiry.name}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-3.5">
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-[#1a5a9a] transition-colors hover:text-[#0e4a7a] hover:underline"
                    >
                      {enquiry.email}
                    </a>
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-3.5 text-[#4a6a8a]">
                    {enquiry.phone || "—"}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <EnquiryStatusBadge status={enquiry.status} />
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3.5 text-[#4a6a8a]">
                    {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/enquiries/${enquiry._id}`}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-[#1a5a9a] transition-all hover:bg-[#e8f0fe] hover:text-[#0e4a7a]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteId(enquiry._id)}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-[#c0392b] transition-all hover:bg-[#fde8e5] hover:text-[#a93226]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="rounded-full bg-[#f0f4f9] p-3">
                        <RefreshCw className="h-6 w-6 text-[#4a6a8a]" />
                      </div>
                      <p className="text-sm text-[#4a6a8a]">No enquiries found</p>
                      <p className="text-xs text-[#8aaccc]">
                        Try adjusting your filters or search query
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {enquiries.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#e8edf2] bg-[#f8faff] px-5 py-3 text-xs text-[#4a6a8a]">
            <span>
              Showing <span className="font-medium text-[#0a2a4a]">{enquiries.length}</span> enquiries
            </span>
            <span>
              Last updated: {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        open={!!deleteId}
        loading={deleting}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}