import { defineField, defineType } from "sanity";
import { WORK_CATEGORIES } from "@/lib/work-categories";

export const project = defineType({
  name: "project",
  title: "Work",
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
        // Generated from the single source of truth so the dropdown can never
        // drift from the site's categories. value === slug on purpose.
        list: WORK_CATEGORIES.map((c) => ({ title: c.title, value: c.slug })),
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 2, description: "One or two lines for the card." }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "timeline", title: "Timeline", type: "string" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "cover", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "overview", title: "Overview", type: "text", rows: 4 }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        { type: "table" },
        { type: "object", name: "quote", title: "Pull quote", fields: [{ name: "text", type: "text", title: "Quote" }] },
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
    defineField({ name: "nextProject", title: "Next project", type: "reference", to: [{ type: "project" }] }),
  ],
  orderings: [
    { title: "Newest first", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "category", media: "cover" } },
});
