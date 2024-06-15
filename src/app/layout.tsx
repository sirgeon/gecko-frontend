import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kernel the Leopardgecko",
  description:
    "Kernel is a relatively young Leopardgecko. He arrived on the 15th June 2024. On this site you can see a lot about him including temperature, humidity and some cute pictures of that little fella.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibm_plex_mono.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
