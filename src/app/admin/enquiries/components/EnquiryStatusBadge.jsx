export default function EnquiryStatusBadge({ status }) {
  const styles = {
    new: "bg-[#dbeafe] text-[#1a5a9a] border border-[#b8d4f0]",
    contacted: "bg-[#e0f2fe] text-[#0e6a9a] border border-[#b8ddf0]",
    converted: "bg-[#d1e8ff] text-[#0a4a7a] border border-[#a8d0f0]",
    closed: "bg-[#e8edf2] text-[#4a6a8a] border border-[#d0d8e0]",
  };

  const labels = {
    new: "New",
    contacted: "Contacted",
    converted: "Converted",
    closed: "Closed",
  };

  // Icon mapping for visual enhancement
  const icons = {
    new: "●",
    contacted: "◐",
    converted: "✓",
    closed: "○",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105 ${
        styles[status] || "bg-[#f0f4f9] text-[#4a6a8a] border border-[#dce6f0]"
      }`}
    >
      <span className="text-[10px] opacity-75">{icons[status] || "•"}</span>
      {labels[status] || status}
    </span>
  );
}