import type { Metadata } from "next";
import "./globals.css";
import { Orbitron, Inter } from "next/font/google";
import { Providers } from "./providers";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FURIA Fan Hub",
  description: "Entenda, segmente e engaje fãs da FURIA a partir dos seus dados sociais e interações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${orbitron.variable} ${inter.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
