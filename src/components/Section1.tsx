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
  buttonText2?: string;
  buttonURL2?: string;
}

export default function Section1({
  title,
  subtitle,
  content,
  image,
  background,
  buttonText,
  buttonURL,
  buttonText2,
  buttonURL2,
}: Section1Props) {
  return (
    <section className="relative py-16 2xl:py-42 text-white">
      {background?.url && (
        <Image
          src={background.url}
          alt={title}
          fill
          priority
          className="object-cover -z-10"
        />
      )}

      <h1 className="text-5xl md:text-6xl font-bold mb-12 2xl:mb-24 text-center lg:px-10 ">{title}</h1>
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center lg:text-left">
        {/* Left column */}
        <div>

          {content && (
            <div
              className="richtext 2xl:text-left text-shadow-lg"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6">
            {buttonText && buttonURL && (
              <a
                href={buttonURL}
                className="inline-block bg-black text-white px-10 py-4 rounded-xl font-extrabold hover:text-black hover:bg-[#36a9b6] transition-colors duration-400 shadow-xl/40"
              >
                {buttonText}
              </a>
            )}

            {buttonText2 && buttonURL2 && (
              <a
                href={buttonURL2}
                className="inline-block bg-[#48bdcb] text-black px-10 py-4 rounded-xl font-extrabold hover:bg-[#89e9f5] transition-colors duration-300 shadow-xl/40"
              >
                {buttonText2}
              </a>
            )}
          </div>
        </div>

        {/* Right column */}
        {image?.url && (
          <div className="relative w-full h-full min-h-[400px]">
            <Image
              src={image.url}
              alt={title || "Section image"}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
