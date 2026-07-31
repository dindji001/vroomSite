export function formatDate(
  date: string | Date | number,
  locale = "fr-FR",
  options: Intl.DateTimeFormatOptions = {}
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (!Number.isFinite(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(d);
}

export function formatDateTime(
  date: string | Date | number,
  locale = "fr-FR"
): string {
  return formatDate(date, locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(
  date: string | Date | number,
  locale = "fr-FR",
  withSeconds = false
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined,
  }).format(d);
}

export function formatRelativeTime(
  date: string | Date | number,
  locale = "fr-FR"
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (!Number.isFinite(d.getTime())) return "";
  const now = new Date();
  const diffSeconds = Math.round((now.getTime() - d.getTime()) / 1000);
  const abs = Math.abs(diffSeconds);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const sign = diffSeconds < 0 ? 1 : -1;

  if (abs < 60) return rtf.format(sign * Math.round(abs), "second");
  if (abs < 3600) return rtf.format(sign * Math.round(abs / 60), "minute");
  if (abs < 86400) return rtf.format(sign * Math.round(abs / 3600), "hour");
  if (abs < 86400 * 30) return rtf.format(sign * Math.round(abs / 86400), "day");
  if (abs < 86400 * 365) return rtf.format(sign * Math.round(abs / (86400 * 30)), "month");
  return rtf.format(sign * Math.round(abs / (86400 * 365)), "year");
}

export function formatDateRange(
  start: string | Date | number,
  end?: string | Date | number,
  locale = "fr-FR"
): string {
  const s = formatDate(start, locale);
  if (!end) return `À partir du ${s}`;
  const e = formatDate(end, locale);
  if (s === e) return `Le ${s}`;
  return `Du ${s} au ${e}`;
}

export function formatDurationMinutes(totalMinutes: number, locale = "fr-FR"): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return "0 min";
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  if (h === 0) return `${m} min`;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });
  if (m === 0) return `${h} h`;
  return `${h} h ${rtf.format(m, "minute").replace(/[^0-9min]/g, "").trim()}`;
}

export function formatDurationSeconds(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "0s";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (h === 0 && m === 0) return `${s}s`;
  if (h === 0) return `${m}m ${pad(s)}s`;
  return `${h}h ${pad(m)}m ${pad(s)}s`;
}

export function isSameDay(a: string | Date | number, b: string | Date | number): boolean {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}

export function isToday(date: string | Date | number): boolean {
  return isSameDay(date, new Date());
}

export function isYesterday(date: string | Date | number): boolean {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(d, yesterday);
}

export function isTomorrow(date: string | Date | number): boolean {
  const d = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return isSameDay(d, tomorrow);
}

export function isDateExpired(date: string | Date | number | undefined | null): boolean {
  if (!date) return false;
  return new Date(date).getTime() < Date.now();
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

export function daysBetween(a: string | Date | number, b: string | Date | number): number {
  const ms = Math.abs(new Date(a).getTime() - new Date(b).getTime());
  return Math.round(ms / 86_400_000);
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function getMonthsBetween(
  start: string | Date | number,
  end: string | Date | number
): { year: number; month: number }[] {
  const s = startOfMonth(new Date(start));
  const e = endOfMonth(new Date(end));
  const months: { year: number; month: number }[] = [];
  let cursor = new Date(s);
  while (cursor <= e) {
    months.push({ year: cursor.getFullYear(), month: cursor.getMonth() });
    cursor = addMonths(cursor, 1);
  }
  return months;
}

export function toISO(date: string | Date | number): string {
  return new Date(date).toISOString();
}

export function getTimestampSeconds(): number {
  return Math.floor(Date.now() / 1000);
}
