
// src/app/profile/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User as UserIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Si ha terminado de cargar y no hay usuario, redirigir al login.
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: '¡Sesión cerrada!',
        description: 'Has cerrado sesión correctamente.',
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo cerrar la sesión. Inténtalo de nuevo.',
      });
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Muestra el skeleton solo mientras está cargando.
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-48 mt-4" />
            <Skeleton className="h-4 w-56 mt-2" />
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
             </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Si no está cargando pero no hay usuario, no renderiza nada (será redirigido por el useEffect).
  if (!user) {
      return null;
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User avatar'} />
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
              {user.displayName ? getInitials(user.displayName) : <UserIcon className="h-12 w-12" />}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">Mi Perfil</CardTitle>
          <CardDescription>Esta es tu información de usuario.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
           <p className="text-lg font-medium text-foreground">{user.displayName || 'Usuario'}</p>
           <p className="text-sm text-muted-foreground">{user.email}</p>
        </CardContent>
        <CardFooter>
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
