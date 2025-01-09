import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "lenis/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veil",
  description: "Create stunning images using Veil.",
  keywords:
    "text overlay, typography effects, image design, web design, creative text, modern layouts, overlay text tools, responsive design, image-text integration, visual effects",
  authors: [{ name: "Rakibul Islam Sarkar", url: "/" }],
  icons: [{ rel: "icon", url: "/opal-logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        property="og:title"
        content="Veil - Creative Text Behind Images"
      />
      <meta
        property="og:description"
        content="Innovative tools for seamlessly integrating text behind images, enhancing web design with modern effects."
      />
      <meta
        property="og:image"
        content="/bear.png"
      />
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta property="og:type" content="website" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactLenis root options={{ autoRaf: true }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
