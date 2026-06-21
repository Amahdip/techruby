import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RubyTech — Premium Software Engineering Services",
  description:
    "End-to-end technical implementations: Backend, DevOps, Frontend, Microservices, Cloud Infrastructure, and Distributed Systems.",
  keywords: [
    "software engineering",
    "backend development",
    "devops",
    "cloud infrastructure",
    "microservices",
    "distributed systems",
  ],
  openGraph: {
    title: "RubyTech — Premium Software Engineering Services",
    description:
      "Engineering systems that scale without limits. Full-stack technical implementations for mission-critical platforms.",
    type: "website",
  },
};

const themeScript = `
  try {
    var theme = localStorage.getItem('rubytech-theme') || 'dark';
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
