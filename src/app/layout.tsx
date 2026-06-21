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
  title: "Tubagus Dafa | Next-Gen Developer Platform",
  description: "Bridging the gap between Low-Level Hardware Architecture and High-Performance Next.js Ecosystems.",
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
        {/* We add mt-16 (margin-top) so the content doesn't hide behind the fixed navbar */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}