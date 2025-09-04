// app/page.tsx
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: { url: string };
  buttonText?: string;
  buttonURL?: string;
}

async function getHomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(
    `${baseUrl}/api/pages?filters[slug][$eq]=home&populate[sections][populate]=*`,
    { cache: "no-store" } // always fetch fresh
  );

  if (!res.ok) throw new Error("Failed to fetch home page");

  const json = await res.json();
  return json.data?.[0] || null;
}

function Hero({ title, subtitle, backgroundImage, buttonText, buttonURL }: HeroProps) {
  return (
    <section className="relative flex items-center justify-center text-center text-white h-[600px]">
      {backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt={title}
          fill
          priority
          className="object-cover brightness-50"
        />
      )}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-2xl mb-6">{subtitle}</p>
        {buttonText && buttonURL && (
          <a
            href={buttonURL}
            className="inline-block bg-[#48bdcb] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#36a9b6] transition-colors"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

export default async function Home() {
  const page = await getHomePage();

  if (!page) {
    return <div className="p-10 text-center">Home page not found</div>;
  }

  const heroSection = page.sections?.find(
    (section: any) => section.__component === "sections.hero"
  );

  if (!heroSection) {
    return <div className="p-10 text-center">Hero section not found</div>;
  }

  return (
    <main>
      <Hero
        title={heroSection.Title}
        subtitle={heroSection.Subtitle}
        backgroundImage={heroSection.BackgroundImage?.formats?.large || heroSection.BackgroundImage?.url ? { url: heroSection.BackgroundImage?.url || heroSection.BackgroundImage?.formats?.large?.url } : undefined}
        buttonText={heroSection.ButtonText}
        buttonURL={heroSection.ButtonURL}
      />
    </main>
  );
}
