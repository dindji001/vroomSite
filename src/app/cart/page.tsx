"use client";

import { useCartStore } from "@/store/cart-store";
import { VehicleCard } from "@/components/cards/vehicle-card";
import { ProductCard } from "@/components/cards/product-card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatMoney } from "@/helpers/format";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function CartPage() {
  const { items, total, currency, updateQuantity, removeItem, clear } = useCartStore();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Boutique", href: "/products" },
            { label: "Panier" },
          ]}
        />
        <div className="mt-16 text-center">
          <h1 className="font-heading text-3xl font-bold">Votre panier est vide</h1>
          <p className="mt-4 text-muted-foreground">
            Découvrez notre sélection de véhicules et produits
          </p>
          <Button className="mt-6" onClick={() => router.push("/products")}>
            Découvrir la boutique
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Boutique", href: "/products" },
          { label: "Panier" },
        ]}
      />

      <div className="mt-8">
        <h1 className="font-heading text-4xl font-bold">Mon Panier</h1>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-card border border-border rounded-2xl flex gap-4"
            >
              {item.kind === "vehicle" && item.vehicle && (
                <VehicleCard
                  make={item.vehicle.make?.name}
                  model={item.vehicle.model?.name}
                  year={item.vehicle.year}
                  price={item.vehicle.price?.amount}
                  currency={item.vehicle.price?.currency === "XOF" ? "FCFA" : "$"}
                  mileage={item.vehicle.mileageKm?.toLocaleString()}
                  fuel={item.vehicle.fuelType}
                  transmission={item.vehicle.transmission}
                  power={item.vehicle.powerHp?.toString()}
                  href={`/vehicles/${item.vehicle.slug}`}
                  images={item.vehicle.images?.map((img: any) => img.url)}
                  status={item.vehicle.condition === "new" ? "new" : "pre-owned"}
                />
              )}
              {item.kind === "product" && item.variant && (
                <ProductCard
                  name={item.name}
                  originalPrice={item.variant.compareAtPrice?.amount}
                  salePrice={item.variant.price.amount}
                  currency={item.variant.price.currency === "XOF" ? "FCFA" : "$"}
                  image={item.variant.images?.[0]?.url}
                />
              )}
              
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatMoney(item.unitPrice)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-destructive hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 space-y-6">
            <div className="p-6 bg-card border border-border rounded-2xl">
              <h2 className="font-heading text-xl font-bold">Récapitulatif</h2>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{formatMoney({ amount: total as unknown as number, currency: currency as "XOF" })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Livraison</span>
                  <span>Calculée à l'étape suivante</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#253E38] dark:text-[#A7CD0F]">
                    {formatMoney({ amount: total as unknown as number, currency: currency as "XOF" })}
                  </span>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg" onClick={() => router.push("/checkout")}>
                Passer la commande
              </Button>
            </div>

            <Button variant="outline" className="w-full" onClick={clear}>
              Vider le panier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
