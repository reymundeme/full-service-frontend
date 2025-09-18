import Link from "next/link";
import Image from "next/image";
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="bg-black text-white pb-5">
        {/* Top Section */}
        <div className="px-6 md:px-18 max-w-6xl mx-auto py-15 grid gap-10 sm:grid-cols-3 text-center md:text-left">
          {/* 1st Column */}
          <div className="space-y-3">
            <h1 className="font-bold text-lg leading-snug">
              Contact us today for a custom <br />
              consultation.
            </h1>

            <div className="text-[#48bdcb] text-lg">734-744-6061</div>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4 mt-4 text-3xl">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#48bdcb] transition-colors"
              >
                <FaFacebookSquare />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#48bdcb] transition-colors"
              >
                <FaInstagramSquare />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#48bdcb] transition-colors"
              >
                <FaLinkedin />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#48bdcb] transition-colors"
              >
                <FaTwitterSquare />
              </Link>
            </div>

            <button className="bg-[#36b1bf] px-8 py-4 font-bold mt-6 hover:text-black transition-colors duration-300 ease-in-out">
              EMAIL US
            </button>
          </div>

          {/* 2nd Column */}
          <div className="flex flex-col space-y-3">
            <Link
              href="/industries"
              className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
            >
              Industries
            </Link>
            <Link
              href="/who-we-are"
              className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
            >
              Who We Are
            </Link>
            <Link
              href="/what-we-do"
              className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
            >
              What We Do
            </Link>
          </div>

          {/* 3rd Column */}
          <div>
            <Image
              src="/images/Full-service-logo.png"
              alt="Full Service Agency"
              width={160}
              height={80}
              className="h-13 w-auto mx-auto md:mx-0"
              priority
            />
            <div className="mt-12 space-y-2 text-lg">
              <div className="font-bold">Full-Service Agency Group, Inc.</div>
              <div className="font-light">27555 Executive Dr # 100</div>
              <div className="font-light">Farmington Hills, MI 48331</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-12">
          <div className="w-full border-t text-center py-6 text-sm leading-relaxed">
            Copyright © 2025 Full Service Agency Group | All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
