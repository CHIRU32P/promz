import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#08080a",
};

export const metadata: Metadata = {
  title: "DECONSTRUCT // AI Video Reverse-Engineering Platform",
  description: "Turn reference videos into scene-by-scene production scripts, camera trajectories, and generative recreation prompts for Sora, Runway Gen-3, and Kling AI.",
  keywords: [
    "AI video reverse engineering",
    "video to prompt",
    "video to script",
    "Runway Gen-3 prompt generator",
    "Sora prompt extraction",
    "scene deconstruction",
    "camera trajectory solver"
  ],
  authors: [{ name: "DECONSTRUCT Core Systems" }],
  openGraph: {
    title: "DECONSTRUCT — AI Video Reverse-Engineering",
    description: "Reverse-engineer any video into frame-accurate scripts and recreation prompts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#08080a] text-[#f4f4f6] selection:bg-[#ff5500]/30 selection:text-white antialiased font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
