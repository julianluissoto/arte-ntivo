// src/components/CategorySidebar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers, Shirt, Square, Box, HandMetal, MoreHorizontal, Wand2, LogIn, Heart, Brush } from "lucide-react";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";
import type { Category } from "@/lib/mock-data";
import { usePathname, useSearchParams } from "next/navigation";

const categories: { name: Category; icon: React.ElementType }[] = [
  { name: 'Todos', icon: Layers },
  { name: 'Indumentaria', icon: Shirt },
  { name: 'Cerámica', icon: Square },
  { name: 'Plástico', icon: Box },
  { name: 'Acrílico', icon: Layers },
  { name: 'MDF', icon: Box },
  { name: 'Metal', icon: HandMetal },
  { name: 'Varios', icon: MoreHorizontal },
];

const mainNavLinks = [
    { href: "/", label: "Home" },
    { href: "/crear", label: "Personalizar", icon: Brush },
    { href: "/generate-description", label: "AI Tool", icon: Wand2 },
];

export default function CategorySidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') ?? 'Todos';

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r h-screen sticky top-0">
        <div className="p-4">
            <Link href="/" className="flex items-center gap-2 text-primary">
                <Logo className="h-10 w-auto" />
                <span className="text-2xl font-headline font-bold">Arte Nativo</span>
            </Link>
        </div>
        <Separator />
        <nav className="p-4 space-y-2">
            <h3 className="px-2 text-lg font-semibold tracking-tight text-muted-foreground">Menú</h3>
            {mainNavLinks.map(link => (
                <Button key={link.href} variant={pathname === link.href ? "secondary" : "ghost"} asChild className="w-full justify-start gap-3">
                    <Link href={link.href}>
                        {link.icon && <link.icon className="h-5 w-5" />}
                        <span>{link.label}</span>
                    </Link>
                </Button>
            ))}
        </nav>
        <Separator />
        <div className="p-4 space-y-2 flex-grow overflow-y-auto">
            <h3 className="px-2 text-lg font-semibold tracking-tight text-muted-foreground">Categorías</h3>
            {categories.map(({ name, icon: Icon }) => (
                <Button
                    key={name}
                    variant={currentCategory === name && pathname === '/' ? "secondary" : "ghost"}
                    asChild
                    className="w-full justify-start gap-3"
                >
                    <Link href={`/?category=${name}`}>
                    <Icon className="h-5 w-5" />
                    <span>{name}</span>
                    </Link>
                </Button>
            ))}
        </div>
        <Separator />
        <div className="p-4 space-y-2">
            <Button variant="ghost" asChild className="w-full justify-start gap-3">
                <Link href="/favorites">
                    <Heart className="h-5 w-5" />
                    <span>Favoritos</span>
                </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start gap-3">
                <Link href="/login">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                </Link>
            </Button>
        </div>
    </aside>
  );
}
