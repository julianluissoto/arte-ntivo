"use client";

// Reemplazo de next/image que muestra un skeleton mientras la imagen carga
// y la revela con un fade-in. El contenedor padre debe ser `relative`
// (igual que para `fill`).
import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

type Props = ImageProps & { skeletonClassName?: string };

function ImageWithSkeleton({ className, skeletonClassName, onLoad, onError, ...props }: Props) {
  // Guardamos qué src terminó de cargar: si cambia el src (p. ej. la galería
  // de producto), el skeleton vuelve a aparecer sin efectos extra.
  const [loadedSrc, setLoadedSrc] = useState<ImageProps["src"] | null>(null);
  const loaded = loadedSrc === props.src;

  return (
    <>
      {!loaded && (
        <Skeleton
          aria-hidden
          className={cn("absolute inset-0 rounded-none bg-foreground/[0.08]", skeletonClassName)}
        />
      )}
      <Image
        {...props}
        className={cn("transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0", className)}
        onLoad={(e) => {
          setLoadedSrc(props.src);
          onLoad?.(e);
        }}
        onError={(e) => {
          // Si falla, sacamos el skeleton para que no quede pulsando para siempre.
          setLoadedSrc(props.src);
          onError?.(e);
        }}
      />
    </>
  );
}

export { ImageWithSkeleton };
