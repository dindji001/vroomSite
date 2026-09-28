import { notFound } from "next/navigation";
import { productsApi } from "@/services/api/products";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductCard } from "@/components/cards/product-card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await productsApi.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await productsApi.related(product.id, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Boutique", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden mb-6">
            {product.images?.[0] && (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-heading text-4xl font-bold">{product.name}</h1>
              <p className="mt-2 text-2xl font-semibold text-[#253E38] dark:text-[#A7CD0F]">
                {formatCurrency(product.price.amount, product.price.currency)}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold">Description</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.attributes && product.attributes.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-bold">Caractéristiques</h2>
                <div className="mt-2 space-y-2">
                  {product.attributes.map((attr) => (
                    <div key={attr.attributeId} className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">{attr.attribute?.name}</span>
                      <span className="font-medium">{String(attr.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.brand && (
              <div>
                <h2 className="font-heading text-xl font-bold">Marque</h2>
                <p className="mt-2">{product.brand.name}</p>
              </div>
            )}

            {product.category && (
              <div>
                <h2 className="font-heading text-xl font-bold">Catégorie</h2>
                <p className="mt-2">{product.category.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="p-6 bg-card border border-border rounded-2xl">
              <p className="text-3xl font-bold text-[#253E38] dark:text-[#A7CD0F]">
                {formatCurrency(product.price.amount, product.price.currency)}
              </p>
              <div className="mt-4 space-y-3">
                <Button className="w-full" size="lg">
                  Ajouter au panier
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Ajouter aux favoris
                </Button>
              </div>

              {product.stock !== undefined && (
                <div className="mt-4 text-sm">
                  <span className="text-muted-foreground">Stock:</span>{" "}
                  <span className={product.stock > 0 ? "text-success" : "text-destructive"}>
                    {product.stock > 0 ? `${product.stock} disponibles` : "Rupture de stock"}
                  </span>
                </div>
              )}
            </div>

            {product.compatibleVehicleIds && product.compatibleVehicleIds.length > 0 && (
              <div className="p-6 bg-card border border-border rounded-2xl">
                <h3 className="font-heading font-bold">Véhicules compatibles</h3>
                <div className="mt-4 space-y-2 text-sm">
                  {product.compatibleVehicleIds.map((vId: string) => (
                    <p key={vId}>{vId}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold">Produits similaires</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                originalPrice={p.compareAtPrice?.amount}
                salePrice={p.price.amount}
                currency={p.price.currency === "XOF" ? "FCFA" : "$"}
                category={p.category?.name}
                image={p.images[0]?.url}
                href={`/products/${p.slug}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
