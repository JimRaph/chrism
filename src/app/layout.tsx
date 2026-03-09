import type { Metadata } from "next";
import "./globals.css";
import { PriceProvider } from "@/context/PriceContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PriceTicker from "@/components/layout/PriceTicker";
import {Toaster} from 'sonner';

export const metadata: Metadata = {
  title: "Chrism Oil Nig Ltd | Oil & Gas and Maritime Services",
  description: "A leading multi-sector company in Nigeria's downstream oil & gas industry and maritime services. Filling stations, LPG distribution, vessel operations, and cadet training.",
  keywords: "Chrism Oil, Oil and Gas, Maritime, LPG, Filling Station, Nigeria, Petroleum, Shipping, Cadet Training",
  authors: [{ name: "Chrism Oil Nig Ltd" }],
  openGraph: {
    title: "Chrism Oil Nig Ltd | Oil & Gas and Maritime Services",
    description: "A leading multi-sector company in Nigeria's downstream oil & gas industry and maritime services.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <PriceProvider>
            <PriceTicker />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </PriceProvider>
        </AuthProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
