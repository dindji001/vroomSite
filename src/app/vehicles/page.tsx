"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  SlidersHorizontal, 
  Grid, 
  List, 
  Search, 
  X,
  ChevronDown,
  Car,
  Fuel,
  Gauge,
  Calendar,
  Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VehicleCard } from "@/components/cards/vehicle-card";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockVehicles = [
  {
    id: "1",
    make: "Tesla",
    model: "Model S",
    year: 2024,
    price: 89000,
    currency: "€",
    mileage: "0",
    fuel: "Électrique",
    transmission: "Automatique",
    power: "493",
    condition: "new",
    location: "Paris",
    slug: "tesla-model-s-2024",
    images: ["/images/tesla-model-s-1.jpg", "/images/tesla-model-s-2.jpg"],
  },
  {
    id: "2",
    make: "BMW",
    model: "X5",
    year: 2023,
    price: 72000,
    currency: "€",
    mileage: "15,000",
    fuel: "Diesel",
    transmission: "Automatique",
    power: "340",
    condition: "pre-owned",
    location: "Lyon",
    slug: "bmw-x5-2023",
    images: ["/images/bmw-x5-1.jpg", "/images/bmw-x5-2.jpg"],
  },
  {
    id: "3",
    make: "Mercedes",
    model: "GLC",
    year: 2024,
    price: 65000,
    currency: "€",
    mileage: "0",
    fuel: "Hybride",
    transmission: "Automatique",
    power: "313",
    condition: "new",
    location: "Marseille",
    slug: "mercedes-glc-2024",
    images: ["/images/mercedes-glc-1.jpg", "/images/mercedes-glc-2.jpg"],
  },
  {
    id: "4",
    make: "Audi",
    model: "A6",
    year: 2022,
    price: 45000,
    currency: "€",
    mileage: "35,000",
    fuel: "Essence",
    transmission: "Automatique",
    power: "286",
    condition: "pre-owned",
    location: "Bordeaux",
    slug: "audi-a6-2022",
    images: ["/images/audi-a6-1.jpg", "/images/audi-a6-2.jpg"],
  },
  {
    id: "5",
    make: "Porsche",
    model: "911",
    year: 2024,
    price: 145000,
    currency: "€",
    mileage: "0",
    fuel: "Essence",
    transmission: "Automatique",
    power: "443",
    condition: "new",
    location: "Nice",
    slug: "porsche-911-2024",
    images: ["/images/porsche-911-1.jpg", "/images/porsche-911-2.jpg"],
  },
  {
    id: "6",
    make: "Range Rover",
    model: "Sport",
    year: 2023,
    price: 95000,
    currency: "€",
    mileage: "12,000",
    fuel: "Hybride",
    transmission: "Automatique",
    power: "395",
    condition: "pre-owned",
    location: "Toulouse",
    slug: "range-rover-sport-2023",
    images: ["/images/range-rover-1.jpg", "/images/range-rover-2.jpg"],
  },
];

// Filter Range Component
function FilterRange({ label, min, max, value, onChange }: { label: string; min: number; max: number; value: [number, number]; onChange: (value: [number, number]) => void }) {
  const [localValue, setLocalValue] = React.useState(value);
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white/90">Prix</label>
        <span className="text-xs text-[#A7CD0F]">
          {localValue[0].toLocaleString()}€ - {localValue[1].toLocaleString()}€
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={localValue[0]}
        onChange={(e) => setLocalValue([parseInt(e.target.value), localValue[1]])}
        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={localValue[1]}
        onChange={(e) => setLocalValue([localValue[0], parseInt(e.target.value)])}
        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

// Filter Checkbox Component
function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <motion.div
          className={cn(
            "w-5 h-5 rounded border-2 transition-colors",
            checked ? "bg-[#A7CD0F] border-[#A7CD0F]" : "border-white/30 group-hover:border-white/50"
          )}
          whileTap={{ scale: 0.9 }}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center"
            >
              <X className="w-3 h-3 text-[#101418]" />
            </motion.div>
          )}
        </motion.div>
      </div>
      <span className={cn("text-sm", checked ? "text-white" : "text-white/60")}>{label}</span>
    </label>
  );
}

// Filter Section Component
function FilterSection({ title, children, isOpen, onToggle }: { title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/10 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2"
      >
        <h3 className="font-semibold text-white">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-white/60" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-3 space-y-2">{children}</div>
      </motion.div>
    </div>
  );
}

export default function VehiclesPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 200000]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = React.useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = React.useState<string[]>([]);
  const [selectedYear, setSelectedYear] = React.useState<string[]>([]);
  const [expandedFilters, setExpandedFilters] = React.useState({
    price: true,
    brand: true,
    fuel: true,
    transmission: true,
    year: true,
  });
  
  const brands = ["Tesla", "BMW", "Mercedes", "Audi", "Porsche", "Range Rover", "Lamborghini", "Ferrari"];
  const fuelTypes = ["Essence", "Diesel", "Électrique", "Hybride", "Hydrogène"];
  const transmissions = ["Automatique", "Manuelle", "Semi-automatique"];
  const years = ["2024", "2023", "2022", "2021", "2020", "2019"];
  
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };
  
  const toggleFuel = (fuel: string) => {
    setSelectedFuel(prev => 
      prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel]
    );
  };
  
  const toggleTransmission = (trans: string) => {
    setSelectedTransmission(prev => 
      prev.includes(trans) ? prev.filter(t => t !== trans) : [...prev, trans]
    );
  };
  
  const toggleYear = (year: string) => {
    setSelectedYear(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };
  
  const clearFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedBrands([]);
    setSelectedFuel([]);
    setSelectedTransmission([]);
    setSelectedYear([]);
    setSearchQuery("");
  };
  
  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = searchQuery === "" || 
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(vehicle.make);
    const matchesFuel = selectedFuel.length === 0 || selectedFuel.includes(vehicle.fuel);
    const matchesTransmission = selectedTransmission.length === 0 || selectedTransmission.includes(vehicle.transmission);
    const matchesYear = selectedYear.length === 0 || selectedYear.includes(vehicle.year.toString());
    
    return matchesSearch && matchesPrice && matchesBrand && matchesFuel && matchesTransmission && matchesYear;
  });
  
  const activeFiltersCount = 
    (priceRange[0] !== 0 || priceRange[1] !== 200000 ? 1 : 0) +
    selectedBrands.length +
    selectedFuel.length +
    selectedTransmission.length +
    selectedYear.length;
  
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#253E38]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A7CD0F]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 container-premium">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Véhicules", href: "/vehicles" }]} />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Notre Collection
              <span className="block bg-gradient-to-r from-[#A7CD0F] to-[#FEB300] bg-clip-text text-transparent">
                d'Exception
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              Découvrez notre sélection exclusive de véhicules neufs et d'occasion, 
              soigneusement sélectionnés pour leur qualité et leur performance.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Search Bar */}
      <section className="py-8">
        <div className="container-premium">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <Input
              type="text"
              placeholder="Rechercher par marque, modèle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-2xl focus:border-[#A7CD0F]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container-premium">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={cn(
              "lg:w-80 shrink-0 transition-all duration-300",
              showFilters ? "block" : "hidden lg:block"
            )}>
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#A7CD0F]" />
                    <h2 className="font-heading text-xl font-bold text-white">Filtres</h2>
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#A7CD0F] hover:underline"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>
                
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4">
                  {/* Price Filter */}
                  <FilterSection
                    title="Prix"
                    isOpen={expandedFilters.price}
                    onToggle={() => setExpandedFilters(prev => ({ ...prev, price: !prev.price }))}
                  >
                    <FilterRange
                      label="Prix"
                      min={0}
                      max={200000}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                  </FilterSection>
                  
                  {/* Brand Filter */}
                  <FilterSection
                    title="Marque"
                    isOpen={expandedFilters.brand}
                    onToggle={() => setExpandedFilters(prev => ({ ...prev, brand: !prev.brand }))}
                  >
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <FilterCheckbox
                          key={brand}
                          label={brand}
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                        />
                      ))}
                    </div>
                  </FilterSection>
                  
                  {/* Fuel Filter */}
                  <FilterSection
                    title="Carburant"
                    isOpen={expandedFilters.fuel}
                    onToggle={() => setExpandedFilters(prev => ({ ...prev, fuel: !prev.fuel }))}
                  >
                    <div className="space-y-2">
                      {fuelTypes.map(fuel => (
                        <FilterCheckbox
                          key={fuel}
                          label={fuel}
                          checked={selectedFuel.includes(fuel)}
                          onChange={() => toggleFuel(fuel)}
                        />
                      ))}
                    </div>
                  </FilterSection>
                  
                  {/* Transmission Filter */}
                  <FilterSection
                    title="Boîte de vitesses"
                    isOpen={expandedFilters.transmission}
                    onToggle={() => setExpandedFilters(prev => ({ ...prev, transmission: !prev.transmission }))}
                  >
                    <div className="space-y-2">
                      {transmissions.map(trans => (
                        <FilterCheckbox
                          key={trans}
                          label={trans}
                          checked={selectedTransmission.includes(trans)}
                          onChange={() => toggleTransmission(trans)}
                        />
                      ))}
                    </div>
                  </FilterSection>
                  
                  {/* Year Filter */}
                  <FilterSection
                    title="Année"
                    isOpen={expandedFilters.year}
                    onToggle={() => setExpandedFilters(prev => ({ ...prev, year: !prev.year }))}
                  >
                    <div className="space-y-2">
                      {years.map(year => (
                        <FilterCheckbox
                          key={year}
                          label={year}
                          checked={selectedYear.includes(year)}
                          onChange={() => toggleYear(year)}
                        />
                      ))}
                    </div>
                  </FilterSection>
                </div>
              </div>
            </aside>
            
            {/* Results Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filtres</span>
                    {activeFiltersCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#A7CD0F] text-[#101418] text-xs font-bold flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                  <p className="text-white/60">
                    <span className="font-semibold text-white">{filteredVehicles.length}</span> véhicules
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-xl transition-colors",
                      viewMode === "grid" ? "bg-[#A7CD0F]/20 text-[#A7CD0F]" : "bg-white/5 text-white/60 hover:text-white"
                    )}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-xl transition-colors",
                      viewMode === "list" ? "bg-[#A7CD0F]/20 text-[#A7CD0F]" : "bg-white/5 text-white/60 hover:text-white"
                    )}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Vehicles Grid */}
              {filteredVehicles.length === 0 ? (
                <div className="text-center py-20">
                  <Car className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold text-white mb-2">Aucun véhicule trouvé</h3>
                  <p className="text-white/60 mb-6">Essayez d'ajuster vos filtres de recherche</p>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              ) : (
                <div className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}>
                  {filteredVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <VehicleCard
                        make={vehicle.make}
                        model={vehicle.model}
                        year={vehicle.year}
                        price={vehicle.price}
                        currency={vehicle.currency}
                        images={vehicle.images}
                        fuel={vehicle.fuel}
                        transmission={vehicle.transmission}
                        mileage={vehicle.mileage}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
