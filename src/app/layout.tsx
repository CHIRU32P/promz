import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";

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
  themeColor: "#faf8f5",
};

export const metadata: Metadata = {
  title: "PROMZ // Real Promts — AI Video Reverse-Engineering Platform",
  description: "Turn reference videos into scene-by-scene production scripts, camera trajectories, and generative recreation prompts for Sora, Runway Gen-3, and Kling AI.",
  keywords: [
    "PROMZ",
    "Real Promts",
    "AI video reverse engineering",
    "video to prompt",
    "video to script",
    "Runway Gen-3 prompt generator",
    "Sora prompt extraction",
    "scene deconstruction",
    "camera trajectory solver"
  ],
  authors: [{ name: "PROMZ AI Systems" }],
  icons: {
    icon: "/promz-logo.png",
    apple: "/promz-logo.png",
  },
  openGraph: {
    title: "PROMZ — Real Promts AI Video Reverse-Engineering",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#faf8f5] text-[#1c1917] antialiased font-sans flex flex-col">
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
