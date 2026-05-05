import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import Chatbot from "@/components/Chatbot";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://growthxmedia.com'),
  title: "GrowthX Media — India's Premier Results-Driven Digital Marketing Agency",
  description:
    "GrowthX Media is a top-tier digital marketing agency in India, specializing in Social Media Management, SEO, Paid Ads, and Web Development. Based in Jodhpur, we help brands nationwide scale with data-driven growth strategies.",
  keywords: [
    "digital marketing agency in jodhpur",
    "social media agency jodhpur",
    "best seo services in rajasthan",
    "growthX media jodhpur",
    "social media management jodhpur",
    "web development company jodhpur",
    "facebook ads agency rajasthan",
    "instagram marketing jodhpur",
    "content creation agency jodhpur",
    "digital marketing services in rajasthan",
    "jodhpur marketing agency",
    "advertising agency in jodhpur",
    "graphic design jodhpur",
    "branding agency rajasthan",
    "e-commerce growth jodhpur",
  ],
  authors: [{ name: "Pratyaksh Jangid" }],
  creator: "Pratyaksh Jangid",
  publisher: "GrowthX Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "GrowthX Media — Best Digital Marketing Agency in Jodhpur, Rajasthan",
    description: "Scale your brand with the premier results-driven social media & digital marketing agency in Jodhpur.",
    url: "https://growthxmedia.com", // Replace with actual domain if known
    siteName: "GrowthX Media",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "GrowthX Media Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthX Media — Digital Marketing Agency in Jodhpur",
    description: "India's premier results-driven social media & digital marketing agency based in Rajasthan.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", href: "/logo.png" },
    ],
    apple: [
      { url: "/logo.png", href: "/logo.png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "GrowthX Media",
  "image": "https://growthxmedia.com/logo.png",
  "url": "https://growthxmedia.com",
  "telephone": "+91 9950517638",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sardarpura",
    "addressLocality": "Jodhpur",
    "addressRegion": "Rajasthan",
    "postalCode": "342001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.2389,
    "longitude": 73.0243
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "21:00"
  },
  "sameAs": [
    "https://instagram.com/growth__xmedia"
  ],
  "priceRange": "₹₹",
  "description": "India's premier results-driven social media & digital marketing agency."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} overflow-x-hidden`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen overflow-x-hidden w-full relative"
        style={{
          backgroundColor: "#080810",
          color: "#F8F8FF",
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
        }}
      >
        {/* Ambient glow orb top-right */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(108,99,255,0.20) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        {/* Grain overlay */}
        <div
          className="grain"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
            opacity: 0.03,
          }}
        />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
        
        {/* Floating Icons */}
        <WhatsAppButton />
        <Chatbot />
      </body>
    </html>
  );
}
