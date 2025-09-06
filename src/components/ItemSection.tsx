"use client";

import Image from "next/image";
import ItemContent from "@/components/ItemContent";

interface Item {
  id: number;
  title: string;
  description: string;
  icon?: { url: string };
  buttonText?: string;
  buttonURL?: string;
  background?: { url: string };
}

interface ItemSectionProps {
  title: string;
  items: Item[];
  background?: { url: string }; // section-wide background
}

export default function ItemSection({ title, items, background }: ItemSectionProps) {
  return (
    <section className="relative py-20 text-white">
      {/* Section Background */}
      {background?.url && (
        <Image
          src={background.url}
          alt={title}
          fill
          priority
          className="object-cover brightness-50 -z-10"
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">{title}</h2>

        {/* Items */}
        <div className="flex flex-wrap justify-center gap-8">
          {items.map((item) => (
            <div key={item.id} className="w-full sm:w-[45%] lg:w-[30%] flex">
              {/* ✅ background now gets passed into ItemContent */}
              <ItemContent {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
