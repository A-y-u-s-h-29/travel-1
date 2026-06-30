"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  RefreshCw, 
  Download, 
  Plus,
  Bell,
  LayoutGrid,
  List,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  LayoutDashboard
} from "lucide-react";

import EnquiryFilters from "./components/EnquiryFilters";
import EnquiryTable from "./components/EnquiryTable";
import Link from "next/link";

export default function EnquiriesPage() {
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });
  const [viewMode, setViewMode] = useState("table");
  const [refreshing, setRefreshing] = useState(false);

  // Mock stats - replace with real data
  const stats = [
    { label: "Total Enquiries", value: "247", change: "+12%", icon: Users, color: "text-[#1a5a9a]" },
    { label: "New", value: "23", change: "+5%", icon: Bell, color: "text-[#0e6a9a]" },
    { label: "In Progress", value: "45", change: "+8%", icon: Clock, color: "text-[#0a5a8a]" },
    { label: "Converted", value: "89", change: "+15%", icon: CheckCircle, color: "text-[#0a4a7a]" },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] p-6">
      <div className="mx-auto max-w-7xl space-y-6">


          <div className="flex items-center gap-2 text-sm mb-8">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">Blogs</span>
        </div>
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-[#1a5a9a] to-[#0e4a7a] p-2.5 shadow-sm shadow-blue-200">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0a2a4a]">
                  Enquiries
                </h1>
                <p className="mt-0.5 text-sm text-[#4a6a8a]">
                  Manage and track all customer enquiries
                </p>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="hidden rounded-xl border border-[#dce6f0] bg-white p-1 sm:flex">
              <button
                onClick={() => setViewMode("table")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                  viewMode === "table"
                    ? "bg-[#1a5a9a] text-white shadow-sm"
                    : "text-[#4a6a8a] hover:bg-[#f5f8fc]"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                  viewMode === "grid"
                    ? "bg-[#1a5a9a] text-white shadow-sm"
                    : "text-[#4a6a8a] hover:bg-[#f5f8fc]"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>

          

            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0e6a9a] to-[#0a5a8a] px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02]">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </button>
          </div>
        </div>

      

        {/* Filters Card */}
        <div className="rounded-2xl border border-[#dce6f0] bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#1a5a9a]" />
              <span className="text-sm font-medium text-[#0a2a4a]">Filters</span>
              <span className="rounded-full bg-[#dbeafe] px-2 py-0.5 text-xs font-medium text-[#1a5a9a]">
                Active
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#4a6a8a]">
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="mt-4">
            <EnquiryFilters filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded-2xl border border-[#dce6f0] bg-white p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between border-b border-[#e8edf2] pb-4 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold text-[#0a2a4a]">All Enquiries</h2>
              <span className="rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-xs font-medium text-[#1a5a9a]">
                247 Total
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg px-3 py-1 text-xs text-[#4a6a8a] transition-colors hover:text-[#1a5a9a]">
                Today
              </button>
              <button className="rounded-lg bg-[#f0f4f9] px-3 py-1 text-xs font-medium text-[#0a2a4a] transition-colors hover:bg-[#dbeafe]">
                Week
              </button>
              <button className="rounded-lg px-3 py-1 text-xs text-[#4a6a8a] transition-colors hover:text-[#1a5a9a]">
                Month
              </button>
            </div>
          </div>
          <EnquiryTable filters={filters} />
        </div>

        {/* Footer Stats - Enhanced */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-5 py-4 border border-[#dce6f0] shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#4a6a8a]">
              Showing <span className="font-semibold text-[#0a2a4a]">1-10</span> of{" "}
              <span className="font-semibold text-[#0a2a4a]">247</span> enquiries
            </span>
            <div className="hidden h-5 w-px bg-[#dce6f0] sm:block"></div>
            <span className="hidden text-sm text-[#4a6a8a] sm:inline">
              <span className="font-semibold text-[#0a2a4a]">12</span> new this week
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Rows per page */}
            <select className="rounded-lg border border-[#dce6f0] bg-white px-3 py-1.5 text-sm text-[#0a2a4a] outline-none focus:border-[#1a5a9a] focus:ring-2 focus:ring-blue-100">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>

            <div className="flex items-center gap-1">
              <button className="rounded-lg border border-[#dce6f0] px-3 py-1.5 text-sm text-[#0a2a4a] transition-all hover:bg-[#f5f8fc] hover:border-[#b0c8d8] disabled:opacity-50">
                Previous
              </button>
              <button className="rounded-lg bg-[#1a5a9a] px-3.5 py-1.5 text-sm font-medium text-white shadow-sm shadow-blue-200">
                1
              </button>
              <button className="rounded-lg px-3.5 py-1.5 text-sm text-[#4a6a8a] transition-all hover:bg-[#f5f8fc]">
                2
              </button>
              <button className="rounded-lg px-3.5 py-1.5 text-sm text-[#4a6a8a] transition-all hover:bg-[#f5f8fc]">
                3
              </button>
              <span className="px-2 text-[#4a6a8a]">...</span>
              <button className="rounded-lg px-3.5 py-1.5 text-sm text-[#4a6a8a] transition-all hover:bg-[#f5f8fc]">
                25
              </button>
              <button className="rounded-lg border border-[#dce6f0] px-3 py-1.5 text-sm text-[#0a2a4a] transition-all hover:bg-[#f5f8fc] hover:border-[#b0c8d8]">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}