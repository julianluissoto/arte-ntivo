// src/app/admin/newsletter/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldAlert, Send, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Subscriber } from '@/lib/types';
import { getSubscribers } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const NewsletterSkeleton = () => (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-full mb-4" />
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </CardContent>
        </Card>
    </div>
);


export default function AdminNewsletterPage() {
    const { user, isAdmin, loading: authLoading } = useAuth();
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (isAdmin) {
            setIsLoading(true);
            getSubscribers()
                .then(setSubscribers)
                .finally(() => setIsLoading(false));
        }
    }, [isAdmin]);

    const handleSendNewsletter = async () => {
        setIsSending(true);
        toast({
            title: 'Enviando Novedades...',
            description: `Se está procesando el envío a ${subscribers.length} suscriptores. (Función no implementada)`,
        });
        // Aquí iría la lógica para enviar el email.
        // Por ahora, solo simulamos el proceso.
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
            title: '¡Simulación Completa!',
            description: 'La lógica de envío real necesitaría un servicio de backend.',
        });
        setIsSending(false);
    };

    if (authLoading) {
        return <NewsletterSkeleton />;
    }

    if (!user || !isAdmin) {
        return (
            <div className="text-center py-20 bg-card rounded-lg border border-dashed">
                <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
                <h2 className="text-2xl font-bold font-headline text-destructive">Acceso Denegado</h2>
                <p className="text-muted-foreground mt-2 mb-6">No tienes permiso para ver esta página.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Panel de Newsletter
                </h1>
                <p className="mt-4 text-lg text-foreground/80">
                    Gestiona tus suscriptores y envía las últimas novedades.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2"><Users /> Lista de Suscriptores</CardTitle>
                            <CardDescription>Actualmente tienes {subscribers.length} suscriptores.</CardDescription>
                        </div>
                        <Button onClick={handleSendNewsletter} disabled={isSending || subscribers.length === 0}>
                            {isSending ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
                            ) : (
                                <><Send className="mr-2 h-4 w-4" /> Enviar Novedades</>
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                         <div className="space-y-2">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ) : (
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead className="text-right">Fecha de Suscripción</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subscribers.length > 0 ? (
                                        subscribers.map((subscriber) => (
                                            <TableRow key={subscriber.id}>
                                                <TableCell className="font-medium">{subscriber.email}</TableCell>
                                                <TableCell className="text-right">{subscriber.subscribedAt}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-center h-24">
                                                No hay suscriptores todavía.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}