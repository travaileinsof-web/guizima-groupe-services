import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const prisma = new PrismaClient();

export default async function JobOpeningPage({ params }: { params: { id: string } }) {
  const job = await prisma.jobOpening.findUnique({
    where: { id: params.id },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="bg-obsidian text-ivory min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Link href="/" className="inline-flex items-center gap-2 text-gold hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" /> Retour aux opportunités
          </Link>
          
          <div className="bg-coal border border-border rounded-3xl p-8 md:p-12">
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-light mb-2 block">
              {job.dept}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {job.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-ivory/60 mb-12 border-b border-border/50 pb-8">
              <span className="bg-white/5 px-3 py-1 rounded-md">{job.location}</span>
              <span className="bg-white/5 px-3 py-1 rounded-md">{job.type}</span>
              {job.salary && <span className="bg-white/5 px-3 py-1 rounded-md">{job.salary}</span>}
            </div>

            <div className="prose prose-invert prose-gold max-w-none">
              <h2 className="font-display text-2xl font-bold text-ivory mb-4">À propos du poste</h2>
              <div className="text-ivory/80 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-border/50 text-center">
              <button className="rounded-full bg-gradient-to-r from-gold to-copper px-10 py-4 text-sm font-bold text-obsidian transition-transform hover:scale-105 shadow-[0_8px_30px_-8px_rgba(212,165,71,0.6)]">
                Postuler à cette offre
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
