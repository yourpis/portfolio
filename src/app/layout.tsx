import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Using the premium Vercel fonts
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tubagus Dafa | Full-Stack & Embedded Engineer",
  description: "Tubagus Dafa is a Full-Stack Software & Hardware Engineer based in Jakarta, crafting systems, interfaces, and digital experiences.",
  openGraph: {
    siteName: "Tubagus Dafa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}