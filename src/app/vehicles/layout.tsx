import type { ReactNode } from "react";

interface VehiclesLayoutProps {
  children: ReactNode;
}

export default function VehiclesLayout({ children }: VehiclesLayoutProps) {
  return <main className="min-h-[calc(100vh-80px)]">{children}</main>;
}
