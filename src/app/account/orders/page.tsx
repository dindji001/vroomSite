"use client";

import * as React from "react";
import { ordersApi } from "@/services/api/commerce";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format";

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    
    async function fetchOrders() {
      try {
        const response = await ordersApi.list({
          page: 1,
          limit: 10,
        });
        setOrders(response.data);
      } catch (err) {
        setError("Impossible de charger les commandes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Mon Compte", href: "/account" },
            { label: "Mes Commandes" },
          ]}
        />

        <div>
          <h1 className="font-heading text-3xl font-bold">Mes Commandes</h1>
          <p className="mt-2 text-muted-foreground">
            Consultez l'historique de vos commandes
          </p>
        </div>

        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Mon Compte", href: "/account" },
          { label: "Mes Commandes" },
        ]}
      />

      <div>
        <h1 className="font-heading text-3xl font-bold">Mes Commandes</h1>
        <p className="mt-2 text-muted-foreground">
          Consultez l'historique de vos commandes
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune commande</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 bg-card border border-border rounded-2xl"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <p className="font-heading font-bold text-lg">
                    Commande #{order.number}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    <p className="font-semibold">{formatCurrency(order.grandTotal.amount, order.grandTotal.currency)}</p>
                  </p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                  {order.invoices && order.invoices.length > 0 && (
                    <Button variant="outline" size="sm">
                      Factures
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
