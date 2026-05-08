import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Rich storytelling paragraph highlighting the fragrance.',
    }),
    defineField({
      name: 'emotionalSection',
      title: 'Emotional Snippet',
      type: 'string',
      description: 'E.g., "A bold and seductive fragrance crafted for presence and confidence."',
    }),
    defineField({
      name: 'topNotes',
      title: 'Top Notes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'middleNotes',
      title: 'Heart/Middle Notes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'baseNotes',
      title: 'Base Notes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'scentProfile',
      title: 'Scent Profile Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g., sweet, fruity, spicy, woody, sensual',
    }),
    defineField({
      name: 'keyHighlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g., Long lasting, Eau de Parfum, Day & Night wear',
    }),
    defineField({
      name: 'accordionSpecs',
      title: 'Product Specs (Accordion)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Product Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add multiple photos (e.g., lifestyle, packaging, angles) to show in a grid on the product page.',
    }),
    defineField({
      name: 'galleryGridColumns',
      title: 'Gallery Grid Columns',
      type: 'number',
      description: 'Select how many columns the gallery should have on desktop (1, 2, or 3).',
      options: {
        list: [
          { title: '1 Column', value: 1 },
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'amazonLink',
      title: 'Amazon Affiliate Link',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show on the home page?',
      initialValue: false,
    }),
  ],
});
