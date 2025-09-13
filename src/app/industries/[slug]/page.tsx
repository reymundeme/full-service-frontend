import Hero from "@/components/Hero";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import ItemSection from "@/components/ItemSection";
import TextSection from "@/components/TextSection";
import TextSectionLeft from "@/components/TextSectionLeft";
import ColumnItemSection from "@/components/ColumnItemSection";

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(
    `${baseUrl}/api/child-pages?filters[slug][$eq]=${slug}&populate=sections.background&populate=sections.image&populate=sections.BackgroundImage&populate=sections.item.icon&populate=sections.item.background&populate=sections.column_item_content.image`,
    { cache: "no-store" }
  );

  const json = await res.json();
  const industry = json.data?.[0];

  if (!industry) return <div>Industry page not found</div>;

  return (
    <main>
      {industry.sections?.map((section: any, index: number) => {
        switch (section.__component) {
          case "sections.hero":
            return (
              <Hero
                key={index}
                title={section.Title}
                subtitle={section.Subtitle}
                backgroundImage={
                  section.BackgroundImage?.formats?.large || section.BackgroundImage?.url
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
                background={section.background ? { url: section.background.url } : undefined}
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
                background={section.background ? { url: section.background.url } : undefined}
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
                background={section.background ? { url: section.background.url } : undefined}
              />
            );

          case "sections.text-section":
            return (
              <TextSection
                key={index}
                title={section.title}
                content={section.content}
                background={section.background ? { url: section.background.url } : undefined}
              />
            );

          case "sections.text-left-section":
            return (
              <TextSectionLeft
                key={index}
                title={section.title}
                content={section.content}
                background={section.background ? { url: section.background.url } : undefined}
              />
            );

          case "sections.column-item-section":
            return (
              <ColumnItemSection
                key={index}
                title={section.title}
                background={section.background ? { url: section.background.url } : undefined}
                column_item_content={section.column_item_content || []}
              />
            );

          default:
            return null;
        }
      })}
    </main>
  );
}
