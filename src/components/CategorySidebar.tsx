// src/components/CategorySidebar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers, Shirt, Square, Box, Wand2, MoreHorizontal, LogIn, LogOut, Heart, Brush, Eraser, UserPlus, User as UserIcon, Shield, Newspaper, Sparkles, ShoppingCart, Home, Flame, Mail } from "lucide-react";
import { Separator } from "./ui/separator";
import type { Category } from "@/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "./SearchInput";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";


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
    { href: "/", label: "Home", icon: Home },
    { href: "/ofertas", label: "Ofertas", icon: Flame, className: "text-destructive font-bold animate-pulse-themable" },
];

const UserAuthSection = () => {
    const { user, isAdmin, loading } = useAuth();
    const { cartItems } = useCart();
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
            <Button variant="ghost" asChild className="w-full justify-start gap-3 relative">
                <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Carrito</span>
                    {cartItems.length > 0 && (
                        <Badge className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 justify-center p-0">{cartItems.length}</Badge>
                    )}
                </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start gap-3">
                <Link href="/favorites">
                    <Heart className="h-5 w-5" />
                    <span>Favoritos</span>
                </Link>
            </Button>
             {isAdmin && (
                <>
                    <Button variant="ghost" asChild className="w-full justify-start gap-3">
                        <Link href="/admin">
                            <Shield className="h-5 w-5" />
                            <span>Admin Productos</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start gap-3">
                        <Link href="/admin/news">
                            <Newspaper className="h-5 w-5" />
                            <span>Admin Novedades</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start gap-3">
                        <Link href="/admin/newsletter">
                            <Mail className="h-5 w-5" />
                            <span>Admin Newsletter</span>
                        </Link>
                    </Button>
                </>
             )}
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
        <aside className="hidden md:flex flex-col w-72 bg-card border-r h-screen sticky top-0 p-4 space-y-4">
            <div className="flex justify-center mb-10">
                <Skeleton className="h-12 w-32" />
            </div>
            <div className="space-y-2">
                <h3 className="px-2 text-lg font-semibold tracking-tight text-muted-foreground">Menú</h3>
                <Skeleton className="h-10 w-full" />
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
        <aside className="hidden md:flex flex-col w-72 bg-card border-r h-screen sticky top-0 p-4">
            <div className="flex justify-center mb-10 flex-shrink-0">
                <Link href="/" className="inline-flex items-center">
                    <Logo className="h-12 w-auto" />
                </Link>
            </div>
            
            <div className="px-4 pb-4 flex-shrink-0">
              <SearchInput />
            </div>

            {/* Scrollable Area */}
            <div className="flex-grow overflow-y-auto no-scrollbar -mr-4 pr-4">
                 <nav className="pt-1 px-4 pb-4 space-y-2">
                    <h3 className="px-2 text-lg font-semibold tracking-tight text-muted-foreground">Menú</h3>
                    {mainNavLinks.map(link => (
                        <Button key={link.href} variant={pathname === link.href ? "secondary" : "ghost"} asChild className={cn("w-full justify-start gap-3", link.className)}>
                            <Link href={link.href}>
                                {link.icon && <link.icon className="h-5 w-5" />}
                                <span>{link.label}</span>
                            </Link>
                        </Button>
                    ))}
                </nav>
                <Separator />
                <div className="p-4 space-y-2">
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
            </div>

            {/* Auth Section - stays at the bottom */}
            <div className="flex-shrink-0 pt-4 border-t">
                <div className="p-4 space-y-2">
                    <UserAuthSection />
                </div>
            </div>
        </aside>
    );
}
