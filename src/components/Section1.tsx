"use client";

import Image from "next/image";

interface Section1Props {
  title: string;
  subtitle?: string;
  content?: string; // rich text from Strapi
  image?: { url: string };
  background?: { url: string };
  buttonText?: string;
  buttonURL?: string;
}

export default function Section1({
  title,
  subtitle,
  content,
  image,
  background,
  buttonText,
  buttonURL,
}: Section1Props) {
  return (
    <section className="relative py-36 text-white">
      {background?.url && (
        <Image
          src={background.url}
          alt={title}
          fill
          priority
          className="object-cover brightness-50 -z-10"
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center lg:text-left">
        {/* Left column */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg md:text-2xl mb-6">{subtitle}</p>}
          {content && (
            <div
              className="prose prose-invert mb-6 text-gray-200"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          {buttonText && buttonURL && (
            <a
              href={buttonURL}
              className="inline-block bg-[#48bdcb] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#36a9b6] transition-colors"
            >
              {buttonText}
            </a>
          )}
        </div>

        {/* Right column */}
        {image?.url && (
          <div className="flex justify-center">
            <Image
              src={image.url}
              alt={title}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
