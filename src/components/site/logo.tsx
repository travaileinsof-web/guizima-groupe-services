import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  className?: string;
  size?: number;
  variant?: "full" | "mark" | "light";
};

export function Logo({ className = "", size = 40, variant = "full" }: LogoProps) {
  return (
    <span
      className={cn("flex min-w-0 items-center gap-2 overflow-hidden text-left text-ivory drop-shadow-md", className)}
      style={{ height: size }}
      role="img"
      aria-label="Guizima Group Services logo"
    >
      <span
        className="flex aspect-square items-center justify-center border border-gold/70 bg-gold font-display font-black text-obsidian"
        style={{ height: size * 0.82, fontSize: size * 0.34 }}
      >
        <Image
          src="/icon.png"
          width={size * 0.82}
          height={size * 0.82}
          alt="Guizima Group Services logo"
          className="h-full w-full object-contain"
        />
      </span>
      {variant !== "mark" && (
        <span className="flex min-w-0 flex-col justify-center leading-none">
          <span className="truncate font-display font-bold tracking-[0.08em]" style={{ fontSize: size * 0.28 }}>
            GUIZIMA
          </span>
          <span className="mt-1 truncate font-mono uppercase tracking-[0.18em] text-gold" style={{ fontSize: size * 0.12 }}>
            Group Services
          </span>
        </span>
      )}
    </span>
  );
}
