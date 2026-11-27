// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { AuthDivider, AuthShell, GoogleIcon } from '@/components/AuthShell';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        toast({
          title: 'Correo enviado',
          description: 'Te reenviamos el correo de verificación. Revisá tu bandeja de entrada.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo reenviar el correo de verificación.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Completá todos los campos.',
      });
      return;
    }
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        toast({
          variant: 'destructive',
          title: 'Verificación requerida',
          description: (
            <div>
              <p>Verificá tu correo electrónico para iniciar sesión.</p>
              <Button variant="link" className="p-0 h-auto mt-2 text-destructive-foreground" onClick={handleResendVerification}>
                Reenviar correo de verificación
              </Button>
            </div>
          ),
          duration: 10000,
        });
        await auth.signOut();
        return;
      }

      toast({
        title: '¡Bienvenido!',
        description: 'Iniciaste sesión correctamente.',
      });
      router.push('/');
    } catch (error: any) {
      let description = 'Ocurrió un error al iniciar sesión.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        description = 'El correo electrónico o la contraseña son incorrectos.';
      }
      toast({
        variant: 'destructive',
        title: 'Error de autenticación',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: '¡Bienvenido!',
        description: 'Iniciaste sesión con Google correctamente.',
      });
      router.push('/profile');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error de Google',
        description: 'No se pudo iniciar sesión con Google. Intentá de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Tu cuenta"
      title="Ingresar."
      subtitle="Accedé para ver tus favoritos y tu carrito."
      footer={
        <>
          ¿No tenés cuenta?{' '}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Registrate
          </Link>
        </>
      }
    >
      <Button variant="outline" size="lg" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon className="h-5 w-5" />}
        Continuar con Google
      </Button>

      <AuthDivider />

      <form onSubmit={handleLogin} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
          Ingresar
        </Button>
      </form>
    </AuthShell>
  );
}
