import type { Currency, Money } from "@/types";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  XOF: "FCFA",
  EUR: "€",
  USD: "$",
  GBP: "£",
  CHF: "CHF",
};

export const CURRENCY_POSITION: Record<Currency, "before" | "after"> = {
  XOF: "after",
  EUR: "after",
  USD: "before",
  GBP: "before",
  CHF: "before",
};

export function formatCurrency(
  amount: number,
  currency: Currency = "XOF",
  locale: string = "fr-FR",
  options: Intl.NumberFormatOptions = {}
): string {
  if (!Number.isFinite(amount)) amount = 0;
  const position = CURRENCY_POSITION[currency];
  const result = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);

  if (position === "after" && (currency === "EUR" || currency === "XOF")) {
    const symbol = currency === "XOF" ? "FCFA" : "€";
    return result.replace(currency, symbol).replace(new RegExp(symbol), ` ${symbol}`).replace(new RegExp(`\\s${symbol}`), ` ${symbol}`);
  }
  return result;
}

export function formatMoney(
  money: Money,
  locale: string = "fr-FR",
  options: Intl.NumberFormatOptions = {}
): string {
  return formatCurrency(money.amount, money.currency as Currency, locale, options);
}

export function parseCurrency(value: string): number {
  const digits = value.replace(/[^\d.,-]/g, "").replace(",", ".");
  const parsed = parseFloat(digits);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatNumber(
  value: number,
  locale: string = "fr-FR",
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCompactNumber(value: number, locale: string = "fr-FR"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(
  value: number,
  locale: string = "fr-FR",
  digits = 0
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value / 100);
}

export function formatInteger(value: number, locale: string = "fr-FR"): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatKm(km: number, locale = "fr-FR"): string {
  if (!Number.isFinite(km)) km = 0;
  return `${formatInteger(km, locale)} km`;
}

export function formatLiters(liters: number, locale = "fr-FR"): string {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(liters)} L`;
}

export function formatL100km(l: number, locale = "fr-FR"): string {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(l)} L/100km`;
}

export function formatKwh(kw: number, locale = "fr-FR"): string {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(kw)} kWh`;
}

export function formatWl100km(wh: number, locale = "fr-FR"): string {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(wh)} Wh/km`;
}

export function formatPowerHp(hp: number): string {
  return `${hp} ch`;
}

export function formatPowerKw(kw: number): string {
  return `${kw} kW`;
}

export function formatEngineCc(cc: number, locale = "fr-FR"): string {
  if (cc >= 1000) {
    const l = cc / 1000;
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(l)} L`;
  }
  return `${cc} cm³`;
}

export function formatCo2(gr: number): string {
  return `${gr} g/km CO₂`;
}

export function formatWeight(kg: number, locale = "fr-FR"): string {
  if (kg >= 1000) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(kg / 1000)} t`;
  }
  return `${formatInteger(kg, locale)} kg`;
}

export function formatDimensionMm(mm: number, locale = "fr-FR"): string {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(mm / 10)} cm`;
}

export function formatBootVolume(liters: number): string {
  return `${liters} L`;
}

export function formatDimensionCm(cm: number): string {
  return `${cm} cm`;
}

export function formatSpeedKmh(kmh: number): string {
  return `${kmh} km/h`;
}

export function formatAcceleration(s: number): string {
  return `${s.toFixed(1)} s`;
}

export function formatYear(year: number): string {
  return `${year}`;
}

export function formatDoors(d: number): string {
  return `${d} portes`;
}

export function formatSeats(s: number): string {
  return `${s} places`;
}

export function calculateDiscountPercent(original: number, sale: number): number {
  if (!original || original <= 0) return 0;
  return Math.max(0, Math.round(((original - sale) / original) * 100));
}

export function calculateSavings(original: number, sale: number): number {
  return Math.max(0, original - sale);
}

export function addTax(amount: number, rate: number): number {
  return amount * (1 + rate);
}

export function removeTax(amount: number, rate: number): number {
  return amount / (1 + rate);
}

export function extractTaxAmount(amountWithTax: number, rate: number): number {
  if (!rate) return 0;
  return amountWithTax - removeTax(amountWithTax, rate);
}

export function sumMoney(items: Money[]): Money {
  if (items.length === 0) return { amount: 0, currency: "XOF" };
  const currency = items[0].currency;
  const amount = items.reduce((sum, m) => {
    if (m.currency !== currency) {
      console.warn(
        `[sumMoney] Mismatched currencies found (${m.currency} !== ${currency}) — ignoring rate.`
      );
    }
    return sum + (Number.isFinite(m.amount) ? m.amount : 0);
  }, 0);
  return { amount, currency };
}
