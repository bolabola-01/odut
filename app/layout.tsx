import type { Metadata } from "next";
import "./globals.css";

const metadataBase = new URL(process.env.SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "Happy 24th Birthday, Oan",
  description: "A handmade birthday surprise for Reynhart Henry Halomoan, filled with music, wishes, trivia, and one special Jakarta dinner date.",
  openGraph: {
    title: "Happy 24th Birthday, Oan",
    description: "A little birthday zine made with so much love.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "A Little Birthday Zine — Made With Love" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy 24th Birthday, Oan",
    description: "A little birthday zine made with so much love.",
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
