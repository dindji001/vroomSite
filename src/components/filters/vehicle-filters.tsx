"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/ui-store";
import { VEHICLE_CONDITIONS, FUEL_TYPES, TRANSMISSION_TYPES } from "@/constants/filters";

export function VehicleFilters() {
  const { vehicleFilters, setVehicleFilters, toggleDrawer } = useUIStore();
  const [localFilters, setLocalFilters] = useState(vehicleFilters || {});

  const handleApply = () => {
    setVehicleFilters(localFilters);
    toggleDrawer("filters");
  };

  const handleReset = () => {
    const resetFilters = {
      conditions: [],
      fuelTypes: [],
      transmissions: [],
      minPrice: undefined,
      maxPrice: undefined,
      minYear: undefined,
      maxYear: undefined,
      minMileage: undefined,
      maxMileage: undefined,
      makeId: undefined,
      modelId: undefined,
      sort: "created_desc",
      page: 1,
      perPage: 12,
    };
    setLocalFilters(resetFilters);
    setVehicleFilters(resetFilters);
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
          <label className="text-sm font-medium mb-2 block">État</label>
          <div className="space-y-2">
            {VEHICLE_CONDITIONS.map((condition) => (
              <label key={condition.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.conditions?.includes(condition.value)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...(localFilters.conditions || []), condition.value]
                      : localFilters.conditions?.filter((c: string) => c !== condition.value);
                    setLocalFilters({ ...localFilters, conditions: updated });
                  }}
                />
                <span className="text-sm">{condition.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Carburant</label>
          <div className="space-y-2">
            {FUEL_TYPES.map((fuel) => (
              <label key={fuel.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.fuelTypes?.includes(fuel.value)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...(localFilters.fuelTypes || []), fuel.value]
                      : localFilters.fuelTypes?.filter((f: string) => f !== fuel.value);
                    setLocalFilters({ ...localFilters, fuelTypes: updated });
                  }}
                />
                <span className="text-sm">{fuel.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Transmission</label>
          <div className="space-y-2">
            {TRANSMISSION_TYPES.map((trans) => (
              <label key={trans.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.transmissions?.includes(trans.value)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...(localFilters.transmissions || []), trans.value]
                      : localFilters.transmissions?.filter((t: string) => t !== trans.value);
                    setLocalFilters({ ...localFilters, transmissions: updated });
                  }}
                />
                <span className="text-sm">{trans.label}</span>
              </label>
            ))}
          </div>
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Année min</label>
            <Input
              type="number"
              placeholder="2010"
              value={localFilters.minYear || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, minYear: e.target.value ? Number(e.target.value) : undefined })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Année max</label>
            <Input
              type="number"
              placeholder="2024"
              value={localFilters.maxYear || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, maxYear: e.target.value ? Number(e.target.value) : undefined })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Km min</label>
            <Input
              type="number"
              placeholder="0"
              value={localFilters.minMileage || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, minMileage: e.target.value ? Number(e.target.value) : undefined })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Km max</label>
            <Input
              type="number"
              placeholder="Max"
              value={localFilters.maxMileage || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, maxMileage: e.target.value ? Number(e.target.value) : undefined })
              }
            />
          </div>
        </div>

        <Button className="w-full" onClick={handleApply}>
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
}
