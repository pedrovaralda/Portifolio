import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const { personal } = portfolioData;

export const metadata: Metadata = {
  title: `${personal.name} | ${personal.roleTitle}`,
  description: `${personal.roleTitle} specializing in ${personal.specialization}. ${personal.shortBio}`,
  keywords: [
    personal.name,
    "Engenheiro de Software",
    "Software Engineer",
    "Luizalabs",
    "Algar Telecom",
    "Grupo Ri Happy",
    "Node.js",
    "TypeScript",
    "React",
    "PostgreSQL",
    "Java",
    "Python",
    "CI/CD com IA",
    "Automação",
    "Arquitetura Escalável",
    "Portfolio",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pedrohenrique.dev",
    title: `${personal.name} | ${personal.roleTitle}`,
    description: personal.shortBio,
    siteName: `${personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | ${personal.roleTitle}`,
    description: personal.shortBio,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-zinc-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
