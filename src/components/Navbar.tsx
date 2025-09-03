"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

interface Page {
  id: number;
  title: string;
  slug: string;
}

interface ChildPage {
  id: number;
  title: string;
  slug: string;
  page: {
    id: number;
    title: string;
    slug: string;
  };
}

export default function Navbar() {
  const [pages, setPages] = useState<Page[]>([]);
  const [childPages, setChildPages] = useState<ChildPage[]>([]);
  const [openPageId, setOpenPageId] = useState<number | null>(null); // desktop hover
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenPageId, setMobileOpenPageId] = useState<number | null>(null); // mobile toggle

  useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

        const pageRes = await fetch(`${baseUrl}/api/pages`);
        const pageData = await pageRes.json();

        const childRes = await fetch(`${baseUrl}/api/child-pages?populate=page`);
        const childData = await childRes.json();

        setPages(pageData.data || []);
        setChildPages(childData.data || []);
      } catch (error) {
        console.error("Failed to fetch navbar data:", error);
      }
    }

    fetchData();
  }, []);

  const getChildren = (pageId: number) =>
    childPages.filter((child) => child.page?.id === pageId);

  return (
    <nav className="bg-black text-white px-6 py-5 pr-1 pr-25 whitespace-nowrap">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link href="/home" className="text-xl font-bold hover:text-[#48bdcb]">
          <Image
            src="/images/Full-service-logo.png"
            alt="Full Service Agency"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {pages.map((page) => {
            const children = getChildren(page.id);

            return (
              <div
                key={page.id}
                className="relative"
                onMouseEnter={() => setOpenPageId(page.id)}
                onMouseLeave={() => setOpenPageId(null)}
              >
                <div className="flex items-center gap-2 text-xl hover:text-[#48bdcb] cursor-pointer">
                  {page.title}
                  {children.length > 0 && <ChevronDown size={16} />}
                </div>

                {children.length > 0 && openPageId === page.id && (
                  <div className="absolute left-0 top-full bg-black rounded-lg shadow-lg text-white z-50 w-88">
                    {children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/${page.slug}/${child.slug}`}
                        className="block px-4 py-4 whitespace-nowrap hover:bg-gray-700 hover:text-[#48bdcb]"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-[#48bdcb]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-black rounded-lg shadow-lg">
          {pages.map((page) => {
            const children = getChildren(page.id);
            const isOpen = mobileOpenPageId === page.id;

            return (
              <div key={page.id} className="border-b border-gray-800">
                {/* Parent item */}
                <div
                  className="flex justify-between items-center px-4 py-3 text-lg hover:text-[#48bdcb] cursor-pointer"
                  onClick={() =>
                    setMobileOpenPageId(isOpen ? null : page.id)
                  }
                >
                  <Link href={`/${page.slug}`}>{page.title}</Link>
                  {children.length > 0 && (
                    <ChevronDown
                      size={16}
                      className={`${isOpen ? "rotate-180" : ""} transition-transform`}
                    />
                  )}
                </div>

                {/* Child items */}
                {children.length > 0 && isOpen && (
                  <div className="pl-6 pb-2">
                    {children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/${page.slug}/${child.slug}`}
                        className="block py-2 text-white hover:text-[#48bdcb]"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}
