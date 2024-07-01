import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import PublicLayout from "@/components/publicLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evaluando",
  description: "Una página para todo el mundo",
  icons: "/logo.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
