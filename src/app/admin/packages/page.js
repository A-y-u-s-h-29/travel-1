import Link from "next/link";
import PackageTable from "./components/PackageTable";
import { LayoutDashboard, Package, Plus } from "lucide-react";

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        
        {/* ===== BREADCRUMB ===== */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">Packages</span>
        </div>

        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Packages
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage your tour packages and itineraries
              </p>
            </div>
          </div>
          
          <Link
            href="/admin/packages/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Create Package
          </Link>
        </div>

        {/* ===== TABLE ===== */}
        <PackageTable />
      </div>
    </div>
  );
}