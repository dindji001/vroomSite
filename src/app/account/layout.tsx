import type { ReactNode } from "react";
import { AccountSidebar } from "@/components/account/account-sidebar";

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <AccountSidebar />
        </aside>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}
