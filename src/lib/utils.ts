import clsx, { type ClassValue } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';

/** Merge Tailwind class names (clsx wrapper) */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format cents to dollar string, e.g. 14900 → "$149.00" */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

/** Format cents to compact dollar, e.g. 14900 → "$149" */
export function formatCentsCompact(cents: number): string {
  const dollars = cents / 100;
  if (dollars >= 1000) {
    return `$${(dollars / 1000).toFixed(1)}k`;
  }
  return `$${Math.round(dollars)}`;
}

/** Format a date string to readable format, e.g. "Mar 5, 2026" */
export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'MMM d, yyyy');
}

/** Format a date string to short format, e.g. "3/5/26" */
export function formatDateShort(dateStr: string): string {
  return format(new Date(dateStr), 'M/d/yy');
}

/** Format a date string to relative, e.g. "2 hours ago" */
export function formatRelative(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}

/** Format a datetime, e.g. "Mar 5, 2026, 2:30 PM" */
export function formatDateTime(dateStr: string): string {
  return format(new Date(dateStr), 'MMM d, yyyy, h:mm a');
}

/** Compute percentage change between two values */
export function percentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Format order status for display */
export function formatStatus(status: string): string {
  return status
    .split('_')
    .map((word) => capitalize(word))
    .join(' ');
}
