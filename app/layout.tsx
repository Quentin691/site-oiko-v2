import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers";
import { JsonLd } from "@/components/seo";
import CookieBanner from "@/components/ui/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://site-oiko-v2-tklh.vercel.app";

export const metadata: Metadata = {
  title: "OIKO | Property, Asset & Project Management",
  description: "OIKO accompagne les propriétaires et investisseurs dans la gestion, la valorisation et la transaction de leurs actifs immobiliers à Paris et Marseille.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "OIKO | Property, Asset & Project Management",
    description: "OIKO accompagne les propriétaires et investisseurs dans la gestion, la valorisation et la transaction de leurs actifs immobiliers à Paris et Marseille.",
    url: siteUrl,
    siteName: "OIKO Gestion",
    images: [
      {
        url: "/logo.png",
        width: 200,
        height: 80,
        alt: "OIKO - Gestion immobilière",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OIKO | Property, Asset & Project Management",
    description: "OIKO accompagne les propriétaires et investisseurs dans la gestion, la valorisation et la transaction de leurs actifs immobiliers à Paris et Marseille.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <JsonLd />
      </head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
        <Header />
        <Navbar /> 
        <main>{children}</main>
        <Footer />
        </ThemeProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
