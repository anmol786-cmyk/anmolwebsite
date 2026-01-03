import "./globals.css";

import { Outfit as FontSans, Fraunces as FontHeading } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { HeaderProvider } from "@/components/layout/header-provider";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist/wishlist-drawer";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import { RestaurantSchema } from "@/components/seo/restaurant-schema";
import { MobileFloatingCTA } from "@/components/layout/mobile-floating-cta";
import { AiChatWidget } from "@/components/ai/ai-chat-widget";

import type { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = FontHeading({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.site_name,
    template: `%s | ${siteConfig.site_name}`,
  },
  description: siteConfig.site_description,
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "https://anmolsweets.se/wp-content/uploads/2022/08/cropped-anmol-logo-192-px.png",
    shortcut: "https://anmolsweets.se/wp-content/uploads/2022/08/cropped-anmol-logo-192-px.png",
    apple: "https://anmolsweets.se/wp-content/uploads/2022/08/cropped-anmol-logo-192-px.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable, fontHeading.variable)} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <HeaderProvider />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <WishlistDrawer />
          </div>
        </ThemeProvider>
        <Analytics />
        <RestaurantSchema />
        <AiChatWidget />
        <MobileFloatingCTA />
      </body>
    </html>
  );
}
