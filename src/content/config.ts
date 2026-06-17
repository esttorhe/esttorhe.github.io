// ABOUTME: Content collections configuration for Astro. Blog posts are MDX with a strict category enum.
// ABOUTME: Uses the Astro v5 Content Layer API with the glob loader.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum([
      'Tech',
      'Leadership',
      'Productivity',
      'Personal',
      'Community',
    ]),
    featured_image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};
