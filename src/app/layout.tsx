import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import BackToTop from "./components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myportfolio-neon-chi-60.vercel.app"),
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  authors: [{ name: "Fatimah Noman", url: "https://github.com/Fatimahnoman" }],
  openGraph: {
    title: "Fatimah Noman – Full Stack Developer & AI Specialist",
    description:
      "Explore the projects, skills, and creativity of Fatimah Noman, a developer building modern, responsive websites and intelligent AI systems.",
    url: "https://myportfolio-neon-chi-60.vercel.app",
    siteName: "Fatimah Noman Portfolio",
    images: [
      {
        url: "/my.jpg",
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
    creator: "@FatimahBuildsAI",
    images: ["/my.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070512",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Fatimah Noman",
    url: "https://myportfolio-neon-chi-60.vercel.app",
    jobTitle: "Full Stack Developer & AI Specialist",
    sameAs: [
      "https://github.com/Fatimahnoman",
      "https://x.com/FatimahBuildsAI",
      "https://www.instagram.com/fatimah_builds_ai",
      "https://www.facebook.com/share/1Bx8NV5RLU/",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Agentic AI",
      "Tailwind CSS",
      "Node.js",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/my.jpg" as="image" />
        <link rel="preload" href="/about.webp.png" as="image" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <CustomCursor />
        <BackToTop />
        {children}
      </body>
    </html>
  );
}
