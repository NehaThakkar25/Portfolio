import ReadsIndex from "@/components/reads/ReadsIndex";
import { getReads } from "@/lib/reads";

export const metadata = {
  title: "Product Design Blog | Neha Thakkar",
  description:
    "Notes on UX thinking, design decisions, and product learnings. A product design blog by a designer building real products for startups and brands.",
  alternates: { canonical: "/reads" },
};
export const revalidate = 60;

export default async function ReadsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = await getReads();

  return (
    <section className="px-[6vw] pb-[16vh] pt-[22vh]">
      <header className="mb-16 max-w-3xl">
        <span className="eyebrow">Reads</span>
        <h1 className="mt-5 font-serif text-[clamp(40px,7vw,84px)] font-normal leading-[0.95]">
          The Design <span className="italic text-rouge-soft">Diary</span>
        </h1>
        <p className="mt-6 text-[clamp(16px,2vw,20px)] leading-relaxed text-ink/65">
          Welcome to my product design blog: honest notes on UX thinking, design decisions, career
          reflections, and the lessons I pick up building real products. A look at how my perspective
          evolves, one project at a time.
        </p>
      </header>

      <ReadsIndex posts={posts} initialCategory={category} />
    </section>
  );
}
