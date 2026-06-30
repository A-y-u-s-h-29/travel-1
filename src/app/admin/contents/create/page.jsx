import Link from "next/link";
import { ChevronRight, FilePlus, Sparkles, LayoutDashboard } from "lucide-react";
import ContentForm from "../components/ContentForm";

export default function CreateContentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <Link 
            href="/admin/contents" 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            Contents
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-700 font-medium">Create New Page</span>
        </div>

        {/* Header Section */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
                <FilePlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Create New Page
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Add a new content page to your library
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Draft
            </div>
          </div>
        </div>

        {/* Tips Banner */}
       

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
         
          
          <div className="p-8">
            <ContentForm />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>All fields marked with * are required</span>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              href="/admin/contents"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              View all pages →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}