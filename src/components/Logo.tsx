// src/components/Logo.tsx
"use client";

import Image from "next/image";
import { cn } from "@/lib/utils"; // si estás usando Tailwind + utils personalizados

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo = ({ className, width = 150, height = 80 }: LogoProps) => {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/assets/logo.png"
        alt="Arte Nativo Logo"
        width={width}
        height={height}
        priority
      />
    </div>
  );
};

export const Logo2 = ({ className, width = 250, height = 150 }: LogoProps) => {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/assets/logo2.png"
        alt="Arte Nativo Logo"
        width={width}
        height={height}
        priority
      />
    </div>
  );
};

