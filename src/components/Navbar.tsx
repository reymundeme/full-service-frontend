"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false); // ✅ prevent hydration mismatch
  const [pages, setPages] = useState<Page[]>([]);
  const [childPages, setChildPages] = useState<ChildPage[]>([]);
  const [openPageId, setOpenPageId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenPageId, setMobileOpenPageId] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);

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

  if (!mounted) return null; // ✅ wait until hydration to avoid mismatch

  const getChildren = (pageId: number) =>
    childPages.filter((child) => child.page?.id === pageId);

  return (
    <nav className="sticky top-0 z-50 bg-black text-white px-6 py-7 md:pr-15 lg:pr-25 whitespace-nowrap">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-[#48bdcb]">
          <Image
            src="/images/Full-service-logo.png"
            alt="Full Service Agency"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {pages.map((page) => {
            const children = getChildren(page.id);
            const isActiveParent =
              pathname === `/${page.slug}` ||
              pathname.startsWith(`/${page.slug}/`) ||
              (page.slug === "home" && pathname === "/");

            return (
              <div
                key={page.id}
                className="relative"
                onMouseEnter={() => setOpenPageId(page.id)}
                onMouseLeave={() => setOpenPageId(null)}
              >
                {/* Parent Page Link */}
                <Link
                  href={`/${page.slug === "home" ? "" : page.slug}`}
                  className={`flex items-center gap-2 text-xl transition-colors duration-300 ease-in-out ${
                    isActiveParent
                      ? "text-[#48bdcb]"
                      : "hover:text-[#48bdcb]"
                  }`}
                >
                  {page.title}
                  {children.length > 0 && <ChevronDown size={16} />}
                </Link>

                {/* Dropdown */}
                {children.length > 0 && openPageId === page.id && (
                  <div className="absolute left-0 top-full bg-black rounded-lg shadow-lg text-white z-50 w-64">
                    {children.map((child) => {
                      const isActiveChild =
                        pathname === `/${page.slug}/${child.slug}`;
                      return (
                        <Link
                          key={child.id}
                          href={`/${page.slug}/${child.slug}`}
                          className={`block px-4 py-3 whitespace-nowrap ${
                            isActiveChild
                              ? "text-[#48bdcb] bg-gray-800"
                              : "hover:bg-gray-700 hover:text-[#48bdcb]"
                          }`}
                        >
                          {child.title}
                        </Link>
                      );
                    })}
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
            const isActiveParent =
              pathname === `/${page.slug}` ||
              pathname.startsWith(`/${page.slug}/`) ||
              (page.slug === "home" && pathname === "/");

            return (
              <div key={page.id} className="border-b border-gray-800">
                {/* Parent item */}
                <div className="flex justify-between items-center px-4 py-3 text-lg">
                  <Link
                    href={`/${page.slug === "home" ? "" : page.slug}`}
                    className={`${
                      isActiveParent
                        ? "text-[#48bdcb]"
                        : "hover:text-[#48bdcb]"
                    }`}
                  >
                    {page.title}
                  </Link>
                  {children.length > 0 && (
                    <button
                      onClick={() =>
                        setMobileOpenPageId(isOpen ? null : page.id)
                      }
                    >
                      <ChevronDown
                        size={16}
                        className={`${
                          isOpen ? "rotate-180" : ""
                        } transition-transform`}
                      />
                    </button>
                  )}
                </div>

                {/* Child items */}
                {children.length > 0 && isOpen && (
                  <div className="pl-6 pb-2">
                    {children.map((child) => {
                      const isActiveChild =
                        pathname === `/${page.slug}/${child.slug}`;
                      return (
                        <Link
                          key={child.id}
                          href={`/${page.slug}/${child.slug}`}
                          className={`block py-2 transition-colors duration-300 ease-in-out ${
                            isActiveChild
                              ? "text-[#48bdcb]"
                              : "hover:text-[#48bdcb]"
                          }`}
                        >
                          {child.title}
                        </Link>
                      );
                    })}
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
