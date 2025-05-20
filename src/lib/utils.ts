
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(time: string): string {
  if (!time) return '';
  // Convert 24-hour format to 12-hour format
  // Example: "14:30" to "2:30 PM"
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${minutes} ${ampm}`;
}

export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  // Format: +91 98765 43210
  if (phone.startsWith('+')) {
    const countryCode = phone.substring(0, 3);
    const firstPart = phone.substring(3, 8);
    const secondPart = phone.substring(8);
    return `${countryCode} ${firstPart} ${secondPart}`;
  }
  return phone;
}

// Helper for truncating text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

// Generate a random avatar URL based on the name
export function getAvatarUrl(name: string): string {
  if (!name) return 'https://ui-avatars.com/api/?background=random';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
}
