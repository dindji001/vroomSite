"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    try {
      await register({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        passwordConfirmation: formData.get("confirmPassword") as string,
        acceptTerms: true,
      });
      router.push("/account");
    } catch (err: any) {
      setError(err.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold">Créer un compte</h1>
          <p className="mt-2 text-muted-foreground">
            Rejoignez VroomCar dès maintenant
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                Prénom
              </label>
              <Input
                id="firstName"
                name="firstName"
                required
                placeholder="Jean"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Nom
              </label>
              <Input
                id="lastName"
                name="lastName"
                required
                placeholder="Dupont"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="vous@exemple.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Mot de passe
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">
              Minimum 8 caractères
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmer le mot de passe
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" name="terms" required className="mt-1" />
            <label className="text-sm text-muted-foreground">
              J'accepte les{" "}
              <Link href="/terms" className="text-[#253E38] hover:underline dark:text-[#A7CD0F]">
                conditions générales
              </Link>{" "}
              et la{" "}
              <Link href="/privacy" className="text-[#253E38] hover:underline dark:text-[#A7CD0F]">
                politique de confidentialité
              </Link>
            </label>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Création..." : "Créer mon compte"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-[#253E38] font-semibold hover:underline dark:text-[#A7CD0F]">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
