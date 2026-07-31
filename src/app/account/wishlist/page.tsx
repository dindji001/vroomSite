"use client";

import { useWishlistStore } from "@/store/wishlist-store";
import { VehicleCard } from "@/components/cards/vehicle-card";
import { ProductCard } from "@/components/cards/product-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function WishlistPage() {
  const { lists, activeListId, getActiveList } = useWishlistStore();
  const activeList = getActiveList();

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Mon Compte", href: "/account" },
          { label: "Mes Favoris" },
        ]}
      />

      <div>
        <h1 className="font-heading text-3xl font-bold">Mes Favoris</h1>
        <p className="mt-2 text-muted-foreground">
          Retrouvez vos véhicules et produits préférés
        </p>
      </div>

      {lists.length === 0 || !activeList || activeList.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun favori pour le moment</p>
        </div>
      ) : (
        <>
          {lists.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {lists.map((list) => (
                <button
                  key={list.id}
                  className={`px-4 py-2 rounded-xl ${
                    list.id === activeListId
                      ? "bg-[#253E38] text-white dark:bg-[#A7CD0F] dark:text-[#101418]"
                      : "bg-muted"
                  }`}
                >
                  {list.name}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeList.items.map((item: any) => (
              <div key={item.id} className="p-4 bg-card border border-border rounded-2xl">
                {item.vehicle && (
                  <VehicleCard
                    key={item.id}
                    make={item.vehicle.make?.name}
                    model={item.vehicle.model?.name}
                    year={item.vehicle.year}
                    price={item.vehicle.price?.amount}
                    currency={item.vehicle.price?.currency === "EUR" ? "€" : "$"}
                    mileage={item.vehicle.mileageKm?.toLocaleString()}
                    fuel={item.vehicle.fuelType}
                    transmission={item.vehicle.transmission}
                    power={item.vehicle.powerHp?.toString()}
                    href={`/vehicles/${item.vehicle.slug}`}
                    images={item.vehicle.images?.map((img: any) => img.url)}
                    status={item.vehicle.condition === "new" ? "new" : "pre-owned"}
                  />
                )}
                {item.product && (
                  <ProductCard
                    key={item.id}
                    name={item.product.name}
                    originalPrice={item.product.compareAtPrice?.amount}
                    salePrice={item.product.price.amount}
                    currency={item.product.price.currency === "EUR" ? "€" : "$"}
                    category={item.product.category?.name}
                    image={item.product.images[0]?.url}
                    href={`/products/${item.product.slug}`}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
