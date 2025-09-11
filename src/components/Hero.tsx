"use client";

import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: { url: string };
  buttonText?: string;
  buttonURL?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonURL,
}: HeroProps) {
  return (
    <section className="relative h-screen w-full text-white">
      {/* Background Image */}
      {backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt={title}
          fill
          priority
          quality={100}
          className="object-cover"
        />
      )}

      {/* Content at the bottom of the image */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full px-6 py-12 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg max-w-3xl text-center mx-auto">{title}</h1>
        <p className="text-lg md:text-2xl mb-6 text-shadow-lg max-w-7xl mx-auto">{subtitle}</p>
        {buttonText && buttonURL && (
          <a
            href={buttonURL}
            className="inline-block bg-black text-white px-18 py-6 rounded-xl font-extrabold hover:text-black hover:bg-[#36a9b6] transition-colors duration-400 shadow-xl/40 md:text-lg"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
