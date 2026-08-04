import type { Metadata } from "next";
import "./globals.css";

const metadataBase = new URL(process.env.SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "A Little Birthday Zine",
  description: "A handmade birthday surprise filled with memories, music, wishes, and one special Jakarta date.",
  openGraph: {
    title: "A Little Birthday Zine",
    description: "Made with love for one very special birthday boy.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "A Little Birthday Zine — Made With Love" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Little Birthday Zine",
    description: "Made with love for one very special birthday boy.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
