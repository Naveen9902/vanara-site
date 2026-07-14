import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "VANARA",
  description: "A numbered record of species the world let vanish. Hand-stamped limited editions.",
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
