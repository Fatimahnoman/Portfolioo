import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fatimah-noman-portfolio.vercel.app"),
  title: "Fatimah Noman – Full Stack Developer & AI Specialist",
  description:
    "Official portfolio of Fatimah Noman, a passionate Full Stack Developer and AI Specialist skilled in Next.js, Tailwind CSS, TypeScript, and Agentic AI solutions.",
  keywords: [
    "Fatimah Noman",
    "Full Stack Developer",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Python",
    "Agentic AI",
    "Automation Specialist",
    "UI/UX Designer",
  ],
  authors: [{ name: "Fatimah Noman", url: "https://github.com/Fatimahnoman" }],
  openGraph: {
    title: "Fatimah Noman – Full Stack Developer & AI Specialist",
    description:
      "Explore the projects, skills, and creativity of Fatimah Noman, a developer building modern, responsive websites and intelligent AI systems.",
    url: "https://fatimah-noman-portfolio.vercel.app",
    siteName: "Fatimah Noman Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Fatimah Noman Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatimah Noman – Portfolio",
    description: "View the personal portfolio of Fatimah Noman.",
    creator: "@noman62987",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
