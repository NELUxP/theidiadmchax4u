import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Youtube, Github, Mail } from "lucide-react";
import { AuthProvider } from "@/components/auth-provider";
import { ProfilePopover } from "@/components/profile-popover";

export const metadata: Metadata = {
  title: "MCHAX4U",
  description: "Play without limits on your jailbroken PS4.",
  generator: "Next.js",
  applicationName: "MCHAX4U",
  referrer: "origin-when-cross-origin",
  keywords: [
    "MCHAX4U",
    "PS4 Minecraft hacks",
    "Minecraft cross-platform exploits",
    "Minecraft PS4 cheats",
    "Minecraft Bedrock hacks",
    "PS4 Minecraft tools",
  ],
  authors: [{ name: "NELUxP MoDz", url: "https://mchax4u.netlify.app/" }],
  creator: "NELUxP MoDz",
  publisher: "NELUxP MoDz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mchax4u.netlify.app/"), // Replace with your actual website URL
  alternates: {
    canonical: "/", // Canonical URL for SEO
  },
  openGraph: {
    title: "MCHAX4U - PS4 Minecraft Cross-Platform Exploit & Hacks",
    description: "Unlock the full potential of Minecraft on PS4 with MCHAX4U! Explore cross-platform exploits, hacks, and tools to enhance your gameplay experience.",
    url: "https://mchax4u.netlify.app/", // Replace with your actual website URL
    siteName: "MCHAX4U",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "MCHAX4U - PS4 Minecraft Cross-Platform Exploit & Hacks",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png", // Replace with your actual favicon path
    shortcut: "/favicon.png", // Replace with your actual favicon path
    other: {
      rel: "favicon.png",
      url: "/favicon.png", // Replace with your actual custom icon path
    },
  },
  manifest: "/site.webmanifest", // Replace with your actual manifest file path
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-[#3e8e2f]">
            <header className="mc-navbar py-2 text-center rounded-b-lg p-6">
              <nav className="flex justify-center gap-2">
                <Link href="/" className="mc-navbar-button">
                  Home
                </Link>
                <Link href="/about" className="mc-navbar-button">
                  About
                </Link>
                <Link href="/download" className="mc-navbar-button">
                  Download
                </Link>
              </nav>
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="mc-navbar py-6 text-center border-black rounded-t-lg">
              <div className="container mx-auto px-4 ">
                {/* Social Icons */}
                <div className="flex justify-center gap-4 mb-4">
                  <Link
                    href="https://www.youtube.com/@neluxpmodz"
                    aria-label="YouTube"
                    className="mc-button-icon"
                  >
                    <Youtube className="w-6 h-6 text-[#c6c6c6] hover:text-white" />
                  </Link>
                  <Link
                    href="https://github.com/NELUxP"
                    aria-label="GitHub"
                    className="mc-button-icon"
                  >
                    <Github className="w-6 h-6 text-[#c6c6c6] hover:text-white" />
                  </Link>
                  <Link
                    href="mailto:neluxdxd@gmail.com"
                    aria-label="Email"
                    className="mc-button-icon"
                  >
                    <Mail className="mc-button-iconw-6 h-6 text-[#c6c6c6] hover:text-white" />
                  </Link>
                </div>

                {/* Footer Text */}
                <div className="text-[#c6c6c6] text-sm">
                  <p className="mb-2">© 2025 MCHAX4U. All rights reserved.</p>
                  <p className="mb-2">
                    Not affiliated with Mojang or Microsoft.
                  </p>
                  <p>
                    Made with <span className="text-red-500">❤️</span> by the NELUxP MoDz
                  </p>
                </div>
              </div>
            </footer>
            <ProfilePopover />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

import "./globals.css";
