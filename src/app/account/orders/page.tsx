import { ordersApi } from "@/services/api/commerce";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format";

export default async function OrdersPage() {
  const orders = await ordersApi.list({
    page: 1,
    limit: 10,
  });

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

      {orders.data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune commande</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.data.map((order) => (
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
