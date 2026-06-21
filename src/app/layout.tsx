import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ghostworkerscompinsurance.com"),
  title: {
    default: "Ghost Workers Comp Insurance | Instant Coverage Online",
    template: "%s | GhostWorkersCompInsurance.com",
  },
  description:
    "Get ghost workers compensation insurance in minutes. Instant quotes, same-day certificates, and audit-proof coverage for contractors and small businesses.",
  keywords: [
    "ghost workers comp insurance",
    "ghost workers compensation",
    "instant workers comp coverage",
    "same day workers comp certificate",
    "ghost policy workers comp",
    "contractors workers compensation",
    "quick workers comp quote",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ghostworkerscompinsurance.com",
    siteName: "GhostWorkersCompInsurance.com",
    title: "Ghost Workers Comp Insurance | Instant Coverage Online",
    description:
      "Get ghost workers compensation insurance in minutes. Instant quotes and same-day certificates for contractors.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghost Workers Comp Insurance | Instant Coverage Online",
    description: "Get ghost workers comp insurance in minutes.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
