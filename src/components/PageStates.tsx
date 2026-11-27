// src/components/PageStates.tsx
// Estados reutilizables de las páginas internas: vacío y cargando.
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export function EmptyState({
  icon: Icon,
  title,
  text,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  text?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center rounded-[2rem] bg-muted px-6 py-16 text-center md:py-20", className)}>
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card text-primary shadow-sm">
        <Icon className="h-8 w-8" />
      </span>
      <p className="mt-5 font-headline text-2xl font-extrabold uppercase">{title}</p>
      {text && <p className="mt-2 max-w-md text-muted-foreground">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/** Mismo layout que la grilla del catálogo. */
export const productGridClass = "grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className={productGridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}
