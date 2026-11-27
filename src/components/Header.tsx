// src/components/Header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  LogIn,
  LogOut,
  Menu as MenuIcon,
  Layers,
  Shirt,
  Square,
  Box,
  Wand2,
  MoreHorizontal,
  Brush,
  Eraser,
  UserPlus,
  User as UserIcon,
  Shield,
  X,
  Newspaper,
  Sparkles,
  ShoppingCart,
  Flame,
  Mail,
} from "lucide-react";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import type { Category } from "@/lib/types";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";
import SearchInput from "./SearchInput";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const categories: { name: Category; icon: React.ElementType }[] = [
  { name: "Todos", icon: Layers },
  { name: "Indumentaria", icon: Shirt },
  { name: "Cerámica", icon: Square },
  { name: "Plástico", icon: Box },
  { name: "Acrílico", icon: Layers },
  { name: "MDF", icon: Box },
  { name: "Metal", icon: Wand2 },
  { name: "Goma", icon: Eraser },
  { name: "Varios", icon: MoreHorizontal },
];

const NavLinks = ({
  onSelect,
}: {
  onSelect?: () => void;
}) => {
  return (
    <>
      <SheetClose asChild>
        <Button variant="ghost" asChild className="w-full justify-start text-base font-medium">
          <Link href="/" onClick={onSelect}>
            Home
          </Link>
        </Button>
      </SheetClose>
       <SheetClose asChild>
        <Button variant="ghost" asChild className="w-full justify-start text-base font-medium gap-3 text-destructive font-bold">
            <Link href="/ofertas" onClick={onSelect}>
                <Flame className="h-5 w-5" />
                <span>Ofertas</span>
            </Link>
        </Button>
      </SheetClose>
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

const AuthSectionMobile = () => {
    const { user, isAdmin, loading } = useAuth();
    const { itemCount } = useCart();
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = async () => {
        await signOut(auth);
        toast({
            title: "¡Sesión cerrada!",
            description: "Has cerrado sesión correctamente.",
        });
        router.push('/');
    };

    if (loading) {
        return (
            <div className="mt-auto p-4 border-t space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        );
    }

    return (
        <div className="mt-auto p-4 border-t space-y-2">
            {user ? (
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <SheetClose asChild>
                            <Button variant="outline" asChild className="w-full justify-center gap-2 text-xs h-auto py-2 flex-col">
                                <Link href="/profile">
                                    <UserIcon className="h-5 w-5" />
                                    <span>Perfil</span>
                                </Link>
                            </Button>
                        </SheetClose>
                         <SheetClose asChild>
                            <Button variant="outline" asChild className="relative w-full justify-center gap-2 text-xs h-auto py-2 flex-col">
                                <Link href="/cart">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>Carrito</span>
                                    {itemCount > 0 && (
                                      <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0">{itemCount}</Badge>
                                    )}
                                </Link>
                            </Button>
                        </SheetClose>
                         <SheetClose asChild>
                            <Button variant="outline" asChild className="w-full justify-center gap-2 text-xs h-auto py-2 flex-col">
                                <Link href="/favorites">
                                    <Heart className="h-5 w-5" />
                                    <span>Favoritos</span>
                                </Link>
                            </Button>
                        </SheetClose>
                        {isAdmin && (
                            <>
                                <SheetClose asChild>
                                    <Button variant="outline" asChild className="w-full justify-center gap-2 text-xs h-auto py-2 flex-col">
                                        <Link href="/admin">
                                            <Shield className="h-5 w-5" />
                                            <span>Admin Prod.</span>
                                        </Link>
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button variant="outline" asChild className="w-full justify-center gap-2 text-xs h-auto py-2 flex-col">
                                        <Link href="/admin/news">
                                            <Newspaper className="h-5 w-5" />
                                            <span>Admin Nov.</span>
                                        </Link>
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button variant="outline" asChild className="w-full justify-center gap-2 text-xs h-auto py-2 flex-col">
                                        <Link href="/admin/newsletter">
                                            <Mail className="h-5 w-5" />
                                            <span>Newsletter</span>
                                        </Link>
                                    </Button>
                                </SheetClose>
                            </>
                        )}
                    </div>
                    <Button variant="destructive" onClick={handleLogout} className="w-full justify-center gap-3">
                        <LogOut className="h-5 w-5" />
                        <span>Cerrar Sesión</span>
                    </Button>
                </>
            ) : (
                <>
                    <SheetClose asChild>
                        <Button variant="outline" asChild className="w-full justify-start gap-3">
                            <Link href="/login">
                                <LogIn className="h-5 w-5" />
                                <span>Login</span>
                            </Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button variant="outline" asChild className="w-full justify-start gap-3">
                            <Link href="/signup">
                                <UserPlus className="h-5 w-5" />
                                <span>Sign Up</span>
                            </Link>
                        </Button>
                    </SheetClose>
                </>
            )}
        </div>
    );
};


/* ---------- Desktop ---------- */

const desktopLinks = [
  { href: "/", label: "Inicio" },
  { href: "/ofertas", label: "Ofertas", icon: Flame, highlight: true },];

const DesktopNav = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:flex items-center gap-1">
      {desktopLinks.map(({ href, label, icon: Icon, highlight }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground",
            pathname === href ? "bg-primary/10 text-primary" : "text-foreground/80",
            highlight && "text-primary"
          )}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {label}
        </Link>
      ))}
    </nav>
  );
};

const UserMenu = () => {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  if (loading) return <Skeleton className="h-10 w-10 rounded-full" />;

  if (!user) {
    return (
      <Button asChild size="sm" className="rounded-full">
        <Link href="/login">
          <LogIn className="h-4 w-4" />
          Ingresar
        </Link>
      </Button>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "¡Sesión cerrada!", description: "Has cerrado sesión correctamente." });
      router.push("/");
    } catch {
      toast({ variant: "destructive", title: "Error", description: "No se pudo cerrar sesión." });
    }
  };

  const name = user.displayName || user.email || "";
  const initial = name.charAt(0).toUpperCase() || "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground ring-offset-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Menú de usuario"
        >
          {initial}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <DropdownMenuLabel className="font-normal">
          <p className="text-xs text-muted-foreground">Hola,</p>
          <p className="truncate font-semibold">{name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile"><UserIcon className="mr-2 h-4 w-4" />Mi perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/favorites"><Heart className="mr-2 h-4 w-4" />Favoritos</Link>
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">Administración</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/admin"><Shield className="mr-2 h-4 w-4" />Productos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/news"><Newspaper className="mr-2 h-4 w-4" />Novedades</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/newsletter"><Mail className="mr-2 h-4 w-4" />Newsletter</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />Salir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CartButton = () => {
  const { itemCount } = useCart();
  return (
    <Button variant="ghost" size="icon" asChild className="relative rounded-full">
      <Link href="/cart" aria-label="Carrito">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge className="absolute -right-0.5 -top-0.5 h-5 min-w-5 justify-center px-1 text-[10px]">
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
};

const CategoryBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = pathname === "/" ? searchParams.get("category") ?? "Todos" : null;

  return (
    <nav className="no-scrollbar flex items-center gap-2 overflow-x-auto py-3">
      {categories.map(({ name, icon: Icon }) => (
        <Link
          key={name}
          href={`/?category=${name}#all-products`}
          className={cn(
            "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            current === name
              ? "border-primary bg-primary text-primary-foreground"
              : "bg-card text-foreground/80 hover:border-primary/40 hover:text-primary"
          )}
        >
          <Icon className="h-4 w-4" />
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 md:h-20 md:gap-6 md:px-10">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Arte Nativo - Inicio">
          <Logo className="h-11 w-auto md:h-14" />
        </Link>

        <DesktopNav />

        <div className="ml-auto hidden w-full max-w-sm md:block">
          <SearchInput />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0 md:gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:inline-flex">
            <Link href="/favorites" aria-label="Favoritos">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <CartButton />
          <div className="hidden md:block">
            <UserMenu />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0 flex flex-col" hideCloseButton>
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Menú</h3>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Cerrar menú</span>
                  </Button>
                </SheetClose>
              </div>
              <div className="p-4 border-b">
                <SearchInput />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <NavLinks onSelect={() => setIsOpen(false)} />
              </div>
              <Separator />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Categorías</h3>
              </div>
              <div className="flex flex-col gap-2 pt-0 p-4 flex-grow overflow-y-auto">
                <CategoryLinks onSelect={() => setIsOpen(false)} />
              </div>
              <AuthSectionMobile />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden border-t md:block">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-10">
          <React.Suspense fallback={<div className="h-[60px]" />}>
            <CategoryBar />
          </React.Suspense>
        </div>
      </div>
    </header>
  );
}
