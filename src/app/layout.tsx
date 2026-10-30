import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingMascots from "@/components/floating-mascots";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "potato-tomato",
  description: "potato-tomato — our memories, milestones, letters, and a playful panda game.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#72212f",
};

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#72212f" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="min-h-full flex flex-col selection:bg-a63d4f selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingMascots />
      </body>
    </html>
  );
}
