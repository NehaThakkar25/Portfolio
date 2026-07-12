import type { Metadata } from "next";
import { Playfair_Display, Mulish } from "next/font/google";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { personSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const title = "Neha Thakkar | Product Designer in India";
const description =
  "A product designer in India crafting simple, human user experiences for startups and brands worldwide. Explore selected work and case studies.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${mulish.variable} h-full`}
    >
      <body className="min-h-full">
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
