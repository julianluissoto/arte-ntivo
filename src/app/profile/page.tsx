// src/app/profile/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { ArrowRight, Heart, LogOut, MessageCircle, Shield, ShieldAlert, ShieldCheck, ShoppingBag, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { SectionHeading } from '@/components/HomeSections';
import { phoneNumber } from '@/components/WhatsAppButton';

const getInitials = (name: string | null | undefined) => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return (parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : name.substring(0, 2)).toUpperCase();
};

export default function ProfilePage() {
  const { user, isAdmin, loading } = useAuth();
  const { itemCount } = useCart();
  const { favoriteIds } = useFavorites();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: '¡Sesión cerrada!', description: 'Cerraste sesión correctamente.' });
      router.push('/');
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo cerrar la sesión. Intentá de nuevo.' });
    }
  };

  if (loading || !user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-40 w-full rounded-[2rem]" />
      </div>
    );
  }

  const shortcuts = [
    { href: '/cart', icon: ShoppingBag, title: 'Mi carrito', text: itemCount ? `${itemCount} ${itemCount === 1 ? 'unidad' : 'unidades'}` : 'Vacío' },
    { href: '/favorites', icon: Heart, title: 'Favoritos', text: favoriteIds.length ? `${favoriteIds.length} guardados` : 'Ninguno todavía' },
    ...(isAdmin ? [{ href: '/admin', icon: Shield, title: 'Administración', text: 'Productos, novedades y newsletter' }] : []),
  ];

  return (
    <div className="space-y-8">
      <SectionHeading as="h1" eyebrow="Tu cuenta" title="Mi perfil." />

      <div className="flex flex-col gap-6 rounded-[2rem] bg-muted p-6 sm:flex-row sm:items-center sm:p-8">
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
          <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'Avatar'} />
          <AvatarFallback className="bg-primary font-headline text-2xl font-extrabold text-primary-foreground">
            {user.displayName ? getInitials(user.displayName) : <UserIcon className="h-10 w-10" />}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate font-headline text-2xl font-extrabold uppercase">{user.displayName || 'Usuario'}</p>
          <p className="truncate text-muted-foreground">{user.email}</p>
          <span
            className={
              user.emailVerified
                ? 'mt-3 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary'
                : 'mt-3 inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive'
            }
          >
            {user.emailVerified ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
            {user.emailVerified ? 'Email verificado' : 'Email sin verificar'}
          </span>
        </div>
        <Button variant="outline" onClick={handleLogout} className="self-start sm:self-center">
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shortcuts.map(({ href, icon: Icon, title, text }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </span>
            <p className="mt-4 font-bold">{title}</p>
            <p className="text-sm text-muted-foreground">{text}</p>
          </Link>
        ))}
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <MessageCircle className="h-6 w-6" />
          </span>
          <p className="mt-4 flex items-center gap-1.5 font-bold">
            ¿Consultas por un pedido?
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </p>
          <p className="text-sm text-muted-foreground">Escribinos por WhatsApp</p>
        </a>
      </div>
    </div>
  );
}
