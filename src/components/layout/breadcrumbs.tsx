import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem as BaseBreadcrumbItem } from "@/types";

type BreadcrumbItemExtended = BaseBreadcrumbItem & {
  current?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

interface BreadcrumbsProps {
  items?: BreadcrumbItemExtended[];
  className?: string;
}

export function Breadcrumbs({ items = [], className }: BreadcrumbsProps): React.ReactElement {
  const allItems: BreadcrumbItemExtended[] = [
    { label: "Accueil", href: "/", icon: Home },
    ...items,
  ];

  return (
    <nav
      aria-label="Fil d'Ariane"
      data-slot="breadcrumbs"
      className={cn("w-full", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5 md:gap-2 text-sm font-medium">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isCurrent = item.current ?? isLast;
          const Icon = item.icon;

          const content = (
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition-all duration-300 ease-[var(--ease-premium)]",
                isCurrent
                  ? "text-[#253E38] dark:text-[#A7CD0F] cursor-default"
                  : "text-muted-foreground hover:text-[#253E38] dark:hover:text-[#A7CD0F] hover:bg-[#253E38]/5 dark:hover:bg-[#A7CD0F]/8"
              )}
              aria-current={isCurrent ? "page" : undefined}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    isCurrent && "text-[#253E38] dark:text-[#A7CD0F]"
                  )}
                />
              )}
              <span className="truncate max-w-[200px] md:max-w-none">
                {item.label}
              </span>
            </span>
          );

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 && (
                <ChevronRight
                  className="size-3.5 md:size-4 mx-0.5 text-muted-foreground/50 shrink-0"
                  aria-hidden="true"
                />
              )}
              {item.href && !isCurrent ? (
                <Link href={item.href} className="outline-none focus-visible:ring-2 focus-visible:ring-[#253E38]/30 rounded-xl">
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
