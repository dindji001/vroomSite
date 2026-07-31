import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Cart, CartLineItem, Coupon } from "@/types/order";
import type { ID, Money } from "@/types";
import { STORAGE_KEYS } from "@/constants";
import { buildMoney, sumMoney } from "@/helpers";
import { cartApi } from "@/services/api";

type LineItemCreate = {
  kind: CartLineItem["kind"];
  vehicleId?: ID;
  productId?: ID;
  variantId?: ID;
  serviceId?: ID;
  name: string;
  sku?: string;
  imageUrl?: string;
  unitPrice: Money;
  quantity?: number;
  metadata?: Record<string, unknown>;
};

type Meta = {
  syncStatus: "idle" | "loading" | "error" | "success";
  initialized: boolean;
  lastSyncedAt: number | null;
  optimistic: boolean;
  applyingCoupon: boolean;
  error: string | null;
};

type Store = Omit<Cart, "items"> & {
  items: CartLineItem[];
  meta: Meta;

  init: () => Promise<void>;
  reset: () => void;
  sync: () => Promise<void>;

  addItem: (item: LineItemCreate) => Promise<{ ok: boolean; added: boolean }>;
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  clear: () => Promise<boolean>;

  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => Promise<boolean>;

  setShippingMethod: (method: Cart["shippingMethod"]) => void;
  setAddresses: (shippingId?: ID, billingId?: ID) => void;
  setPaymentMethod: (method: Cart["paymentMethod"]) => void;
  setNote: (note: string) => void;

  count: () => number;
  uniqueCount: () => number;
  findItemByRef: (ref: {
    productId?: ID;
    variantId?: ID;
    vehicleId?: ID;
    serviceId?: ID;
  }) => CartLineItem | undefined;

  recompute: () => void;
};

function initialState(): Omit<Cart, "items"> & { items: CartLineItem[] } {
  return {
    id: "",
    items: [],
    subtotal: buildMoney(0),
    discounts: buildMoney(0),
    shippingTotal: buildMoney(0),
    taxes: buildMoney(0),
    total: buildMoney(0),
    totalWeightGrams: 0,
    itemCount: 0,
    uniqueItemCount: 0,
    currency: "EUR",
    metadata: {},
  };
}

const initialMeta: Meta = {
  syncStatus: "idle",
  initialized: false,
  lastSyncedAt: null,
  optimistic: true,
  applyingCoupon: false,
  error: null,
};

export const useCartStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState(),
      meta: { ...initialMeta },

      init: async () => {
        try {
          const current = get();
          if (current.id) {
            const remote = await cartApi.get().catch(() => null);
            if (remote) {
              set({ ...remote });
            }
          }
        } finally {
          set({ meta: { ...get().meta, initialized: true } });
        }
      },

      reset: () => {
        set({ ...initialState(), meta: { ...initialMeta, initialized: true } });
      },

      sync: async () => {
        const { meta, ...rest } = get();
        set({ meta: { ...meta, syncStatus: "loading", error: null } });
        try {
          const remote = await cartApi.sync(rest);
          set({ ...remote, meta: { ...meta, syncStatus: "success", lastSyncedAt: Date.now() } });
        } catch (err: any) {
          set({ meta: { ...meta, syncStatus: "error", error: err?.message ?? "Synchronisation échouée" } });
        }
      },

      addItem: async (payload) => {
        const { items, currency, meta } = get();
        const quantity = payload.quantity ?? 1;
        const unit = payload.unitPrice;
        const currency_ = unit.currency ?? currency;

        const existing = items.find((i) => {
          if (payload.productId && payload.variantId) {
            return i.productId === payload.productId && i.variantId === payload.variantId;
          }
          if (payload.vehicleId) return i.vehicleId === payload.vehicleId;
          if (payload.serviceId) return i.serviceId === payload.serviceId;
          return false;
        });

        if (existing) {
          const updatedQty = existing.quantity + quantity;
          await get().updateQuantity(existing.id, updatedQty);
          return { ok: true, added: false };
        }

        const lineItem: CartLineItem = {
          id: `tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          kind: payload.kind,
          productId: payload.productId,
          variantId: payload.variantId,
          vehicleId: payload.vehicleId,
          serviceId: payload.serviceId,
          sku: payload.sku,
          name: payload.name,
          imageUrl: payload.imageUrl,
          quantity,
          unitPrice: { amount: unit.amount, currency: currency_ },
          totalPrice: { amount: unit.amount * quantity, currency: currency_ },
          addedAt: new Date().toISOString(),
          metadata: payload.metadata,
        };

        if (meta.optimistic) {
          const newItems = [...items, lineItem];
          set({ items: newItems });
          get().recompute();
        }

        try {
          const { items: _drop, ...rest } = get();
          const remote = await cartApi.addItem(lineItem, rest);
          set({ ...remote });
          return { ok: true, added: true };
        } catch (err: any) {
          set({
            meta: { ...meta, error: err?.message ?? "Ajout échoué" },
            items: meta.optimistic ? items : get().items,
          });
          if (meta.optimistic) get().recompute();
          return { ok: false, added: false };
        }
      },

      updateQuantity: async (itemId, quantity) => {
        const { items, meta } = get();
        const idx = items.findIndex((i) => i.id === itemId);
        if (idx === -1) return false;
        const qty = Math.max(1, quantity | 0);
        const updated = items.map((i, n) =>
          n === idx
            ? {
                ...i,
                quantity: qty,
                totalPrice: {
                  ...i.totalPrice,
                  amount: i.unitPrice.amount * qty,
                },
              }
            : i
        );
        if (meta.optimistic) {
          set({ items: updated });
          get().recompute();
        }
        try {
          const { items: _d, ...rest } = get();
          const remote = await cartApi.updateItem(itemId, qty, rest);
          set({ ...remote });
          return true;
        } catch {
          if (meta.optimistic) {
            set({ items });
            get().recompute();
          }
          return false;
        }
      },

      removeItem: async (itemId) => {
        const { items, meta } = get();
        const next = items.filter((i) => i.id !== itemId);
        if (meta.optimistic) {
          set({ items: next });
          get().recompute();
        }
        try {
          await cartApi.removeItem(itemId);
          return true;
        } catch {
          if (meta.optimistic) {
            set({ items });
            get().recompute();
          }
          return false;
        }
      },

      clear: async () => {
        try {
          await cartApi.clear();
        } finally {
          const state = initialState();
          set({ ...state, meta: { ...initialMeta, initialized: true } });
        }
        return true;
      },

      applyCoupon: async (code) => {
        set({ meta: { ...get().meta, applyingCoupon: true, error: null } });
        try {
          const remote = await cartApi.applyCoupon(code);
          set({ ...remote, meta: { ...get().meta, applyingCoupon: false } });
          return true;
        } catch (err: any) {
          set({
            meta: {
              ...get().meta,
              applyingCoupon: false,
              error: err?.message ?? "Code invalide",
            },
          });
          return false;
        }
      },

      removeCoupon: async () => {
        try {
          const remote = await cartApi.removeCoupon();
          set({ ...remote });
          return true;
        } catch {
          return false;
        }
      },

      setShippingMethod: (method) => set({ shippingMethod: method }),
      setAddresses: (shippingId, billingId) =>
        set({
          shippingAddressId: shippingId,
          billingAddressId: billingId,
        }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setNote: (note) => set({ note }),

      count: () =>
        get().items.reduce((acc, i) => acc + (Number.isFinite(i.quantity) ? i.quantity : 0), 0),

      uniqueCount: () => get().items.length,

      findItemByRef: ({ productId, variantId, vehicleId, serviceId }) =>
        get().items.find((i) => {
          if (productId && variantId) {
            return i.productId === productId && i.variantId === variantId;
          }
          if (productId) return i.productId === productId;
          if (vehicleId) return i.vehicleId === vehicleId;
          if (serviceId) return i.serviceId === serviceId;
          return false;
        }),

      recompute: () => {
        const { items, currency } = get();
        const subtotal = sumMoney(items.map((i) => i.totalPrice));
        const discounts = get().discounts ?? buildMoney(0);
        const shipping = get().shippingTotal ?? buildMoney(0);
        const taxes = get().taxes ?? buildMoney(0);
        const total = buildMoney(
          Math.max(
            0,
            subtotal.amount - discounts.amount + shipping.amount + taxes.amount
          ),
          subtotal.currency ?? currency
        );
        set({
          subtotal,
          total,
          itemCount: get().count(),
          uniqueItemCount: get().uniqueCount(),
          totalWeightGrams: items.reduce(
            (acc, i) => acc + ((i.metadata?.weightGrams as number) ?? 0) * i.quantity,
            0
          ),
        });
      },
    }),
    {
      name: STORAGE_KEYS.CART,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        id: s.id,
        items: s.items,
        subtotal: s.subtotal,
        discounts: s.discounts,
        shippingTotal: s.shippingTotal,
        taxes: s.taxes,
        total: s.total,
        itemCount: s.itemCount,
        uniqueItemCount: s.uniqueItemCount,
        couponCode: s.couponCode,
        couponId: s.couponId,
        shippingAddressId: s.shippingAddressId,
        billingAddressId: s.billingAddressId,
        shippingMethod: s.shippingMethod,
        paymentMethod: s.paymentMethod,
        currency: s.currency,
        note: s.note,
        metadata: s.metadata,
      }),
      version: 2,
    }
  )
);
