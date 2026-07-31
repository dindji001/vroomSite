"use client";

import { useCartStore } from "@/store/cart-store";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatMoney } from "@/helpers/format";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, currency, clear } = useCartStore();
  const router = useRouter();

  if (items.length === 0) {
    router.push("/products");
    return null;
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice.amount * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Boutique", href: "/products" },
          { label: "Panier", href: "/cart" },
          { label: "Commander" },
        ]}
      />

      <div className="mt-8">
        <h1 className="font-heading text-4xl font-bold">Finaliser la commande</h1>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="p-6 bg-card border border-border rounded-2xl">
            <h2 className="font-heading text-xl font-bold">Adresse de livraison</h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Adresse</label>
                <input className="w-full px-4 py-2 border border-border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Code postal</label>
                  <input className="w-full px-4 py-2 border border-border rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ville</label>
                  <input className="w-full px-4 py-2 border border-border rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 bg-card border border-border rounded-2xl">
            <h2 className="font-heading text-xl font-bold">Mode de paiement</h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted">
                <input type="radio" name="payment" value="card" defaultChecked />
                <span>Carte bancaire</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted">
                <input type="radio" name="payment" value="paypal" />
                <span>PayPal</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted">
                <input type="radio" name="payment" value="wallet" />
                <span>Portefeuille VroomCar</span>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-card border border-border rounded-2xl">
            <h2 className="font-heading text-xl font-bold">Récapitulatif</h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <p className="font-semibold">{formatCurrency(subtotal, items[0].unitPrice.currency as "EUR")}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TVA</span>
                <span>20%</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-[#253E38] dark:text-[#A7CD0F]">
                  {formatMoney({ amount: total as unknown as number, currency: currency as "EUR" })}
                </span>
              </div>
            </div>

            <Button className="w-full mt-6" size="lg">
              Confirmer la commande
            </Button>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              En validant votre commande, vous acceptez nos conditions générales de vente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
