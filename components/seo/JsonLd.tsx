export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // structured data is trusted, server-generated content
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
