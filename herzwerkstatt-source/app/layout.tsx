import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Herzwerkstatt – Herz und Blutgefäße",
  description: "Interaktive 60-Minuten-Lernwebsite zum Körperkreislauf in zwei deutlich unterschiedlichen Schwierigkeitsstufen.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
