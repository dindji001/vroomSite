import type { ReactNode } from "react";

interface ProductsLayoutProps {
  children: ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return <main className="min-h-[calc(100vh-80px)]">{children}</main>;
}
