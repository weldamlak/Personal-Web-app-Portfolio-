import type { Metadata } from "next";
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

// 1. Comprehensive SEO Metadata & Social Cards
export const metadata: Metadata = {
  title: "Weldamlak Ayenew | Software Developer & STEM Leader",
  description: "Official portfolio of Weldamlak Ayenew — Software developer, founder of Winger Academy, and space science advocate based in Addis Ababa, Ethiopia.",
  keywords: [
    "Weldamlak Ayenew", 
    "Weldamlak A.", 
    "Software Developer", 
    "Ethiopia", 
    "Web Development", 
    "Winger Academy",
    "AXION Tech"
  ],
  authors: [{ name: "Weldamlak Ayenew" }],
  openGraph: {
    title: "Weldamlak Ayenew | Software Developer & STEM Leader",
    description: "Official portfolio showcasing web development, hardware projects, and educational initiatives.",
    url: "https://weldamlak.vercel.app",
    siteName: "Weldamlak Ayenew Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weldamlak Ayenew | Software Developer",
    description: "Software developer, founder of Winger Academy, and space science advocate.",
  },
  verification: {
    // Keeping this as a fallback even though you used the HTML file method
    google: "YseQJRzMUqD_sljbDqRsPiG1IJYaaXiwe5G5huPK194",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 2. JSON-LD Schema to build your "Knowledge Graph" on Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Weldamlak Ayenew",
    url: "https://weldamlak.vercel.app",
    jobTitle: "Software Developer & STEM Founder",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    knowsAbout: [
      "Python",
      "Full-Stack Web Development",
      "Arduino",
      "Robotics",
      "Space Science",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Injecting Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}