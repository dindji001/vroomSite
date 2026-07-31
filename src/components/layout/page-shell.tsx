"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  variant?: "default" | "marketing" | "shop" | "auth" | "dashboard";
  title?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  header?: React.ReactNode;
  showBreadcrumbs?: boolean;
  gradient?: boolean;
  glass?: boolean;
};

const variantStyles: Record<NonNullable<PageShellProps["variant"]>, { bg: string; accent: string }> = {
  default: {
    bg: "from-[#253E38]/5 via-transparent to-transparent dark:from-[#A7CD0F]/8",
    accent: "text-[#253E38] dark:text-[#A7CD0F]",
  },
  marketing: {
    bg: "from-[#253E38]/8 via-[#253E38]/2 to-transparent dark:from-[#A7CD0F]/12 dark:via-[#A7CD0F]/3",
    accent: "text-[#253E38] dark:text-[#A7CD0F]",
  },
  shop: {
    bg: "from-[#FEB300]/8 via-[#FEB300]/2 to-transparent dark:from-[#FEB300]/10",
    accent: "text-[#FEB300]",
  },
  auth: {
    bg: "from-[#253E38]/6 via-transparent to-transparent dark:from-[#A7CD0F]/8",
    accent: "text-[#253E38] dark:text-[#A7CD0F]",
  },
  dashboard: {
    bg: "from-[#253E38]/6 via-transparent to-transparent dark:from-[#A7CD0F]/8",
    accent: "text-[#253E38] dark:text-[#A7CD0F]",
  },
};

export function PageShell({
  children,
  className,
  contentClassName,
  headerClassName,
  variant = "default",
  title,
  description,
  eyebrow,
  header,
  showBreadcrumbs = true,
  gradient = true,
  glass = true,
}: PageShellProps) {
  const styles = variantStyles[variant];
  const hasHeader = title || description || eyebrow || header || showBreadcrumbs;

  return (
    <div className={cn("relative flex-1 flex flex-col", className)}>
      {hasHeader && (
        <section
          className={cn(
            "relative overflow-hidden border-b border-border/40",
            gradient && `bg-gradient-to-b ${styles.bg}`
          )}
        >
          {gradient && (
            <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background:radial-gradient(60%_60%_at_50%_0%,rgba(37,62,56,0.12),transparent)] dark:[background:radial-gradient(60%_60%_at_50%_0%,rgba(167,205,15,0.14),transparent)]" />
          )}
          <div
            className={cn(
              "container-premium relative py-8 md:py-12 lg:py-14",
              headerClassName
            )}
          >
            {showBreadcrumbs && (
              <div className="mb-5 md:mb-7">
                <Breadcrumbs />
              </div>
            )}
            {header ? (
              header
            ) : (
              <div className="max-w-3xl">
                {eyebrow && (
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.16em] mb-4",
                      styles.accent
                    )}
                  >
                    {eyebrow}
                  </div>
                )}
                {title && (
                  <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mt-4 md:mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
      <div
        className={cn(
          "container-premium flex-1 py-8 md:py-10 lg:py-12",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function GroupHeader({
  title,
  description,
  eyebrow,
  variant = "marketing",
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  variant?: NonNullable<PageShellProps["variant"]>;
  className?: string;
}) {
  const styles = variantStyles[variant];
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.16em] mb-4",
            styles.accent
          )}
        >
          {eyebrow}
        </div>
      )}
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
        {title}
      </h1>
      {description && (
        <p className="mt-4 md:mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

export default PageShell;
