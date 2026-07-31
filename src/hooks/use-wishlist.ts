import { useWishlistStore } from "@/store/wishlist-store";

export function useWishlist() {
  const lists = useWishlistStore((s) => s.lists);
  const activeListId = useWishlistStore((s) => s.activeListId);
  const loading = useWishlistStore((s) => s.loading);
  const initialized = useWishlistStore((s) => s.initialized);
  
  const createList = useWishlistStore((s) => s.createList);
  const removeList = useWishlistStore((s) => s.removeList);
  const renameList = useWishlistStore((s) => s.renameList);
  const setActiveList = useWishlistStore((s) => s.setActiveList);
  const addItem = useWishlistStore((s) => s.addItem);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const updateItem = useWishlistStore((s) => s.updateItem);
  const moveItem = useWishlistStore((s) => s.moveItem);
  const moveAllToCart = useWishlistStore((s) => s.moveAllToCart);
  const syncWithRemote = useWishlistStore((s) => s.syncWithRemote);
  const getActiveList = useWishlistStore((s) => s.getActiveList);
  const has = useWishlistStore((s) => s.has);
  const count = useWishlistStore((s) => s.count);

  return {
    lists,
    activeListId,
    loading,
    initialized,
    createList,
    removeList,
    renameList,
    setActiveList,
    addItem,
    removeItem,
    toggleItem,
    updateItem,
    moveItem,
    moveAllToCart,
    syncWithRemote,
    getActiveList,
    has,
    count,
  };
}
