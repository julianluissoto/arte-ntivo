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
} from "lucide-react";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";

import { LogoSvg } from "./LogoSvg";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";
import SearchInput from "./SearchInput";
import type { Category } from "@/lib/types";

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
                    <SheetClose asChild>
                        <Button variant="outline" asChild className="w-full justify-start gap-3">
                            <Link href="/profile">
                                <UserIcon className="h-5 w-5" />
                                <span>Mi Perfil</span>
                            </Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button variant="outline" asChild className="w-full justify-start gap-3">
                            <Link href="/favorites">
                                <Heart className="h-5 w-5" />
                                <span>Favoritos</span>
                            </Link>
                        </Button>
                    </SheetClose>
                     <SheetClose asChild>
                        <Button variant="outline" asChild className="w-full justify-start gap-3">
                            <Link href="/admin">
                                <Shield className="h-5 w-5" />
                                <span>Admin</span>
                            </Link>
                        </Button>
                    </SheetClose>
                    <Button variant="outline" onClick={handleLogout} className="w-full justify-start gap-3">
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
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
          <LogoSvg className="w-24 h-auto" />
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0 flex flex-col">
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
