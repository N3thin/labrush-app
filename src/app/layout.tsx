import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LABRUSH | Nails, Hair & Spa in Kileleshwa, Nairobi",
  description: "Thoughtful beauty rituals and a softer pace at LABRUSH Nails, Hair & Spa. Book nails, hair, massage and facial services in Kileleshwa, Nairobi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
