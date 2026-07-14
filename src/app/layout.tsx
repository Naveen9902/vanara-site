import type { Metadata } from "next";
import { Inter, Newsreader, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Announcement from "@/components/Announcement";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Providers from "@/components/Providers";

import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';

const newsreader = Newsreader({ subsets: ["latin"], weight: ["400", "500"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "VANARA | Field Records",
  description: "A numbered record of species the world let vanish. Hand-stamped, highly limited editions.",
  openGraph: {
    title: "VANARA | Field Records",
    description: "A numbered record of species the world let vanish. Limited run — 200 pairs, never repeated.",
    url: "https://vanara-site.vercel.app",
    siteName: "VANARA",
    images: [
      {
        url: "https://vanara-site.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VANARA Sneaker Release"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "VANARA | Field Records",
    description: "A numbered record of species the world let vanish.",
    images: ["https://vanara-site.vercel.app/og-image.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <div className="va-root">
            <Announcement />
            <Navigation />
            {children}
            <Footer />
            <CartDrawer />
            <Toaster position="bottom-right" theme="dark" toastOptions={{ style: { background: 'var(--bg-panel)', border: '1px solid var(--line)', color: 'var(--bone)' } }} />
            <Analytics />
          </div>
        </Providers>
      </body>
    </html>
  );
}
