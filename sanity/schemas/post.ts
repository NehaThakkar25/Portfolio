import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Read",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["UX Design", "UI Design", "Design Thinking", "Tools", "UX Strategy"],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "readTime", title: "Read time", type: "string", description: "e.g. 5 min" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "cover", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }, { type: "table" }],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      description: "Optional. Questions and answers specific to this post.",
      type: "array",
      of: [
        {
          type: "object",
          name: "faq",
          fields: [
            { name: "question", type: "string", title: "Question", validation: (r) => r.required() },
            { name: "answer", type: "text", rows: 4, title: "Answer", validation: (r) => r.required() },
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "cover" },
  },
});
