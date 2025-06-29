import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/app/provider";
import { Toaster } from "sonner";
import Navbar from "@/components/v1/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vendor Management",
  description: "Vendor Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Provider>
          <Toaster richColors position="top-right" />
          <div className="min-h-screen max-w-6xl mx-auto bg-white">

              {children}
          </div>
      </Provider>

      </body>
    </html>
  );
}
