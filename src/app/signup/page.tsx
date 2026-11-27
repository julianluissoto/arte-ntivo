// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { addUserToCustomers } from '@/lib/data';
import { AuthDivider, AuthShell, GoogleIcon } from '@/components/AuthShell';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast({ variant: 'destructive', title: 'Error', description: 'Completá todos los campos.' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ variant: 'destructive', title: 'Error', description: 'Las contraseñas no coinciden.' });
      return;
    }
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await addUserToCustomers(userCredential.user);
      toast({
        title: '¡Revisá tu correo!',
        description: 'Te enviamos un enlace de verificación. Verificá tu cuenta para poder iniciar sesión.',
        duration: 10000,
      });

      await auth.signOut();
      router.push('/login');
    } catch (error: any) {
      let description = 'Ocurrió un error al crear la cuenta.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'Este correo electrónico ya está en uso.';
      } else if (error.code === 'auth/weak-password') {
        description = 'La contraseña debe tener al menos 6 caracteres.';
      } else if (error.code === 'auth/invalid-email') {
        description = 'El correo electrónico no es válido.';
      }
      toast({ variant: 'destructive', title: 'Error de registro', description });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await addUserToCustomers(result.user);
      toast({ title: '¡Bienvenido!', description: 'Iniciaste sesión con Google correctamente.' });
      router.push('/');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error de Google', description: 'No se pudo iniciar sesión con Google. Intentá de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Nueva cuenta"
      title="Crear cuenta."
      subtitle="Registrate para guardar favoritos y tener tu carrito siempre a mano."
      footer={
        <>
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Ingresá
          </Link>
        </>
      }
    >
      <Button variant="outline" size="lg" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon className="h-5 w-5" />}
        Registrarme con Google
      </Button>

      <AuthDivider />

      <form onSubmit={handleSignUp} className="grid gap-4">
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirmar contraseña</Label>
          <Input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
          Crear cuenta
        </Button>
      </form>
    </AuthShell>
  );
}
