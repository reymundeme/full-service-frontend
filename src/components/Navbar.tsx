"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
  const [openPageId, setOpenPageId] = useState<number | null>(null); // track which dropdown is open

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
    <nav className="bg-black text-white px-10 py-7 pr-25">
      <div className="flex justify-between items-center">
        {/* Logo on the left */}
        <Link href="/home" className="text-xl font-bold hover:text-[#48bdcb]">
          <Image
            src="/images/Full-service-logo.png"
            alt="Full Service Agency"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Pages on the right */}
        <div className="flex gap-12">
          {pages.map((page) => {
            const children = getChildren(page.id);

            return (
              <div
                key={page.id}
                className="relative"
                onMouseEnter={() => setOpenPageId(page.id)}
                onMouseLeave={() => setOpenPageId(null)}
              >
                {/* Parent page */}
                <div className="flex items-center gap-1 text-xl hover:text-[#48bdcb] cursor-pointer">
                  {page.title}
                  {children.length > 0 && <ChevronDown size={16} />}
                </div>

                {/* Dropdown */}
                {children.length > 0 && openPageId === page.id && (
                  <div className="absolute left-0 top-full bg-black rounded-lg shadow-lg text-white z-50 w-88">
                    {children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/${page.slug}/${child.slug}`}
                        className="block px-4 py-3 whitespace-nowrap hover:bg-gray-700 hover:text-[#48bdcb] border-b-1 border-[#48bdcb]"
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
      </div>
    </nav>
  );
}
