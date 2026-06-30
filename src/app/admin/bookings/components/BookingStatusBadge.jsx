"use client";

import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  AlertCircle,
  Loader2,
  Calendar,
  Ban,
  Hourglass,
  Timer
} from "lucide-react";
import { useState, useEffect } from "react";

// ============================================
// CONFIGURATION
// ============================================

const STATUS_CONFIG = {
  // Core statuses
  Pending: {
    label: "Pending",
    color: "amber",
    icon: Clock,
    description: "Awaiting confirmation",
    className: "bg-amber-50 text-amber-700 ring-amber-600/20",
    dotColor: "bg-amber-500",
    pulse: false,
    animation: "none",
  },
  Confirmed: {
    label: "Confirmed",
    color: "emerald",
    icon: CheckCircle,
    description: "Booking confirmed",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dotColor: "bg-emerald-500",
    pulse: false,
    animation: "none",
  },
  Paid: {
    label: "Paid",
    color: "emerald",
    icon: CheckCircle,
    description: "Payment received",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dotColor: "bg-emerald-500",
    pulse: false,
    animation: "none",
  },
  Processing: {
    label: "Processing",
    color: "blue",
    icon: Loader2,
    description: "Processing your booking",
    className: "bg-blue-50 text-blue-700 ring-blue-600/20",
    dotColor: "bg-blue-500",
    pulse: true,
    animation: "spin",
  },
  InProgress: {
    label: "In Progress",
    color: "blue",
    icon: Timer,
    description: "Currently active",
    className: "bg-blue-50 text-blue-700 ring-blue-600/20",
    dotColor: "bg-blue-500",
    pulse: false,
    animation: "none",
  },
  Completed: {
    label: "Completed",
    color: "indigo",
    icon: Calendar,
    description: "Successfully completed",
    className: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    dotColor: "bg-indigo-500",
    pulse: false,
    animation: "none",
  },
  Cancelled: {
    label: "Cancelled",
    color: "rose",
    icon: XCircle,
    description: "Cancelled by customer",
    className: "bg-rose-50 text-rose-700 ring-rose-600/20",
    dotColor: "bg-rose-500",
    pulse: false,
    animation: "none",
  },
  Refunded: {
    label: "Refunded",
    color: "sky",
    icon: RotateCcw,
    description: "Refund processed",
    className: "bg-sky-50 text-sky-700 ring-sky-600/20",
    dotColor: "bg-sky-500",
    pulse: false,
    animation: "none",
  },
  Failed: {
    label: "Failed",
    color: "red",
    icon: AlertCircle,
    description: "Payment or processing failed",
    className: "bg-red-50 text-red-700 ring-red-600/20",
    dotColor: "bg-red-500",
    pulse: false,
    animation: "none",
  },
  OnHold: {
    label: "On Hold",
    color: "orange",
    icon: Hourglass,
    description: "Awaiting action",
    className: "bg-orange-50 text-orange-700 ring-orange-600/20",
    dotColor: "bg-orange-500",
    pulse: false,
    animation: "none",
  },
  Expired: {
    label: "Expired",
    color: "gray",
    icon: Ban,
    description: "Booking expired",
    className: "bg-gray-50 text-gray-700 ring-gray-600/20",
    dotColor: "bg-gray-500",
    pulse: false,
    animation: "none",
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function BookingStatusBadge({ 
  status, 
  size = "md",
  showIcon = true,
  showLabel = true,
  showTooltip = false,
  clickable = false,
  onClick = null,
  animated = false,
  className = "",
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // --- Get status config ---
  const config = STATUS_CONFIG[status] || {
    label: status || "Unknown",
    color: "gray",
    icon: AlertCircle,
    description: "Unknown status",
    className: "bg-gray-50 text-gray-700 ring-gray-600/20",
    dotColor: "bg-gray-400",
    pulse: false,
    animation: "none",
  };

  const Icon = config.icon;

  // --- Size variants ---
  const sizeClasses = {
    sm: {
      padding: "px-2 py-0.5",
      text: "text-[10px]",
      gap: "gap-1",
      icon: "w-3 h-3",
      dot: "h-1 w-1",
    },
    md: {
      padding: "px-2.5 py-1",
      text: "text-xs",
      gap: "gap-1.5",
      icon: "w-3.5 h-3.5",
      dot: "h-1.5 w-1.5",
    },
    lg: {
      padding: "px-3.5 py-1.5",
      text: "text-sm",
      gap: "gap-2",
      icon: "w-4 h-4",
      dot: "h-2 w-2",
    },
    xl: {
      padding: "px-4 py-2",
      text: "text-base",
      gap: "gap-2.5",
      icon: "w-5 h-5",
      dot: "h-2.5 w-2.5",
    },
  };

  const sz = sizeClasses[size] || sizeClasses.md;

  // --- Animation classes ---
  const getAnimationClass = () => {
    if (!animated && !config.pulse) return "";
    if (config.animation === "spin") return "animate-spin";
    if (config.pulse) return "animate-pulse";
    return "";
  };

  // --- Click handler ---
  const handleClick = (e) => {
    if (clickable && onClick) {
      onClick(status, e);
    }
  };

  // --- Keyboard handler ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  // --- Tooltip content ---
  const tooltipContent = config.description;

  // --- Render ---
  return (
    <span
      className={`
        inline-flex items-center ${sz.gap}
        ${sz.padding}
        ${sz.text}
        font-medium
        rounded-full
        ring-1 ring-inset
        ${config.className}
        ${clickable ? "cursor-pointer hover:scale-105 transition-transform duration-200" : ""}
        ${isHovered ? "ring-2 shadow-sm" : ""}
        ${isFocused ? "ring-2 ring-offset-2 ring-blue-500" : ""}
        ${className}
        transition-all duration-200
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={clickable ? "button" : "status"}
      tabIndex={clickable ? 0 : undefined}
      aria-label={showLabel ? undefined : `${config.label} status`}
      title={showTooltip ? tooltipContent : undefined}
      {...props}
    >
      {/* Dot Indicator */}
      <span 
        className={`
          ${sz.dot}
          rounded-full
          ${config.dotColor}
          ${getAnimationClass()}
          transition-all duration-200
          ${isHovered ? "scale-125" : ""}
        `} 
        aria-hidden="true"
      />

      {/* Icon */}
      {showIcon && (
        <Icon 
          className={`
            ${sz.icon}
            ${getAnimationClass()}
            transition-all duration-200
            ${isHovered ? "scale-110" : ""}
          `}
          aria-hidden="true"
        />
      )}

      {/* Label */}
      {showLabel && (
        <span className="leading-none">
          {config.label}
        </span>
      )}

      {/* Badge count or additional indicator */}
      {props.count && (
        <span className="ml-0.5 text-[0.6em] opacity-75 font-normal">
          {props.count}
        </span>
      )}
    </span>
  );
}

// ============================================
// COMPOUND COMPONENTS
// ============================================

/**
 * Group of status badges for displaying multiple statuses
 */
export function StatusBadgeGroup({ statuses, ...props }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {statuses.map((status, index) => (
        <BookingStatusBadge
          key={index}
          status={status}
          {...props}
        />
      ))}
    </div>
  );
}

/**
 * Status badge with count and label
 */
export function StatusBadgeWithCount({ status, count, label, ...props }) {
  return (
    <div className="flex items-center gap-2">
      <BookingStatusBadge status={status} {...props} />
      <span className="text-sm text-gray-500">
        {count} {label || status}
      </span>
    </div>
  );
}

/**
 * Interactive status filter badge (toggleable)
 */
export function StatusFilterBadge({ 
  status, 
  isActive = false, 
  onChange,
  count = 0,
  ...props 
}) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;

  const handleClick = () => {
    if (onChange) {
      onChange(status, !isActive);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2
        px-3 py-1.5
        text-sm font-medium
        rounded-full
        border-2
        transition-all duration-200
        ${isActive 
          ? `border-${config.color}-500 bg-${config.color}-50 text-${config.color}-700` 
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
        }
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
    >
      <config.icon className={`w-4 h-4 ${isActive ? `text-${config.color}-500` : 'text-gray-400'}`} />
      <span>{config.label}</span>
      {count > 0 && (
        <span className={`
          text-xs font-medium px-2 py-0.5 rounded-full
          ${isActive ? `bg-${config.color}-200 text-${config.color}-800` : 'bg-gray-100 text-gray-600'}
        `}>
          {count}
        </span>
      )}
    </button>
  );
}

// ============================================
// STATUS MAPPING HELPERS
// ============================================

/**
 * Get color scheme for a status
 */
export function getStatusColor(status) {
  const config = STATUS_CONFIG[status];
  return config?.color || "gray";
}

/**
 * Get status label
 */
export function getStatusLabel(status) {
  const config = STATUS_CONFIG[status];
  return config?.label || status || "Unknown";
}

/**
 * Get status description
 */
export function getStatusDescription(status) {
  const config = STATUS_CONFIG[status];
  return config?.description || "No description available";
}

/**
 * Check if status is active/positive
 */
export function isPositiveStatus(status) {
  const positive = ["Paid", "Confirmed", "Completed", "InProgress"];
  return positive.includes(status);
}

/**
 * Check if status is warning/neutral
 */
export function isWarningStatus(status) {
  const warning = ["Pending", "Processing", "OnHold", "Refunded"];
  return warning.includes(status);
}

/**
 * Check if status is negative/error
 */
export function isNegativeStatus(status) {
  const negative = ["Cancelled", "Failed", "Expired"];
  return negative.includes(status);
}

// ============================================
// STATUS SUMMARY COMPONENT
// ============================================

export function BookingStatusSummary({ bookings = [], onStatusClick }) {
  const statusCounts = bookings.reduce((acc, booking) => {
    const status = booking.bookingStatus || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const total = bookings.length;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          Status:
        </span>
        <span className="text-sm text-gray-500">
          {total} total
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {Object.entries(statusCounts).map(([status, count]) => (
          <StatusFilterBadge
            key={status}
            status={status}
            count={count}
            isActive={false}
            onChange={onStatusClick}
          />
        ))}
      </div>
    </div>
  );
}