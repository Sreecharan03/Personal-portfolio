import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 22nd Birthday",
  description: "A memory journey built with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
