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
import { Logo } from "./LogoSvg";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";
import SearchInput from "./SearchInput";
import { Badge } from "./ui/badge";

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
        <Button variant="ghost" asChild className="w-full justify-start text-base font-medium gap-3">
          <Link href="/crear" onClick={onSelect}>
            <Brush className="h-5 w-5" />
            Personalizar
          </Link>
        </Button>
      </SheetClose>
      <SheetClose asChild>
        <Button variant="ghost" asChild className="w-full justify-start text-base font-medium gap-3">
            <Link href="/generate-description" onClick={onSelect}>
                <Sparkles className="h-5 w-5" />
                <span>Generar Descripción</span>
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
    const { user, loading } = useAuth();
    const { cartItems } = useCart();
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
                                    {cartItems.length > 0 && (
                                      <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0">{cartItems.length}</Badge>
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


export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40 md:hidden">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Logo className="w-24 h-auto" />
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
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
    </header>
  );
}
