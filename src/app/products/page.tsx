"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  SlidersHorizontal, 
  Grid, 
  List, 
  Search, 
  X,
  ChevronDown,
  Package,
  Heart,
  ShoppingCart,
  ArrowUpDown,
  MapPin,
  Star,
  Zap,
  Shield,
  Truck,
  Clock,
  Camera,
  Wind
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/cards/product-card";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "GPS Tracker Premium",
    originalPrice: 195000,
    salePrice: 163000,
    currency: "FCFA",
    category: "GPS",
    image: "/images/gps-tracker.jpg",
    rating: 4.8,
    reviews: 124,
    stock: "in",
    brand: "VroomTrack",
    features: ["Suivi temps réel", "Géofencing", "Alertes instantanées"],
  },
  {
    id: "2",
    name: "Dashcam 4K Ultra",
    originalPrice: 130000,
    salePrice: 104000,
    currency: "FCFA",
    category: "Dashcam",
    image: "/images/dashcam-4k.jpg",
    rating: 4.9,
    reviews: 89,
    stock: "in",
    brand: "SafeDrive",
    features: ["4K 60fps", "Vision nocturne", "Enregistrement boucle"],
  },
  {
    id: "3",
    name: "Alarme Intelligente Pro",
    originalPrice: 294000,
    salePrice: 261000,
    currency: "FCFA",
    category: "Alarmes",
    image: "/images/alarm-pro.jpg",
    rating: 4.7,
    reviews: 67,
    stock: "in",
    brand: "SecureCar",
    features: ["Détection mouvement", "Notification app", "Silencieux"],
  },
  {
    id: "4",
    name: "Capteur de Stationnement",
    originalPrice: 84000,
    salePrice: 65000,
    currency: "FCFA",
    category: "Capteurs",
    image: "/images/parking-sensor.jpg",
    rating: 4.6,
    reviews: 45,
    stock: "in",
    brand: "ParkAssist",
    features: ["4 capteurs", "Affichage LED", "Étanche"],
  },
  {
    id: "5",
    name: "Kit Accessoires Premium",
    originalPrice: 52000,
    salePrice: 39000,
    currency: "FCFA",
    category: "Accessoires",
    image: "/images/accessories-kit.jpg",
    rating: 4.5,
    reviews: 32,
    stock: "in",
    brand: "VroomCar",
    features: ["Chargeur USB", "Support téléphone", "Organisateur"],
  },
  {
    id: "6",
    name: "Filtre à Air Performance",
    originalPrice: 32000,
    salePrice: 26000,
    currency: "FCFA",
    category: "Filtres",
    image: "/images/air-filter.jpg",
    rating: 4.4,
    reviews: 28,
    stock: "in",
    brand: "AirMax",
    features: ["Haute qualité", "Longue durée", "Facile à installer"],
  },
  {
    id: "7",
    name: "GPS Tracker Basic",
    originalPrice: 98000,
    salePrice: 78000,
    currency: "FCFA",
    category: "GPS",
    image: "/images/gps-basic.jpg",
    rating: 4.3,
    reviews: 56,
    stock: "in",
    brand: "VroomTrack",
    features: ["Suivi GPS", "Application mobile", "Autonomie 1 an"],
  },
  {
    id: "8",
    name: "Dashcam HD Compact",
    originalPrice: 58000,
    salePrice: 45000,
    currency: "FCFA",
    category: "Dashcam",
    image: "/images/dashcam-hd.jpg",
    rating: 4.2,
    reviews: 41,
    stock: "in",
    brand: "SafeDrive",
    features: ["1080p", "Écran LCD", "Mode parking"],
  },
  {
    id: "9",
    name: "Alarme Essentiel",
    originalPrice: 130000,
    salePrice: 117000,
    currency: "FCFA",
    category: "Alarmes",
    image: "/images/alarm-basic.jpg",
    rating: 4.1,
    reviews: 23,
    stock: "in",
    brand: "SecureCar",
    features: ["Télécommande", "Sirène 120dB", "Facile à installer"],
  },
];

const categories = ["GPS", "Dashcam", "Alarmes", "Capteurs", "Accessoires", "Filtres"];
const sortOptions = [
  { value: "featured", label: "Mis en avant" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Note clients" },
  { value: "newest", label: "Plus récents" },
];

// Category Card Component
function CategoryCard({ name, icon: Icon, count, index }: { name: string; icon: any; count: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
    >
      <div className="relative h-40 rounded-2xl bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-[#A7CD0F]/20 flex items-center justify-center mb-3"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon className="w-6 h-6 text-[#A7CD0F]" />
          </motion.div>
          <h3 className="font-heading font-semibold text-white text-center">{name}</h3>
          <p className="text-xs text-white/60 mt-1">{count} produits</p>
        </div>
      </div>
    </motion.div>
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

export default function ProductsPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState("featured");
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 500]);
  const [expandedFilters, setExpandedFilters] = React.useState({
    category: true,
    price: true,
    brand: true,
  });
  
  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const count = useWishlistStore((s) => s.count());
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
    setPriceRange([0, 500]);
    setSortBy("featured");
  };
  
  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
    
    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // featured - keep original order
        break;
    }
    
    return filtered;
  }, [searchQuery, selectedCategories, priceRange, sortBy]);
  
  const activeFiltersCount = selectedCategories.length + (searchQuery ? 1 : 0);
  
  const handleAddToCart = (product: any) => {
    addItem({
      name: product.name,
      unitPrice: { amount: product.salePrice, currency: "XOF" },
      quantity: 1,
      kind: "product",
      productId: product.id,
    });
  };
  
  const handleToggleWishlist = (product: any) => {
    toggleItem({
      kind: "product",
      productId: product.id,
      variantId: product.variantId,
      quantity: 1,
    });
  };
  
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
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Boutique", href: "/products" }]} />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Notre Boutique
              <span className="block bg-gradient-to-r from-[#A7CD0F] to-[#FEB300] bg-clip-text text-transparent">
                Premium
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              Découvrez notre sélection d'accessoires et équipements premium pour votre véhicule.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-8">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <CategoryCard name="GPS" icon={MapPin} count={2} index={0} />
            <CategoryCard name="Dashcam" icon={Camera} count={2} index={1} />
            <CategoryCard name="Alarmes" icon={Shield} count={2} index={2} />
            <CategoryCard name="Capteurs" icon={Zap} count={1} index={3} />
            <CategoryCard name="Accessoires" icon={Package} count={1} index={4} />
            <CategoryCard name="Filtres" icon={Wind} count={1} index={5} />
          </div>
        </div>
      </section>
      
      {/* Search Bar */}
      <section className="py-8">
        <div className="container-premium">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
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
                  {/* Category Filter */}
                  <div className="border-b border-white/10 pb-4">
                    <button
                      onClick={() => setExpandedFilters(prev => ({ ...prev, category: !prev.category }))}
                      className="flex items-center justify-between w-full py-2"
                    >
                      <h3 className="font-semibold text-white">Catégories</h3>
                      <motion.div
                        animate={{ rotate: expandedFilters.category ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-white/60" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: expandedFilters.category ? "auto" : 0, opacity: expandedFilters.category ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 space-y-2">
                        {categories.map(category => (
                          <FilterCheckbox
                            key={category}
                            label={category}
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Price Filter */}
                  <div className="border-b border-white/10 pb-4">
                    <button
                      onClick={() => setExpandedFilters(prev => ({ ...prev, price: !prev.price }))}
                      className="flex items-center justify-between w-full py-2"
                    >
                      <h3 className="font-semibold text-white">Prix</h3>
                      <motion.div
                        animate={{ rotate: expandedFilters.price ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-white/60" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: expandedFilters.price ? "auto" : 0, opacity: expandedFilters.price ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-white/90">Prix max</label>
                          <span className="text-xs text-[#A7CD0F]">
                            {priceRange[1]} FCFA
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={500}
                          step={10}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </motion.div>
                  </div>
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
                    <span className="font-semibold text-white">{filteredAndSortedProducts.length}</span> produits
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#A7CD0F]/50"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
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
              
              {/* Products Grid */}
              {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold text-white mb-2">Aucun produit trouvé</h3>
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
                  {filteredAndSortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <ProductCard
                        name={product.name}
                        originalPrice={product.originalPrice}
                        salePrice={product.salePrice}
                        currency={product.currency}
                        image={product.image}
                        stock={product.stock as "in" | "low" | "out"}
                        rating={product.rating}
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
