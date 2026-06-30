"use client";

import { Search, Filter, X, RefreshCw } from "lucide-react";

export default function EnquiryFilters({ filters, setFilters }) {
  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({ search: "", status: "" });
  };

  const hasActiveFilters = filters.search || filters.status;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-[#dce6f0] bg-white p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a8aaa]" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-[#dce6f0] bg-[#fafcfe] py-2.5 pl-10 pr-4 text-sm text-[#0a2a4a] placeholder-[#8aaccc] outline-none transition-all focus:border-[#1a5a9a] focus:ring-2 focus:ring-blue-100"
          />
          {filters.search && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#6a8aaa] transition-colors hover:bg-[#e8edf2] hover:text-[#0a2a4a]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="relative min-w-[160px] sm:w-auto">
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full appearance-none rounded-xl border border-[#dce6f0] bg-[#fafcfe] px-4 py-2.5 pr-10 text-sm text-[#0a2a4a] outline-none transition-all focus:border-[#1a5a9a] focus:ring-2 focus:ring-blue-100"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234a6a8a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
            }}
          >
            <option value="">All Status</option>
            <option value="new">🟢 New</option>
            <option value="contacted">🟡 Contacted</option>
            <option value="converted">🔵 Converted</option>
            <option value="closed">⚪ Closed</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-[#4a6a8a] transition-all hover:bg-[#f0f4f9] hover:text-[#0a2a4a]"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}

          <button
            className="inline-flex items-center gap-2 rounded-xl bg-[#1a5a9a] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#0e4a7a] shadow-sm shadow-blue-200"
          >
            <Filter className="h-4 w-4" />
            Apply
          </button>
        </div>
      </div>

      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          <span className="text-xs text-[#4a6a8a]">Active filters:</span>
          {filters.search && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-medium text-[#1a5a9a] border border-[#b8d4f0]">
              Search: {filters.search}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                className="ml-0.5 rounded-full p-0.5 hover:bg-[#b8d4f0]"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.status && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-medium text-[#1a5a9a] border border-[#b8d4f0]">
              Status: {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, status: "" }))}
                className="ml-0.5 rounded-full p-0.5 hover:bg-[#b8d4f0]"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-xs text-[#1a5a9a] hover:text-[#0e4a7a] hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}