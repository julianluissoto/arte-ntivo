// src/app/not-found.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-secondary px-6 py-20 text-center text-secondary-foreground md:py-28">
      <div className="bg-grain absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-xl">
        <span className="eyebrow">Error 404</span>
        <h1 className="mt-4 font-headline text-5xl font-extrabold uppercase leading-[0.9] md:text-7xl">
          Esta página no existe.
        </h1>
        <p className="mt-4 text-secondary-foreground/75">
          Puede que el producto ya no esté disponible o que el link esté mal escrito.
        </p>
        <Button asChild size="lg" className="group mt-8">
          <Link href="/#all-products">
            Ver el catálogo
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
