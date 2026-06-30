"use client";

import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import BookingTable from "./components/BookingTable";
import BookingFilters from "./components/BookingFilters";
import DeleteModal from "./components/DeleteModal";
import { 
  RefreshCw, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Users,
  DollarSign,
  AlertCircle,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Download,
  ChevronDown,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  User,
  Eye,
  Trash2,
  LayoutDashboard
} from "lucide-react";
import BookingStatusBadge from "./components/BookingStatusBadge";

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================

const EMPTY_FILTERS = {
  search: "",
  customerName: "",
  bookingStatus: "",
  paymentStatus: "",
  dateFrom: "",
  dateTo: "",
  minAmount: "",
  maxAmount: "",
};

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

const STATS_CONFIG = [
  { 
    key: "total", 
    label: "Total Bookings", 
    icon: Calendar, 
    color: "blue",
    gradient: "from-blue-50 to-blue-100/50",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-500/10",
    getValue: (pagination) => pagination.total,
    trend: "+12%",
    trendUp: true,
  },
  { 
    key: "travelers", 
    label: "Total Travelers", 
    icon: Users, 
    color: "emerald",
    gradient: "from-emerald-50 to-emerald-100/50",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/10",
    getValue: (bookings) => bookings.reduce((sum, b) => sum + (b.travelers || 0), 0),
    trend: "+8%",
    trendUp: true,
  },
  { 
    key: "revenue", 
    label: "Total Revenue", 
    icon: DollarSign, 
    color: "amber",
    gradient: "from-amber-50 to-amber-100/50",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    getValue: (bookings) => bookings.reduce((sum, b) => sum + (b.amount || 0), 0),
    format: (val) => `₹${val.toLocaleString('en-IN')}`,
    trend: "+5.2%",
    trendUp: true,
  },
];

// ============================================
// CUSTOM HOOKS
// ============================================

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function BookingsListPage() {
  // --- State ---
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({ 
    page: 1, 
    totalPages: 1, 
    total: 0,
    limit: 20,
  });
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useLocalStorage('bookingViewMode', 'table');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // --- Refs ---
  const searchInputRef = useRef(null);
  const filterPanelRef = useRef(null);

  // --- Debounced Search ---
  const debouncedSearch = useDebounce(filters.search, 300);

  // --- Keyboard Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setIsFilterOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isFilterOpen) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFilterOpen]);

  // --- Click outside filter panel ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isFilterOpen]);

  // --- Data Fetching ---
  const fetchBookings = useCallback(async (page = 1, limit = pagination.limit) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (filters.customerName) params.set("customerName", filters.customerName);
      if (filters.bookingStatus) params.set("bookingStatus", filters.bookingStatus);
      if (filters.paymentStatus) params.set("paymentStatus", filters.paymentStatus);
      if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
      if (filters.dateTo) params.set("dateTo", filters.dateTo);
      if (filters.minAmount) params.set("minAmount", filters.minAmount);
      if (filters.maxAmount) params.set("maxAmount", filters.maxAmount);
      
      params.set("page", String(page));
      params.set("limit", String(limit));

      const res = await fetch(`/api/booking?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load bookings.");
      }

      setBookings(json.data);
      setPagination({
        ...json.pagination,
        limit: limit,
      });
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Something went wrong while loading bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [debouncedSearch, filters, pagination.limit]);

  // --- Auto-fetch on filter change ---
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookings(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [debouncedSearch, filters.customerName, filters.bookingStatus, filters.paymentStatus]);

  // --- Handlers ---
  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > pagination.totalPages) return;
    fetchBookings(nextPage);
    document.querySelector('.booking-table-container')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const handleItemsPerPageChange = (newLimit) => {
    fetchBookings(1, newLimit);
  };

  const handleDeleteConfirm = async () => {
    if (!bookingToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/booking/${bookingToDelete._id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to delete booking.");
      }

      setBookingToDelete(null);
      fetchBookings(pagination.page);
    } catch (err) {
      setError(err.message || "Failed to delete booking.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = () => {
    const csv = convertToCSV(bookings);
    downloadCSV(csv, `bookings_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleResetFilters = () => {
    setFilters(EMPTY_FILTERS);
    setIsFilterOpen(false);
    fetchBookings(1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchBookings(pagination.page);
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => 
      value !== "" && value !== null && value !== undefined
    );
  }, [filters]);

  // --- Stats Calculation ---
  const stats = useMemo(() => {
    return STATS_CONFIG.map(config => ({
      ...config,
      value: config.format 
        ? config.format(config.getValue(bookings))
        : config.getValue(config.key === "total" ? pagination : bookings)
    }));
  }, [bookings, pagination]);

  // --- CSV Helper ---
  const convertToCSV = (data) => {
    if (!data.length) return '';
    const headers = ['Booking ID', 'Customer', 'Package', 'Departure', 'Travelers', 'Amount', 'Payment Status', 'Booking Status', 'Created'];
    const rows = data.map(booking => [
      booking.bookingId,
      booking.customerName,
      booking.packageId?.name || '',
      formatDate(booking.departureId?.date),
      booking.travelers,
      booking.amount,
      booking.paymentStatus,
      booking.bookingStatus,
      formatDate(booking.createdAt),
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // --- Render ---
  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-gray-50 via-white to-gray-50/80 p-4 sm:p-6 lg:p-8">
      
      <div className="mx-auto max-w-7xl">
        
        {/* ===== BREADCRUMB ===== */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">Bookings</span>
        </div>

        {/* ===== HEADER ===== */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                    Bookings
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                      {pagination.total}
                    </span>
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span>Manage and track all customer reservations</span>
                    {lastUpdated && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Updated {formatDate(lastUpdated)}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none min-w-[200px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search bookings... ⌘K"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full sm:w-56 pl-10 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow"
                />
                {filters.search && (
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'table' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-label="Table view"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  hasActiveFilters 
                    ? "bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-700 border border-blue-200 shadow-sm" 
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow"
                }`}
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px] font-medium flex items-center justify-center shadow-sm">
                    {Object.values(filters).filter(Boolean).length}
                  </span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Export */}
              <button
                onClick={handleExport}
                className="p-2.5 text-gray-400 bg-white border border-gray-200 rounded-xl hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow"
                aria-label="Export bookings"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Refresh */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2.5 text-gray-400 bg-white border border-gray-200 rounded-xl hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Refresh bookings"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
        </header>

        {/* ===== FILTERS PANEL ===== */}
        {isFilterOpen && (
          <div 
            ref={filterPanelRef}
            className="mb-8 bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-100/50 overflow-hidden transition-all animate-in slide-in-from-top duration-300"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-blue-50">
                  <Filter className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">Filter Bookings</h3>
                {hasActiveFilters && (
                  <span className="text-xs bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-medium border border-blue-200">
                    {Object.values(filters).filter(Boolean).length} active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1.5 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50"
                >
                  <X className="w-3 h-3" />
                  Reset all
                </button>
                <span className="text-xs text-gray-300 hidden sm:inline">
                  Press <kbd className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px] font-mono border border-gray-200">Esc</kbd> to close
                </span>
              </div>
            </div>
            <div className="px-6 py-5">
              <BookingFilters
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                compact
              />
            </div>
          </div>
        )}

        {/* ===== STATS ROW ===== */}
        {!loading && bookings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown;
              return (
                <div 
                  key={stat.key}
                  className="group bg-white rounded-2xl border border-gray-200 px-5 py-4 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-0.5 animate-in slide-in-from-bottom duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1.5 tracking-tight truncate">
                        {stat.value}
                      </p>
                      {stat.trend && (
                        <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${
                          stat.trendUp ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          <TrendIcon className="w-3 h-3" />
                          <span>{stat.trend}</span>
                          <span className="text-gray-400 font-normal">vs last month</span>
                        </div>
                      )}
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===== QUICK STATS BAR ===== */}
        {!loading && bookings.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 mb-5 text-xs text-gray-500">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>
                Showing <span className="font-medium text-gray-700">{((pagination.page - 1) * pagination.limit) + 1}</span> -{" "}
                <span className="font-medium text-gray-700">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{" "}
                <span className="font-medium text-gray-700">{pagination.total}</span>
              </span>
            </div>
          </div>
        )}

        {/* ===== ERROR ===== */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 px-5 py-4 flex items-start gap-3 animate-in fade-in duration-200 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-100"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ===== TABLE ===== */}
        <div className="booking-table-container">
          {loading ? (
            <LoadingState viewMode={viewMode} />
          ) : bookings.length === 0 ? (
            <EmptyState 
              hasFilters={hasActiveFilters} 
              onClear={handleResetFilters} 
            />
          ) : viewMode === 'grid' ? (
            <GridView 
              bookings={bookings} 
              onDeleteClick={setBookingToDelete}
            />
          ) : (
            <BookingTable 
              bookings={bookings} 
              onDeleteClick={setBookingToDelete}
              onExport={handleExport}
              totalCount={pagination.total}
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={pagination.limit}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>

        {/* ===== PAGINATION ===== */}
        {/* Removed the separate Pagination component since BookingTable already has it */}
      </div>

      {/* ===== DELETE MODAL ===== */}
      <DeleteModal
        booking={bookingToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setBookingToDelete(null)}
      />
    </div>
  );
}

// ============================================
// LOADING STATE
// ============================================

function LoadingState({ viewMode }) {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
              <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full animate-pulse" />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl animate-pulse" />
              <div className="flex-1">
                <div className="h-4 w-28 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse mt-2" />
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            <div className="h-4 w-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-32 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl animate-pulse" />
            <div className="h-9 w-9 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            <div className="h-4 w-28 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-6 shadow-inner">
          <Calendar className="w-12 h-12 text-gray-300" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          {hasFilters ? "No matching bookings found" : "No bookings yet"}
        </h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md">
          {hasFilters
            ? "Try adjusting your filters or clearing the search to see more results."
            : "New bookings will appear here once customers start making reservations."}
        </p>
        {hasFilters && (
          <button
            onClick={onClear}
            className="mt-8 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================
// GRID VIEW
// ============================================

function GridView({ bookings, onDeleteClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {bookings.map((booking) => (
        <div 
          key={booking._id}
          className="group bg-white rounded-2xl border border-gray-200 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono bg-gradient-to-br from-gray-50 to-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">
                {booking.bookingId}
              </span>
            </div>
            <BookingStatusBadge status={booking.bookingStatus} size="sm" />
          </div>
          
          <div className="mt-4 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {booking.customerName}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {booking.packageId?.name || '—'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-gray-600">
              <div className="p-1 rounded bg-gray-50">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <span>{formatDate(booking.departureId?.date)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <div className="p-1 rounded bg-gray-50">
                <Users className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <span>{booking.travelers}</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="font-bold text-gray-900 text-lg">
              {formatAmount(booking.amount, booking.currency)}
            </span>
            <div className="flex items-center gap-1">
              <Link
                href={`/admin/bookings/${booking._id}`}
                className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onDeleteClick(booking)}
                className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatAmount(amount, currency = 'INR') {
  if (!amount) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}