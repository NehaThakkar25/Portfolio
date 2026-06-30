import ReadsIndex from "@/components/reads/ReadsIndex";
import { getReads } from "@/lib/reads";

export const metadata = { title: "Reads | Neha Thakkar" };
export const revalidate = 60;

export default async function ReadsPage() {
  const posts = await getReads();

  return (
    <section className="px-[6vw] pb-[16vh] pt-[22vh]">
      <header className="mb-16 max-w-3xl">
        <span className="eyebrow">Reads</span>
        <h1 className="mt-5 font-serif text-[clamp(40px,7vw,84px)] font-normal leading-[0.95]">
          The Design <span className="italic text-rouge-soft">Diary</span>
        </h1>
        <p className="mt-6 text-[clamp(16px,2vw,20px)] leading-relaxed text-ink/65">
          A collection of ideas, insights, and lessons from my journey as a product designer. I write about
          UX thinking, design decisions, career reflections, and product learnings, offering an honest look
          into how my perspective evolves through building real products.
        </p>
      </header>

      <ReadsIndex posts={posts} />
    </section>
  );
}
