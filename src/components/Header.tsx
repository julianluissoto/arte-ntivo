"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  LogIn,
  Menu as MenuIcon,
  Layers,
  Shirt,
  Square,
  Box,
  HandMetal,
  MoreHorizontal,
  Wand2,
  Brush,
} from "lucide-react";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import type { Category } from "@/lib/mock-data";
import { LogoSvg } from "./LogoSvg";

const categories: { name: Category; icon: React.ElementType }[] = [
  { name: "Todos", icon: Layers },
  { name: "Indumentaria", icon: Shirt },
  { name: "Cerámica", icon: Square },
  { name: "Plástico", icon: Box },
  { name: "Acrílico", icon: Layers },
  { name: "MDF", icon: Box },
  { name: "Metal", icon: HandMetal },
  { name: "Varios", icon: MoreHorizontal },
];

const NavLinks = ({
  inSheet,
  onSelect,
}: {
  inSheet?: boolean;
  onSelect?: () => void;
}) => {
  const commonClasses = "justify-start text-base font-medium";
  const linkClasses = inSheet ? `${commonClasses} w-full` : commonClasses;

  const Wrapper = inSheet ? SheetClose : React.Fragment;

  return (
    <>
      <Wrapper>
        <Button variant="ghost" asChild className={linkClasses}>
          <Link href="/" onClick={onSelect}>
            Home
          </Link>
        </Button>
      </Wrapper>
      <Wrapper>
        <Button variant="ghost" asChild className={linkClasses}>
          <Link href="/crear" onClick={onSelect}>
            <Brush className="mr-2 h-4 w-4" />
            Personalizar
          </Link>
        </Button>
      </Wrapper>
      
    </>
  );
};

const CategoryLinks = ({ onSelect }: { onSelect?: () => void }) => {
  return (
    <>
      {categories.map(({ name, icon: Icon }) => (
        <SheetClose asChild key={name} onClick={onSelect}>
          <Button variant="ghost" asChild className="w-full justify-start gap-3">
            <Link href={`/?category=${name}`}>
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </Link>
          </Button>
        </SheetClose>
      ))}
    </>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40 md:hidden">
      <div className="container mx-auto flex items-center justify-between p-4">
      
        <Link href="/" className="flex items-center gap-2 text-primary">
        <LogoSvg className="w-24 h-auto text-amber-900" />
                
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/favorites" aria-label="Favorites">
              <Heart className="h-5 w-5 text-primary" />
            </Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0 flex flex-col">
              <div className="p-4 flex flex-col gap-2">
                <NavLinks inSheet onSelect={() => setIsOpen(false)} />
              </div>
              <Separator />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Categorías</h3>
              </div>
              <div className="flex flex-col gap-2 pt-0 p-4 h-full overflow-y-auto">
                <CategoryLinks onSelect={() => setIsOpen(false)} />
              </div>
              <div className="mt-auto p-4 border-t">
                <SheetClose asChild>
                  <Button variant="outline" asChild className="w-full justify-start gap-3">
                    <Link href="/login">
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
