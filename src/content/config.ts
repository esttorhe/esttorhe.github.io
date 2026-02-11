// ABOUTME: Content collections configuration for Astro
// ABOUTME: Defines type-safe schemas for blog posts and pages

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
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

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = {
  blog,
  pages,
};
