"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  CarFront, 
  ShoppingBag, 
  Filter, 
  SlidersHorizontal,
  X,
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { VehicleCard } from "@/components/cards/vehicle-card";
import { ProductCard } from "@/components/cards/product-card";
import { cn } from "@/lib/utils";

// Search Result Item Component
function SearchResultItem({ 
  type, 
  item, 
  index 
}: { 
  type: "vehicle" | "product"; 
  item: any; 
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {type === "vehicle" ? (
        <VehicleCard
          make={item.make?.name}
          model={item.model?.name}
          year={item.year}
          price={item.price?.amount}
          currency={item.price?.currency === "EUR" ? "€" : "$"}
          fuel={item.fuelType}
          transmission={item.transmission}
          mileage={item.mileage?.toString()}
        />
      ) : (
        <ProductCard
          name={item.name}
          originalPrice={item.compareAtPrice?.amount}
          salePrice={item.price?.amount}
          currency={item.price?.currency === "EUR" ? "€" : "$"}
          image={item.images?.[0]?.url}
          stock={item.inStock ? "in" : "out"}
        />
      )}
    </motion.div>
  );
}

// Filter Chip Component
function FilterChip({ 
  label, 
  active, 
  onClick 
}: { 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
        active
          ? "bg-[#A7CD0F] text-[#101418]"
          : "bg-white/10 text-white/70 hover:bg-white/20"
      )}
    >
      {label}
    </motion.button>
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = React.useState(query);
  const [activeFilter, setActiveFilter] = React.useState<"all" | "vehicles" | "products">("all" as const);
  const [showFilters, setShowFilters] = React.useState(false);
  
  // Mock data for demonstration
  const mockVehicles = [
    {
      id: "1",
      make: { name: "Tesla" },
      model: { name: "Model S" },
      year: 2024,
      price: { amount: 89000, currency: "EUR" },
      images: [{ url: "/images/tesla-model-s.jpg" }],
      fuelType: "electric",
      transmission: "automatic",
      mileage: 0,
      condition: "new",
      location: "Paris",
      slug: "tesla-model-s-2024",
    },
    {
      id: "2",
      make: { name: "BMW" },
      model: { name: "X5" },
      year: 2023,
      price: { amount: 75000, currency: "EUR" },
      images: [{ url: "/images/bmw-x5.jpg" }],
      fuelType: "hybrid",
      transmission: "automatic",
      mileage: 15000,
      condition: "used",
      location: "Lyon",
      slug: "bmw-x5-2023",
    },
  ];
  
  const mockProducts = [
    {
      id: "1",
      name: "Système GPS Premium",
      price: { amount: 299, currency: "EUR" },
      compareAtPrice: { amount: 399, currency: "EUR" },
      images: [{ url: "/images/gps-system.jpg" }],
      category: { name: "Électronique" },
      brand: { name: "VroomTrack" },
      inStock: true,
      slug: "systeme-gps-premium",
    },
    {
      id: "2",
      name: "Kit d'entretien complet",
      price: { amount: 89, currency: "EUR" },
      compareAtPrice: null,
      images: [{ url: "/images/maintenance-kit.jpg" }],
      category: { name: "Entretien" },
      brand: { name: "AutoCare" },
      inStock: true,
      slug: "kit-entretien-complet",
    },
  ];
  
  const filteredResults = React.useMemo(() => {
    if (activeFilter === "vehicles") return mockVehicles.map(v => ({ ...v, type: "vehicle" as const }));
    if (activeFilter === "products") return mockProducts.map(p => ({ ...p, type: "product" as const }));
    return [
      ...mockVehicles.map(v => ({ ...v, type: "vehicle" as const })),
      ...mockProducts.map(p => ({ ...p, type: "product" as const })),
    ];
  }, [activeFilter]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Search Header */}
      <section className="pt-32 pb-12 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#101418] to-[#0a0a0a]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#253E38]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A7CD0F]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 container-premium">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Recherche", href: "/search" }]} />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mt-8"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              {query ? (
                <>
                  Résultats pour
                  <span className="block text-[#A7CD0F]">"{query}"</span>
                </>
              ) : (
                <>
                  Rechercher
                  <span className="block text-[#A7CD0F]">VroomCar</span>
                </>
              )}
            </h1>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un véhicule, un produit..."
                className="h-14 pl-12 pr-12 text-lg bg-white/5 border-white/10 text-white placeholder:text-white/50 rounded-2xl focus:border-[#A7CD0F]/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </form>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <FilterChip
                label="Tous"
                active={activeFilter === "all"}
                onClick={() => setActiveFilter("all")}
              />
              <FilterChip
                label="Véhicules"
                active={activeFilter === "vehicles"}
                onClick={() => setActiveFilter("vehicles")}
              />
              <FilterChip
                label="Produits"
                active={activeFilter === "products"}
                onClick={() => setActiveFilter("products")}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-white/20 text-white hover:bg-white/10 ml-auto"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtres avancés
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Advanced Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-b border-white/10"
        >
          <div className="container-premium py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-white/70 mb-2 block">Prix max</label>
                <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white">
                  <option>Tous les prix</option>
                  <option>€10,000</option>
                  <option>€25,000</option>
                  <option>€50,000</option>
                  <option>€100,000+</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-white/70 mb-2 block">Année</label>
                <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white">
                  <option>Toutes les années</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-white/70 mb-2 block">Carburant</label>
                <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white">
                  <option>Tous les types</option>
                  <option>Électrique</option>
                  <option>Hybride</option>
                  <option>Essence</option>
                  <option>Diesel</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-white/70 mb-2 block">État</label>
                <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white">
                  <option>Tous les états</option>
                  <option>Neuf</option>
                  <option>Occasion</option>
                  <option>Certifié</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Results Section */}
      <section className="py-12">
        <div className="container-premium">
          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-8"
          >
            <p className="text-white/70">
              {filteredResults.length} résultat{filteredResults.length > 1 ? "s" : ""} trouvé{filteredResults.length > 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Clock className="w-4 h-4" />
              <span>Mis à jour il y a 5 min</span>
            </div>
          </motion.div>
          
          {/* Results Grid */}
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((item, index) => (
                <SearchResultItem
                  key={`${item.type}-${item.id}`}
                  type={item.type}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-white/30" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Essayez de modifier votre recherche ou utilisez les filtres pour affiner les résultats.
              </p>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => setSearchQuery("")}
              >
                Réinitialiser la recherche
              </Button>
            </motion.div>
          )}
          
          {/* Trending Searches */}
          {filteredResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-[#A7CD0F]" />
                <h3 className="font-heading text-xl font-bold text-white">Recherches populaires</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Tesla Model S", "BMW X5", "GPS Premium", "Kit entretien", "Pneumatiques"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl p-12 md:p-16 bg-gradient-to-r from-[#253E38]/20 to-[#A7CD0F]/20 border border-white/10 overflow-hidden text-center"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#A7CD0F]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#253E38]/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 text-[#A7CD0F] mx-auto mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Vous ne trouvez pas ce que vous cherchez ?
              </h2>
              <p className="text-white/70 mb-8">
                Notre équipe d'experts est là pour vous aider à trouver le véhicule ou le produit parfait.
              </p>
              <Button
                size="lg"
                className="bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 px-8 py-6 rounded-full font-semibold shadow-[0_0_40px_rgba(167,205,15,0.3)]"
                asChild
              >
                <a href="/contact" className="flex items-center gap-2">
                  Contacter un expert
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
