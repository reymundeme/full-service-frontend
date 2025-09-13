"use client";

import ColumnItemContent from "./ColumnItemContent";

interface ColumnItem {
  id: number;
  title: string;
  short_description: string;
   URL: string; 
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface ColumnItemSectionProps {
  title: string;
  background?: {
    url: string;
    alternativeText?: string;
  };
  column_item_content: ColumnItem[];
}

export default function ColumnItemSection({
  title,
  background,
  column_item_content,
}: ColumnItemSectionProps) {
  return (
    <section
      className="relative py-16 px-6 md:px-12 bg-black"
      style={
        background?.url
          ? {
              backgroundImage: `url(${background.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <div className="absolute inset-0" />
      <div className="relative max-w-6xl mx-auto text-center text-white">
        <h2 className="text-5xl md:text-7xl font-bold mb-10 mb:mb-20 mt-10">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {column_item_content?.map((item, index) => (
            <div key={item.id} className={index % 2 === 1 ? "pt-20" : ""}>
              <ColumnItemContent
                title={item.title}
                short_description={item.short_description}
                 URL={item.URL}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
