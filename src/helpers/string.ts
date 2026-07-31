export function slugify(input: string): string {
  if (!input) return "";
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 120);
}

export function truncate(str: string, length = 140, suffix = "…"): string {
  if (!str) return "";
  if (str.length <= length) return str;
  const cut = str.slice(0, length - suffix.length);
  const lastSpace = cut.lastIndexOf(" ");
  const end = lastSpace > length * 0.6 ? lastSpace : cut.length;
  return cut.slice(0, end).replace(/\s+$/, "") + suffix;
}

export function truncateWords(str: string, count = 25, suffix = "…"): string {
  if (!str) return "";
  const words = str.trim().split(/\s+/);
  if (words.length <= count) return str;
  return words.slice(0, count).join(" ") + suffix;
}

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function titleCase(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email;
  const [local, domain] = email.split("@");
  const maskedLocal =
    local.length <= 2
      ? `${local[0]}${"*".repeat(local.length - 1)}`
      : `${local[0]}${"*".repeat(Math.max(local.length - 2, 2))}${local.at(-1)}`;
  return `${maskedLocal}@${domain}`;
}

export function maskPhone(phone: string): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return "*".repeat(digits.length);
  const prefix = digits.slice(0, 2);
  const suffix = digits.slice(-2);
  const masked = digits.slice(2, -2).replace(/\d/g, "*");
  return `${prefix}${masked}${suffix}`;
}

export function maskCardNumber(last4: string, separator = " "): string {
  if (!last4) return "";
  return `****${separator}****${separator}****${separator}${last4.padStart(4, "•").slice(-4)}`;
}

export function maskVin(vin: string): string {
  if (!vin) return "";
  if (vin.length <= 8) return vin;
  return `${vin.slice(0, 3)}********${vin.slice(-4)}`;
}

export function initials(name: string, limit = 2): string {
  if (!name) return "";
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, limit)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
}

export function nl2br(str: string): string {
  return str.replace(/\r?\n/g, "<br/>");
}

export function pluralize(
  count: number,
  singular: string,
  plural?: string,
  includeCount = true
): string {
  const word = count <= 1 ? singular : plural ?? `${singular}s`;
  return includeCount ? `${count} ${word}` : word;
}

export function cleanWhitespace(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

export function normalizeSpaces(str: string): string {
  return str
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function toAlphaNumeric(str: string, separator = "-"): string {
  return str
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, separator)
    .replace(new RegExp(`${separator}{2,}`, "g"), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), "");
}

export function generateRandomString(length = 12, chars?: string): string {
  const charset =
    chars ?? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  const crypto =
    typeof window !== "undefined" ? window.crypto : (globalThis as any).crypto;
  if (crypto?.getRandomValues && typeof Uint8Array === "function") {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < length; i++) {
      out += charset[bytes[i] % charset.length];
    }
    return out;
  }
  for (let i = 0; i < length; i++) {
    out += charset[Math.floor(Math.random() * charset.length)];
  }
  return out;
}

export function generateCode(length = 8, uppercase = true): string {
  const s = generateRandomString(length, "ABCDEFGHJKLMNPQRSTUVWXYZ23456789");
  return uppercase ? s.toUpperCase() : s.toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  if (!value) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidFrenchPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return /^(?:0|(?:\+|00)33\s?0?)[1-9]\d{8}$/.test(digits);
}

export function isValidFrenchPostal(value: string): boolean {
  return /^\d{5}$/.test(value.replace(/\s/g, ""));
}

export function isValidFrenchSiret(value: string): boolean {
  return /^\d{14}$/.test(value.replace(/\s/g, ""));
}

export function isValidUrl(value: string, protocols = ["https:", "http:"]): boolean {
  try {
    const u = new URL(value);
    return protocols.includes(u.protocol);
  } catch {
    return false;
  }
}

export function isValidVin(vin: string): boolean {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin.toUpperCase().trim());
}

export function isValidLicensePlate(value: string, country = "FR"): boolean {
  const normalized = value.replace(/[\s-]/g, "").toUpperCase();
  if (country === "FR") {
    return (
      /^[A-Z]{2}\d{3}[A-Z]{2}$/.test(normalized) ||
      /^\d{1,4}\s?[A-Z]{1,3}\s?\d{2,3}$/.test(value.toUpperCase())
    );
  }
  return normalized.length >= 4 && normalized.length <= 12;
}

export function isValidIban(value: string): boolean {
  return /^[A-Z]{2}\d{2}[A-Z0-9]{12,30}$/.test(value.replace(/\s/g, "").toUpperCase());
}

export function isValidBic(value: string): boolean {
  return /^[A-Z]{4}[A-Z]{2}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$/.test(
    value.replace(/\s/g, "").toUpperCase()
  );
}

export function isValueInEnum<T extends Record<string, string>>(
  enumObj: T,
  value: unknown
): value is T[keyof T] {
  return Object.values(enumObj).includes(value as T[keyof T]);
}
