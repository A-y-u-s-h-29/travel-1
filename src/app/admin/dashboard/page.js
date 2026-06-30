"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FileText,
  FolderTree,
  Settings,
  LogOut,
  PlusCircle,
  Eye,
  Clock,
  Users,
  Bell,
  Search,
  ChevronRight,
  MapPin,
  BookOpen,
  Newspaper,
  Globe,
  TrendingUp,
  Calendar,
  Star,
  Award,
  Sparkles,
  Hash,
  Tag,
  Layers,
  Compass,
  PenTool,
  Grid3x3,
  Boxes,
  FileStack,
  LibraryBig,
  Menu,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
const router = useRouter();

  // ===== Stats state (Total Packages / Enquiries / Blogs / Bookings) =====
  const [stats, setStats] = useState({
    packages: 0,
    enquiries: 0,
    blogs: 0,
    bookings: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
  try {
    const endpoints = [
      { key: 'packages', url: '/api/packages' },
      { key: 'enquiries', url: '/api/enquiries' },
      { key: 'blogs', url: '/api/blogs' },
      {key:'booking',url:'/api/booking'}
    ];

    const results = await Promise.all(
      endpoints.map(async ({ key, url }) => {
        try {
          const res = await fetch(url);
          
          // Check if response is OK (status 200-299)
          if (!res.ok) {
            console.error(`API ${key} returned status: ${res.status}`);
            return { key, data: null, error: `HTTP ${res.status}` };
          }

          // Check content type
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            console.error(`API ${key} returned non-JSON response`);
            return { key, data: null, error: 'Non-JSON response' };
          }

          const data = await res.json();
          return { key, data, error: null };
        } catch (err) {
          console.error(`Failed to fetch ${key}:`, err);
          return { key, data: null, error: err.message };
        }
      })
    );

    // Process results
    const newStats = {
      packages: 0,
      enquiries: 0,
      blogs: 0,
      bookings: 0
    };

    results.forEach(({ key, data, error }) => {
      if (error) {
        console.warn(`Using default value for ${key} due to error:`, error);
        return;
      }

      const toCount = (data) => {
        if (typeof data?.count === 'number') return data.count;
        if (Array.isArray(data?.data)) return data.data.length;
        if (Array.isArray(data)) return data.length;
        return data?.total ?? 0;
      };

      newStats[key] = toCount(data);
    });

    setStats(newStats);
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err);
  } finally {
    setStatsLoading(false);
  }
}

    fetchStats();
  }, []);

  async function handleLogout() {
  const res = await fetch("/api/admin/logout", {
    method: "POST",
  });

  const data = await res.json();

  if (data.success) {
    router.push("/admin/login");
    router.refresh();
  }
}
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      {/* ========== SIDEBAR ========== */}
      <aside className="w-72 bg-white border-r border-slate-200/80 flex flex-col fixed inset-y-0 left-0 shadow-xl shadow-slate-200/50 z-50">
        {/* Brand / Logo */}
        <div className="p-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <span className="font-bold text-lg text-white">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">AdminHub</h1>
              <p className="text-xs text-slate-400 font-medium">Content Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3 flex items-center gap-2">
            <span>Main Menu</span>
            <span className="flex-1 h-px bg-slate-200/60"></span>
          </div>
          
          <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/admin" active />
          <SidebarItem icon={Package} label="Packages" href="/admin/packages" />
          <SidebarItem icon={PlusCircle} label="Create Package" href="/admin/packages/create" />
          
          <div className="h-px bg-slate-200/60 my-3 mx-3"></div>
          
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3 flex items-center gap-2">
            <span>Content Management</span>
            <span className="flex-1 h-px bg-slate-200/60"></span>
          </div>
          
          <SidebarItem 
            icon={FolderTree} 
            label="Categories" 
            href="/admin/categories" 
            badge="12"
          />
          <SidebarItem 
            icon={Compass} 
            label="Destinations" 
            href="/admin/destinations" 
            badge="8"
          />
          <SidebarItem 
            icon={LibraryBig} 
            label="Contents" 
            href="/admin/contents" 
            badge="24"
          />
          <SidebarItem 
            icon={BookOpen} 
            label="Blogs" 
            href="/admin/blogs" 
            badge="15"
          />
          <SidebarItem 
            icon={LibraryBig} 
            label="Enquiries" 
            href="/admin/enquiries" 
            badge="24"
          />
          <SidebarItem 
            icon={LibraryBig} 
            label="Bookings" 
            href="/admin/booking" 
            badge="24"
          />
          <div className="h-px bg-slate-200/60 my-3 mx-3"></div>
          
         
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/50">
         <button
  onClick={handleLogout}
  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 transition-all duration-200 group"
>
  <LogOut size={20} />
  <span>Logout</span>
</button>
          <div className="mt-3 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-slate-200/60 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/25 text-sm">
              JD
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-800">Admin User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 ml-72 p-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
              <span className="text-2xl">👋</span>
            </div>
            <p className="mt-1 text-slate-500 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Welcome back! Here's what's happening with your content.
            </p>
          </div>
        </div>

        {/* ========== STATS OVERVIEW ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            icon={Package}
            label="Total Packages"
            value={stats.packages}
            loading={statsLoading}
            iconBg="bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30"
          />
          <StatCard
            icon={Bell}
            label="Total Enquiries"
            value={stats.enquiries}
            loading={statsLoading}
            iconBg="bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30"
          />
          <StatCard
            icon={BookOpen}
            label="Total Blogs"
            value={stats.blogs}
            loading={statsLoading}
            iconBg="bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30"
          />
          <StatCard
            icon={Calendar}
            label="Total Bookings"
            value={stats.booking}
            loading={statsLoading}
            iconBg="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30"
          />
          
        </div>

        {/* Quick Actions - Enhanced */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 hover:shadow-md transition-all duration-300 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 w-1.5 h-6 rounded-full"></span>
              Quick Actions
            </h2>
            <span className="text-[10px] text-slate-400 bg-slate-100 px-3 py-1 rounded-full font-medium">shortcuts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              href="/admin/packages/create"
              icon={PlusCircle}
              title="Create Package"
              subtitle="Add new package"
              color="blue"
              gradient="from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
              border="border-blue-200/50"
            />
            <QuickActionCard
              href="/admin/contents/create"
              icon={FileStack}
              title="Create Content"
              subtitle="Add new content page"
              color="emerald"
              gradient="from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100"
              border="border-emerald-200/50"
            />
            <QuickActionCard
              href="/admin/blogs/create"
              icon={PenTool}
              title="Write Blog"
              subtitle="Create new blog post"
              color="purple"
              gradient="from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100"
              border="border-purple-200/50"
            />
          </div>
        </div>

       

      </main>
    </div>
  );
}

// ========== SIDEBAR ITEM ==========
function SidebarItem({ icon: Icon, label, href, active = false, badge }) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm shadow-blue-500/10 border border-blue-200/50' 
          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/80'
        }
        group
      `}
    >
      <Icon size={20} className={`${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
          active 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
        } transition-colors`}>
          {badge}
        </span>
      )}
      {active && (
        <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30"></span>
      )}
    </Link>
  );
}

// ========== STAT CARD ==========
function StatCard({ icon: Icon, label, value, loading, iconBg }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          {loading ? (
            <div className="h-8 w-16 bg-slate-100 rounded-md animate-pulse mt-2"></div>
          ) : (
            <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon size={22} className="text-white" />
        </div>
      </div>
    </div>
  );
}

// ========== QUICK ACTION CARD ==========
function QuickActionCard({ href, icon: Icon, title, subtitle, color, gradient, border }) {
  const colorMap = {
    blue: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30",
    emerald: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30",
    purple: "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30",
  };

  return (
    <Link
      href={href}
      className={`group flex items-center justify-between bg-gradient-to-r ${gradient} border ${border} rounded-xl px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="font-medium text-slate-800 text-sm">{title}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}