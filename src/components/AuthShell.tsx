// src/components/AuthShell.tsx
// Contenedor de las pantallas de cuenta (login / registro): panel de marca + formulario.
import { Check } from "lucide-react";

const perks = [
  "Guardá tus productos favoritos",
  "Tu carrito sincronizado en todos tus dispositivos",
  "Enterate primero de ofertas y novedades",
];

export function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.62,44,31.1,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
  );
}

export function AuthDivider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-wider">
        <span className="bg-card px-3 text-muted-foreground">o con tu email</span>
      </div>
    </div>
  );
}

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border bg-card md:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-secondary p-10 text-secondary-foreground md:flex">
        <div className="bg-grain absolute inset-0 opacity-60" aria-hidden />
        <div className="relative">
          <span className="eyebrow">Arte Nativo</span>
          <p className="mt-4 font-headline text-4xl font-extrabold uppercase leading-[0.95]">
            Vos lo imaginás,
            <br />
            nosotros lo
            <br />
            personalizamos.
          </p>
        </div>
        <ul className="relative space-y-3 text-sm text-secondary-foreground/85">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3.5 w-3.5" />
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 sm:p-10">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-3 font-headline text-3xl font-extrabold uppercase leading-[0.95] md:text-4xl">{title}</h1>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
        <div className="mt-8 grid gap-4">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}
