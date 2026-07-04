export type Heading = { id: string; text: string; level: number };

type Block = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: { text?: string }[];
};

/** Pull H2/H3 headings out of a Portable Text body for the table of contents.
    Uses each block's stable _key as the anchor id (collision-free). */
export function extractHeadings(body: unknown): Heading[] {
  if (!Array.isArray(body)) return [];
  const out: Heading[] = [];
  for (const b of body as Block[]) {
    if (b?._type === "block" && (b.style === "h2" || b.style === "h3") && b._key) {
      const text = (b.children ?? [])
        .map((c) => c.text ?? "")
        .join("")
        .trim();
      if (text) out.push({ id: b._key, text, level: b.style === "h2" ? 2 : 3 });
    }
  }
  return out;
}
