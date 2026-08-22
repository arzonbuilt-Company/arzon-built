import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "./components/ui/CustomCursor";
import { SplashScreen } from "./components/ui/SplashScreen";
import { ContactFloat } from "./components/ui/ContactFloat";
import { SmoothScrollProvider } from "./components/providers/SmoothScrollProvider";
import { LanguageProvider } from "./lib/i18n";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arzon Built | Home Renovations — Lawrenceville, GA",
  description:
    "Premium home renovations in Lawrenceville, GA — roofing, siding, painting, windows & full remodels. Family-owned. Licensed & insured. Free estimates.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="bg-bg text-white antialiased">
        <LanguageProvider>
          <SplashScreen />
          <CustomCursor />
          <ContactFloat />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
