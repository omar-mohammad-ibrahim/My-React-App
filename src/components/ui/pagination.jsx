import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1.5", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }) {
  return <li className={cn("", className)} {...props} />;
}

// زر الترقيم مستقل بالكامل بدون أي اعتماد على ملفات خارجية
function PaginationLink({ className, isActive, size = "icon", ...props }) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all select-none cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        size === "icon" ? "size-9" : "h-9 px-3",
        isActive
          ? "bg-primary text-primary-foreground font-bold shadow-sm"
          : "border border-border bg-card text-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

// زر السابق مع دعم RTL التلقائي
function PaginationPrevious({ className, text = "Previous", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1.5 ps-2.5 pe-3", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
      <span className="hidden sm:inline">{text}</span>
    </PaginationLink>
  );
}

// زر التالي مع دعم RTL التلقائي
function PaginationNext({ className, text = "Next", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1.5 pe-2.5 ps-3", className)}
      {...props}
    >
      <span className="hidden sm:inline">{text}</span>
      <ChevronRight className="h-4 w-4 rtl:rotate-180" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-9 items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
