import type { Metadata } from "next";
import { Inter, Newsreader, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Announcement from "@/components/Announcement";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Providers from "@/components/Providers";

const newsreader = Newsreader({ subsets: ["latin"], weight: ["400", "500"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "VANARA | Field Records",
  description: "A numbered record of species the world let vanish.",
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
          </div>
        </Providers>
      </body>
    </html>
  );
}
