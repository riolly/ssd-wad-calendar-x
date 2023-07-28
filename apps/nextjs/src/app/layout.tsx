import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";

import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Calendrier - Three important things per day.",
  description:
    "Simple calender that help you stay focus on three things each day.",
  openGraph: {
    title: "Calendrier - Your Personal Calender",
    description:
      "Simple calender that help you stay focus on three things each day.",
    url: "https://calendrier.vercel.app",
    siteName: "Calendrier",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bertoriolly",
    creator: "@bertoriolly",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={["font-sans", fontSans.variable].join(" ")}>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
