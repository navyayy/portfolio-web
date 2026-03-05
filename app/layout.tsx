import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  EB_Garamond,
  Libre_Baskerville,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const BASE_URL = "https://navyayy.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F2",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Navya Srivastav | Content Marketing Executive",
    template: "%s | Navya Srivastav",
  },
  description:
    "Content Marketing Executive specializing in fintech, healthcare, and SaaS. Creating content strategies that drive growth, engagement, and measurable results.",
  keywords: [
    "Navya Srivastav",
    "content marketing",
    "content marketing executive",
    "SEO specialist",
    "technical writing",
    "fintech marketing",
    "SaaS content strategy",
    "healthcare content",
    "content strategist",
    "digital marketing portfolio",
  ],
  authors: [{ name: "Navya Srivastav" }],
  creator: "Navya Srivastav",
  openGraph: {
    title: "Navya Srivastav — Content Marketing Executive",
    description:
      "Crafting stories that convert, content that ranks. Explore my portfolio of marketing work across fintech, healthcare, and SaaS.",
    url: BASE_URL,
    siteName: "Navya Srivastav Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Navya Srivastav — Content Marketing Executive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navya Srivastav — Content Marketing Executive",
    description:
      "Crafting stories that convert, content that ranks. Explore my portfolio of marketing work across fintech, healthcare, and SaaS.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${ebGaramond.variable} ${libreBaskerville.variable} ${cormorantGaramond.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-surface text-text-primary font-body antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
