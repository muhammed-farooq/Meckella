import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "string" },
        { name: "text", title: "Body Text", type: "text" },
        { 
          name: "backgroundImages", 
          title: "Background Images (Cinematic Crossfade)", 
          type: "array", 
          of: [{ type: "image", options: { hotspot: true } }],
          description: "Add 1 or more images. If multiple are added, they will slowly crossfade on the homepage."
        },
      ],
    }),
    defineField({
      name: "announcementBar",
      title: "Announcement Bar Messages",
      type: "array",
      of: [{ type: "string" }],
      description: "Messages to display in the header announcement bar. Leave empty to hide the bar.",
    }),
    defineField({
      name: "promotionalBanners",
      title: "Promotional Sub-Banners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Collection/Promo Title", type: "string" },
            { name: "subtitle", title: "Subtitle (Optional)", type: "string" },
            { name: "image", title: "Background Image", type: "image", options: { hotspot: true } },
            { name: "linkUrl", title: "Link URL", type: "string", description: "e.g., /products or a specific amazon link" },
          ],
        },
      ],
      description: "Grid of banners to promote collections like 'Classics' or 'Limited Editions'.",
    }),
    defineField({
      name: "marquee",
      title: "Benefit Marquee",
      type: "array",
      of: [{ type: "string" }],
      description: "Words that scroll infinitely (e.g., 'Cruelty Free', 'Long Lasting')",
    }),
    defineField({
      name: "craftsmanship",
      title: "Craftsmanship Timeline",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", title: "Step Number/Title", type: "string" },
            { name: "title", title: "Heading", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "moods",
      title: "Designed For Every Mood",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Mood Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "image", title: "Atmosphere Image", type: "image", options: { hotspot: true } },
            { name: "linkedProduct", title: "Linked Product (Optional)", type: "reference", to: [{ type: "product" }], description: "Select a product to link this mood card to." },
          ],
        },
      ],
    }),
    defineField({
      name: "featuredProducts",
      title: "Featured Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      description: "Manually select and order the products shown on the homepage.",
      validation: (rule) => rule.max(5),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page Settings" };
    },
  },
});
