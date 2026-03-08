import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedCHR.ai - Hacker Edition",
  description: "AI-Powered Clinical Synthesis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen app-layout">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden ml-[240px] main-wrapper bg-[#FAF9F5]">
            <TopBar />
            <main className="flex-1 p-8 max-w-[1200px] w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
