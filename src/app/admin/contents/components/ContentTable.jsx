"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Pencil, Trash2, FileText, CheckCircle, Clock,
  AlertCircle, Eye, EyeOff, Loader2, 
  ChevronLeft, ChevronRight, Search, Filter,
  Plus, Layers, Calendar, Tag, Sparkles,
  ArrowUpDown, Grid3x3, List, Download,
  Share2, MoreVertical, Zap, Star, TrendingUp,
  Activity, BarChart3, PieChart, Users,
  Globe, Link2, MessageSquare, Heart,
  Award, Crown, Rocket, Target, Flame
} from "lucide-react";

const STATUS_STYLES = {
  PUBLISHED: "text-emerald-700 bg-emerald-50 border-emerald-200",
  IN_REVIEW: "text-amber-700 bg-amber-50 border-amber-200",
  SCHEDULED: "text-blue-700 bg-blue-50 border-blue-200",
  DRAFT: "text-gray-600 bg-gray-50 border-gray-200",
};

const STATUS_ICONS = {
  PUBLISHED: CheckCircle,
  IN_REVIEW: Eye,
  SCHEDULED: Clock,
  DRAFT: AlertCircle,
};

const TYPE_COLORS = {
  PACKAGE: "bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200",
  ATTRACTION: "bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-200",
  GUIDE: "bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-200",
  ROUTE: "bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 border-amber-200",
  AUDIENCE: "bg-gradient-to-r from-rose-500/10 to-rose-600/10 text-rose-700 border-rose-200",
  EVENT: "bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 text-indigo-700 border-indigo-200",
  TRUST: "bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 text-cyan-700 border-cyan-200",
};

// Ultra Premium Status Badge
function StatusBadge({ status }) {
  const Icon = STATUS_ICONS[status] || AlertCircle;
  const style = STATUS_STYLES[status] || STATUS_STYLES.DRAFT;
  
  const statusEmojis = {
    PUBLISHED: "🚀",
    IN_REVIEW: "👀",
    SCHEDULED: "📅",
    DRAFT: "📝"
  };
  
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full border-2 ${style} shadow-sm transition-all hover:scale-105 cursor-default`}>
      <span className="text-sm">{statusEmojis[status] || "📄"}</span>
      {status}
    </span>
  );
}

// Ultra Premium Type Badge
function TypeBadge({ type }) {
  const color = TYPE_COLORS[type] || "bg-gradient-to-r from-gray-500/10 to-gray-600/10 text-gray-700 border-gray-200";
  const typeIcons = {
    PACKAGE: "📦",
    ATTRACTION: "🎯",
    GUIDE: "📖",
    ROUTE: "🗺️",
    AUDIENCE: "👥",
    EVENT: "🎪",
    TRUST: "🤝"
  };
  
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl border-2 ${color} shadow-sm transition-all hover:scale-105 cursor-default`}>
      <span>{typeIcons[type] || "📄"}</span>
      {type}
    </span>
  );
}

// Advanced Analytics Sparkline
function Sparkline({ data, color = "blue" }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || !data?.length) return;
    const ctx = canvasRef.current.getContext('2d');
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const padding = 2;
    
    ctx.clearRect(0, 0, width, height);
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    ctx.beginPath();
    ctx.strokeStyle = color === "blue" ? "#3B82F6" : "#8B5CF6";
    ctx.lineWidth = 2;
    ctx.shadowColor = color === "blue" ? "rgba(59,130,246,0.3)" : "rgba(139,92,246,0.3)";
    ctx.shadowBlur = 4;
    
    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color === "blue" ? "rgba(59,130,246,0.2)" : "rgba(139,92,246,0.2)");
    gradient.addColorStop(1, "rgba(59,130,246,0)");
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [data, color]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={80} 
      height={30} 
      className="rounded"
    />
  );
}

// Premium Empty State with Animation
function PremiumEmptyState() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 rounded-3xl border-2 border-dashed border-blue-200 p-16 text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-32 -translate-x-32 animate-pulse" />
      
      <div className="relative">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl transition-all duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`} />
            <div className={`relative p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl shadow-blue-200 transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
              <Rocket className="w-20 h-20 text-white animate-bounce" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Launch Your Content Journey
            </h3>
            <p className="text-gray-500 max-w-md text-lg">
              Your content library is ready to be built. Start creating exceptional content that engages and converts.
            </p>
          </div>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/admin/contents/create"
              className="group inline-flex items-center gap-3 px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%] hover:bg-[length:100%] rounded-2xl transition-all shadow-2xl shadow-blue-200 hover:shadow-3xl hover:shadow-blue-300 hover:-translate-y-1 active:scale-95 animate-shimmer"
            >
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
              Create First Content
              <Sparkles className="w-4 h-4 group-hover:animate-spin" />
            </Link>
            <button className="group px-8 py-4 text-base font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all hover:-translate-y-1 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              View Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Advanced Stat Card Component
function StatCard({ title, value, icon: Icon, color, trend, subtitle, gradient }) {
  return (
    <div className={`group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2 group-hover:scale-105 transition-transform">
              {value}
            </p>
          </div>
          <div className={`p-3.5 bg-${color}-50 rounded-2xl group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 text-${trend > 0 ? 'emerald' : 'red'}-600 font-semibold`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
            <span className="text-gray-400">vs last month</span>
          </div>
          <span className="text-xs text-gray-400">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

export default function ContentTable({ contents }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isBulkActions, setIsBulkActions] = useState(false);
  const itemsPerPage = 10;

  // Advanced filtering and sorting
  const filteredContents = contents?.filter(c => {
    const matchesSearch = c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.h1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || c.status === filterStatus;
    const matchesType = filterType === "ALL" || c.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedContents = [...(filteredContents || [])].sort((a, b) => {
    let aVal = a[sortBy] || "";
    let bVal = b[sortBy] || "";
    if (sortBy === "faqs") {
      aVal = (a.faqs?.length || 0);
      bVal = (b.faqs?.length || 0);
    }
    if (sortBy === "links") {
      aVal = (a.internalLinks?.length || 0);
      bVal = (b.internalLinks?.length || 0);
    }
    if (typeof aVal === "string") {
      return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });

  const totalPages = Math.ceil((sortedContents?.length || 0) / itemsPerPage);
  const paginatedContents = sortedContents?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Analytics data
  const totalContent = contents?.length || 0;
  const publishedCount = contents?.filter(c => c.status === "PUBLISHED").length || 0;
  const inReviewCount = contents?.filter(c => c.status === "IN_REVIEW").length || 0;
  const draftCount = contents?.filter(c => c.status === "DRAFT").length || 0;
  const totalFAQs = contents?.reduce((acc, c) => acc + (c.faqs?.length || 0), 0) || 0;
  const totalLinks = contents?.reduce((acc, c) => acc + (c.internalLinks?.length || 0), 0) || 0;

  const trendData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 50);

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/contents/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setShowModal(null);
      router.refresh();
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  function handleSelectAll(e) {
    if (e.target.checked) {
      setSelectedItems(paginatedContents?.map(c => c._id) || []);
    } else {
      setSelectedItems([]);
    }
  }

  function handleSelectItem(id) {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }

  if (!contents?.length) {
    return <PremiumEmptyState />;
  }

  return (
    <div className="space-y-8 text-black">
      {/* Ultra Premium Analytics Dashboard */}
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-gray-200 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Analytics Overview
            </h3>
            <p className="text-xs text-gray-500 mt-1">Real-time content performance metrics</p>
          </div>
        
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Content"
            value={totalContent}
            icon={FileText}
            color="blue"
            trend={12}
            subtitle="All types"
            gradient="from-blue-500 to-indigo-500"
          />
          <StatCard
            title="Published"
            value={publishedCount}
            icon={CheckCircle}
            color="emerald"
            trend={8}
            subtitle={`${Math.round((publishedCount/totalContent)*100)}% of total`}
            gradient="from-emerald-500 to-teal-500"
          />
          <StatCard
            title="Total FAQs"
            value={totalFAQs}
            icon={MessageSquare}
            color="purple"
            trend={15}
            subtitle="Across all content"
            gradient="from-purple-500 to-pink-500"
          />
          <StatCard
            title="Internal Links"
            value={totalLinks}
            icon={Link2}
            color="amber"
            trend={5}
            subtitle="Total connections"
            gradient="from-amber-500 to-orange-500"
          />
        </div>
        
      
      </div>

      {/* Advanced Search and Filter Bar */}
      <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-lg hover:shadow-xl transition-all">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 w-full lg:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content by title, H1, slug, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-[400px] pl-12 pr-4 py-3.5 text-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white placeholder:text-gray-400"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3.5 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
              >
                <option value="ALL">All Status</option>
                {Object.keys(STATUS_STYLES).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3.5 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
              >
                <option value="ALL">All Types</option>
                {Object.keys(TYPE_COLORS).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-1 bg-gray-50 rounded-2xl p-1.5 border-2 border-gray-200">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2.5 rounded-xl transition-all ${
                  viewMode === "table" 
                    ? "bg-white shadow-lg text-blue-600 scale-105" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-xl transition-all ${
                  viewMode === "grid" 
                    ? "bg-white shadow-lg text-blue-600 scale-105" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
            
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2 bg-blue-50 rounded-2xl px-4 py-2 border-2 border-blue-200">
                <span className="text-xs font-semibold text-blue-600">
                  {selectedItems.length} selected
                </span>
                <button className="p-1 text-blue-600 hover:bg-blue-100 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Premium Table with Advanced Features */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 via-gray-50/80 to-gray-50/50 border-b-2 border-gray-200">
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === paginatedContents?.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                {["Title", "Type", "Section", "Slug", "Status", "FAQs", "Links", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                    <button
                      onClick={() => {
                        if (h !== "" && h !== "FAQs" && h !== "Links") {
                          const sortKey = h.toLowerCase();
                          setSortBy(sortKey);
                          setSortOrder(prev => prev === "asc" ? "desc" : "asc");
                        }
                      }}
                      className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                    >
                      {h}
                      {h !== "" && h !== "FAQs" && h !== "Links" && (
                        <ArrowUpDown className={`w-3 h-3 transition-all ${
                          sortBy === h.toLowerCase() ? 'text-blue-600' : 'opacity-50'
                        }`} />
                      )}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100">
              {paginatedContents?.map((c, index) => {
                const Icon = STATUS_ICONS[c.status] || AlertCircle;
                const isSelected = selectedItems.includes(c._id);
                return (
                  <tr 
                    key={c._id} 
                    className={`group transition-all duration-300 ${
                      isSelected ? 'bg-blue-50/50' : ''
                    } ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    } hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectItem(c._id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${
                          c.status === "PUBLISHED" ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
                        }`}>
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {c.title || c.h1 || "Untitled"}
                          </div>
                          {c.noindex && (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-600 mt-0.5">
                              <EyeOff className="w-3 h-3" /> noindex
                            </span>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-xs text-gray-400">
                              {c.author || "Admin"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <TypeBadge type={c.type} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                        <Tag className="w-3 h-3" />
                        /{c.section}/
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-xl font-mono border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all">
                        {c.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center justify-center w-8 h-8 text-xs font-bold rounded-2xl transition-all ${
                          c.faqs?.length > 0 
                            ? 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-sm' 
                            : 'bg-gray-50 text-gray-400'
                        } group-hover:scale-110`}>
                          {c.faqs?.length ?? 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center justify-center w-8 h-8 text-xs font-bold rounded-2xl transition-all ${
                          c.internalLinks?.length > 0 
                            ? 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 shadow-sm' 
                            : 'bg-gray-50 text-gray-400'
                        } group-hover:scale-110`}>
                          {c.internalLinks?.length ?? 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/contents/edit/${c._id}`}
                          className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all group-hover:scale-110"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setShowModal(c)}
                          disabled={deletingId === c._id}
                          className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all group-hover:scale-110"
                        >
                          {deletingId === c._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                        <button className="p-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 group-hover:scale-110">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Premium Pagination */}
        {totalPages > 1 && (
          <div className="border-t-2 border-gray-200 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-white">
            <span className="text-xs text-gray-500">
              Showing <span className="font-semibold text-gray-700">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
              <span className="font-semibold text-gray-700">{Math.min(currentPage * itemsPerPage, sortedContents?.length || 0)}</span> of{' '}
              <span className="font-semibold text-gray-700">{sortedContents?.length || 0}</span> results
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 text-sm font-semibold rounded-2xl transition-all ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-200 scale-110"
                        : "text-gray-600 hover:bg-gray-100 hover:scale-105"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ultra Premium Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl animate-pulse">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl shadow-red-200">
                  <Trash2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">Delete Content</h3>
                <p className="text-sm text-gray-500 mt-1">This action is irreversible and will permanently remove all associated data.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 via-red-50/80 to-rose-50 rounded-2xl p-5 mb-6 border-2 border-red-100">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700 font-medium">
                    Are you sure you want to delete{' '}
                    <span className="font-bold">"{showModal.title || showModal.h1}"</span>?
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-red-400">
                    <li className="flex items-center gap-2">• All FAQs ({showModal.faqs?.length || 0}) will be removed</li>
                    <li className="flex items-center gap-2">• Internal links ({showModal.internalLinks?.length || 0}) will be removed</li>
                    <li className="flex items-center gap-2">• Metadata and SEO data will be deleted</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(null)} 
                className="flex-1 px-4 py-3.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showModal._id)}
                disabled={deletingId === showModal._id}
                className="flex-1 px-4 py-3.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-2xl transition-all shadow-xl shadow-red-200 hover:shadow-2xl hover:shadow-red-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {deletingId === showModal._id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}