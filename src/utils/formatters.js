import { CURRENCY, LOCALE } from './constants';

export function formatDuration(seconds) {
  const total = Number(seconds);
  if (!Number.isFinite(total) || total < 0) return '--';
  const hours = Math.floor(total / 3600);
  const minutes = Math.round((total % 3600) / 60);
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function formatCurrency(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return '--';
  try {
    return new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 }).format(value);
  } catch {
    return `₹${Math.round(value).toLocaleString(LOCALE)}`;
  }
}

export function toAbsoluteMinutes(dateStr, timeStr) {
  const [h = 0, m = 0] = String(timeStr || '').split(':').map(Number);
  const [year, month, day] = String(dateStr || '').split('-').map(Number);
  if (!year || !month || !day) return (h || 0) * 60 + (m || 0);
  return Math.floor(Date.UTC(year, month - 1, day, h, m) / 60000);
}

export function minutesFromMidnight(timeStr) {
  const [h = 0, m = 0] = String(timeStr || '').split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}
