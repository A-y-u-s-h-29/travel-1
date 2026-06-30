"use client";

import { AlertTriangle, X, Trash2 } from "lucide-react";

export default function DeleteModal({ open, onCancel, onConfirm, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="w-full max-w-md mx-4 rounded-2xl border border-[#dce6f0] bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#fde8e5] p-2.5">
              <AlertTriangle className="h-5 w-5 text-[#c0392b]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0a2a4a]">
                Delete Enquiry
              </h3>
              <p className="text-xs text-[#4a6a8a]">This action is irreversible</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg p-1.5 text-[#4a6a8a] transition-colors hover:bg-[#f0f4f9] hover:text-[#0a2a4a] disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 space-y-3">
          <p className="text-sm leading-relaxed text-[#4a6a8a]">
            Are you sure you want to delete this enquiry? This action cannot be undone.
            The enquiry will be permanently removed from the system.
          </p>

          {/* Warning Box */}
          <div className="rounded-xl bg-[#fef8f0] border border-[#fde8d0] p-3">
            <p className="text-xs text-[#8a6a3a]">
              <span className="font-semibold">⚠️ Warning:</span> All associated data and history will be lost.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-[#d0dce8] bg-white px-4 py-2.5 text-sm font-medium text-[#0a2a4a] transition-all hover:bg-[#f5f8fc] hover:border-[#b0c8d8] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#c0392b] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#a93226] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-red-200"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Enquiry
              </>
            )}
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-4 text-center text-xs text-[#8aaccc]">
          This action will be logged for security purposes
        </p>
      </div>
    </div>
  );
}