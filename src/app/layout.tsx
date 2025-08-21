import type { Metadata } from "next";

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Montserrat, Space_Mono } from "next/font/google";

import "./globals.css";
import React from "react";

const sansSerif = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const monospaced = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: "400",
});

export const metadata: Metadata = {
  description: "A social media website.",
  title: "Echo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${sansSerif.variable} ${monospaced.variable} antialiased`}>
        <MantineProvider>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
