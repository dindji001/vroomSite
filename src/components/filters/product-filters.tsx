"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/ui-store";

export function ProductFilters() {
  const { productFilters, setProductFilters, toggleDrawer } = useUIStore();
  const [localFilters, setLocalFilters] = useState(productFilters || {});

  const handleApply = () => {
    setProductFilters(localFilters);
    toggleDrawer("filters");
  };

  const handleReset = () => {
    const resetFilters: any = {
      q: "",
      categoryIds: [],
      brandIds: [],
      minPrice: undefined,
      maxPrice: undefined,
      inStockOnly: false,
    };
    setLocalFilters(resetFilters);
    setProductFilters(resetFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold">Filtres</h3>
        <button onClick={handleReset} className="text-sm text-muted-foreground hover:underline">
          Réinitialiser
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Recherche</label>
          <Input
            placeholder="Produit..."
            value={localFilters.q || ""}
            onChange={(e) => setLocalFilters({ ...localFilters, q: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Catégorie</label>
          <select
            className="w-full px-4 py-2 border border-border rounded-xl"
            value={localFilters.categoryIds?.[0] || ""}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, categoryIds: e.target.value ? [e.target.value] : [] })
            }
          >
            <option value="">Toutes les catégories</option>
            {/* Categories would be loaded from API */}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Marque</label>
          <select
            className="w-full px-4 py-2 border border-border rounded-xl"
            value={localFilters.brandIds?.[0] || ""}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, brandIds: e.target.value ? [e.target.value] : [] })
            }
          >
            <option value="">Toutes les marques</option>
            {/* Brands would be loaded from API */}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Prix min</label>
            <Input
              type="number"
              placeholder="0"
              value={localFilters.minPrice || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, minPrice: e.target.value ? Number(e.target.value) : undefined })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Prix max</label>
            <Input
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.inStockOnly}
              onChange={(e) => setLocalFilters({ ...localFilters, inStockOnly: e.target.checked })}
            />
            <span className="text-sm">En stock uniquement</span>
          </label>
        </div>

        <Button className="w-full" onClick={handleApply}>
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
}
