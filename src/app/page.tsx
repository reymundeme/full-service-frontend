import Hero from "@/components/Hero";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import ItemSection from "@/components/ItemSection";
import TextSection from "@/components/TextSection";
import TextSectionLeft from "@/components/TextSectionLeft";


async function getHomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(
    `${baseUrl}/api/pages?filters[slug][$eq]=home&populate=sections.background&populate=sections.image&populate=sections.BackgroundImage&populate=sections.item.icon`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch home page");

  const json = await res.json();
  return json.data?.[0] || null;
}

export default async function Home() {
  const page = await getHomePage();

  if (!page) return <div className="p-10 text-center">Home page not found</div>;

  return (
    <main>
      {page.sections?.map((section: any, index: number) => {
        switch (section.__component) {
          case "sections.hero":
            return (
              <Hero
                key={index}
                title={section.Title}
                subtitle={section.Subtitle}
                backgroundImage={
                  section.BackgroundImage?.formats?.large ||
                    section.BackgroundImage?.url
                    ? {
                      url:
                        section.BackgroundImage?.url ||
                        section.BackgroundImage?.formats?.large?.url,
                    }
                    : undefined
                }
                buttonText={section.ButtonText}
                buttonURL={section.ButtonURL}
              />
            );

          case "sections.section1":
            return (
              <Section1
                key={index}
                title={section.title}
                subtitle={section.subtitle}
                content={section.content}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
                image={section.image ? { url: section.image.url } : undefined}
                buttonText={section.button_text}
                buttonURL={section.button_url}
                buttonText2={section.button_text_2}
                buttonURL2={section.button_url_2}
              />
            );

          case "sections.section2":
            return (
              <Section2
                key={index}
                title={section.title}
                subtitle={section.subtitle}
                content={section.content}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
                image={section.image ? { url: section.image.url } : undefined}
                buttonText={section.button_text}
                buttonURL={section.button_url}
                buttonText2={section.button_text_2}
                buttonURL2={section.button_url_2}
              />
            );

          case "sections.item-section":
            return (
              <ItemSection
                key={index}
                title={section.title}
                items={section.item || []}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
              />
            );

          case "sections.text-section": // <-- your new Strapi component name
            return (
              <TextSection
                key={index}
                title={section.title}
                content={section.content}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
              />
            );

          case "sections.text-section-left":
            return (
              <TextSectionLeft
                key={index}
                title={section.title}
                content={section.content}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
              />
            );

          default:
            return null;
        }
      })}
    </main>
  );
}
