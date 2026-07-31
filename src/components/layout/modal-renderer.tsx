"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUIStore, type UIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

type ModalKind = keyof UIStore["ui"]["modals"];

function ModalShell({
  open,
  onClose,
  title,
  subtitle,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[150] flex items-end md:items-center justify-center p-0 md:p-6 transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full rounded-t-3xl md:rounded-[2rem] border border-border/60 bg-background shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-[slideUpIn_.32s_ease-[var(--ease-premium)]]",
          sizeClasses[size]
        )}
      >
        {(title || subtitle) && (
          <header className="flex items-start gap-4 px-5 md:px-7 pt-5 md:pt-6 pb-4 border-b border-border/40">
            <div className="flex-1 min-w-0">
              {title && (
                <h2 className="font-heading font-bold text-xl md:text-2xl leading-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Fermer"
              onClick={onClose}
              className="shrink-0"
            >
              <X className="size-5" />
            </Button>
          </header>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function LoginModalContent({ onClose, openRegister }: { onClose: () => void; openRegister: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  return (
    <form
      className="p-5 md:p-7 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          onClose();
        }, 1200);
      }}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Mot de passe
            </label>
            <button
              type="button"
              onClick={() => {
                onClose();
                useUIStore.getState().openModal("forgot_password");
              }}
              className="text-xs font-semibold text-[#253E38] dark:text-[#A7CD0F] hover:underline"
            >
              Oublié ?
            </button>
          </div>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button variant="primary" className="w-full h-12" type="submit" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-background px-3 text-muted-foreground">Ou continuer avec</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Button variant="outline" type="button">Google</Button>
        <Button variant="outline" type="button">Apple</Button>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <button
          type="button"
          onClick={() => {
            onClose();
            openRegister();
          }}
          className="font-semibold text-[#253E38] dark:text-[#A7CD0F] hover:underline"
        >
          Créer un compte
        </button>
      </p>
    </form>
  );
}

function RegisterModalContent({ onClose, openLogin }: { onClose: () => void; openLogin: () => void }) {
  const [loading, setLoading] = React.useState(false);
  return (
    <form
      className="p-5 md:p-7 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          onClose();
        }, 1200);
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Prénom</label>
          <Input placeholder="Jean" required />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Nom</label>
          <Input placeholder="Dupont" required />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Email</label>
        <Input type="email" placeholder="vous@exemple.com" required />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Mot de passe</label>
        <Input type="password" placeholder="10+ caractères" required />
      </div>
      <Button variant="primary" className="w-full h-12" type="submit" disabled={loading}>
        {loading ? "Inscription..." : "Créer mon compte"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Déjà inscrit ?{" "}
        <button
          type="button"
          onClick={() => {
            onClose();
            openLogin();
          }}
          className="font-semibold text-[#253E38] dark:text-[#A7CD0F] hover:underline"
        >
          Se connecter
        </button>
      </p>
    </form>
  );
}

function ForgotPasswordContent({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = React.useState(false);
  return (
    <form
      className="p-5 md:p-7 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {sent ? (
        <div className="text-center py-6">
          <div className="size-16 rounded-3xl bg-success/15 text-success flex items-center justify-center mx-auto mb-4">
            ✓
          </div>
          <h3 className="font-heading font-bold text-xl mb-2">Email envoyé</h3>
          <p className="text-sm text-muted-foreground mb-5">
            Consultez votre boîte mail pour réinitialiser votre mot de passe.
          </p>
          <Button variant="primary" onClick={onClose} type="button" className="w-full">
            J&apos;ai compris
          </Button>
        </div>
      ) : (
        <>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Email du compte
            </label>
            <Input type="email" placeholder="vous@exemple.com" required />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Un lien de réinitialisation vous sera envoyé par email. Il expirera au bout de 30 minutes.
          </p>
          <Button variant="primary" className="w-full h-12" type="submit">
            Envoyer le lien
          </Button>
        </>
      )}
    </form>
  );
}

function GenericModalContent({ kind }: { kind: ModalKind }) {
  const labels: Partial<Record<ModalKind, { title: string; desc: string }>> = {
    share: { title: "Partager", desc: "Envoyez cette page à un contact." },
    gallery: { title: "Galerie photos", desc: "Parcourez les images du véhicule." },
    appointment: { title: "Prendre rendez-vous", desc: "Choisissez un créneau pour votre visite ou essai." },
    referral: { title: "Programme Parrainage", desc: "Invitez vos amis et gagnez des récompenses." },
    checkout_login: { title: "Identification paiement", desc: "Connectez-vous pour finaliser votre commande." },
    vehicle_reserve: { title: "Réserver ce véhicule", desc: "Bloquez ce véhicule 30 minutes le temps de finaliser." },
    vehicle_test_drive: { title: "Demander un essai", desc: "Planifiez un essai à domicile ou en concession." },
    vehicle_inquiry: { title: "Nous contacter sur ce véhicule", desc: "Nos experts vous répondent sous 2h." },
    vehicle_quick_view: { title: "Aperçu rapide", desc: "Informations clés du véhicule." },
    product_quick_view: { title: "Aperçu produit", desc: "Détails et options du produit." },
    locale_currency: { title: "Langue & Devise", desc: "Personnalisez votre expérience." },
    search_global: { title: "Recherche", desc: "Recherchez dans toute la plateforme." },
    filters_vehicles: { title: "Filtres véhicules", desc: "Affinez votre sélection." },
    filters_products: { title: "Filtres boutique", desc: "Affinez votre sélection." },
  };
  const l = labels[kind] ?? { title: "Fenêtre", desc: "" };
  return (
    <div className="p-5 md:p-7">
      <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
        <h3 className="font-heading font-bold text-lg mb-2">{l.title}</h3>
        <p className="text-sm text-muted-foreground">{l.desc}</p>
        <div className="mt-5 h-40 rounded-2xl bg-muted/60" />
      </div>
    </div>
  );
}

export function ModalRenderer() {
  const modals = useUIStore((s) => s.ui?.modals) || {};
  const closeModal = useUIStore((s) => s.closeModal);
  const openModal = useUIStore((s) => s.openModal);

  const entries = Object.entries(modals) as [ModalKind, { open: boolean; data?: Record<string, unknown> }][];
  const current = entries.find(([, m]) => m.open);
  const [kind, state] = current ?? [null, null];

  const onClose = React.useCallback(() => kind && closeModal(kind as any), [kind, closeModal]);

  if (!kind || !state) return null;

  let title: React.ReactNode = null;
  let subtitle: React.ReactNode = null;
  let body: React.ReactNode = null;
  let size: "sm" | "md" | "lg" | "xl" = "md";

  switch (kind) {
    case "login":
      title = "Connexion";
      subtitle = "Accédez à votre espace membre VroomCar.";
      body = (
        <LoginModalContent
          onClose={onClose}
          openRegister={() => openModal("register")}
        />
      );
      break;
    case "register":
      title = "Créer un compte";
      subtitle = "Rejoignez le Cercle Privé VroomCar en moins d'une minute.";
      body = (
        <RegisterModalContent
          onClose={onClose}
          openLogin={() => openModal("login")}
        />
      );
      break;
    case "forgot_password":
      title = "Mot de passe oublié";
      subtitle = "Réinitialisez votre accès en quelques clics.";
      body = <ForgotPasswordContent onClose={onClose} />;
      size = "sm";
      break;
    default:
      body = <GenericModalContent kind={kind} />;
      size = "md";
  }

  return (
    <ModalShell
      open
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      size={size}
    >
      {body}
    </ModalShell>
  );
}

export default ModalRenderer;
