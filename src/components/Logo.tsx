import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 200 50"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground", className)}
    >
      <text
        x="10"
        y="35"
        fontFamily="Literata, serif"
        fontSize="24"
        className="fill-current"
      >
        ARTE
      </text>
      <line
        x1="10"
        y1="40"
        x2="60"
        y2="40"
        stroke="currentColor"
        strokeWidth="1"
      />
      <g transform="translate(80, 0)">
        <text
          x="0"
          y="35"
          fontFamily="Literata, serif"
          fontSize="24"
          className="fill-current"
        >
          NATIVO
        </text>
      </g>
    </svg>
  );
};
