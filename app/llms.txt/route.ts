import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# Neha Thakkar — Experience & Product Designer

> Neha Thakkar is an experience and product designer based in India, working with brands worldwide. She turns complex problems into simple, human products by balancing users, business, and technology. This is her portfolio.

## Pages
- [Home](${SITE_URL}/): Introduction, background, experience, education, and certifications.
- [Offerings](${SITE_URL}/offerings): Services including UI/UX design, UX audits, branding, product strategy, Framer development, design systems, prototyping, and workshops.
- [Work](${SITE_URL}/work): Selected projects and case studies.
- [Reads](${SITE_URL}/reads): The Design Diary — articles on UX thinking, design decisions, career reflections, and product learnings.
- [Contact](${SITE_URL}/contact): Ways to get in touch.

## About
- Role: Senior Product Designer at Zoop (leading multi-product design across B2B and B2C).
- Focus: interaction design, prototyping, design systems, UX research, product strategy.
- Background: began in engineering before moving into design.

## Notes
- Written content lives under /reads. Case studies live under /work.
- For enquiries, use the contact page.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
