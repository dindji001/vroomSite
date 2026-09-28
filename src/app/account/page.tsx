import { authApi } from "@/services/api/auth";
import { ordersApi } from "@/services/api/commerce";
import { useAuthStore } from "@/store/auth-store";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  try {
    const user = await authApi.me();

    if (!user) {
      redirect("/login");
    }

    const orders = await ordersApi.list({
      page: 1,
      limit: 10,
    });

    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Mon Compte</h1>
          <p className="mt-2 text-muted-foreground">
            Bienvenue, {user.firstName} {user.lastName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card border border-border rounded-2xl">
            <h3 className="font-heading font-bold">Commandes récentes</h3>
            <p className="mt-2 text-3xl font-bold">{orders.metadata?.total || 0}</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-2xl">
            <h3 className="font-heading font-bold">Favoris</h3>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-2xl">
            <h3 className="font-heading font-bold">Adresses</h3>
            <p className="mt-2 text-3xl font-bold">Gérez vos adresses</p>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold">Informations personnelles</h2>
          <div className="mt-4 p-6 bg-card border border-border rounded-2xl space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nom complet</p>
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            {user.phone && (
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            )}
          </div>
        </div>

        {orders.data.length > 0 && (
          <div>
            <h2 className="font-heading text-xl font-bold">Commandes récentes</h2>
            <div className="mt-4 space-y-4">
              {orders.data.map((order) => (
                <div
                  key={order.id}
                  className="p-6 bg-card border border-border rounded-2xl flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">Commande #{order.number}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.status}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.grandTotal.amount} {order.grandTotal.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  } catch {
    redirect("/login");
  }
}
