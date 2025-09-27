import Hero from "@/components/Hero";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import ItemSection from "@/components/ItemSection";
import TextSection from "@/components/TextSection";
import TextSectionLeft from "@/components/TextSectionLeft";
import ColumnItemSection from "@/components/ColumnItemSection";
import { draftMode } from "next/headers";

export default async function HomePage() {
  // Draft mode is async in Next.js 15
  const dm = await draftMode();
  const isPreview = dm.isEnabled;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_STRAPI_URL in environment");
  }

  const res = await fetch(
    `${baseUrl}/api/pages?filters[slug][$eq]=home&populate=sections.background&populate=sections.image&populate=sections.BackgroundImage&populate=sections.item.icon&populate=sections.column_item_content.image${isPreview ? "&publicationState=preview" : ""}`,
    {
      cache: isPreview ? "no-store" : "force-cache",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch page data:", res.status, res.statusText);
    return <div>Failed to load page</div>;
  }

  const json = await res.json();
  const page = json.data?.[0];
  if (!page) return <div>Page not found</div>;

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
                  section.BackgroundImage?.url ||
                  section.BackgroundImage?.formats?.large?.url
                    ? { url: section.BackgroundImage?.url || section.BackgroundImage?.formats?.large?.url }
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
      {isPreview && (
        <div
          style={{
            background: "black",
            color: "white",
            padding: "8px 12px",
            position: "fixed",
            bottom: "10px",
            right: "10px",
            borderRadius: "4px",
          }}
        >
        </div>
      )}
    </main>
  );
}
