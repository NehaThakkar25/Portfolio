import type { Metadata } from "next";
import { Playfair_Display, Mulish } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Grain from "@/components/ui/Grain";
import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Neha Thakkar · Experience Designer",
  description:
    "Neha Thakkar, Experience Designer crafting considered, human-centred digital experiences. Selected work, case studies, and writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${mulish.variable} h-full`}>
      <body className="min-h-full">
        <Grain />
        <Cursor />
        <Nav />
        <SmoothScroll>
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
