import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scroll-reveal";
import "./globals.css";

// F37Bolton stand-in per ARCHITECTURE.md §2 / DESIGN.md typography spec.
// Swap for licensed F37Bolton files in public/fonts/ when acquired (Phase 6).
const f37BoltonFallback = Inter({
  variable: "--font-f37bolton",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CargoFlow — Global Freight & Logistics",
  description:
    "CargoFlow moves freight by ocean, air, and land. Track shipments, explore services, and get a quote.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${f37BoltonFallback.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-16 focus:top-16 focus:z-[60] focus:rounded-full focus:border focus:border-obsidian focus:bg-pure-white focus:px-20 focus:py-8 focus:text-body-sm focus:text-obsidian"
        >
          Skip to main content
        </a>
        {children}
        <ScrollReveal />
        <Footer />
      </body>
    </html>
  );
}
