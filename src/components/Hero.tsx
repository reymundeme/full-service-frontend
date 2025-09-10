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
    <section className="relative flex items-center justify-center text-center text-white h-[83vh]">
      {backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt={title}
          fill
          priority
          quality={100}
          className="object-cover brightness-50"
        />
      )}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-2xl mb-6">{subtitle}</p>
        {buttonText && buttonURL && (
          <a
            href={buttonURL}
            className="inline-block bg-black text-white px-14 py-4 rounded-xl font-extrabold hover:text-black hover:bg-[#36a9b6] transition-colors duration-400 shadow-xl/40"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
