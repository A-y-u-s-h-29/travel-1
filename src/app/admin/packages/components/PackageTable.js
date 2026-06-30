"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Users,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  AlertCircle,
  CheckCircle,
  Clock as ClockIcon,
  MoreVertical,
  Download,
  ExternalLink,
  Star,
  TrendingUp,
  Tag,
  Grid3x3,
  List,
  SlidersHorizontal,
  LayoutDashboard,
  Home
} from "lucide-react";

export default function PackageTable() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  async function fetchPackages() {
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      setPackages(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deletePackage(id) {
    try {
      setDeletingId(id);

      const res = await fetch(`/api/packages/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setPackages((prev) =>
        prev.filter((item) => item._id !== id)
      );
      setShowDeleteModal(false);
      setPackageToDelete(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  }

  const handleDeleteClick = (pkg) => {
    setPackageToDelete(pkg);
    setShowDeleteModal(true);
  };

  const handleSelectAll = () => {
    if (selectedPackages.length === filteredPackages.length) {
      setSelectedPackages([]);
    } else {
      setSelectedPackages(filteredPackages.map(p => p._id));
    }
  };

  const handleSelectPackage = (id) => {
    setSelectedPackages(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-100 text-gray-700 border-gray-200",
      published: "bg-emerald-50 text-emerald-700 border-emerald-200",
      archived: "bg-amber-50 text-amber-700 border-amber-200",
    };
    return colors[status] || colors.draft;
  };

  const getAvailabilityColor = (availability) => {
    const colors = {
      available: "bg-emerald-50 text-emerald-700",
      limited: "bg-amber-50 text-amber-700",
      sold_out: "bg-red-50 text-red-700",
      upcoming: "bg-blue-50 text-blue-700",
    };
    return colors[availability] || colors.available;
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'published': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'draft': return <ClockIcon className="w-3.5 h-3.5" />;
      case 'archived': return <AlertCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pkg.mainDestination?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || pkg.status === filterStatus;
    const matchesAvailability = filterAvailability === "all" || pkg.availability === filterAvailability;
    return matchesSearch && matchesStatus && matchesAvailability;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = filteredPackages.slice(startIndex, endIndex);

  useEffect(() => {
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium animate-pulse">Loading packages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        
       

      

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{packages.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Published</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {packages.filter(p => p.status === 'published').length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Drafts</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">
                  {packages.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                <ClockIcon className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Available</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {packages.filter(p => p.availability === 'available').length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* ===== FILTERS ===== */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filters</span>
                {(filterStatus !== "all" || filterAvailability !== "all") && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium border border-blue-200">
                    Active
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 sm:flex-none min-w-[180px]">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-48 pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
                <select
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                  className="px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="all">All Availability</option>
                  <option value="available">Available</option>
                  <option value="limited">Limited</option>
                  <option value="sold_out">Sold Out</option>
                  <option value="upcoming">Upcoming</option>
                </select>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setFilterAvailability("all");
                  }}
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="px-5 py-3 flex items-center justify-between bg-white">
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">{filteredPackages.length}</span> package{filteredPackages.length !== 1 ? 's' : ''} found
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "table" 
                    ? "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
                title="Table view"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid" 
                    ? "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
                title="Grid view"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        {viewMode === "table" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50/50 to-white border-b border-gray-100">
                    <th className="px-4 py-3.5 text-left">
                      <input
                        type="checkbox"
                        checked={selectedPackages.length === filteredPackages.length && filteredPackages.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentPackages.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-5 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl">
                            <Package className="w-12 h-12 text-gray-300" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-900">No packages found</p>
                            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
                          </div>
                          <Link
                            href="/admin/packages/create"
                            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                          >
                            <Plus className="w-4 h-4" />
                            Create your first package
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentPackages.map((item, index) => (
                      <tr 
                        key={item._id} 
                        className={`hover:bg-gray-50/50 transition-colors duration-150 group ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                        }`}
                      >
                        <td className="px-4 py-3.5">
                          <input
                            type="checkbox"
                            checked={selectedPackages.includes(item._id)}
                            onChange={() => handleSelectPackage(item._id)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {item.featuredImage ? (
                                <img
                                  src={item.featuredImage}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-gray-100 shadow-sm">
                                  <Package className="w-5 h-5 text-blue-500" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                {item.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Tag className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {item.category?.name || 'Uncategorized'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              {item.mainDestination || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">
                              {item.priceFrom ? formatCurrency(item.priceFrom, item.currency) : 'N/A'}
                            </span>
                            {item.priceTo && (
                              <span className="text-xs text-gray-400">
                                up to {formatCurrency(item.priceTo, item.currency)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              {item.duration || `${item.durationDays || 0}D / ${item.durationNights || 0}N`}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(item.availability)}`}>
                            {item.availability === 'available' && <CheckCircle className="w-3 h-3" />}
                            {item.availability === 'limited' && <AlertCircle className="w-3 h-3" />}
                            {item.availability === 'sold_out' && <X className="w-3 h-3" />}
                            {item.availability === 'upcoming' && <ClockIcon className="w-3 h-3" />}
                            {item.availability.replace('_', ' ').charAt(0).toUpperCase() + item.availability.replace('_', ' ').slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/admin/packages/edit/${item._id}`}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Edit package"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(item)}
                              disabled={deletingId === item._id}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                              title="Delete package"
                            >
                              {deletingId === item._id ? (
                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                            <Link
                              href={`/packages/${item.slug}`}
                              target="_blank"
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                              title="View package"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ===== PAGINATION ===== */}
            {filteredPackages.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-gray-50/30 to-white">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-700">{startIndex + 1}</span> to{' '}
                  <span className="font-medium text-gray-700">
                    {Math.min(endIndex, filteredPackages.length)}
                  </span>{' '}
                  of <span className="font-medium text-gray-700">{filteredPackages.length}</span> results
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`min-w-[36px] h-9 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                            currentPage === pageNum
                              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== GRID VIEW ===== */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentPackages.map((item) => (
              <div 
                key={item._id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50">
                  {item.featuredImage ? (
                    <img
                      src={item.featuredImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-1">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {item.mainDestination || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(item.availability)}`}>
                      {item.availability}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {item.priceFrom ? formatCurrency(item.priceFrom, item.currency) : 'N/A'}
                      </span>
                      {item.priceTo && (
                        <span className="text-xs text-gray-400 ml-1">
                          - {formatCurrency(item.priceTo, item.currency)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.duration || `${item.durationDays || 0}D`}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {item.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/packages/edit/${item._id}`}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/packages/${item.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== DELETE MODAL ===== */}
        {showDeleteModal && packageToDelete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Delete Package</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">"{packageToDelete.name}"</span>?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setPackageToDelete(null);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deletePackage(packageToDelete._id)}
                  disabled={deletingId === packageToDelete._id}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-red-500 to-red-600 rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 disabled:opacity-50"
                >
                  {deletingId === packageToDelete._id ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </div>
                  ) : (
                    'Delete Package'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}