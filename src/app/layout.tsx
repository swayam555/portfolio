import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TopBar } from "@/components/TopBar";
import { SITE_URL, site } from "@/data/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-instrument" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name}: Software Engineer`, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: SITE_URL }],
  keywords: ["Swayam Bajpai", "Software Engineer", "Spring Boot", "Angular", "Next.js", "Kafka", "FastAPI", "Microservices", "Fidelity", "Plynk", "Bengaluru"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name}: Software Engineer`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: `${site.name}: Software Engineer`, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eeeae0" },
    { media: "(prefers-color-scheme: dark)", color: "#0c2541" },
  ],
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  telephone: "+91-8707705446",
  email: `mailto:${site.email}`,
  worksFor: { "@type": "Organization", name: "Fidelity Investments" },
  alumniOf: "BMS Institute of Technology and Management",
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  url: SITE_URL,
  sameAs: [site.github, site.linkedin],
};

// Applies the saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="blueprint")document.documentElement.dataset.theme="blueprint"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${plexMono.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain min-h-dvh overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-accent focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-on-accent"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <TopBar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
