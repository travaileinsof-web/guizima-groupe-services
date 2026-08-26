import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GUIZIMA GROUP SERVICES — Solutions intégrées | Guinée",
  description: "GUIZIMA GROUP SERVICES accompagne les entreprises et institutions en commerce général, hydrocarbures, services, transport, immobilier, construction, agriculture et élevage.",
  keywords: ["Guizima Group Services", "commerce général", "hydrocarbures", "transport", "logistique", "construction", "agriculture", "élevage", "Guinée"],
  authors: [{ name: "GUIZIMA GROUP SERVICES" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "GUIZIMA GROUP SERVICES — Une force, plusieurs métiers",
    description: "Un partenaire guinéen pour construire, approvisionner, transporter et développer durablement.",
    url: "https://www.guizimagroup.com",
    siteName: "GUIZIMA GROUP SERVICES",
    type: "website",
    locale: "fr_GN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GUIZIMA GROUP SERVICES — Une force, plusieurs métiers",
    description: "Commerce, hydrocarbures, transport, immobilier, construction, agriculture et élevage en Guinée.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <SonnerToaster />
      </body>
    </html>
  );
}
