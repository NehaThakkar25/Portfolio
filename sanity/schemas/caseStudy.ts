import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
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
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "timeline", title: "Timeline", type: "string" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "cover", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "overview", title: "Overview", type: "text", rows: 4 }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "quote",
          title: "Pull quote",
          fields: [{ name: "text", type: "text", title: "Quote" }],
        },
      ],
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value" },
            { name: "label", type: "string", title: "Label" },
          ],
        },
      ],
    }),
    defineField({ name: "nextProject", title: "Next project", type: "reference", to: [{ type: "caseStudy" }] }),
  ],
  preview: { select: { title: "title", subtitle: "role", media: "cover" } },
});
