"use client";

const STYLES = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Failed: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Refunded: "bg-sky-50 text-sky-700 ring-sky-600/20",
};

const DOT_STYLES = {
  Pending: "bg-amber-500",
  Paid: "bg-emerald-500",
  Failed: "bg-rose-500",
  Refunded: "bg-sky-500",
};

/**
 * Colored badge representing a booking's payment status.
 * status: "Pending" | "Paid" | "Failed" | "Refunded"
 */
export default function PaymentStatusBadge({ status }) {
  const style = STYLES[status] || "bg-slate-100 text-slate-700 ring-slate-600/20";
  const dot = DOT_STYLES[status] || "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status || "Unknown"}
    </span>
  );
}