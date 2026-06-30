"use client";

/**
 * Confirmation modal shown before a booking is permanently deleted.
 *
 * Props:
 *   - booking: the booking object being deleted (for display), or null when closed
 *   - isDeleting: bool, shows a loading state on the confirm button
 *   - onConfirm(): called when the user confirms deletion
 *   - onCancel(): called when the user backs out
 */
export default function DeleteModal({ booking, isDeleting, onConfirm, onCancel }) {
  if (!booking) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-100">
            <svg
              className="h-5 w-5 text-rose-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <div>
            <h2 id="delete-modal-title" className="text-base font-semibold text-slate-900">
              Delete this booking?
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Booking <span className="font-medium text-slate-900">{booking.bookingId}</span> for{" "}
              <span className="font-medium text-slate-900">{booking.customerName}</span> will be
              permanently removed. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
          >
            {isDeleting ? "Deleting…" : "Delete booking"}
          </button>
        </div>
      </div>
    </div>
  );
}