"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Package, 
  MessageSquare, 
  RefreshCw,
  Copy,
  Send,
  User,
  Clock,
  Globe
} from "lucide-react";

import EnquiryStatusBadge from "../components/EnquiryStatusBadge";

export default function ViewEnquiryPage() {
  const { id } = useParams();

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const res = await fetch(`/api/enquiries/${id}`);
        const data = await res.json();

        if (data.success) {
          setEnquiry(data.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    setUpdating(true);

    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        setEnquiry(data.data);
      } else {
        alert(data.message);
      }
    } finally {
      setUpdating(false);
    }
  };

  // Email Handler
  const handleSendEmail = () => {
    if (!enquiry?.email) {
      alert("No email address found for this enquiry.");
      return;
    }

    const subject = encodeURIComponent(
      `Enquiry regarding ${enquiry.packageName || 'our services'}`
    );
    const body = encodeURIComponent(
      `Dear ${enquiry.name},\n\n` +
      `Thank you for your enquiry regarding ${enquiry.packageName || 'our services'}. ` +
      `We have received your message and would like to discuss further.\n\n` +
      `We will get back to you shortly with more details.\n\n` +
      `Best regards,\n` +
      `[Your Company Name]\n` +
      `[Your Contact Information]`
    );
    
    window.location.href = `mailto:${enquiry.email}?subject=${subject}&body=${body}`;
    
    // Show feedback
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  // Call Handler
  const handleMakeCall = () => {
    if (!enquiry?.phone) {
      alert("No phone number found for this enquiry.");
      return;
    }

    const cleanPhone = enquiry.phone.replace(/[\s\-()]/g, '');
    
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `tel:${cleanPhone}`;
    } else {
      const confirmCall = confirm(
        `Call ${enquiry.name} at ${enquiry.phone}?\n\n` +
        `Click "OK" to call using your default phone app (if available).`
      );
      
      if (confirmCall) {
        window.location.href = `tel:${cleanPhone}`;
      }
    }
  };

  // Copy Phone to Clipboard
  const handleCopyPhone = () => {
    if (!enquiry?.phone) return;
    
    navigator.clipboard.writeText(enquiry.phone)
      .then(() => {
        alert(`Phone number ${enquiry.phone} copied to clipboard!`);
      })
      .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = enquiry.phone;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert(`Phone number ${enquiry.phone} copied to clipboard!`);
      });
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-[#1a5a9a]" />
          <p className="text-sm text-[#4a6a8a]">Loading enquiry details...</p>
        </div>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-[#f0f4f9] p-4">
          <MessageSquare className="h-8 w-8 text-[#4a6a8a]" />
        </div>
        <h2 className="text-xl font-semibold text-[#0a2a4a]">Enquiry Not Found</h2>
        <p className="text-sm text-[#4a6a8a]">The enquiry you're looking for doesn't exist.</p>
        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1a5a9a] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#0e4a7a] shadow-sm shadow-blue-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Enquiries
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f9] p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0a2a4a]">
              Enquiry Details
            </h1>
            <p className="mt-1 text-sm text-[#4a6a8a]">
              View and manage enquiry #{enquiry.id || id}
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-2 rounded-xl border border-[#d0dce8] bg-white px-4 py-2.5 text-sm font-medium text-[#0a2a4a] transition-all hover:bg-[#f5f8fc] hover:border-[#b0c8d8] hover:shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Enquiries
          </Link>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-[#dce6f0] bg-white p-6 shadow-sm transition-all hover:shadow-md">
          {/* Header with Name and Status */}
          <div className="flex flex-col gap-4 border-b border-[#e8edf2] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#dbeafe] p-2">
                  <User className="h-5 w-5 text-[#1a5a9a]" />
                </div>
                <h2 className="text-2xl font-semibold text-[#0a2a4a]">
                  {enquiry.name}
                </h2>
              </div>
              <p className="mt-1 ml-11 text-sm text-[#4a6a8a]">
                Enquiry ID: <span className="font-medium text-[#0a2a4a]">{enquiry.id || id}</span>
              </p>
            </div>
            <EnquiryStatusBadge status={enquiry.status} />
          </div>

          {/* Contact Information Grid */}
          <div className="grid gap-5 border-b border-[#e8edf2] py-5 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[#f8faff]">
              <div className="rounded-lg bg-[#dbeafe] p-2.5">
                <Mail className="h-4 w-4 text-[#1a5a9a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-[#4a6a8a]">
                  Email
                </p>
                <p className="font-medium text-[#0a2a4a] truncate">{enquiry.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[#f8faff]">
              <div className="rounded-lg bg-[#dbeafe] p-2.5">
                <Phone className="h-4 w-4 text-[#1a5a9a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-[#4a6a8a]">
                  Phone
                </p>
                <p className="font-medium text-[#0a2a4a]">
                  {enquiry.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[#f8faff]">
              <div className="rounded-lg bg-[#dbeafe] p-2.5">
                <Clock className="h-4 w-4 text-[#1a5a9a]" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#4a6a8a]">
                  Date Received
                </p>
                <p className="font-medium text-[#0a2a4a]">
                  {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[#f8faff]">
              <div className="rounded-lg bg-[#dbeafe] p-2.5">
                <Globe className="h-4 w-4 text-[#1a5a9a]" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#4a6a8a]">
                  Source
                </p>
                <p className="font-medium text-[#0a2a4a]">{enquiry.source || "Website"}</p>
              </div>
            </div>
          </div>

          {/* Package Name (if exists) */}
          {enquiry.packageName && (
            <div className="border-b border-[#e8edf2] py-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-[#1a5a9a]" />
                <p className="text-xs font-medium uppercase tracking-wider text-[#4a6a8a]">
                  Package
                </p>
              </div>
              <p className="mt-1 font-medium text-[#0a2a4a] ml-6">{enquiry.packageName}</p>
            </div>
          )}

          {/* Message */}
          <div className="border-b border-[#e8edf2] py-5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#1a5a9a]" />
              <p className="text-xs font-medium uppercase tracking-wider text-[#4a6a8a]">
                Message
              </p>
            </div>
            <div className="mt-2 rounded-xl bg-gradient-to-br from-[#f8faff] to-[#f0f6fe] p-4 text-sm leading-relaxed text-[#0a2a4a] border border-[#e8edf2]">
              {enquiry.message || "No message provided."}
            </div>
          </div>

          {/* Status Update */}
          <div className="pt-5">
            <label className="block text-sm font-medium text-[#0a2a4a] mb-2">
              Update Status
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                value={enquiry.status}
                onChange={handleStatusChange}
                disabled={updating}
                className="flex-1 rounded-xl border border-[#dce6f0] bg-[#fafcfe] px-4 py-2.5 pr-10 text-sm text-[#0a2a4a] outline-none transition-all focus:border-[#1a5a9a] focus:ring-2 focus:ring-blue-100 disabled:opacity-50 appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234a6a8a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="new">🟢 New</option>
                <option value="contacted">🟡 Contacted</option>
                <option value="converted">🔵 Converted</option>
                <option value="closed">⚪ Closed</option>
              </select>

              {updating && (
                <span className="flex items-center gap-2 text-sm text-[#4a6a8a]">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Updating...
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-[#4a6a8a]">
              Current status: <span className="font-medium text-[#0a2a4a]">{enquiry.status}</span>
            </p>
          </div>
        </div>

        {/* Quick Actions - Enhanced Design */}
        <div className="flex flex-wrap gap-3">
       

          {/* Call Button */}
          <button
            onClick={handleMakeCall}
            disabled={!enquiry.phone}
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0e6a9a] to-[#0a5a8a] px-5 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </button>

          {/* Copy Phone Button */}
          {enquiry.phone && (
            <button
              onClick={handleCopyPhone}
              className="inline-flex items-center gap-2.5 rounded-xl border-2 border-[#d0dce8] bg-white px-5 py-3 text-sm font-medium text-[#0a2a4a] transition-all hover:bg-[#f5f8fc] hover:border-[#1a5a9a] hover:shadow-sm"
            >
              <Copy className="h-4 w-4" />
              Copy Phone
            </button>
          )}

          {/* Quick Action Divider/Note */}
          <div className="w-full mt-2 flex items-center gap-2">
            <div className="h-px flex-1 bg-[#dce6f0]"></div>
            <span className="text-xs text-[#4a6a8a]">Quick Actions</span>
            <div className="h-px flex-1 bg-[#dce6f0]"></div>
          </div>
        </div>

        {/* Enquiry Timeline / Activity (Optional Enhancement) */}
        <div className="rounded-2xl border border-[#dce6f0] bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0a2a4a] mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#1a5a9a]" />
            Activity Timeline
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#1a5a9a]"></div>
              <div>
                <p className="text-sm text-[#0a2a4a]">Enquiry created</p>
                <p className="text-xs text-[#4a6a8a]">
                  {new Date(enquiry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {enquiry.status === 'contacted' && (
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-[#0e6a9a]"></div>
                <div>
                  <p className="text-sm text-[#0a2a4a]">Contacted customer</p>
                  <p className="text-xs text-[#4a6a8a]">Status updated to Contacted</p>
                </div>
              </div>
            )}
            {enquiry.status === 'converted' && (
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-[#0a4a7a]"></div>
                <div>
                  <p className="text-sm text-[#0a2a4a]">Enquiry converted</p>
                  <p className="text-xs text-[#4a6a8a]">Customer converted successfully</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}