"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  hrefBuilder?: (page: number) => string;
  className?: string;
  variant?: "filled" | "outline";
}

type PageItem =
  | { type: "page"; page: number }
  | { type: "ellipsis"; key: string };

function buildPageItems(current: number, totalPages: number): PageItem[] {
  const items: PageItem[] = [];
  const siblingCount = 2;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  items.push({ type: "page", page: 1 });

  const leftSiblingStart = Math.max(current - siblingCount, 2);
  const leftSiblingEnd = Math.min(current - 1, totalPages - 1);

  if (leftSiblingStart > 2) {
    items.push({ type: "ellipsis", key: "ellipsis-left" });
  }

  if (leftSiblingStart <= leftSiblingEnd) {
    range(leftSiblingStart, leftSiblingEnd).forEach((p) =>
      items.push({ type: "page", page: p })
    );
  }

  if (current !== 1 && current !== totalPages && totalPages > 2) {
    items.push({ type: "page", page: current });
  }

  const rightSiblingStart = Math.max(current + 1, 2);
  const rightSiblingEnd = Math.min(current + siblingCount, totalPages - 1);

  if (rightSiblingStart <= rightSiblingEnd) {
    range(rightSiblingStart, rightSiblingEnd).forEach((p) =>
      items.push({ type: "page", page: p })
    );
  }

  if (rightSiblingEnd < totalPages - 1) {
    items.push({ type: "ellipsis", key: "ellipsis-right" });
  }

  if (totalPages > 1) {
    items.push({ type: "page", page: totalPages });
  }

  return items;
}

export function Pagination({
  total,
  perPage,
  currentPage,
  onPageChange,
  hrefBuilder,
  className,
  variant = "filled",
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);
  const pages = buildPageItems(safeCurrent, totalPages);

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === safeCurrent) return;
    onPageChange?.(page);
  };

  const baseBtn =
    "group inline-flex items-center justify-center shrink-0 font-semibold transition-all duration-300 ease-[var(--ease-premium)] select-none disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4";

  const sizeClasses = "h-10 md:h-11 w-10 md:w-11 rounded-xl text-sm md:text-base";

  const variantFilledActive = cn(
    "bg-gradient-to-br from-[#253E38] to-[#3a5c54] text-white shadow-[0_6px_18px_-4px_rgba(37,62,56,0.55)] ring-1 ring-[#253E38]/20 scale-105",
    "hover:shadow-[0_10px_28px_-6px_rgba(37,62,56,0.65)] hover:-translate-y-0.5",
    "focus-visible:ring-[#253E38]/30"
  );

  const variantFilledInactive = cn(
    "bg-card border border-border/60 text-foreground hover:border-[#253E38]/30 hover:text-[#253E38] dark:hover:text-[#A7CD0F]",
    "hover:bg-[#253E38]/5 dark:hover:bg-[#A7CD0F]/8 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
    "focus-visible:ring-[#253E38]/20 dark:focus-visible:ring-[#A7CD0F]/20"
  );

  const variantOutlineActive = cn(
    "border-2 border-[#253E38] dark:border-[#A7CD0F] text-[#253E38] dark:text-[#A7CD0F] bg-[#253E38]/5 dark:bg-[#A7CD0F]/10 scale-105",
    "hover:bg-[#253E38]/10 dark:hover:bg-[#A7CD0F]/15",
    "focus-visible:ring-[#253E38]/30 dark:focus-visible:ring-[#A7CD0F]/30"
  );

  const variantOutlineInactive = cn(
    "border-2 border-border/70 text-foreground hover:border-[#253E38]/40 dark:hover:border-[#A7CD0F]/40",
    "hover:text-[#253E38] dark:hover:text-[#A7CD0F] hover:-translate-y-0.5",
    "focus-visible:ring-[#253E38]/20 dark:focus-visible:ring-[#A7CD0F]/20"
  );

  const activeClass = variant === "filled" ? variantFilledActive : variantOutlineActive;
  const inactiveClass = variant === "filled" ? variantFilledInactive : variantOutlineInactive;

  const renderButton = (page: number, isActive: boolean, extraClass?: string) => {
    const content = (
      <span
        className={cn(
          baseBtn,
          sizeClasses,
          isActive ? activeClass : inactiveClass,
          extraClass
        )}
        onClick={() => !isActive && goTo(page)}
        aria-current={isActive ? "page" : undefined}
        aria-label={`Aller à la page ${page}`}
      >
        {page}
      </span>
    );

    if (hrefBuilder && !isActive) {
      return (
        <a key={page} href={hrefBuilder(page)} onClick={(e) => { e.preventDefault(); goTo(page); }}>
          {content}
        </a>
      );
    }
    return <React.Fragment key={page}>{content}</React.Fragment>;
  };

  const renderNavButton = (
    direction: "prev" | "next",
    page: number,
    disabled: boolean
  ) => {
    const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
    const isPrev = direction === "prev";

    return (
      <button
        key={direction}
        type="button"
        onClick={() => goTo(page)}
        disabled={disabled}
        aria-label={isPrev ? "Page précédente" : "Page suivante"}
        className={cn(
          baseBtn,
          sizeClasses,
          "gap-1 md:gap-1.5 px-2 md:px-3 w-auto min-w-[2.5rem] md:min-w-[2.75rem]",
          variant === "filled"
            ? cn(
                "bg-card border border-border/60 text-foreground shadow-sm",
                "hover:border-[#253E38]/30 hover:text-[#253E38] dark:hover:text-[#A7CD0F]",
                "hover:bg-[#253E38]/5 dark:hover:bg-[#A7CD0F]/8 hover:-translate-y-0.5 hover:shadow-md",
                "focus-visible:ring-[#253E38]/20 dark:focus-visible:ring-[#A7CD0F]/20"
              )
            : cn(
                "border-2 border-border/70 text-foreground",
                "hover:border-[#253E38]/40 dark:hover:border-[#A7CD0F]/40",
                "hover:text-[#253E38] dark:hover:text-[#A7CD0F] hover:-translate-y-0.5",
                "focus-visible:ring-[#253E38]/20 dark:focus-visible:ring-[#A7CD0F]/20"
              )
        )}
      >
        <Icon className="size-4 md:size-[1.15rem]" />
        <span className="hidden sm:inline text-sm font-semibold">
          {isPrev ? "Préc." : "Suiv."}
        </span>
      </button>
    );
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("w-full flex items-center justify-center", className)}
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
        {renderNavButton("prev", safeCurrent - 1, safeCurrent <= 1)}

        <div className="flex items-center gap-1 md:gap-1.5">
          {pages.map((item, idx) =>
            item.type === "page" ? (
              renderButton(item.page, item.page === safeCurrent)
            ) : (
              <span
                key={item.key + idx}
                aria-hidden="true"
                className="inline-flex items-center justify-center size-10 md:size-11 text-muted-foreground/70"
              >
                <MoreHorizontal className="size-5" />
              </span>
            )
          )}
        </div>

        {renderNavButton("next", safeCurrent + 1, safeCurrent >= totalPages)}
      </div>
    </nav>
  );
}
