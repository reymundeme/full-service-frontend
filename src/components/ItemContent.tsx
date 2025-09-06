"use client";

import Image from "next/image";

interface ItemContentProps {
  id: number;
  title: string;
  description: string;
  icon?: { url: string };
  buttonText?: string;
  buttonURL?: string;
  background?: { url: string }; // ✅ new background per item
}

export default function ItemContent({
  title,
  description,
  icon,
  buttonText,
  buttonURL,
  background,
}: ItemContentProps) {
  return (
    <div
      className="relative p-6 rounded-2xl shadow-lg text-white w-full flex flex-col justify-between"
      style={{
        backgroundImage: background?.url ? `url(${background.url})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {background?.url && (
        <div className="absolute inset-0 bg-black/50 rounded-2xl" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        {icon?.url && (
          <div className="mb-4">
            <Image
              src={icon.url}
              alt={title}
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>

        {/* Description */}
        <div
          className="prose prose-invert text-sm mb-4 text-center"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* Button */}
      {buttonText && buttonURL && (
        <div className="relative z-10 text-center mt-4">
          <a
            href={buttonURL}
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
          >
            {buttonText}
          </a>
        </div>
      )}
    </div>
  );
}
