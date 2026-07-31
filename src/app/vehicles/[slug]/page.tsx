"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Share2, 
  Heart, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  Car, 
  MapPin, 
  Check, 
  X,
  Calculator,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { cn } from "@/lib/utils";

// Mock vehicle data
const vehicle = {
  id: "1",
  make: "Tesla",
  model: "Model S Plaid",
  year: 2024,
  price: 89000,
  currency: "€",
  mileage: "0",
  fuel: "Électrique",
  transmission: "Automatique",
  power: "1020",
  acceleration: "2.1s",
  autonomy: "600 km",
  condition: "new",
  location: "Paris",
  slug: "tesla-model-s-plaid-2024",
  images: [
    "/images/tesla-model-s-1.jpg",
    "/images/tesla-model-s-2.jpg",
    "/images/tesla-model-s-3.jpg",
    "/images/tesla-model-s-4.jpg",
    "/images/tesla-model-s-5.jpg",
  ],
  video: "/videos/tesla-model-s-video.mp4",
  description: "Le Tesla Model S Plaid représente le summum de l'innovation automobile. Avec son design aérodynamique époustouflant et ses performances inégalées, ce véhicule électrique redéfinit les standards du luxe durable. Son intérieur spacieux et minimalist offre une expérience de conduite incomparable, tandis que son système d'autopilotage de pointe assure une sécurité maximale.",
  specifications: [
    { label: "Moteur", value: "Tri-moteur électrique" },
    { label: "Puissance", value: "1 020 ch" },
    { label: "0-100 km/h", value: "2,1 secondes" },
    { label: "Vitesse max", value: "322 km/h" },
    { label: "Autonomie WLTP", value: "600 km" },
    { label: "Capacité batterie", value: "100 kWh" },
    { label: "Places", value: "5" },
    { label: "Portes", value: "5" },
    { label: "Garantie", value: "8 ans / 240 000 km" },
    { label: "Couleur", value: "Noir profond" },
  ],
  equipment: [
    "Écran tactile 17\"",
    "Système audio premium",
    "Sièges chauffants et ventilés",
    "Toit vitré panoramique",
    "Autopilot amélioré",
    "Charge ultra-rapide",
    "Climatisation bi-zone",
    "Caméras 360°",
    "Assistant de stationnement",
    "Régulateur de vitesse adaptatif",
  ],
};

// Gallery Component
function Gallery({ images, video }: { images: string[]; video: string }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showVideo, setShowVideo] = React.useState(false);
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/5">
        {showVideo ? (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <video className="w-full h-full object-cover" controls>
              <source src={video} type="video/mp4" />
            </video>
          </div>
        ) : (
          <img
            src={images[currentIndex]}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Video Button */}
        {!showVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-[#A7CD0F] hover:bg-[#A7CD0F]/90 flex items-center justify-center text-[#101418] transition-colors shadow-lg"
          >
            <Play className="w-6 h-6 ml-1" />
          </button>
        )}
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setShowVideo(false);
            }}
            className={cn(
              "aspect-video rounded-xl overflow-hidden transition-all",
              currentIndex === index && "ring-2 ring-[#A7CD0F]"
            )}
          >
            <img
              src={img}
              alt={`${vehicle.make} ${vehicle.model} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Specification Card Component
function SpecificationCard({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-[#A7CD0F]" />
        <span className="text-sm text-white/60">{label}</span>
      </div>
      <div className="font-semibold text-white">{value}</div>
    </div>
  );
}

// Financing Calculator Component
function FinancingCalculator({ price }: { price: number }) {
  const [loanAmount, setLoanAmount] = React.useState(price * 0.8);
  const [downPayment, setDownPayment] = React.useState(price * 0.2);
  const [duration, setDuration] = React.useState(60);
  const [interestRate, setInterestRate] = React.useState(4.5);
  
  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, duration)) / (Math.pow(1 + monthlyRate, duration) - 1);
    return monthlyPayment;
  };
  
  const monthlyPayment = calculateMonthlyPayment();
  const totalCost = monthlyPayment * duration + downPayment;
  
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10 space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 text-[#A7CD0F]" />
        <h3 className="font-heading text-xl font-bold text-white">Calculateur de financement</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-white/60 mb-2 block">Apport personnel</label>
          <input
            type="range"
            min={0}
            max={price}
            step={1000}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-right text-sm text-[#A7CD0F] mt-1">{downPayment.toLocaleString()}€</div>
        </div>
        
        <div>
          <label className="text-sm text-white/60 mb-2 block">Durée (mois)</label>
          <input
            type="range"
            min={12}
            max={96}
            step={12}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-right text-sm text-[#A7CD0F] mt-1">{duration} mois</div>
        </div>
        
        <div>
          <label className="text-sm text-white/60 mb-2 block">Taux d'intérêt (%)</label>
          <input
            type="range"
            min={1}
            max={10}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-right text-sm text-[#A7CD0F] mt-1">{interestRate}%</div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/10 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Mensualité estimée</span>
          <span className="font-bold text-white">{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}€/mois</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Coût total</span>
          <span className="font-bold text-white">{totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}€</span>
        </div>
      </div>
      
      <Button className="w-full bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90">
        Demander un financement
      </Button>
    </div>
  );
}

export default function VehicleDetailPage() {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const shareMenuRef = React.useRef<HTMLDivElement>(null);
  
  // Close share menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = `Découvrez ce ${vehicle.make} ${vehicle.model} ${vehicle.year} chez VroomCar !`;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };
  
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Breadcrumbs */}
      <div className="container-premium pt-8">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Véhicules", href: "/vehicles" }, { label: `${vehicle.make} ${vehicle.model}` }]} />
      </div>
      
      {/* Main Content */}
      <div className="container-premium py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <Gallery images={vehicle.images} video={vehicle.video} />
            
            {/* Vehicle Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {vehicle.make} {vehicle.model}
                </h1>
                <p className="text-2xl font-bold text-[#A7CD0F]">{vehicle.price.toLocaleString()}€</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "w-12 h-12 rounded-xl border transition-colors flex items-center justify-center",
                    isFavorite
                      ? "border-[#A7CD0F] bg-[#A7CD0F]/20 text-[#A7CD0F]"
                      : "border-white/20 bg-white/5 text-white/60 hover:text-white"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                </button>
                
                <div className="relative" ref={shareMenuRef}>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-12 h-12 rounded-xl border border-white/20 bg-white/5 text-white/60 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 overflow-hidden"
                    >
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        WhatsApp
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Specifications */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-6">Caractéristiques</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <SpecificationCard label="Année" value={vehicle.year.toString()} icon={Calendar} />
                <SpecificationCard label="Kilométrage" value={`${vehicle.mileage} km`} icon={Gauge} />
                <SpecificationCard label="Carburant" value={vehicle.fuel} icon={Fuel} />
                <SpecificationCard label="Transmission" value={vehicle.transmission} icon={Settings2} />
                <SpecificationCard label="Puissance" value={`${vehicle.power} ch`} icon={TrendingUp} />
              </div>
            </div>
            
            {/* Description */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Description</h2>
              <p className="text-white/70 leading-relaxed text-lg">{vehicle.description}</p>
            </div>
            
            {/* Detailed Specifications */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-6">Spécifications techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicle.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white/60">{spec.label}</span>
                    <span className="font-semibold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Equipment */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-6">Équipements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {vehicle.equipment.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Check className="w-5 h-5 text-[#A7CD0F] shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Actions and Calculator */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="p-6 rounded-2xl Gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/10 border border-white/10">
                <div className="text-4xl font-heading font-bold text-white mb-2">
                  {vehicle.price.toLocaleString()}€
                </div>
                <div className="text-white/60 text-sm mb-6">Prix HT</div>
                
                <div className="space-y-3">
                  <Button className="w-full h-12 bg-[#A7CD0F] text-[#101418] hover:bg-[#A7CD0F]/90 font-semibold">
                    Demander un devis
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-[#A7CD0F]/50 text-[#A7CD0F] hover:bg-[#A7CD0F]/10 font-semibold"
                    asChild
                  >
                    <a href={`https://wa.me/2250712345678?text=Bonjour, je suis intéressé par le ${vehicle.make} ${vehicle.model}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-white/20 text-white hover:bg-white/10 font-semibold"
                    asChild
                  >
                    <a href={`tel:+2250123456789`} className="flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      Appeler
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-white/20 text-white hover:bg-white/10 font-semibold"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Réserver un essai
                  </Button>
                </div>
              </div>
              
              {/* Financing Calculator */}
              <FinancingCalculator price={vehicle.price} />
              
              {/* Location Info */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#A7CD0F]" />
                  <h3 className="font-heading font-bold text-white">Localisation</h3>
                </div>
                <p className="text-white/70">{vehicle.location}</p>
                <div className="mt-4 h-32 rounded-xl bg-white/5 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
