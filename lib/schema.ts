import { SITE_URL, SITE_NAME } from "./site";

// Public profiles that represent the same entity (helps Google/AI connect them).
// Add Behance / Dribbble / X etc. here as you confirm the URLs.
const SAME_AS = ["https://www.linkedin.com/in/nehathakkar250304/"];

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/neha-profile.avif`,
  jobTitle: "Experience & Product Designer",
  worksFor: { "@type": "Organization", name: "Zoop" },
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: SAME_AS,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function blogPostingSchema(p: {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  coverUrl?: string;
  publishedAt?: string;
}) {
  const url = `${SITE_URL}/reads/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    url,
    mainEntityOfPage: url,
    articleSection: p.category,
    ...(p.publishedAt ? { datePublished: p.publishedAt } : {}),
    ...(p.coverUrl ? { image: p.coverUrl } : {}),
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  };
}
