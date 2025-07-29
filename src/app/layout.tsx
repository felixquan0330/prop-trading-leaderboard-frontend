// app/layout.tsx
import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import TrackingLoader from "@/components/TrackingLoader";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prop Trading Leaderboard",
  description: "Prop Trading Leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${onest.variable} antialiased bg-black text-white tracking-[0.02em] bg-[#050B16]`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TrackingLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
