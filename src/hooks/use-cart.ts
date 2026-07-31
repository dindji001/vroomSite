import { useCartStore } from "@/store/cart-store";

export function useCart() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);
  const currency = useCartStore((s) => s.currency);
  const itemCount = useCartStore((s) => s.itemCount);
  const uniqueItemCount = useCartStore((s) => s.uniqueItemCount);
  const couponCode = useCartStore((s) => s.couponCode);
  
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const sync = useCartStore((s) => s.sync);
  const setShippingMethod = useCartStore((s) => s.setShippingMethod);
  const setPaymentMethod = useCartStore((s) => s.setPaymentMethod);

  return {
    items,
    total,
    currency,
    itemCount,
    uniqueItemCount,
    couponCode,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    applyCoupon,
    removeCoupon,
    sync,
    setShippingMethod,
    setPaymentMethod,
  };
}
