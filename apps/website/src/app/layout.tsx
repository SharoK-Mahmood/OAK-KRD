import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-bodoni",
  display: "swap",
  preload: true,
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
  preload: true,
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Oak KRD",
    template: "%s · Oak KRD",
  },
  description:
    "Unified multilingual digital publishing platform for news, articles, books, and research.",
  other: {
    google: "notranslate",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fcfbf8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ku"
      translate="no"
      data-scroll-behavior="smooth"
      className={`notranslate ${bodoni.variable} ${newsreader.variable} ${sourceSans.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" translate="no">
        {children}
      </body>
    </html>
  );
}
