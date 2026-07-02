import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import { TranslationProvider } from "@/hooks/use-translation";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iranSansX = localFont({
  src: "../public/fonts/iran-sans-x/woff2/IRANSansXV.woff2",
  variable: "--font-iran-sans-x",
  display: "swap",
});

const SITE_URL = "https://techruby.ir";
const OG_IMAGE = "/og/techruby-og.png";
const TITLE = "TechRuby — استودیوی مهندسی نرم‌افزار";
const DESCRIPTION =
  "تک‌روبی، استودیوی مهندسی نرم‌افزار: طراحی و پیاده‌سازی بک‌اند، دواپس و زیرساخت ابری، فرانت‌اند، میکروسرویس و سیستم‌های توزیع‌شده برای محصولات حساس و پرمقیاس.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | TechRuby",
  },
  description: DESCRIPTION,
  applicationName: "TechRuby",
  keywords: [
    // Farsi (primary market)
    "مهندسی نرم‌افزار",
    "توسعه بک‌اند",
    "دواپس",
    "زیرساخت ابری",
    "میکروسرویس",
    "سیستم‌های توزیع‌شده",
    "استودیو نرم‌افزار",
    "تک‌روبی",
    "برنامه‌نویسی",
    // English
    "software engineering",
    "backend development",
    "devops",
    "cloud infrastructure",
    "microservices",
    "distributed systems",
  ],
  authors: [{ name: "TechRuby", url: SITE_URL }],
  creator: "TechRuby",
  publisher: "TechRuby",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "TechRuby",
    locale: "fa_IR",
    alternateLocale: "en_US",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "TechRuby — تک‌روبی" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  // Favicon + apple-touch icon are provided by app/icon.png & app/apple-icon.png
  // (Next.js file conventions) — no manual `icons` entry needed.
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// schema.org structured data. TechRuby is the engineering studio inside the
// SalamRuby group (the coding school) and the maker of the FeedyRuby product —
// expose that graph so search engines connect the three brands.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "TechRuby",
      alternateName: "تک‌روبی",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon/android-chrome-512x512.png`,
      description: DESCRIPTION,
      parentOrganization: {
        "@type": "Organization",
        name: "SalamRuby",
        alternateName: "سلام‌روبی",
        url: "https://salamruby.ir",
      },
      sameAs: ["https://salamruby.ir", "https://feedyruby.ir"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "TechRuby",
      url: SITE_URL,
      inLanguage: "fa-IR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

const themeScript = `
  try {
    var theme = localStorage.getItem('techruby-theme') || localStorage.getItem('rubytech-theme') || 'dark';
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
    
    var locale = localStorage.getItem('techruby-locale') || localStorage.getItem('rubytech-locale') || 'en';
    root.dir = locale === 'fa' ? 'rtl' : 'ltr';
    root.lang = locale;
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
      className={`${geistSans.variable} ${geistMono.variable} ${iranSansX.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full overflow-x-clip bg-background font-sans text-foreground">
        <TranslationProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
