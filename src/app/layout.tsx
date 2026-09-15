import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raj Portfolio",
  description:
    "Portfolio of Raj Kumar Gupta, Software Developer specializing in MERN Stack, Core Java & Python.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col selection:bg-primary-cyan/30`}
      >
        {children}
      </body>
    </html>
  );
}
