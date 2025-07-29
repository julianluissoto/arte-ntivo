// src/components/Ticker.tsx
import { Star } from "lucide-react";

interface TickerProps {
  messages: string[];
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

export default function Ticker({ messages }: TickerProps) {
  
  const fullMessages = [...messages, ...messages];

  return (
    <div className="bg-primary text-primary-foreground relative flex w-full overflow-hidden py-2 shadow-md">
       <div className="flex whitespace-nowrap animate-marquee items-center">
          <TickerContent messages={fullMessages} />
          <TickerContent messages={fullMessages} />
      </div>
    </div>
  );
}
