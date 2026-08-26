export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold" />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Guizima Group Services</p>
      </div>
    </div>
  );
}
