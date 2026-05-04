import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

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
  title: "GrowthX Media — Scale Faster. Grow Smarter.",
  description:
    "India's results-driven social media & digital marketing agency.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body
        className="min-h-screen overflow-x-hidden"
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
      </body>
    </html>
  );
}
