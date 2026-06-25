import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "./components/ui/CustomCursor";
import { SplashScreen } from "./components/ui/SplashScreen";
import { SmoothScrollProvider } from "./components/providers/SmoothScrollProvider";
import { LanguageProvider } from "./lib/i18n";

export const metadata: Metadata = {
  title: "Arzon Built | Home Renovations — Lawrenceville, GA",
  description:
    "Premium home renovations in Lawrenceville, GA — roofing, siding, painting, windows & full remodels. Family-owned. Licensed & insured. Free estimates.",
  icons: {
    icon: "/assets/Isotipo.png",
    apple: "/assets/Isotipo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-white antialiased">
        <LanguageProvider>
          <SplashScreen />
          <CustomCursor />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
