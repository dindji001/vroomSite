import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Wishlist, WishlistItem, User, ID } from "@/types";
import { STORAGE_KEYS } from "@/constants";
import { wishlistApi } from "@/services/api";

type Store = {
  lists: Wishlist[];
  activeListId: ID | null;
  loading: boolean;
  initialized: boolean;
  syncing: boolean;
  error: string | null;

  init: (user?: User | null) => Promise<void>;
  reset: () => void;

  createList: (data: Partial<Wishlist> & { name: string }) => Promise<Wishlist | null>;
  removeList: (listId: ID) => Promise<boolean>;
  renameList: (listId: ID, name: string) => Promise<boolean>;
  setActiveList: (listId: ID) => void;

  has: (item: Pick<WishlistItem, "kind" | "vehicleId" | "productId" | "variantId">) => boolean;
  getActiveList: () => Wishlist | undefined;
  count: () => number;
  allItemIds: (kind: WishlistItem["kind"]) => ID[];

  addItem: (
    item: Omit<WishlistItem, "id" | "wishlistId" | "addedAt"> & { listId?: ID }
  ) => Promise<boolean>;
  removeItem: (listId: ID, itemId: ID) => Promise<boolean>;
  toggleItem: (
    item: Omit<WishlistItem, "id" | "wishlistId" | "addedAt"> & { listId?: ID }
  ) => Promise<boolean>;
  updateItem: (
    listId: ID,
    itemId: ID,
    patch: Partial<Pick<WishlistItem, "priority" | "addedNote" | "quantity">>
  ) => Promise<boolean>;
  moveItem: (
    fromListId: ID,
    toListId: ID,
    itemId: ID
  ) => Promise<boolean>;

  moveAllToCart: (listId: ID) => Promise<boolean>;
  syncWithRemote: () => Promise<void>;
};

function defaultState(): Pick<
  Store,
  "lists" | "activeListId" | "loading" | "initialized" | "syncing" | "error"
> {
  return {
    lists: [],
    activeListId: null,
    loading: false,
    initialized: false,
    syncing: false,
    error: null,
  };
}

function ensureDefault(lists: Wishlist[]): Wishlist[] {
  if (lists.some((l) => l.isDefault)) return lists;
  const defaultList: Wishlist = {
    id: `default_${Date.now()}`,
    userId: "",
    name: "Mes favoris",
    isDefault: true,
    isPublic: false,
    scope: "mixed",
    items: [],
    itemCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return [defaultList, ...lists];
}

export const useWishlistStore = create<Store>()(
  persist(
    (set, get) => ({
      ...defaultState(),

      init: async (user) => {
        const { lists } = get();
        const hydrated = ensureDefault(lists);
        set({
          lists: hydrated,
          activeListId: hydrated[0]?.id ?? null,
        });
        if (user) {
          try {
            set({ syncing: true });
            const remote = await wishlistApi.getAll();
            if (remote && remote.length > 0) {
              const active = remote.find((l) => l.isDefault) ?? remote[0];
              set({ lists: remote, activeListId: active.id });
            }
          } finally {
            set({ syncing: false, initialized: true });
          }
        } else {
          set({ initialized: true });
        }
      },

      reset: () => set(defaultState()),

      createList: async (data) => {
        set({ loading: true, error: null });
        try {
          const payload: Wishlist = {
            id: `tmp_${Date.now()}`,
            userId: "",
            name: data.name,
            isDefault: data.isDefault ?? false,
            isPublic: data.isPublic ?? false,
            scope: data.scope ?? "mixed",
            description: data.description,
            items: [],
            itemCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          const { lists, activeListId } = get();
          const lists_ = ensureDefault(lists);
          set({ lists: [...lists_, payload], activeListId: activeListId ?? payload.id });
          const created = await wishlistApi.create(payload).catch(() => null);
          if (created) {
            set({
              lists: get().lists.map((l) => (l.id === payload.id ? created : l)),
              loading: false,
            });
            return created;
          }
          set({ loading: false });
          return payload;
        } catch (err: any) {
          set({ loading: false, error: err?.message ?? null });
          return null;
        }
      },

      removeList: async (listId) => {
        set({ loading: true });
        try {
          const lists = get().lists.filter((l) => l.id !== listId);
          const active = ensureDefault(lists);
          set({
            lists: active,
            activeListId: get().activeListId === listId ? active[0]?.id ?? null : get().activeListId,
            loading: false,
          });
          await wishlistApi.remove(listId).catch(() => {});
          return true;
        } catch {
          set({ loading: false });
          return false;
        }
      },

      renameList: async (listId, name) => {
        set({ loading: true });
        try {
          set({
            lists: get().lists.map((l) =>
              l.id === listId
                ? { ...l, name, updatedAt: new Date().toISOString() }
                : l
            ),
          });
          await wishlistApi.update(listId, { name }).catch(() => {});
          return true;
        } finally {
          set({ loading: false });
        }
      },

      setActiveList: (listId) => set({ activeListId: listId }),

      has: (item) =>
        get().lists.some((list) =>
          list.items.some((i) => {
            if (item.kind !== i.kind) return false;
            if (item.vehicleId) return i.vehicleId === item.vehicleId;
            if (item.productId && item.variantId) {
              return i.productId === item.productId && i.variantId === item.variantId;
            }
            return i.productId === item.productId;
          })
        ),

      getActiveList: () =>
        get().lists.find((l) => l.id === get().activeListId) ?? get().lists[0],

      count: () =>
        get().lists.reduce((acc, l) => acc + (l.itemCount ?? 0), 0),

      allItemIds: (kind) =>
        Array.from(
          new Set(
            get()
              .lists.flatMap((l) => l.items)
              .filter((i) => i.kind === kind)
              .map((i) => (i.kind === "vehicle" ? i.vehicleId : i.productId))
              .filter(Boolean) as ID[]
          )
        ),

      addItem: async (item) => {
        set({ loading: true, error: null });
        try {
          const listId = item.listId ?? get().activeListId ?? ensureDefault(get().lists)[0].id;
          const newItem: WishlistItem = {
            id: `wi_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            wishlistId: listId,
            kind: item.kind,
            vehicleId: item.vehicleId,
            productId: item.productId,
            variantId: item.variantId,
            addedNote: item.addedNote,
            priority: item.priority ?? "medium",
            quantity: item.quantity ?? 1,
            addedAt: new Date().toISOString(),
            priceWhenAdded: item.priceWhenAdded,
          };
          set({
            lists: get().lists.map((l) =>
              l.id === listId
                ? {
                    ...l,
                    items: [...l.items, newItem],
                    itemCount: l.itemCount + 1,
                    updatedAt: new Date().toISOString(),
                  }
                : l
            ),
            loading: false,
          });
          await wishlistApi.addItem(listId, newItem).catch(() => {});
          return true;
        } catch (err: any) {
          set({ loading: false, error: err?.message ?? null });
          return false;
        }
      },

      removeItem: async (listId, itemId) => {
        set({ loading: true });
        try {
          set({
            lists: get().lists.map((l) =>
              l.id === listId
                ? {
                    ...l,
                    items: l.items.filter((i) => i.id !== itemId),
                    itemCount: Math.max(0, l.itemCount - 1),
                  }
                : l
            ),
            loading: false,
          });
          await wishlistApi.removeItem(listId, itemId).catch(() => {});
          return true;
        } catch {
          set({ loading: false });
          return false;
        }
      },

      toggleItem: async (item) => {
        const has = get().has(item);
        if (has) {
          const listId = item.listId ?? get().activeListId;
          const target = get()
            .lists.filter((l) => !item.listId || l.id === item.listId)
            .find((l) =>
              l.items.some((i) => {
                if (item.kind !== i.kind) return false;
                if (item.vehicleId) return i.vehicleId === item.vehicleId;
                if (item.productId && item.variantId) {
                  return i.productId === item.productId && i.variantId === item.variantId;
                }
                return i.productId === item.productId;
              })
            );
          const targetItem = target?.items.find((i) =>
            item.vehicleId
              ? i.vehicleId === item.vehicleId
              : i.productId === item.productId
          );
          if (target?.id && targetItem?.id) {
            return await get().removeItem(target.id, targetItem.id);
          }
          return false;
        }
        return await get().addItem(item);
      },

      updateItem: async (listId, itemId, patch) => {
        set({
          lists: get().lists.map((l) =>
            l.id === listId
              ? {
                  ...l,
                  items: l.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)),
                }
              : l
          ),
        });
        try {
          await wishlistApi.updateItem(listId, itemId, patch).catch(() => {});
          return true;
        } catch {
          return false;
        }
      },

      moveItem: async (fromListId, toListId, itemId) => {
        set({ loading: true });
        try {
          const from = get().lists.find((l) => l.id === fromListId);
          const moving = from?.items.find((i) => i.id === itemId);
          if (!moving) return false;
          set({
            lists: get().lists.map((l) => {
              if (l.id === fromListId) {
                return {
                  ...l,
                  items: l.items.filter((i) => i.id !== itemId),
                  itemCount: Math.max(0, l.itemCount - 1),
                };
              }
              if (l.id === toListId) {
                return {
                  ...l,
                  items: [...l.items, { ...moving, wishlistId: toListId, id: `wi_${Date.now()}` }],
                  itemCount: l.itemCount + 1,
                };
              }
              return l;
            }),
            loading: false,
          });
          await wishlistApi.moveItem(fromListId, toListId, itemId).catch(() => {});
          return true;
        } catch {
          set({ loading: false });
          return false;
        }
      },

      moveAllToCart: async (listId) => {
        try {
          await wishlistApi.addToCart(listId);
          return true;
        } catch {
          return false;
        }
      },

      syncWithRemote: async () => {
        try {
          set({ syncing: true });
          const remote = await wishlistApi.getAll();
          if (remote && remote.length > 0) {
            const active = remote.find((l) => l.isDefault) ?? remote[0];
            set({ lists: remote, activeListId: active.id, syncing: false });
          } else {
            set({ syncing: false });
          }
        } catch {
          set({ syncing: false });
        }
      },
    }),
    {
      name: STORAGE_KEYS.WISHLIST,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        lists: s.lists,
        activeListId: s.activeListId,
      }),
      version: 2,
    }
  )
);
