"use client";

import Link from "next/link";
import BookingStatusBadge from "./BookingStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { 
  Eye, 
  Trash2,
  User,
  Calendar,
  Users,
  MoreHorizontal,
  ChevronDown,
  Check,
  X,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount, currency) {
  if (amount === undefined || amount === null) return "—";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency || ""} ${amount}`.trim();
  }
}

// ============================================
// COLUMN CONFIGURATION
// ============================================

const COLUMNS = [
  { 
    id: "bookingId", 
    label: "Booking ID", 
    width: "w-28",
    sortable: true,
    visible: true 
  },
  { 
    id: "customer", 
    label: "Customer", 
    width: "w-48",
    sortable: true,
    visible: true 
  },
  { 
    id: "package", 
    label: "Package", 
    width: "w-40",
    sortable: true,
    visible: true 
  },

  { 
    id: "travelers", 
    label: "Travelers", 
    width: "w-20",
    align: "center",
    sortable: true,
    visible: true 
  },
  { 
    id: "amount", 
    label: "Amount", 
    width: "w-28",
    align: "right",
    sortable: true,
    visible: true 
  },
  { 
    id: "payment", 
    label: "Payment", 
    width: "w-28",
    sortable: true,
    visible: true 
  },
  { 
    id: "status", 
    label: "Status", 
    width: "w-28",
    sortable: true,
    visible: true 
  },
  { 
    id: "created", 
    label: "Created", 
    width: "w-28",
    sortable: true,
    visible: true 
  },
  { 
    id: "actions", 
    label: "", 
    width: "w-16",
    align: "right",
    sortable: false,
    visible: true 
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function BookingTable({ 
  bookings = [], 
  onDeleteClick,
  onBulkDelete,
  onExport,
  isLoading = false,
  totalCount = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 20,
  onItemsPerPageChange
}) {
  // --- State ---
  const [sortField, setSortField] = useState("created");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedIds, setSelectedIds] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(
    COLUMNS.filter(col => col.visible).map(col => col.id)
  );
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Refs ---
  const columnMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  // --- Click outside handler ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (columnMenuRef.current && !columnMenuRef.current.contains(event.target)) {
        setShowColumnMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape" && selectedIds.length > 0) {
        setSelectedIds([]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIds]);

  // --- Sorting ---
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortedBookings = useMemo(() => {
    if (!sortField || !bookings.length) return bookings;
    
    return [...bookings].sort((a, b) => {
      let valA, valB;
      
      switch(sortField) {
        case "customer":
          valA = a.customerName?.toLowerCase() || "";
          valB = b.customerName?.toLowerCase() || "";
          break;
        case "package":
          valA = a.packageId?.name?.toLowerCase() || "";
          valB = b.packageId?.name?.toLowerCase() || "";
          break;
     
        case "amount":
          valA = a.amount || 0;
          valB = b.amount || 0;
          break;
        case "travelers":
          valA = a.travelers || 0;
          valB = b.travelers || 0;
          break;
        case "created":
          valA = new Date(a.createdAt || 0).getTime();
          valB = new Date(b.createdAt || 0).getTime();
          break;
        case "bookingId":
          valA = a.bookingId || "";
          valB = b.bookingId || "";
          break;
        case "payment":
          valA = a.paymentStatus || "";
          valB = b.paymentStatus || "";
          break;
        case "status":
          valA = a.bookingStatus || "";
          valB = b.bookingStatus || "";
          break;
        default:
          valA = a[sortField] || "";
          valB = b[sortField] || "";
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [bookings, sortField, sortDirection]);

  // --- Filter by search ---
  const filteredBookings = useMemo(() => {
    if (!searchTerm.trim()) return getSortedBookings;
    
    const term = searchTerm.toLowerCase().trim();
    return getSortedBookings.filter(booking => 
      booking.bookingId?.toLowerCase().includes(term) ||
      booking.customerName?.toLowerCase().includes(term) ||
      booking.packageId?.name?.toLowerCase().includes(term) ||
      booking.customerEmail?.toLowerCase().includes(term)
    );
  }, [getSortedBookings, searchTerm]);

  // --- Selection ---
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredBookings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredBookings.map(b => b._id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const allSelected = filteredBookings.length > 0 && 
    selectedIds.length === filteredBookings.length;

  const someSelected = selectedIds.length > 0 && !allSelected;

  // --- Bulk actions ---
  const handleBulkDelete = () => {
    if (onBulkDelete) {
      onBulkDelete(selectedIds);
    } else if (onDeleteClick) {
      selectedIds.forEach(id => {
        const booking = bookings.find(b => b._id === id);
        if (booking) onDeleteClick(booking);
      });
    }
    setSelectedIds([]);
  };

  const handleBulkExport = () => {
    if (onExport) {
      const selectedBookings = bookings.filter(b => selectedIds.includes(b._id));
      onExport(selectedBookings);
    }
  };

  // --- Toggle column visibility ---
  const toggleColumn = (columnId) => {
    setVisibleColumns(prev => 
      prev.includes(columnId) 
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  // --- Get sort icon ---
  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5" />;
    return sortDirection === "asc" 
      ? <ArrowUp className="w-3.5 h-3.5" />
      : <ArrowDown className="w-3.5 h-3.5" />;
  };

  // --- Pagination helpers ---
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  // --- Row Actions Dropdown ---
  const RowActions = ({ booking }) => (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(menuOpen === booking._id ? null : booking._id)}
        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="More actions"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      
      {menuOpen === booking._id && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setMenuOpen(null)}
          />
          <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1">
            <Link
              href={`/admin/bookings/${booking._id}`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setMenuOpen(null)}
            >
              <Eye className="w-4 h-4" />
              View details
            </Link>
            <button
              onClick={() => {
                setMenuOpen(null);
                onDeleteClick(booking);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );

  // ============================================
  // RENDER
  // ============================================

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      
      {/* ===== TOOLBAR ===== */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Left: Title + Count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Bookings
              </h3>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                {totalCount || bookings.length}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none min-w-[160px]">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search... ⌘K"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-48 pl-8 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm hover:shadow"
              />
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Column visibility toggle */}
            <div className="relative" ref={columnMenuRef}>
              <button
                onClick={() => setShowColumnMenu(!showColumnMenu)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle columns"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {showColumnMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    Toggle Columns
                  </div>
                  {COLUMNS.filter(col => col.id !== "actions").map(col => (
                    <label
                      key={col.id}
                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(col.id)}
                        onChange={() => toggleColumn(col.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Export */}
            {selectedIds.length > 0 && (
              <button
                onClick={handleBulkExport}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Export selected"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===== BULK ACTION BAR ===== */}
      {selectedIds.length > 0 && (
        <div className="px-4 py-2.5 bg-gradient-to-br from-blue-50 to-blue-100/50 border-b border-blue-200 flex items-center justify-between animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-blue-700">
              {selectedIds.length} selected
            </span>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete selected
            </button>
            <button
              onClick={handleBulkExport}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>
      )}

      {/* ===== TABLE ===== */}
      {filteredBookings.length === 0 ? (
        <EmptyState 
          hasFilters={!!searchTerm} 
          onClear={() => setSearchTerm("")}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/30">
              <tr>
                {/* Checkbox column */}
                <th className="w-10 px-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className={`w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer ${
                      someSelected ? "bg-blue-50" : ""
                    }`}
                    aria-label="Select all"
                  />
                </th>
                
                {COLUMNS.filter(col => visibleColumns.includes(col.id) || col.id === "actions").map((col) => (
                  <th
                    key={col.id}
                    className={`px-3 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                    } ${col.width}`}
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => handleSort(col.id)}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors group"
                      >
                        {col.label}
                        <span className="text-gray-300 group-hover:text-gray-400">
                          {getSortIcon(col.id)}
                        </span>
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-50 bg-white">
              {filteredBookings.map((booking, index) => (
                <tr 
                  key={booking._id} 
                  className={`group hover:bg-gray-50/50 transition-colors duration-150 ${
                    selectedIds.includes(booking._id) ? "bg-blue-50/30" : ""
                  } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/20"}`}
                >
                  {/* Checkbox */}
                  <td className="px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(booking._id)}
                      onChange={() => toggleSelect(booking._id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      aria-label={`Select booking ${booking.bookingId}`}
                    />
                  </td>

                  {/* Booking ID */}
                  {visibleColumns.includes("bookingId") && (
                    <td className="px-3 py-2.5">
                      <span className="text-xs font-mono font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                        {booking.bookingId}
                      </span>
                    </td>
                  )}

                  {/* Customer */}
                  {visibleColumns.includes("customer") && (
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {booking.customerName}
                          </p>
                         
                        </div>
                      </div>
                    </td>
                  )}

                  {/* Package */}
                  {visibleColumns.includes("package") && (
                    <td className="px-3 py-2.5">
                      <p className="text-sm text-gray-700 truncate max-w-[120px]" title={booking.packageId?.name}>
                        {booking.packageId?.name || "—"}
                      </p>
                    </td>
                  )}

                

                  {/* Travelers */}
                  {visibleColumns.includes("travelers") && (
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        {booking.travelers}
                      </div>
                    </td>
                  )}

                  {/* Amount */}
                  {visibleColumns.includes("amount") && (
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatAmount(booking.amount, booking.currency)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {booking.currency}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* Payment */}
                  {visibleColumns.includes("payment") && (
                    <td className="px-3 py-2.5">
                      <PaymentStatusBadge status={booking.paymentStatus} />
                    </td>
                  )}

                  {/* Status */}
                  {visibleColumns.includes("status") && (
                    <td className="px-3 py-2.5">
                      <BookingStatusBadge status={booking.bookingStatus} />
                    </td>
                  )}

                  {/* Created */}
                  {visibleColumns.includes("created") && (
                    <td className="px-3 py-2.5">
                      <span className="text-sm text-gray-500">
                        {formatDate(booking.createdAt)}
                      </span>
                    </td>
                  )}

                  {/* Actions */}
                  <td className="px-3 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      <Link
                        href={`/admin/bookings/${booking._id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        title="View booking"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <RowActions booking={booking} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gradient-to-r from-gray-50/30 to-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>
                Showing <span className="font-medium text-gray-700">{((currentPage - 1) * itemsPerPage) + 1}</span> -{" "}
                <span className="font-medium text-gray-700">{Math.min(currentPage * itemsPerPage, totalCount)}</span> of{" "}
                <span className="font-medium text-gray-700">{totalCount}</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Rows:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
                  className="text-xs border border-gray-200 rounded-lg px-2.5 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>
              
              {getPageNumbers().map((pageNum, index) => (
                <button
                  key={index}
                  onClick={() => typeof pageNum === "number" && onPageChange?.(pageNum)}
                  disabled={pageNum === "..."}
                  className={`min-w-[32px] h-8 px-2.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    pageNum === currentPage
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25"
                      : pageNum === "..."
                      ? "text-gray-400 cursor-default"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              
              <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// LOADING STATE
// ============================================

function LoadingState() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-5 w-24 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            <div className="h-5 w-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-32 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse" />
            <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// EMPTY STATE
// ============================================

function EmptyState({ hasFilters, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-4 shadow-inner">
        <Calendar className="w-8 h-8 text-gray-400" />
      </div>
      <h4 className="text-base font-semibold text-gray-900">
        {hasFilters ? "No matching bookings found" : "No bookings yet"}
      </h4>
      <p className="mt-1.5 text-sm text-gray-500 max-w-sm">
        {hasFilters
          ? "Try adjusting your search or filters to find what you're looking for."
          : "Bookings will appear here once customers start making reservations."}
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          className="mt-5 px-5 py-2 text-sm font-medium text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
        >
          Clear search
        </button>
      )}
    </div>
  );
}