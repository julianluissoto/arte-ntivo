// src/components/AdminHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Newspaper, Package, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SectionHeading } from "./HomeSections";
import { EmptyState } from "./PageStates";

const tabs = [
  { href: "/admin", label: "Productos", icon: Package },
  { href: "/admin/news", label: "Novedades", icon: Newspaper },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

/** Título + pestañas de navegación del panel de administración. */
export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const pathname = usePathname();
  return (
    <div>
      <SectionHeading as="h1" eyebrow="Administración" title={title} subtitle={subtitle} className="md:mb-6" />
      <nav className="no-scrollbar mb-8 flex gap-2 overflow-x-auto">
        {tabs.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              pathname === href
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card hover:border-primary/40 hover:text-primary"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function AdminAccessDenied() {
  return (
    <EmptyState
      icon={ShieldAlert}
      title="Acceso denegado"
      text="No tenés permiso para ver esta página."
      action={
        <Button asChild size="lg">
          <Link href="/">Volver al inicio</Link>
        </Button>
      }
    />
  );
}
