import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PitchSnap – AI Pitch Generator",
  description:
    "PitchSnap is your AI-powered assistant for crafting compelling business, startup, or product pitches in seconds. No login friction, just smart results.",
  applicationName: "PitchSnap",
  keywords: [
    "PitchSnap",
    "AI pitch generator",
    "startup tools",
    "magic link auth",
    "n8n",
    "Supabase",
    "Next.js app",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://pitchsnap.vercel.app",
    title: "PitchSnap – AI Pitch Generator",
    description:
      "Generate winning startup and business pitches in seconds with PitchSnap’s AI engine. Fast, smart, and fully magic link authenticated.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 628,
        alt: "PitchSnap",
      },
    ],
  },
  twitter: {
    title: "PitchSnap – AI Pitch Generator",
    description: "AI-crafted pitches in seconds. Simple login. Instant output.",
    card: "summary_large_image",
    site: "@PitchSnap",
    images: ["/opengraph-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} min-h-screen bg-black font-sans text-white`}
      >
        <NavBar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Toaster position="top-right" />
        <div className="main-mask pointer-events-none absolute inset-0 -z-50" />
      </body>
    </html>
  );
}
