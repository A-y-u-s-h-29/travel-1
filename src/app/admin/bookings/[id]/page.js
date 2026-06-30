"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BookingStatusBadge from "../components/BookingStatusBadge";
import PaymentStatusBadge from "../components/PaymentStatusBadge";
import DeleteModal from "../components/DeleteModal";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Package, 
  Users, 
  DollarSign, 
  CreditCard, 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Save,
  Trash2,
  Edit,
  ChevronRight,
  Building,
  MapPin,
  CalendarDays,
  Receipt,
  Loader2,
  Link2
} from "lucide-react";

const BOOKING_STATUSES = ["Pending", "Paid", "Cancelled", "Refunded"];
const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount, currency) {
  if (amount === undefined || amount === null) return "—";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency || ""} ${amount}`.trim();
  }
}

export default function BookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusDraft, setStatusDraft] = useState({ bookingStatus: "", paymentStatus: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/booking/${id}`);
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load booking.");
        }

        if (isMounted) {
          setBooking(json.data);
          setStatusDraft({
            bookingStatus: json.data.bookingStatus,
            paymentStatus: json.data.paymentStatus,
          });
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Something went wrong.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (id) load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const hasStatusChanges =
    booking &&
    (statusDraft.bookingStatus !== booking.bookingStatus ||
      statusDraft.paymentStatus !== booking.paymentStatus);

  const handleSaveStatus = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statusDraft),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update booking.");
      }

      setBooking(json.data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.message || "Failed to update booking.");
      setTimeout(() => setSaveError(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/booking/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to delete booking.");
      }

      router.push("/admin/bookings");
    } catch (err) {
      setError(err.message || "Failed to delete booking.");
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="h-6 w-48 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-5 w-32 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="space-y-2">
                        <div className="h-3 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
                        <div className="h-5 w-32 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <Link 
            href="/admin/bookings" 
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to bookings
          </Link>
          <div className="mt-6 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 px-6 py-5 flex items-start gap-4 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/admin/bookings" className="hover:text-gray-700 transition-colors">
            Bookings
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-700 font-medium truncate">{booking.bookingId}</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm">
                <Receipt className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {booking.bookingId}
                  </h1>
                  <BookingStatusBadge status={booking.bookingStatus} />
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Created {formatDateTime(booking.createdAt)}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <PaymentStatusBadge status={booking.paymentStatus} />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 px-5 py-4 flex items-start gap-3 animate-in fade-in duration-200 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-100"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Customer Information */}
        <Section title="Customer Information" icon={User}>
          <Field icon={User} label="Name" value={booking.customerName} />
          <Field icon={Mail} label="Email" value={booking.email} />
          <Field icon={Phone} label="Phone" value={booking.phone} />
        </Section>

        {/* Trip Details */}
        <Section title="Trip Details" icon={Calendar}>
          <Field icon={Package} label="Package" value={booking.packageId?.name || "—"} />
         
          <Field icon={Users} label="Travelers (PAX)" value={booking.travelers} />
          <Field icon={DollarSign} label="Amount" value={formatAmount(booking.amount, booking.currency)} highlight />
          <Field icon={Building} label="Currency" value={booking.currency} />
        </Section>

        {/* Booking Lifecycle - Editable */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-blue-50">
                <Edit className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Booking Lifecycle</h2>
              {hasStatusChanges && (
                <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-medium border border-amber-200">
                  Unsaved changes
                </span>
              )}
            </div>
            {saveSuccess && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 animate-in fade-in">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Updated successfully</span>
              </div>
            )}
            {saveError && (
              <div className="flex items-center gap-2 text-sm text-red-600 animate-in fade-in">
                <AlertCircle className="w-4 h-4" />
                <span>{saveError}</span>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Current Statuses */}
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Current Status
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Booking</p>
                    <BookingStatusBadge status={booking.bookingStatus} size="md" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Payment</p>
                    <PaymentStatusBadge status={booking.paymentStatus} size="md" />
                  </div>
                </div>
              </div>

              {/* Update Statuses */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="bookingStatus" className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                    Update Booking Status
                  </label>
                  <select
                    id="bookingStatus"
                    value={statusDraft.bookingStatus}
                    onChange={(e) =>
                      setStatusDraft((prev) => ({ ...prev, bookingStatus: e.target.value }))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm hover:shadow"
                  >
                    {BOOKING_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="paymentStatus" className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                    Update Payment Status
                  </label>
                  <select
                    id="paymentStatus"
                    value={statusDraft.paymentStatus}
                    onChange={(e) =>
                      setStatusDraft((prev) => ({ ...prev, paymentStatus: e.target.value }))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm hover:shadow"
                  >
                    {PAYMENT_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveStatus}
              disabled={!hasStatusChanges || isSaving}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Status Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Payment Gateway & Linked Records */}
        <Section title="Payment Gateway & Linked Records" icon={CreditCard}>
          <Field icon={FileText} label="Gateway Order ID" value={booking.gatewayOrderId || "—"} />
          <Field icon={CreditCard} label="Gateway Payment ID" value={booking.gatewayPaymentId || "—"} />
          <Field icon={Receipt} label="Invoice ID" value={booking.invoiceId || "—"} />
          <Field icon={Link2} label="Lead ID" value={booking.leadId || "—"} />
        </Section>

        {/* Timestamps */}
        <Section title="Timestamps" icon={Clock}>
          <Field icon={Clock} label="Created At" value={formatDateTime(booking.createdAt)} />
          <Field icon={Clock} label="Updated At" value={formatDateTime(booking.updatedAt)} />
        </Section>
      </div>

      <DeleteModal
        booking={showDeleteModal ? booking : null}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

// ============================================
// SECTION COMPONENT
// ============================================

function Section({ title, icon: Icon, children }) {
  return (
    <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-blue-50">
              <Icon className="w-4 h-4 text-blue-600" />
            </div>
          )}
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// ============================================
// FIELD COMPONENT
// ============================================

function Field({ label, value, icon: Icon, highlight = false }) {
  return (
    <div className={`group ${highlight ? 'sm:col-span-2' : ''}`}>
      <div className="flex items-center gap-2 mb-1.5">
        {Icon && (
          <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        )}
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p className={`text-sm ${highlight ? 'text-2xl font-bold text-gray-900' : 'text-gray-900'}`}>
        {value ?? "—"}
      </p>
      {highlight && (
        <div className="mt-1 h-0.5 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
}