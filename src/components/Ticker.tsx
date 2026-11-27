// src/components/Ticker.tsx
import { cn } from "@/lib/utils";

interface TickerProps {
  messages: string[];
  direccion?: "der" | "izq";
}

const TickerContent = ({ messages }: { messages: string[] }) => (
  <div className="flex items-center" aria-hidden>
    {messages.map((msg, index) => (
      <div key={index} className="flex items-center">
        <span className="mx-5 font-headline text-sm font-bold uppercase tracking-wider md:text-base">
          {msg}
        </span>
        <span className="text-xs opacity-70">●</span>
      </div>
    ))}
  </div>
);

export default function Ticker({ messages, direccion }: TickerProps) {
  const fullMessages = [...messages, ...messages, ...messages, ...messages];
  const animationClass =
    direccion === "izq" ? "animate-marquee-forward" : "animate-marquee-backward";

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden rounded-full py-3",
        direccion === "izq"
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
      )}
    >
      <span className="sr-only">{messages.join(" · ")}</span>
      <div className={cn("flex whitespace-nowrap items-center", animationClass)}>
        <TickerContent messages={fullMessages} />
        <TickerContent messages={fullMessages} />
      </div>
    </div>
  );
}
