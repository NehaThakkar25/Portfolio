// Single source of truth for Work categories.
// Kept free of Sanity/Next imports so both the site (lib/work.ts) and the
// Studio schema (sanity/schemas/project.ts) can read from it without pulling
// in the Sanity client. Edit categories HERE and only here.
//
// `slug` is also the value stored on each project in Sanity, so the site's
// `category == <slug>` queries match. Never let the two diverge.
export type WorkCategory = { slug: string; title: string; description: string };

export const WORK_CATEGORIES: WorkCategory[] = [
  { slug: "case-studies", title: "Case Studies", description: "End-to-end deep dives, from the problem to the outcome." },
  { slug: "product-design", title: "Product Design", description: "Shipped products and the thinking behind them." },
  { slug: "ux-audits", title: "UX Audits", description: "Heuristic reviews that surface friction and the fixes." },
  { slug: "branding", title: "Branding & Identity", description: "Visual identity and brand systems." },
  { slug: "design-systems", title: "Design Systems", description: "Component libraries, tokens, and documentation." },
  { slug: "concepts", title: "Concepts & Explorations", description: "Self-initiated redesigns and experiments." },
];
