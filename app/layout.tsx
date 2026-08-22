import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "./components/ui/CustomCursor";
import { SplashScreen } from "./components/ui/SplashScreen";
import { ContactFloat } from "./components/ui/ContactFloat";
import { SmoothScrollProvider } from "./components/providers/SmoothScrollProvider";
import { MotionProvider } from "./components/providers/MotionProvider";
import { LanguageProvider } from "./lib/i18n";

export const metadata: Metadata = {
  title: "Arzon Built | Home Renovations — Lawrenceville, GA",
  description:
    "Premium home renovations in Lawrenceville, GA — roofing, siding, painting, windows & full remodels. Family-owned. Licensed & insured. Free estimates.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-white antialiased">
        <LanguageProvider>
          <MotionProvider>
            <SplashScreen />
            <CustomCursor />
            <ContactFloat />
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
