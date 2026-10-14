import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono, PT_Serif, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import FullPagePopupWrapper from "@/components/page-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sourceSansPro = Source_Sans_3({
  variable: "--font-source-sans-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cbim-rutgers.github.io"),
  title: {
    default: "CBIM | Rutgers University",
    template: "%s | CBIM Rutgers",
  },
  description:
    "The Center for Computational Biomedicine Imaging and Modeling (CBIM) at Rutgers University, led by Prof. Dimitris Metaxas. Research in generative models, computer vision, LLMs and biomedical AI.",
  openGraph: {
    title: "CBIM | Rutgers University",
    description:
      "Center for Computational Biomedicine Imaging and Modeling at Rutgers University, led by Prof. Dimitris Metaxas.",
    siteName: "CBIM Rutgers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ptSerif.variable} ${sourceSansPro.className} antialiased relative`}
      >
        <ThemeProvider>
          <FullPagePopupWrapper>{children}</FullPagePopupWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
