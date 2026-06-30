import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DestinationForm from "../components/DestinationForm";

export default function CreateDestinationPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/admin/destinations" className="hover:text-gray-600 transition-colors">
          Destinations
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-600">New Destination</span>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Add Destination</h1>
        <DestinationForm />
      </div>
    </div>
  );
}