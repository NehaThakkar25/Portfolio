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
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-rouge-soft underline underline-offset-2">
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
  },
};

export default function PortableBody({ value }: { value: unknown }) {
  if (!value || !Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value as never} components={components} />;
}
