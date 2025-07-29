// src/components/CategorySidebar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers, Shirt, Square, Box, Wand2, MoreHorizontal, LogIn, LogOut, Heart, Brush, Eraser, UserPlus, User as UserIcon, Shield } from "lucide-react";
import { Separator } from "./ui/separator";
import type { Category } from "@/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import { LogoSvg } from "./LogoSvg";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "./SearchInput";

const categories: { name: Category; icon: React.ElementType }[] = [
    { name: 'Todos', icon: Layers },
    { name: 'Indumentaria', icon: Shirt },
    { name: 'Cerámica', icon: Square },
    { name: 'Plástico', icon: Box },
    { name: 'Acrílico', icon: Layers },
    { name: 'MDF', icon: Box },
    { name: 'Metal', icon: Wand2 },
    { name: 'Goma', icon: Eraser },
    { name: 'Varios', icon: MoreHorizontal },
];

const mainNavLinks = [
    { href: "/", label: "Home" },
    { href: "/crear", label: "Personalizar", icon: Brush },
];

const UserAuthSection = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({
                title: "¡Sesión cerrada!",
                description: "Has cerrado sesión correctamente.",
            });
            router.push('/');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo cerrar sesión.',
            });
        }
    };

    if (loading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        );
    }

    return user ? (
        <>
            <div className="px-2 py-1 mb-2 text-center text-sm text-muted-foreground border-b pb-3">
                <p className="font-semibold text-foreground">Hola,</p>
                <p className="truncate">{user.displayName || user.email}</p>
            </div>
            <Button variant="ghost" asChild className="w-full justify-start gap-3">
                <Link href="/profile">
                    <UserIcon className="h-5 w-5" />
                    <span>Mi Perfil</span>
                </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start gap-3">
                <Link href="/favorites">
                    <Heart className="h-5 w-5" />
                    <span>Favoritos</span>
                </Link>
            </Button>
             {/* Enlace al panel de administración */}
            <Button variant="ghost" asChild className="w-full justify-start gap-3">
                <Link href="/admin">
                    <Shield className="h-5 w-5" />
                    <span>Admin</span>
                </Link>
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3">
                <LogOut className="h-5 w-5" />
                <span>Salir</span>
            </Button>
        </>
    ) : (
        <>
            <Button variant="ghost" asChild className="w-full justify-start gap-3">
                <Link href="/login">
                    <LogIn className="h-5 w-5" />
                    <span>Ingresar</span>
                </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start gap-3">
                <Link href="/signup">
                    <UserPlus className="h-5 w-5" />
                    <span>Registrarme</span>
                </Link>
            </Button>
        </>
    );
};

export const CategorySidebarSkeleton = () => {
    return (
        <aside className="hidden md:flex flex-col w-64 bg-card border-r h-screen sticky top-0 p-4 space-y-4">
            <div className="flex justify-center mb-10">
                <Skeleton className="h-12 w-32" />
            </div>
            <div className="space-y-2">
                <h3 className="px-2 text-lg font-semibold tracking-tight text-muted-foreground">Menú</h3>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Separator />
            <div className="flex-grow space-y-2">
                <h3 className="px-2 text-lg font-semibold tracking-tight text-muted-foreground">Categorías</h3>
                {[...Array(9)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
            <Separator />
            <div className="space-y-2">
                 <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
        </aside>
    )
}


export default function CategorySidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') ?? 'Todos';

    return (
        <aside className="hidden md:flex flex-col w-64 bg-card border-r h-screen sticky top-0">
            <div className="p-4 flex justify-center">
                <Link href="/" className="inline-flex items-center">
                    <LogoSvg className="h-12 w-auto mb-10" />
                </Link>
            </div>
            
            <div className="px-4 pb-4">
              <SearchInput />
            </div>

            <nav className="pt-1 px-4 pb-4 space-y-2">
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
                <UserAuthSection />
            </div>
        </aside>
    );
}
