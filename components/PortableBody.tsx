import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5 text-[17px] leading-relaxed text-ink/75">{children}</p>,
    h2: ({ children, value }) => (
      <h2
        id={(value as { _key?: string })?._key}
        className="mb-4 mt-14 scroll-mt-28 font-serif text-[clamp(26px,3.2vw,32px)] font-normal text-ink"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={(value as { _key?: string })?._key}
        className="mb-3 mt-10 scroll-mt-28 font-serif text-[22px] font-normal text-ink"
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-rouge pl-4 font-serif text-[20px] italic text-ink/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 text-[17px] leading-relaxed text-ink/75 marker:text-rouge-soft">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 text-[17px] leading-relaxed text-ink/75 marker:text-rouge-soft">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1.5">{children}</li>,
    number: ({ children }) => <li className="pl-1.5">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-rouge-soft transition-colors hover:text-rouge"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(value as SanityImageSource).width(1200).url()}
          alt={value?.alt || ""}
          className="my-8 w-full rounded-xl border border-white/10"
        />
      ) : null,
    quote: ({ value }) =>
      value?.text ? (
        <blockquote className="my-8 border-l-2 border-rouge pl-5 font-serif text-[22px] italic text-ink/85">
          {value.text}
        </blockquote>
      ) : null,
    table: ({ value }) => {
      const rows: { _key?: string; cells?: string[] }[] = value?.rows ?? [];
      if (!rows.length) return null;
      const [head, ...body] = rows;
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-white/12">
          <table className="w-full border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-white/12 bg-white/[0.04]">
                {(head.cells ?? []).map((cell, i) => (
                  <th key={i} className="px-4 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-rouge-soft">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={row._key ?? r} className="border-b border-white/8 last:border-0">
                  {(row.cells ?? []).map((cell, c) => (
                    <td key={c} className="px-4 py-3 align-top text-ink/75">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

export default function PortableBody({ value }: { value: unknown }) {
  if (!value || !Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value as never} components={components} />;
}
