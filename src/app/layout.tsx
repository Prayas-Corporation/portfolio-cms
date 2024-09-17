"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [heroData, setHeroData] = useState<{ name: string } | null>(null); // State to store dynamic hero data

  useEffect(() => {
    fetch("/api/hero")
      .then((response) => response.json())
      .then((data) => setHeroData(data))
      .catch((error) =>
        console.error("Error fetching hero section data:", error)
      );
  }, []);

  const dynamicName = heroData?.name || DATA.name; // Use dynamic name or fallback to static

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>{dynamicName}</title> {/* Use dynamic name in the title */}
        <meta name="description" content={DATA.description} />
        <meta property="og:title" content={dynamicName} />
        <meta property="og:description" content={DATA.description} />
        <meta property="og:site_name" content={dynamicName} />
        <meta property="twitter:title" content={dynamicName} />
      </Head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased w-full max-w-5xl mx-auto py-8 sm:py-16 px-4 sm:px-12",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
