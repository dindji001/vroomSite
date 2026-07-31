"use client";

import * as React from "react";
import Link from "next/link";
import {
  CarFront,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck,
  Award,
  Truck,
  HeadphonesIcon,
  ChevronRight,
  ArrowRight,
  Heart,
  Sparkles,
  Share2,
  Globe,
  Download,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks";

const footerColumns = [
  {
    heading: "Véhicules",
    links: [
      { label: "Tous les véhicules", href: "/vehicles" },
      { label: "Véhicules neufs", href: "/vehicles?condition=new" },
      { label: "Véhicules certifiés", href: "/vehicles?certified=true" },
      { label: "100% Électriques", href: "/vehicles?fuel=electric" },
      { label: "Véhicules d'occasion", href: "/vehicles?condition=used" },
      { label: "Dernières nouveautés", href: "/vehicles?sort=created_desc" },
      { label: "Comparateur", href: "/compare" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Conciergerie VIP", href: "/services" },
      { label: "Financement LOA/LLD", href: "/financing" },
      { label: "Crédit auto", href: "/financing/credit" },
      { label: "Reprise de véhicule", href: "/trade-in" },
      { label: "Essai à domicile", href: "/appointment/test-drive" },
      { label: "Garantie Premium", href: "/services/warranty" },
      { label: "Estimation en ligne", href: "/trade-in/estimate" },
    ],
  },
  {
    heading: "Boutique",
    links: [
      { label: "Accessoires auto", href: "/products?category=accessories" },
      { label: "Pneumatiques", href: "/products?category=tires" },
      { label: "Entretien & Soin", href: "/products?category=care" },
      { label: "Électronique embarquée", href: "/products?category=electronics" },
      { label: "Équipement intérieur", href: "/products?category=interior" },
      { label: "Performance", href: "/products?category=performance" },
      { label: "Promotions", href: "/products?onSale=true" },
    ],
  },
  {
    heading: "VroomCar",
    links: [
      { label: "Qui sommes-nous ?", href: "/about" },
      { label: "Notre engagement qualité", href: "/about/quality" },
      { label: "Marques & Véhicules", href: "/brands" },
      { label: "Blog & Conseils", href: "/blog" },
      { label: "Recrutement", href: "/careers" },
      { label: "Presse & Actualités", href: "/press" },
      { label: "Nos concessions", href: "/locations" },
    ],
  },
  {
    heading: "Assistance",
    links: [
      { label: "Centre d'aide", href: "/help" },
      { label: "FAQ", href: "/help/faq" },
      { label: "Contact & Formulaire", href: "/contact" },
      { label: "Suivi de commande", href: "/account/orders" },
      { label: "Retours & Remboursements", href: "/help/returns" },
      { label: "Livraison & Expédition", href: "/help/shipping" },
      { label: "Signaler un problème", href: "/support/new" },
    ],
  },
];

const paymentMethods = [
  { name: "Visa", pattern: "bg-[#1A1F71]/5" },
  { name: "Mastercard", pattern: "bg-gradient-to-r from-[#EB001B]/10 via-[#FF5F00]/10 to-[#F79E1B]/10" },
  { name: "American Express", pattern: "bg-[#006FCF]/5" },
  { name: "Apple Pay", pattern: "bg-[#000]/5" },
  { name: "Google Pay", pattern: "bg-[#4285F4]/5" },
  { name: "PayPal", pattern: "bg-[#003087]/5" },
  { name: "Klarna", pattern: "bg-[#FFB3C7]/10" },
  { name: "Bancontact", pattern: "bg-[#FFD520]/10" },
  { name: "Virement SEPA", pattern: "bg-[#10B981]/5" },
];

const securityBadges = [
  { name: "SSL Secure", icon: ShieldCheck },
  { name: "Paiement 3-D Secure", icon: CreditCard },
  { name: "Garantie Acheteur", icon: Award },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-card/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#253E38]/40 dark:via-[#A7CD0F]/40 to-transparent" />

      <div className="container-premium py-14 md:py-20 relative">
        <section className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden mb-14 md:mb-20 bg-gradient-to-br from-[#253E38] via-[#3a5c54] to-[#253E38] dark:from-[#1e322e] dark:via-[#253E38] dark:to-[#1a2027] text-white p-8 md:p-12 lg:p-16">
          <div className="absolute -top-32 -right-24 size-[28rem] bg-[#A7CD0F] rounded-full blur-3xl opacity-25 animate-float" />
          <div className="absolute -bottom-40 -left-28 size-[32rem] bg-[#FEB300] rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
          <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-16 items-center">
            <div>
              <Badge variant="accent" size="lg" className="gap-1.5 mb-5">
                <Sparkles className="size-4" />
                VroomCar Privé
              </Badge>
              <h3 className="font-heading text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] max-w-2xl">
                Rejoignez le cercle privé et recevez les offres{" "}
                <span className="text-gradient-luxury inline-block">avant tout le monde</span>
              </h3>
              <p className="mt-5 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
                Accès anticipé véhicules, prix membres exclusifs, invitations événements privé et newsletter luxe hebdomadaire. 100% gratuit, désinscription en un clic.
              </p>
              <div className="mt-8 max-w-lg">
                <NewsletterForm />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs md:text-sm text-white/70">
                {securityBadges.map((b) => (
                  <div key={b.name} className="inline-flex items-center gap-1.5">
                    <b.icon className="size-4 text-[#A7CD0F]" />
                    {b.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: Truck, title: "Livraison Europe", desc: "Express 15 jours max" },
                { icon: ShieldCheck, title: "Garantie 24 mois", desc: "Premium extensible" },
                { icon: Award, title: "+120 pts contrôle", desc: "Certification qualité" },
                { icon: HeadphonesIcon, title: "Concierge 7j/7", desc: "Experts à votre service" },
              ].map((feat) => (
                <div
                  key={feat.title}
                  className="rounded-3xl bg-white/10 backdrop-blur-md p-5 md:p-6 border border-white/15 hover:bg-white/15 transition-colors shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]"
                >
                  <div className="size-11 rounded-2xl bg-[#A7CD0F]/20 text-[#A7CD0F] flex items-center justify-center mb-4">
                    <feat.icon className="size-5.5" />
                  </div>
                  <div className="font-heading font-bold text-lg">{feat.title}</div>
                  <div className="mt-1 text-sm text-white/70">{feat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          <div className="col-span-2 lg:col-span-1 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="size-10 md:size-11 rounded-2xl bg-gradient-to-br from-[#253E38] to-[#3a5c54] dark:from-[#A7CD0F] dark:to-[#7d9b0a] flex items-center justify-center shadow-glow-primary group-hover:scale-[1.03] transition-transform">
                <CarFront className="size-5 text-white dark:text-[#101418]" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg md:text-xl leading-tight">
                  VroomCar
                </div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground -mt-0.5">
                  Excellence
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              La plateforme automobile premium pour véhicules d&apos;exception. Concession digitale inspirée des plus grandes marques.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${siteConfig.legal.email.support}`}
                className="inline-flex items-center gap-2.5 text-muted-foreground hover:text-[#253E38] dark:hover:text-[#A7CD0F] transition-colors"
              >
                <Mail className="size-4" />
                {siteConfig.legal.email.support}
              </a>
              <a
                href={`tel:${siteConfig.legal.phones.support}`}
                className="inline-flex items-center gap-2.5 text-muted-foreground hover:text-[#253E38] dark:hover:text-[#A7CD0F] transition-colors"
              >
                <Phone className="size-4" />
                {siteConfig.legal.phones.support}
              </a>
              <div className="inline-flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="size-4 mt-0.5 shrink-0" />
                <span className="leading-snug">
                  {siteConfig.legal.address.line1},<br />
                  {siteConfig.legal.address.postalCode} {siteConfig.legal.address.city},<br />
                  {siteConfig.legal.address.country}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/brochure.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/60 bg-card text-muted-foreground hover:text-[#253E38] hover:border-[#253E38]/30 hover:shadow-md dark:hover:text-[#A7CD0F] dark:hover:border-[#A7CD0F]/30 transition-all text-sm"
              >
                <Download className="size-4" />
                <span className="hidden sm:inline">Brochure</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="size-10 rounded-xl border border-border/60 bg-card flex items-center justify-center text-muted-foreground hover:text-[#253E38] hover:border-[#253E38]/30 hover:shadow-md dark:hover:text-[#A7CD0F] dark:hover:border-[#A7CD0F]/30 transition-all"
              >
                <Share2 className="size-4.5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="size-10 rounded-xl border border-border/60 bg-card flex items-center justify-center text-muted-foreground hover:text-[#253E38] hover:border-[#253E38]/30 hover:shadow-md dark:hover:text-[#A7CD0F] dark:hover:border-[#A7CD0F]/30 transition-all"
              >
                <Globe className="size-4.5" />
              </a>
              <ThemeToggle variant="icon" size="md" />
            </div>
          </div>

          {footerColumns.slice(0, 4).map((col) => (
            <FooterColumn key={col.heading} heading={col.heading} links={col.links} />
          ))}

          <div className="col-span-2 md:col-span-1 space-y-5">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground px-0.5">
              {footerColumns[4].heading}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-0.5">
              {footerColumns[4].links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform inline-flex">
                    <ChevronRight className="size-3.5 opacity-0 group-hover:opacity-100 -ml-1" />
                  </span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-border/40">
        <div className="container-premium py-6 md:py-7 flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2">
              Paiement
            </span>
            {paymentMethods.map((p) => (
              <div
                key={p.name}
                title={p.name}
                className={cn(
                  "h-9 md:h-10 min-w-14 md:min-w-16 rounded-xl border border-border/60 flex items-center justify-center px-2.5 font-heading font-bold text-[11px] md:text-xs tracking-wide",
                  p.pattern
                )}
              >
                {p.name.length > 10 ? p.name.slice(0, 7) + "…" : p.name}
              </div>
            ))}
          </div>

          <div className="lg:ml-auto flex flex-col lg:flex-row items-start lg:items-center gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/legal/terms" className="hover:text-foreground">CGV</Link>
              <Link href="/legal/privacy" className="hover:text-foreground">Confidentialité</Link>
              <Link href="/legal/cookies" className="hover:text-foreground">Cookies</Link>
              <Link href="/legal/accessibility" className="hover:text-foreground">Accessibilité</Link>
              <Link href="/sitemap.xml" className="hover:text-foreground">Plan du site</Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span>{siteConfig.legal.companyName} — {siteConfig.legal.siret}</span>
              <span>TVA {siteConfig.legal.tvaNumber}</span>
              <span className="inline-flex items-center gap-1.5">
                Fait avec <Heart className="size-3.5 text-destructive fill-destructive animate-pulse-soft" /> à Paris
              </span>
            </div>
            <span>© {new Date().getFullYear()} Tous droits réservés</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: Array<{ label: string; href: string; badge?: string }> }) {
  return (
    <div className="space-y-4">
      <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground px-0.5">
        {heading}
      </div>
      <div className="space-y-0.5">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group inline-flex items-center gap-1.5 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="group-hover:translate-x-0.5 transition-transform inline-flex">
              <ChevronRight className="size-3.5 opacity-0 group-hover:opacity-100 -ml-1" />
            </span>
            <span className="flex-1">{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Veuillez saisir une adresse email valide.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Inscription confirmée. Bienvenue dans le Cercle Privé VroomCar !", "Merci 👋");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-muted-foreground/70" />
        <Input
          variant="filled"
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="!h-12 md:!h-14 pl-12 pr-5 text-[15px] !bg-white/12 !border-white/20 !text-white placeholder:text-white/60 focus:!border-[#A7CD0F] focus-within:!bg-white/15"
          required
        />
      </div>
      <Button
        variant="accent"
        size="lg"
        type="submit"
        disabled={loading}
        className="h-12 md:h-14 px-6 md:px-7 gap-2 shrink-0"
      >
        {loading ? "Inscription..." : "S'inscrire"}
        {!loading && <ArrowRight className="size-4.5" />}
      </Button>
    </form>
  );
}

export default Footer;
