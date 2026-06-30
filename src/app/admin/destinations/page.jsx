import Link from "next/link";
import { Plus, MapPin, Globe, Hash, CheckCircle } from "lucide-react";

import Destination from "@/models/Destination";
import DestinationTable from "./components/DestinationTable";
import { connectDB } from "@/lib/db";

async function getDestinations() {
  await connectDB();
  return Destination.find({}).sort({ order: 1, name: 1 }).lean();
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  // Convert _id to string for client components
  const data = destinations.map((d) => ({ ...d, _id: d._id.toString() }));

  const activeCount = data.filter(d => d.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Destinations</h1>
                <p className="text-blue-100 text-sm mt-0.5">
                  Manage your travel destinations and locations
                </p>
              </div>
            </div>
            <Link
              href="/admin/destinations/create"
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-blue-600 bg-white rounded-xl hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Destination
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Destinations</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{data.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Destinations</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{activeCount}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Inactive</p>
                <p className="text-2xl font-bold text-gray-400 mt-1">{data.length - activeCount}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <Globe className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                  <Hash className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">All Destinations</h2>
                  <p className="text-xs text-gray-500">
                    {data.length} destination{data.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  Sorted by order
                </span>
              </div>
            </div>
          </div>
          <DestinationTable destinations={data} />
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-gray-400">
          Used in package dropdowns and destination selection
        </div>
      </div>
    </div>
  );
}