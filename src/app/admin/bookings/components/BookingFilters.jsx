"use client";

const BOOKING_STATUSES = ["Pending", "Paid", "Cancelled", "Refunded"];
const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

/**
 * Filter bar for the bookings list.
 *
 * Props:
 *   - filters: { search, customerName, bookingStatus, paymentStatus }
 *   - onChange(nextFilters): called whenever any filter field changes
 *   - onReset(): called when "Clear filters" is clicked
 */
export default function BookingFilters({ filters, onChange, onReset }) {
  const update = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  const hasActiveFilters =
    filters.search || filters.customerName || filters.bookingStatus || filters.paymentStatus;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="flex-1 min-w-[180px]">
        <label htmlFor="search" className="mb-1 block text-xs font-medium text-slate-600">
          Booking ID
        </label>
        <input
          id="search"
          type="text"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          placeholder="e.g. BK-240613-7421"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex-1 min-w-[180px]">
        <label htmlFor="customerName" className="mb-1 block text-xs font-medium text-slate-600">
          Customer Name
        </label>
        <input
          id="customerName"
          type="text"
          value={filters.customerName}
          onChange={(e) => update("customerName", e.target.value)}
          placeholder="Search by name"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="min-w-[160px]">
        <label htmlFor="bookingStatus" className="mb-1 block text-xs font-medium text-slate-600">
          Booking Status
        </label>
        <select
          id="bookingStatus"
          value={filters.bookingStatus}
          onChange={(e) => update("bookingStatus", e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">All statuses</option>
          {BOOKING_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-[160px]">
        <label htmlFor="paymentStatus" className="mb-1 block text-xs font-medium text-slate-600">
          Payment Status
        </label>
        <select
          id="paymentStatus"
          value={filters.paymentStatus}
          onChange={(e) => update("paymentStatus", e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">All statuses</option>
          {PAYMENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}