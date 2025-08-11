// src/components/Ticker.tsx
import { Star } from "lucide-react";

interface TickerProps {
  messages: string[];
  direccion?: "der" | "izq"; // Keep your original prop names
}

const TickerContent = ({ messages }: TickerProps) => (
  <div className="flex items-center">
    {messages.map((msg, index) => (
      <div key={index} className="flex items-center">
        <span className="mx-4 text-base font-semibold">{msg}</span>
        {index < messages.length - 1 && (
          <Star className="h-5 w-5 mx-4 text-primary fill-secondary flex-shrink-0" />
        )}
      </div>
    ))}
  </div>
);

export default function Ticker({ messages,direccion}: TickerProps) {
  const fullMessages = [...messages, ...messages, ...messages, ...messages]; // Repeat messages to ensure continuous scrolling

  // Determine animation class based on 'direccion' prop
  const animationClass =
    direccion === "izq" ? "animate-marquee-forward" : "animate-marquee-backward";

  return (
    
   <div className={`${direccion === 'izq' ? 'bg-primary' : 'bg-secondary'} text-black relative flex w-full overflow-hidden py-2 shadow-md`}>
      <div className={`flex whitespace-nowrap items-center ${animationClass}`}>
        <TickerContent messages={fullMessages} />
        <TickerContent messages={fullMessages} />
      </div>
    </div>
  );
}