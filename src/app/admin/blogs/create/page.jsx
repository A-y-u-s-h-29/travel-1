import Link from "next/link";
import { ChevronRight, FilePlus, Sparkles, LayoutDashboard, BookOpen, Zap } from "lucide-react";
import BlogForm from "../components/BlogForm";

export default function CreateBlogPage() {
  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
            href="/admin/blogs" 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            Blogs
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-700 font-medium">Create New Blog</span>
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
                  Create New Blog Post
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Share your insights and stories with the world
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Draft
            </div>
          </div>
        </div>

       

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
         
          <div className="p-8">
            <BlogForm />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>All fields marked with <span className="text-red-400">*</span> are required</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/blogs"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
            >
              View all blogs
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}