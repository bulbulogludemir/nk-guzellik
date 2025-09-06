import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NK Güzellik Salonu | Premium Beauty Salon Ankara",
  description: "Ankara'nın en kaliteli güzellik salonu. Profesyonel saç tasarımı, cilt bakımı, makyaj ve gelin paketi hizmetleri. Uzman kadro, kaliteli ürünler ve hijyenik ortam.",
  keywords: "güzellik salonu, kuaför, Ankara, saç tasarımı, cilt bakımı, makyaj, gelin paketi, NK güzellik",
  authors: [{ name: "NK Güzellik Salonu" }],
  creator: "NK Güzellik Salonu",
  publisher: "NK Güzellik Salonu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "NK Güzellik Salonu | Premium Beauty Salon",
    description: "Profesyonel güzellik hizmetleri ile doğal güzelliğinizi ortaya çıkarın.",
    url: "https://nkguzellik.com",
    siteName: "NK Güzellik Salonu",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NK Güzellik Salonu",
    description: "Profesyonel güzellik hizmetleri ile doğal güzelliğinizi ortaya çıkarın.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
