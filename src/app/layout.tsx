import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper"; // loader wrapper

export const metadata: Metadata = {
  title: "Full Service Agency | Web, SEO & Digital Solutions",
  description:
    "Full Service Agency delivers expert web development, SEO, digital marketing, and creative solutions to help your business grow online. Fast, reliable, and results-driven services for every industry.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative">
        <ClientWrapper>
          <Navbar />
          <main>{children}</main>
          <Map />
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
