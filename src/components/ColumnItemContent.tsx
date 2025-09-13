"use client";

import Image from "next/image";

interface ColumnItemContentProps {
  title: string;
  short_description: string;
  image?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

export default function ColumnItemContent({
  title,
  short_description,
  image,
}: ColumnItemContentProps) {
  return (
    <div className="flex flex-col p-4 transition border-b items-center md:items-start text-center md:text-left">
      {image?.url && (
        <div className="mb-4 md:mb-0 md:mr-6 flex justify-center md:block shadow-lg rounded-lg overflow-hidden">
          <Image
            src={image.url}
            alt={image.alternativeText || title}
            width={image.width || 400}
            height={image.height || 400}
            className="object-contain"
          />
        </div>
      )}

      <div className="mt-2 md:mt-8">
        <h3 className="text-4xl font-semibold mb-2 text-white text-shadow-lg">{title}</h3>
        <p className="text-white text-shadow">{short_description}</p>
      </div>
    </div>
  );
}
