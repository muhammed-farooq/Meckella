import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "The Pursuit of Perfection",
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "philosophy",
      title: "The Brand Philosophy",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "text", title: "Text", type: "text" },
      ],
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients & Craft",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "text", title: "Text", type: "text" },
        { name: "image", title: "Ingredient Image", type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "promise",
      title: "The Promise (e.g. 8 Hours of Presence)",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "text", title: "Text", type: "text" },
      ],
    }),
    defineField({
      name: "founders",
      title: "The Founders / The Noses",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Founder Name", type: "string" },
            { name: "bio", title: "Biography / Vision", type: "text" },
            { name: "image", title: "Founder Portrait", type: "image", options: { hotspot: true } },
          ],
        }
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page Settings" };
    },
  },
});
