import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import Destination from "@/models/Destination";

import { connectDB } from "@/lib/db";
import DestinationForm from "../../components/DestinationForm";

async function getDestination(id) {
  await connectDB();
  try {
    const dest = await Destination.findById(id).lean();
    if (!dest) return null;
    return { ...dest, _id: dest._id.toString() };
  } catch {
    return null;
  }
}

export default async function EditDestinationPage({ params }) {
   const { id } = await params; 
  const destination = await getDestination(id);
  if (!destination) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/admin/destinations" className="hover:text-gray-600 transition-colors">
          Destinations
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-600">{destination.name}</span>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Destination</h1>
        <DestinationForm destination={destination} />
      </div>
    </div>
  );
}