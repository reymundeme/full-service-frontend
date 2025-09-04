// app/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      Hello! Slug: {params.slug}
    </div>
  );
}
