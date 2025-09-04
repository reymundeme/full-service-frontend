import Hero from "@/components/Hero";

async function getHomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(
    `${baseUrl}/api/pages?filters[slug][$eq]=home&populate[sections][populate]=*`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch home page");

  const json = await res.json();
  return json.data?.[0] || null;
}

export default async function Home() {
  const page = await getHomePage();

  if (!page) return <div className="p-10 text-center">Home page not found</div>;

  const heroSection = page.sections?.find(
    (section: any) => section.__component === "sections.hero"
  );

  if (!heroSection)
    return <div className="p-10 text-center">Hero section not found</div>;

  return (
    <main>
      <Hero
        title={heroSection.Title}
        subtitle={heroSection.Subtitle}
        backgroundImage={
          heroSection.BackgroundImage?.formats?.large ||
          heroSection.BackgroundImage?.url
            ? { url: heroSection.BackgroundImage?.url || heroSection.BackgroundImage?.formats?.large?.url }
            : undefined
        }
        buttonText={heroSection.ButtonText}
        buttonURL={heroSection.ButtonURL}
      />
    </main>
  );
}
