import { cn } from "@/lib/utils";

type SectionBackdropProps = {
  image?: string;
  tone?: "blue" | "red" | "light";
  className?: string;
};

export function SectionBackdrop({ image, tone = "blue", className }: SectionBackdropProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.16] grayscale-[0.15]"
        />
      )}
      <div className={cn(
        "absolute -right-24 -top-28 h-80 w-80 rounded-full blur-3xl",
        tone === "red" && "bg-gold/20",
        tone === "blue" && "bg-emerald/20",
        tone === "light" && "bg-emerald/10"
      )} />
      <svg className="absolute right-[-4rem] top-8 h-[28rem] w-[28rem] opacity-40" viewBox="0 0 560 560" fill="none">
        <path d="M280 12 548 280 280 548 12 280 280 12Z" stroke="currentColor" strokeOpacity=".22" />
        <path d="M280 82 478 280 280 478 82 280 280 82Z" stroke="currentColor" strokeOpacity=".15" />
        <path d="M280 152 408 280 280 408 152 280 280 152Z" stroke="currentColor" strokeOpacity=".12" />
        <path d="M12 280h536M280 12v536" stroke="currentColor" strokeOpacity=".1" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-obsidian/10" />
    </div>
  );
}
