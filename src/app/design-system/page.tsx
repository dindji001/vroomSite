"use client"

import * as React from "react"
import {
  Heart,
  ShoppingCart,
  ArrowRight,
  Check,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Mail,
  Search,
  User,
  Phone,
  ChevronRight,
  CarFront,
  Star,
  Package,
  MapPin,
  CreditCard,
  Shield,
  Award,
  Truck,
  Palette,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardActions,
  Input,
  Textarea,
  Select,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  AlertAction,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonList,
  ThemeToggle,
  PricingCard,
  PricingCardHeader,
  PricingCardPrice,
  PricingCardFeatures,
  PricingCardFeature,
  PricingCardFooter,
  VehicleCard,
  ProductCard,
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  Spinner,
  LoadingOverlay,
  LoadingButton,
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  HoverCard,
  HoverGlow,
  HoverBorderGradient,
  HoverScale,
  slideUp,
  staggerContainer,
  staggerItem,
} from "@/components"

const SectionHeader: React.FC<{ eyebrow: string; title: string; description?: string }> = ({
  eyebrow,
  title,
  description,
}) => (
  <MotionDiv variants={slideUp} className="mb-12 md:mb-16">
    <div className="inline-flex items-center gap-2 rounded-full bg-[#253E38]/8 dark:bg-[#A7CD0F]/12 px-4 py-1.5 mb-4">
      <span className="size-1.5 rounded-full bg-[#253E38] dark:bg-[#A7CD0F] animate-pulse-soft" />
      <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#253E38] dark:text-[#A7CD0F]">
        {eyebrow}
      </span>
    </div>
    <MotionH2 variants={slideUp} className="text-balance">
      {title}
    </MotionH2>
    {description && (
      <MotionP variants={slideUp} className="mt-4 max-w-2xl text-lg">
        {description}
      </MotionP>
    )}
  </MotionDiv>
)

const Section: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({
  id,
  children,
  className,
}) => (
  <MotionSection
    id={id}
    variants={staggerContainer(0.08)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className={`scroll-mt-24 py-16 md:py-24 border-t border-border/40 first:border-t-0 ${className ?? ""}`}
  >
    <div className="container-premium">{children}</div>
  </MotionSection>
)

export default function DesignSystemPage() {
  const [showLoading, setShowLoading] = React.useState(false)
  const [loadingBtn, setLoadingBtn] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      <LoadingOverlay
        visible={showLoading}
        text="Chargement du Design System..."
      />

      <header className="sticky top-0 z-50 glass-strong border-b border-border/40">
        <div className="container-premium h-16 md:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 md:size-11 rounded-2xl bg-[linear-gradient(135deg,#253E38,#3a5c54)] flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(37,62,56,0.5)]">
              <CarFront className="size-5 md:size-[1.35rem] text-white" />
            </div>
            <div>
              <div className="font-heading text-lg md:text-xl font-bold tracking-tight">
                VroomCar
              </div>
              <div className="text-xs text-muted-foreground font-medium -mt-0.5">
                Design System v1.0
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLoading(true)}
              className="hidden sm:inline-flex"
            >
              Tester Loading
            </Button>
            <ThemeToggle variant="menu" size="md" />
          </div>
        </div>
      </header>

      <main id="main-content">
        <Section id="hero" className="!pt-12 md:!pt-20">
          <MotionDiv variants={staggerContainer(0.1)} className="max-w-4xl">
            <MotionDiv variants={staggerItem(0)} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#253E38]/10 via-[#A7CD0F]/10 to-[#FEB300]/10 border border-[#253E38]/15 dark:border-[#A7CD0F]/20 px-4 py-2 mb-6">
              <Sparkles className="size-4 text-[#FEB300]" />
              <span className="text-sm font-semibold text-[#253E38] dark:text-[#A7CD0F]">
                Design System Premium — Inspiré Tesla, Mercedes-Benz, Porsche, Apple
              </span>
            </MotionDiv>
            <MotionH1 variants={staggerItem(0.05)} className="text-balance max-w-3xl">
              L&apos;excellence du{" "}
              <span className="text-gradient-luxury">Design Automobile</span>
            </MotionH1>
            <MotionP variants={staggerItem(0.1)} className="mt-6 max-w-2xl text-xl leading-relaxed">
              Un système de design complet, réutilisable et extrêmement premium.
              Chaque composant est conçu pour inspirer confiance, élégance et performance.
            </MotionP>
            <MotionDiv variants={staggerItem(0.15)} className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="gap-2">
                Explorer les composants
                <ArrowRight className="size-4.5" />
              </Button>
              <Button variant="outline" size="lg">
                Documentation
              </Button>
            </MotionDiv>
          </MotionDiv>
        </Section>

        <Section id="colors">
          <SectionHeader
            eyebrow="01 — Palette"
            title="Couleurs & Identité Visuelle"
            description="Une palette sophistiquée inspirée des plus grandes marques automobiles. Le vert profond évoque la nature et l'innovation, le vert clair la performance durable, et l'or l'exclusivité."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { name: "Primary", hex: "#253E38", text: "text-white", bg: "bg-[#253E38]" },
              { name: "Secondary", hex: "#A7CD0F", text: "text-[#101418]", bg: "bg-[#A7CD0F]" },
              { name: "Accent", hex: "#FEB300", text: "text-[#101418]", bg: "bg-[#FEB300]" },
              { name: "Dark", hex: "#101418", text: "text-white", bg: "bg-[#101418]" },
              { name: "Light", hex: "#F8FAFC", text: "text-[#101418]", bg: "bg-[#F8FAFC] border border-border" },
              { name: "Success", hex: "#10B981", text: "text-white", bg: "bg-success" },
            ].map((c, i) => (
              <MotionDiv key={c.name} variants={staggerItem(i * 0.06)}>
                <HoverScale shadowIntensity="lg" className="h-full">
                  <div className={`${c.bg} rounded-3xl aspect-[4/3] flex items-end p-5 shadow-lg`}>
                    <div className="size-10 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      <Palette className={`size-5 ${c.text}`} />
                    </div>
                  </div>
                  <div className="mt-4 px-1">
                    <div className="font-heading text-lg font-bold">{c.name}</div>
                    <div className="text-sm font-mono text-muted-foreground">{c.hex}</div>
                  </div>
                </HoverScale>
              </MotionDiv>
            ))}
          </div>
        </Section>

        <Section id="typography">
          <SectionHeader
            eyebrow="02 — Typographie"
            title="Hiérarchie Typographique"
            description="Inter pour le corps de texte (lisibilité optimale) et Space Grotesk pour les titres (personnalité distinctive). Un mariage parfait entre modernité et élégance."
          />
          <div className="grid lg:grid-cols-2 gap-8">
            <Card variant="elevated" className="p-8 space-y-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Heading 1 — Display
                </div>
                <h1>The quick brown fox</h1>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Heading 2 — Section
                </div>
                <h2>jumps over the lazy dog</h2>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Heading 3 — Sub-section
                </div>
                <h3>Élégance et performance</h3>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Heading 4
                </div>
                <h4>Détails qui font la différence</h4>
              </div>
            </Card>
            <Card variant="elevated" className="p-8 space-y-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Body Large — 18px
                </div>
                <p className="text-lg leading-relaxed">
                  Chez VroomCar, chaque véhicule est sélectionné avec le plus grand soin.
                  Notre engagement : vous offrir une expérience automobile digne des plus
                  grandes marques. Qualité, transparence et excellence.
                </p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Body — 16px
                </div>
                <p className="leading-relaxed">
                  Service client disponible 7j/7. Garantie constructeur étendue.
                  Financement personnalisé. Livraison à domicile incluse.
                </p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Small — 14px
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  *Conditions applicables. Véhicules disponibles en stock. Offre valable
                  dans la limite des stocks. Consultez nos CGV pour plus de détails.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border/40">
                <Badge variant="primary" size="lg">
                  Premium
                </Badge>
                <Badge variant="secondary" size="lg">
                  Certified
                </Badge>
                <Badge variant="accent" size="lg">
                  Exclusive
                </Badge>
                <Badge variant="outline" size="lg">
                  Garantie 24 mois
                </Badge>
              </div>
            </Card>
          </div>
        </Section>

        <Section id="buttons">
          <SectionHeader
            eyebrow="03 — Composants"
            title="Boutons & Call-to-Action"
            description="Des boutons premium avec animations fluides, effets de brillance et micro-interactions. Chaque CTA est conçu pour maximiser la conversion tout en restant élégant."
          />
          <div className="space-y-10">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-5">
                Variants — Taille Large
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" className="gap-2">
                  Primary
                  <ArrowRight className="size-4.5" />
                </Button>
                <Button variant="secondary" size="lg" className="gap-2">
                  <ShoppingCart className="size-4.5" />
                  Secondary
                </Button>
                <Button variant="accent" size="lg" className="gap-2">
                  <Sparkles className="size-4.5" />
                  Accent
                </Button>
                <Button variant="outline" size="lg">
                  Outline
                </Button>
                <Button variant="ghost" size="lg">
                  Ghost
                </Button>
                <Button variant="glass" size="lg">
                  Glass
                </Button>
                <Button variant="destructive" size="lg">
                  Destructive
                </Button>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-5">
                Sizes
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="xs">
                  XS
                </Button>
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
                <Button variant="primary" size="xl">
                  Extra Large
                </Button>
                <Button variant="primary" size="icon-sm" aria-label="Icon sm">
                  <Heart className="size-4" />
                </Button>
                <Button variant="primary" size="icon" aria-label="Icon md">
                  <Heart className="size-5" />
                </Button>
                <Button variant="primary" size="icon-lg" aria-label="Icon lg">
                  <Heart className="size-6" />
                </Button>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-5">
                Loading States
              </div>
              <div className="flex flex-wrap gap-4">
                <LoadingButton
                  loading={loadingBtn}
                  onClick={() => {
                    setLoadingBtn(true)
                    setTimeout(() => setLoadingBtn(false), 2000)
                  }}
                  size="lg"
                >
                  Cliquer pour charger
                </LoadingButton>
                <LoadingButton variant="secondary" loading size="lg">
                  Chargement...
                </LoadingButton>
                <LoadingButton variant="accent" loading size="lg">
                  Veuillez patienter
                </LoadingButton>
              </div>
            </div>
          </div>
        </Section>

        <Section id="cards">
          <SectionHeader
            eyebrow="04 — Cartes"
            title="Cards Premium"
            description="Des cartes multi-variantes avec effets de profondeur, glassmorphism et animations hover sophistiquées. Parfaites pour véhicules, produits, tarifs et contenus marketing."
          />
          <div className="space-y-16">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                Card Variants
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
                {(["default", "elevated", "glass", "outlined", "featured"] as const).map((v, i) => (
                  <MotionDiv key={v} variants={staggerItem(i * 0.06)}>
                    <Card variant={v} className="h-full">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit capitalize">
                          {v}
                        </Badge>
                        <CardTitle className="capitalize">{v} Card</CardTitle>
                        <CardDescription>
                          Variante {v} idéale pour les interfaces premium.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Animations fluides, ombres dynamiques et transitions
                          élégantes.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <CardActions>
                          <Button size="sm">Action</Button>
                        </CardActions>
                      </CardFooter>
                    </Card>
                  </MotionDiv>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                Vehicle Cards — Véhicules Premium
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <VehicleCard
                  make="Porsche"
                  model="Taycan Turbo S"
                  year={2025}
                  price={189000}
                  mileage="1 200"
                  fuel="Électrique"
                  transmission="Automatique"
                  power="761 ch"
                  status="new"
                  isFavorite={false}
                />
                <VehicleCard
                  make="Mercedes-Benz"
                  model="S-Class AMG"
                  year={2024}
                  price={142500}
                  mileage="8 500"
                  fuel="Hybride"
                  transmission="Automatique"
                  power="802 ch"
                  status="pre-owned"
                  isFavorite={true}
                />
                <VehicleCard
                  make="BMW"
                  model="i7 M70 xDrive"
                  year={2024}
                  price={138900}
                  mileage="12 300"
                  fuel="Électrique"
                  transmission="Automatique"
                  power="660 ch"
                  status="pre-owned"
                  isFavorite={false}
                />
              </div>
            </div>

            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                Product Cards — Accessoires & Produits
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ProductCard
                  name="Chargeur Wallbox Premium 22kW"
                  category="Accessoires"
                  originalPrice={1290}
                  salePrice={990}
                  rating={4.8}
                  reviewCount={247}
                  colors={[
                    { name: "Noir", value: "#101418" },
                    { name: "Blanc", value: "#F8FAFC" },
                    { name: "Vert", value: "#253E38" },
                  ]}
                  stock="in"
                />
                <ProductCard
                  name="Kit Nettoyage Ceramic Pro"
                  category="Entretien"
                  originalPrice={249}
                  salePrice={189}
                  rating={4.9}
                  reviewCount={512}
                  colors={[{ name: "Default", value: "#A7CD0F" }]}
                  stock="low"
                />
                <ProductCard
                  name="Pneus Michelin Pilot Sport 4S"
                  category="Pneus"
                  price={329}
                  rating={4.7}
                  reviewCount={891}
                  colors={[{ name: "Noir", value: "#101418" }]}
                  stock="in"
                />
                <ProductCard
                  name="Tapis de Sol Sur-Mesure"
                  category="Intérieur"
                  price={459}
                  rating={4.6}
                  reviewCount={178}
                  colors={[
                    { name: "Noir", value: "#101418" },
                    { name: "Cognac", value: "#8B4513" },
                    { name: "Beige", value: "#D4B896" },
                    { name: "Rouge", value: "#8B0000" },
                  ]}
                  stock="out"
                />
              </div>
            </div>

            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                Pricing Cards — Abonnements & Services
              </div>
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
                <PricingCard tier="basic">
                  <PricingCardHeader
                    tier="basic"
                    title="Essential"
                    description="L'accès premium pour commencer votre expérience VroomCar."
                  />
                  <PricingCardPrice price={49} priceAnnual={470} period="/mo" isAnnual={false} />
                  <PricingCardFeatures>
                    <PricingCardFeature>Consultation véhicules illimitée</PricingCardFeature>
                    <PricingCardFeature>Alertes nouveautés par email</PricingCardFeature>
                    <PricingCardFeature>Garantie 12 mois incluse</PricingCardFeature>
                    <PricingCardFeature included={false}>Essai routier à domicile</PricingCardFeature>
                    <PricingCardFeature included={false}>Service conciergerie VIP</PricingCardFeature>
                  </PricingCardFeatures>
                  <PricingCardFooter tier="basic" ctaLabel="Choisir Essential" />
                </PricingCard>

                <PricingCard tier="pro" featured savePercent={20}>
                  <PricingCardHeader
                    tier="pro"
                    title="Prestige"
                    description="L'expérience ultime pour les amateurs d'automobiles d'exception."
                  />
                  <PricingCardPrice price={99} priceAnnual={950} period="/mo" isAnnual={false} />
                  <PricingCardFeatures>
                    <PricingCardFeature>Tout le pack Essential</PricingCardFeature>
                    <PricingCardFeature>Essais routiers à domicile illimités</PricingCardFeature>
                    <PricingCardFeature>Garantie 24 mois extension</PricingCardFeature>
                    <PricingCardFeature>Service conciergerie VIP 24/7</PricingCardFeature>
                    <PricingCardFeature>Financement pré-approuvé</PricingCardFeature>
                  </PricingCardFeatures>
                  <PricingCardFooter tier="pro" ctaLabel="Choisir Prestige" />
                </PricingCard>

                <PricingCard tier="enterprise">
                  <PricingCardHeader
                    tier="enterprise"
                    title="Collection"
                    description="Pour les collectionneurs et entreprises exigeant l'excellence absolue."
                  />
                  <PricingCardPrice price={249} priceAnnual={2390} period="/mo" isAnnual={false} />
                  <PricingCardFeatures>
                    <PricingCardFeature>Tout le pack Prestige</PricingCardFeature>
                    <PricingCardFeature>Gestion de portefeuille véhicules</PricingCardFeature>
                    <PricingCardFeature>Accès avant-première stock privé</PricingCardFeature>
                    <PricingCardFeature>Expertise dédiée 1:1</PricingCardFeature>
                    <PricingCardFeature>Livraison africaine blanche</PricingCardFeature>
                  </PricingCardFeatures>
                  <PricingCardFooter tier="enterprise" ctaLabel="Nous contacter" />
                </PricingCard>
              </div>
            </div>
          </div>
        </Section>

        <Section id="inputs">
          <SectionHeader
            eyebrow="05 — Formulaires"
            title="Inputs & Champs de Saisie"
            description="Champs de formulaire élégants avec floating labels, icônes contextuelles et états d'erreur accessibles. Une expérience de saisie fluide et premium."
          />
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
            <Card variant="elevated" className="p-8 space-y-6">
              <CardTitle className="!text-xl">Input Variants</CardTitle>
              <Input variant="default" floatingLabel="Nom complet" placeholder=" " />
              <Input variant="filled" floatingLabel="Email professionnel" leadingIcon={<Mail className="size-5" />} placeholder=" " />
              <Input variant="outlined" floatingLabel="Rechercher un véhicule" trailingIcon={<Search className="size-5" />} placeholder=" " />
              <Input variant="glass" floatingLabel="Téléphone" leadingIcon={<Phone className="size-5" />} placeholder=" " error="Ce numéro est déjà utilisé" />
              <div>
                <label className="text-sm font-semibold text-foreground/80 mb-2 block">
                  Select
                </label>
                <Select variant="default">
                  <option>Type de véhicule</option>
                  <option>Berline</option>
                  <option>SUV</option>
                  <option>Coupe</option>
                  <option>Cabriolet</option>
                </Select>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground/80 mb-2 block">
                  Message
                </label>
                <Textarea placeholder="Décrivez votre projet automobile..." rows={4} />
              </div>
            </Card>
            <Card variant="elevated" className="p-8 space-y-6">
              <CardTitle className="!text-xl">Formulaire d&apos;inscription</CardTitle>
              <div className="grid md:grid-cols-2 gap-5">
                <Input variant="filled" floatingLabel="Prénom" leadingIcon={<User className="size-5" />} placeholder=" " />
                <Input variant="filled" floatingLabel="Nom" placeholder=" " />
              </div>
              <Input variant="filled" floatingLabel="Adresse email" leadingIcon={<Mail className="size-5" />} placeholder=" " />
              <Input variant="filled" floatingLabel="Mot de passe" placeholder=" " />
              <div className="grid md:grid-cols-2 gap-5">
                <Select variant="filled">
                  <option>Pays de résidence</option>
                  <option>Côte d'Ivoire</option>
                  <option>Sénégal</option>
                  <option>Mali</option>
                  <option>Burkina Faso</option>
                  <option>Ghana</option>
                </Select>
                <Input variant="filled" floatingLabel="Code postal" placeholder=" " />
              </div>
              <Button size="lg" className="w-full gap-2 mt-2">
                <Sparkles className="size-5" />
                Créer mon compte premium
              </Button>
            </Card>
          </div>
        </Section>

        <Section id="badges-alerts">
          <SectionHeader
            eyebrow="06 — Statuts"
            title="Badges & Alertes"
            description="Système de statuts complet pour communiquer efficacement : succès, avertissements, erreurs, informations. Accessibles, animés et parfaitement intégrés au thème."
          />
          <div className="space-y-12">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-5">
                Badge Variants
              </div>
              <div className="flex flex-wrap gap-4">
                <Badge variant="primary" size="lg" className="gap-1.5">
                  <Sparkles className="size-4" />
                  New 2025
                </Badge>
                <Badge variant="secondary" size="lg" className="gap-1.5">
                  <Check className="size-4" />
                  Certified
                </Badge>
                <Badge variant="accent" size="lg" className="gap-1.5">
                  <Award className="size-4" />
                  Premium
                </Badge>
                <Badge variant="success" size="lg" className="gap-1.5">
                  <CheckCircle2 className="size-4" />
                  Disponible
                </Badge>
                <Badge variant="warning" size="lg" className="gap-1.5">
                  <AlertTriangle className="size-4" />
                  Stock Limité
                </Badge>
                <Badge variant="info" size="lg" className="gap-1.5">
                  <Info className="size-4" />
                  Info
                </Badge>
                <Badge variant="destructive" size="lg" className="gap-1.5">
                  <AlertCircle className="size-4" />
                  Urgent
                </Badge>
                <Badge variant="outline" size="lg">
                  Garantie 24 mois
                </Badge>
                <Badge variant="dot" size="lg">
                  En direct
                </Badge>
                <Badge variant="glass" size="lg" className="gap-1.5">
                  <Shield className="size-4" />
                  Garantie
                </Badge>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Alert variant="info">
                <div className="flex items-start gap-4">
                  <AlertIcon className="bg-info/15 text-info">
                    <Info className="size-6" />
                  </AlertIcon>
                  <div className="flex-1 min-w-0">
                    <AlertTitle>Information importante</AlertTitle>
                    <AlertDescription>
                      Nouveauté 2025 : livraison africaine offerte pour toute commande supérieure à 30 000 000 FCFA.
                    </AlertDescription>
                  </div>
                  <AlertAction>
                    <Button variant="ghost" size="sm">En savoir plus</Button>
                  </AlertAction>
                </div>
              </Alert>
              <Alert variant="success">
                <div className="flex items-start gap-4">
                  <AlertIcon className="bg-success/15 text-success">
                    <CheckCircle2 className="size-6" />
                  </AlertIcon>
                  <div className="flex-1 min-w-0">
                    <AlertTitle>Réservation confirmée</AlertTitle>
                    <AlertDescription>
                      Votre Porsche Taycan Turbo S est réservée. Un conseiller vous contactera sous 2h.
                    </AlertDescription>
                  </div>
                  <AlertAction>
                    <Badge variant="success">Succès</Badge>
                  </AlertAction>
                </div>
              </Alert>
              <Alert variant="warning">
                <div className="flex items-start gap-4">
                  <AlertIcon className="bg-warning/15 text-warning">
                    <AlertTriangle className="size-6" />
                  </AlertIcon>
                  <div className="flex-1 min-w-0">
                    <AlertTitle>Stock presque épuisé</AlertTitle>
                    <AlertDescription>
                      Plus que 2 Mercedes-AMG S-Class disponibles à ce tarif. Ne tardez pas !
                    </AlertDescription>
                  </div>
                  <AlertAction>
                    <Button variant="accent" size="sm">Réserver</Button>
                  </AlertAction>
                </div>
              </Alert>
              <Alert variant="destructive">
                <div className="flex items-start gap-4">
                  <AlertIcon className="bg-destructive/15 text-destructive">
                    <AlertCircle className="size-6" />
                  </AlertIcon>
                  <div className="flex-1 min-w-0">
                    <AlertTitle>Erreur de paiement</AlertTitle>
                    <AlertDescription>
                      Votre carte a été refusée. Veuillez vérifier vos informations ou utiliser un autre moyen de paiement.
                    </AlertDescription>
                  </div>
                  <AlertAction>
                    <Button variant="destructive" size="sm">Réessayer</Button>
                  </AlertAction>
                </div>
              </Alert>
              <Alert variant="premium" className="md:col-span-2">
                <div className="flex items-start gap-4">
                  <AlertIcon className="bg-white/15 text-white">
                    <Sparkles className="size-6" />
                  </AlertIcon>
                  <div className="flex-1 min-w-0">
                    <AlertTitle className="text-white">
                      Offre Exclusive — Collection Privée
                    </AlertTitle>
                    <AlertDescription className="text-white/85">
                      Accès anticipé aux nouveautés 2025, prix membre et conciergerie dédiée.
                      Disponible uniquement pour les clients Prestige pendant 48h.
                    </AlertDescription>
                  </div>
                  <AlertAction>
                    <Button variant="accent" size="lg" className="gap-2">
                      <CreditCard className="size-5" />
                      Profiter de l&apos;offre
                    </Button>
                  </AlertAction>
                </div>
              </Alert>
            </div>
          </div>
        </Section>

        <Section id="timeline">
          <SectionHeader
            eyebrow="07 — Processus"
            title="Timeline & Parcours Client"
            description="Visualisez les étapes d'un processus : réservation, livraison, historique d'achat. Multi-variantes, multi-orientations et entièrement animées."
          />
          <div className="space-y-16 max-w-4xl mx-auto">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                Parcours d&apos;Achat — Vertical Gradient
              </div>
              <Timeline variant="gradient-line" align="left" orientation="vertical">
                {[
                  {
                    date: "Étape 01",
                    title: "Sélection & Configuration",
                    desc: "Choisissez votre véhicule et personnalisez chaque détail selon vos préférences.",
                    status: "completed" as const,
                    icon: <CarFront className="size-5" />,
                  },
                  {
                    date: "Étape 02",
                    title: "Validation & Financement",
                    desc: "Notre équipe valide votre dossier et vous propose les meilleures solutions de financement.",
                    status: "completed" as const,
                    icon: <CreditCard className="size-5" />,
                  },
                  {
                    date: "Étape 03",
                    title: "Préparation & Expertise",
                    desc: "Nos experts préparent votre véhicule et effectuent un contrôle qualité point par point.",
                    status: "current" as const,
                    icon: <Shield className="size-5" />,
                  },
                  {
                    date: "Étape 04",
                    title: "Livraison Premium",
                    desc: "Livraison à domicile ou rendez-vous VIP dans nos locaux. Signature et remise des clés.",
                    status: "pending" as const,
                    icon: <Truck className="size-5" />,
                  },
                ].map((item, i) => (
                  <TimelineItem key={i} index={i} orientation="vertical" align="left">
                    <TimelineDot
                      status={item.status}
                      orientation="vertical"
                      align="left"
                      itemIndex={i}
                      icon={item.icon}
                    />
                    <TimelineContent date={item.date} title={item.title} description={item.desc} />
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </div>
        </Section>

        <Section id="carousel">
          <SectionHeader
            eyebrow="08 — Galeries"
            title="Carousel & Hero Sliders"
            description="Carrousels multi-variants avec autoplay, flèches animées, dots interactifs et barre de progression. Support Spotlight, Cards, Fade et Gallery."
          />
          <div className="space-y-12">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                Variant Spotlight — Véhicules en Vedette
              </div>
              <Carousel
                variant="spotlight"
                autoplay
                autoplayInterval={6000}
                opts={{ align: "center", containScroll: "trimSnaps" }}
                className="rounded-3xl"
              >
                <CarouselContent>
                  {[
                    { name: "Rivian R1S", tag: "SUV Électrique", price: "89 900", gradient: "from-[#253E38] via-[#3a5c54] to-[#1e322e]" },
                    { name: "Tesla Model S Plaid", tag: "Berline Sport", price: "138 990", gradient: "from-[#101418] via-[#252d36] to-[#1a2027]" },
                    { name: "Porsche 911 GT3", tag: "Sportive Légende", price: "239 000", gradient: "from-[#253E38] via-[#A7CD0F]/30 to-[#FEB300]/20" },
                    { name: "BMW M5 Touring", tag: "Break Performance", price: "142 500", gradient: "from-[#1a2027] via-[#253E38] to-[#252d36]" },
                  ].map((item, i) => (
                    <CarouselItem key={i} index={i}>
                      <div className={`relative aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br ${item.gradient} shadow-2xl`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CarFront className="size-32 md:size-48 text-white/15" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                          <Badge variant="glass" size="lg" className="mb-4">
                            {item.tag}
                          </Badge>
                          <h3 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-2">
                            {item.name}
                          </h3>
                          <div className="flex items-end justify-between flex-wrap gap-4 mt-4">
                            <div>
                              <div className="text-sm font-semibold text-white/70 mb-1">À partir de</div>
                              <div className="font-heading text-3xl md:text-4xl font-bold text-gradient-luxury">
                                {item.price} FCFA
                              </div>
                            </div>
                            <Button variant="secondary" size="lg" className="gap-2">
                              Découvrir
                              <ArrowRight className="size-4.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselDots className="!pt-8" />
              </Carousel>
            </div>

            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                Variant Cards — Services Premium
              </div>
              <Carousel variant="cards" opts={{ align: "start", containScroll: "trimSnaps" }}>
                <CarouselContent>
                  {[
                    { icon: Truck, title: "Livraison Domicile", desc: "Livraison incluse dans toute l'Europe sous 15 jours ouvrés.", color: "#253E38" },
                    { icon: Shield, title: "Garantie Premium", desc: "Garantie 24 mois extension sur tous nos véhicules certifiés.", color: "#A7CD0F" },
                    { icon: CreditCard, title: "Financement Flex", desc: "Solutions de financement personnalisées, leasing ou LOA.", color: "#FEB300" },
                    { icon: User, title: "Conseiller Dédié", desc: "Un expert unique vous accompagne de A à Z dans votre projet.", color: "#253E38" },
                    { icon: Award, title: "Véhicules Certifiés", desc: "Contrôle 150 points pour chaque véhicule mis en vente.", color: "#A7CD0F" },
                    { icon: MapPin, title: "Essai Domicile", desc: "Essayez le véhicule de vos rêves sans vous déplacer.", color: "#FEB300" },
                  ].map((svc, i) => (
                    <CarouselItem key={i} index={i}>
                      <HoverCard maxTilt={6} scale={1.02}>
                        <Card variant="featured" className="h-full !p-8">
                          <div
                            className="size-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                            style={{
                              backgroundColor: `${svc.color}15`,
                              color: svc.color,
                            }}
                          >
                            <svc.icon className="size-7" />
                          </div>
                          <CardTitle className="!mb-3">{svc.title}</CardTitle>
                          <CardDescription className="!text-base">{svc.desc}</CardDescription>
                          <CardFooter className="!pt-6 !px-0 !pb-0">
                            <CardActions>
                              <Button variant="ghost" className="gap-1.5 px-0">
                                En savoir plus
                                <ChevronRight className="size-4" />
                              </Button>
                            </CardActions>
                          </CardFooter>
                        </Card>
                      </HoverCard>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselDots className="!pt-8" />
              </Carousel>
            </div>
          </div>
        </Section>

        <Section id="hover-animations">
          <SectionHeader
            eyebrow="09 — Micro-interactions"
            title="Hover Effects & Animations"
            description="Effets d'interaction sophistiqués : 3D tilt, glow dynamique, gradient border animé, scale smooth. Parfaits pour les cartes et CTA premium."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MotionDiv variants={staggerItem(0)}>
              <div className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#253E38] dark:bg-[#A7CD0F]" />
                HoverCard 3D Tilt
              </div>
              <HoverCard maxTilt={12} scale={1.04}>
                <Card variant="featured" className="aspect-[4/5] flex flex-col items-center justify-center text-center p-8">
                  <div className="size-16 rounded-2xl bg-gradient-to-br from-[#253E38] to-[#3a5c54] flex items-center justify-center shadow-xl mb-5">
                    <Sparkles className="size-8 text-white" />
                  </div>
                  <CardTitle className="!mb-2">3D Tilt Effect</CardTitle>
                  <CardDescription>Passez la souris pour incliner la carte en temps réel.</CardDescription>
                </Card>
              </HoverCard>
            </MotionDiv>
            <MotionDiv variants={staggerItem(0.06)}>
              <div className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#253E38] dark:bg-[#A7CD0F]" />
                HoverGlow Radial
              </div>
              <HoverGlow color="#A7CD0F" size={350} opacity={0.25}>
                <Card variant="elevated" className="aspect-[4/5] flex flex-col items-center justify-center text-center p-8">
                  <div className="size-16 rounded-2xl bg-gradient-to-br from-[#A7CD0F] to-[#89a80d] flex items-center justify-center shadow-xl mb-5">
                    <Star className="size-8 text-[#101418]" />
                  </div>
                  <CardTitle className="!mb-2">Radial Glow</CardTitle>
                  <CardDescription>Une lueur suit votre curseur à la perfection.</CardDescription>
                </Card>
              </HoverGlow>
            </MotionDiv>
            <MotionDiv variants={staggerItem(0.12)}>
              <div className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#253E38] dark:bg-[#A7CD0F]" />
                HoverBorderGradient
              </div>
              <HoverBorderGradient
                colors={["#253E38", "#A7CD0F", "#FEB300", "#253E38"]}
                thickness={2.5}
              >
                <Card variant="default" className="aspect-[4/5] flex flex-col items-center justify-center text-center p-8 !border-0 !rounded-3xl">
                  <div className="size-16 rounded-2xl bg-gradient-to-br from-[#FEB300] to-[#d99700] flex items-center justify-center shadow-xl mb-5">
                    <Award className="size-8 text-[#101418]" />
                  </div>
                  <CardTitle className="!mb-2">Gradient Border</CardTitle>
                  <CardDescription>Bordure animée en dégradé conique au survol.</CardDescription>
                </Card>
              </HoverBorderGradient>
            </MotionDiv>
            <MotionDiv variants={staggerItem(0.18)}>
              <div className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#253E38] dark:bg-[#A7CD0F]" />
                HoverScale Smooth
              </div>
              <HoverScale scale={1.06} shadowIntensity="xl">
                <Card variant="glass" className="aspect-[4/5] flex flex-col items-center justify-center text-center p-8">
                  <div className="size-16 rounded-2xl glass-strong flex items-center justify-center shadow-xl mb-5 text-[#253E38] dark:text-[#A7CD0F]">
                    <Package className="size-8" />
                  </div>
                  <CardTitle className="!mb-2">Scale & Shadow</CardTitle>
                  <CardDescription>Élévation et zoom fluide avec ombre dynamique.</CardDescription>
                </Card>
              </HoverScale>
            </MotionDiv>
          </div>
        </Section>

        <Section id="loading-skeleton">
          <SectionHeader
            eyebrow="10 — États de Chargement"
            title="Spinners, Skeletons & Loading"
            description="Système complet d'états transitoires : spinners multi-variants, skeletons text/card/list, overlay global et boutons avec indicateur. Une expérience premium même pendant l'attente."
          />
          <div className="space-y-12">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                Spinner Variants
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {([
                  ["default", "Dual Ring"],
                  ["primary", "Primary"],
                  ["secondary", "Secondary"],
                  ["accent", "Accent"],
                  ["dots", "Dots Bounce"],
                  ["pulse", "Pulse"],
                  ["ring", "Simple Ring"],
                  ["gradient", "Gradient"],
                  ["bars", "Bars"],
                ] as const).map(([v, label], i) => (
                  <MotionDiv
                    key={v}
                    variants={staggerItem(i * 0.05)}
                    className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-card border border-border/60 shadow-sm hover:shadow-md transition-all"
                  >
                    <Spinner variant={v} size="xl" />
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {label}
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                Skeleton States
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-4">
                    Skeleton Card
                  </div>
                  <SkeletonCard />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-4">
                    Skeleton List
                  </div>
                  <Card variant="default" className="p-6">
                    <SkeletonList items={5} contentLines={1} />
                  </Card>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-4">
                      Skeleton Profile
                    </div>
                    <Card variant="default" className="p-6">
                      <div className="flex items-start gap-5">
                        <SkeletonAvatar size="lg" />
                        <div className="flex-1 space-y-3 pt-2">
                          <Skeleton variant="text" className="h-6 w-1/2" />
                          <Skeleton variant="text" className="h-4 w-1/3" />
                          <div className="flex gap-2 pt-2">
                            <Skeleton className="h-8 w-24 rounded-xl" />
                            <Skeleton className="h-8 w-20 rounded-xl" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-4">
                      Skeleton Shapes
                    </div>
                    <Card variant="default" className="p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <Skeleton variant="circular" className="size-12" />
                        <Skeleton variant="thumbnail" className="size-16" />
                        <Skeleton variant="avatar" className="size-12" />
                        <Skeleton variant="pulse" className="size-12 rounded-xl" />
                      </div>
                      <SkeletonText lines={2} />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="spacing-shadow">
          <SectionHeader
            eyebrow="11 — Tokens"
            title="Espacement, Ombres & Arrondis"
            description="Les tokens qui forment la base du Design System. Un système cohérent et responsive, inspiré des plus grands constructeurs automobiles."
          />
          <div className="grid lg:grid-cols-3 gap-8">
            <Card variant="elevated" className="p-8">
              <CardTitle className="!text-xl !mb-8">Spacing Scale</CardTitle>
              <div className="space-y-4">
                {[
                  ["tight", "clamp(0.5rem, 1vw, 1rem)"],
                  ["cozy", "clamp(1rem, 2vw, 1.5rem)"],
                  ["roomy", "clamp(1.5rem, 4vw, 3rem)"],
                  ["spacious", "clamp(2.5rem, 6vw, 5rem)"],
                  ["grand", "clamp(4rem, 10vw, 8rem)"],
                ].map(([name, val], i) => (
                  <div key={name} className="group">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="font-bold capitalize">{name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{val}</span>
                    </div>
                    <div className="relative h-10 rounded-xl bg-muted overflow-hidden">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#253E38] via-[#A7CD0F] to-[#FEB300] rounded-xl transition-all duration-500 group-hover:shadow-lg"
                        style={{
                          width: `${20 + i * 16}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card variant="elevated" className="p-8">
              <CardTitle className="!text-xl !mb-8">Border Radius</CardTitle>
              <div className="grid grid-cols-2 gap-5">
                {[
                  ["sm", "0.375rem"],
                  ["md", "0.625rem"],
                  ["lg", "1rem"],
                  ["xl", "1.5rem"],
                  ["2xl", "2rem"],
                  ["3xl", "2.5rem"],
                  ["full", "9999px"],
                ].map(([name, val], i) => (
                  <div key={name} className="flex flex-col items-center gap-3">
                    <div
                      className="w-full aspect-square bg-gradient-to-br from-[#253E38]/10 to-[#A7CD0F]/20 border-2 border-[#253E38]/20 dark:border-[#A7CD0F]/20 flex items-center justify-center transition-all hover:scale-105 hover:shadow-lg"
                      style={{ borderRadius: val }}
                    >
                      <div
                        className="size-10 bg-gradient-to-br from-[#253E38] to-[#3a5c54] flex items-center justify-center text-white font-bold text-xs"
                        style={{ borderRadius: `calc(${val} * 0.4)` }}
                      >
                        {i + 1}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-sm capitalize">{name}</div>
                      <div className="font-mono text-xs text-muted-foreground">{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card variant="elevated" className="p-8">
              <CardTitle className="!text-xl !mb-8">Shadow System</CardTitle>
              <div className="space-y-4">
                {[
                  ["xs", "var(--shadow-xs)"],
                  ["sm", "var(--shadow-sm)"],
                  ["md", "var(--shadow-md)"],
                  ["lg", "var(--shadow-lg)"],
                  ["xl", "var(--shadow-xl)"],
                  ["2xl", "var(--shadow-2xl)"],
                  ["premium", "var(--shadow-premium)"],
                ].map(([name, val]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40 hover:border-[#253E38]/20 transition-all"
                    style={{ boxShadow: val }}
                  >
                    <span className="font-bold capitalize text-sm">{name}</span>
                    <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                      {val.replace("var(", "").replace(")", "")}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        <Section id="glass-theme">
          <SectionHeader
            eyebrow="12 — Thèmes"
            title="Glassmorphism & Dark/Light Mode"
            description="Glassmorphism ultra-premium pour les overlays et navigation. Thème sombre et clair parfaitement adaptés avec toggle fluide et transition sans flash."
          />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#253E38] via-[#3a5c54] to-[#1e322e]" />
              <div className="absolute top-10 left-10 size-32 rounded-full bg-[#A7CD0F] blur-3xl opacity-50 animate-float" />
              <div className="absolute bottom-12 right-12 size-40 rounded-full bg-[#FEB300] blur-3xl opacity-60 animate-float" style={{ animationDelay: "2s" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
                <div className="glass-strong rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="size-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Shield className="size-7 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-heading text-xl font-bold">Protection Premium</div>
                      <div className="text-white/70 text-sm">Glassmorphism Card</div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    {["Assurance tous risques", "Assistance 0km 24/7", "Véhicule de remplacement"].map((t) => (
                      <div key={t} className="flex items-center gap-3 text-white/90">
                        <div className="size-6 rounded-full bg-[#A7CD0F] flex items-center justify-center">
                          <Check className="size-3.5 text-[#101418]" />
                        </div>
                        <span className="font-medium">{t}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="secondary" size="lg" className="w-full">
                    Activer la protection
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-6 rounded-3xl bg-card border border-border/60 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-[#F8FAFC] border border-border flex items-center justify-center">
                    <Sun className="size-6 text-[#FEB300]" />
                  </div>
                  <div>
                    <div className="font-heading font-bold">Light Mode</div>
                    <div className="text-sm text-muted-foreground">Clair, épuré, lisibilité optimale</div>
                  </div>
                </div>
                <ThemeToggle variant="icon" size="md" />
              </div>

              <div className="flex items-center justify-between p-6 rounded-3xl bg-[#101418] border border-white/10 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-[#1a2027] border border-white/10 flex items-center justify-center">
                    <Moon className="size-6 text-[#A7CD0F]" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white">Dark Mode</div>
                    <div className="text-sm text-white/60">Immersif, premium, réduction fatigue oculaire</div>
                  </div>
                </div>
                <div className="size-11 rounded-xl bg-[#253E38] text-white flex items-center justify-center shadow-lg">
                  <Moon className="size-5" />
                </div>
              </div>

              <div className="p-6 rounded-3xl glass border border-white/30 shadow-premium">
                <div className="flex items-center gap-4 mb-4">
                  <div className="size-12 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center">
                    <Monitor className="size-6 text-[#253E38]" />
                  </div>
                  <div>
                    <div className="font-heading font-bold">System Mode</div>
                    <div className="text-sm text-muted-foreground">Synchronisé avec les préférences du système</div>
                  </div>
                </div>
                <ThemeToggle variant="menu" showLabel />
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#253E38] via-[#3a5c54] to-[#253E38] shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-heading font-bold text-white">Theme Switch — Toggle</div>
                    <div className="text-sm text-white/70">Animation spring, indicateur visuel</div>
                  </div>
                  <ThemeToggle variant="switch" size="lg" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="footer" className="!pb-24">
          <Card variant="featured" className="p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 right-0 size-64 bg-[#A7CD0F] rounded-full blur-3xl opacity-15 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 size-72 bg-[#FEB300] rounded-full blur-3xl opacity-15 translate-y-1/2 -translate-x-1/2" />
            <div className="relative max-w-3xl mx-auto">
              <Badge variant="accent" size="lg" className="gap-1.5 mb-6">
                <Sparkles className="size-4" />
                Design System Prêt à l&apos;Emploi
              </Badge>
              <MotionH2 variants={slideUp} className="text-balance">
                Construisez l&apos;excellence automobile avec le{" "}
                <span className="text-gradient-luxury">Design System VroomCar</span>
              </MotionH2>
              <MotionP variants={slideUp} className="mt-6 text-lg max-w-2xl mx-auto">
                Plus de 50 composants premium, tokens cohérents, animations fluides et dark mode natif.
                Intégrez le prestige des plus grandes marques directement dans votre produit.
              </MotionP>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <Button size="xl" className="gap-2">
                  Commencer maintenant
                  <ArrowRight className="size-5" />
                </Button>
                <Button variant="outline" size="xl">
                  Voir sur GitHub
                </Button>
              </div>
            </div>
          </Card>
        </Section>
      </main>

      <footer className="border-t border-border/40 py-12 bg-card/50">
        <div className="container-premium flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gradient-to-br from-[#253E38] to-[#3a5c54] flex items-center justify-center shadow-md">
              <CarFront className="size-4.5 text-white" />
            </div>
            <div>
              <div className="font-heading font-bold">VroomCar Design System</div>
              <div className="text-xs text-muted-foreground">
                © 2025 — Crafted with excellence. Version 1.0.0
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <span>Tailwind CSS 4</span>
            <span>•</span>
            <span>Framer Motion</span>
            <span>•</span>
            <span>GSAP</span>
            <span>•</span>
            <span>Shadcn UI</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
