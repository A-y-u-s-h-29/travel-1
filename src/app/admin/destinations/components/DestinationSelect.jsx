"use client";
import { useState, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";

export default function DestinationSelect({ value, onChange, required = false }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/destinations?active=true")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setDestinations(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        <MapPin className="w-4 h-4 inline mr-1 -mt-0.5" />
        Main Destination
      </label>

      {loading ? (
        <div className="w-full border border-gray-300 rounded-xl px-4 py-3 flex items-center gap-2 text-gray-400 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </div>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
        >
          <option value="">— Select destination —</option>
          {destinations.map((d) => (
            <option key={d._id} value={d.name}>
              {d.name}{d.state ? `, ${d.state}` : ""}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}