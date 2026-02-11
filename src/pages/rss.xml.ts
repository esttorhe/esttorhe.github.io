// ABOUTME: RSS feed endpoint for the blog
// ABOUTME: Generates an RSS 2.0 feed with all published blog posts

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  // Sort posts by date, newest first
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  );

  return rss({
    title: 'Esteban Torres',
    description: 'Engineering Manager writing about iOS development, leadership, and engineering culture.',
    site: context.site ?? 'https://estebantorr.es',
    items: sortedPosts.map((post) => {
      // Extract year and month from date for URL
      const date = new Date(post.data.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      // Extract slug from filename (remove date prefix)
      const slug = post.slug.replace(/^\d{4}-\d{2}-/, '');

      return {
        title: post.data.title,
        pubDate: date,
        description: post.data.description ?? '',
        link: `/${year}/${month}/${slug}/`,
        categories: post.data.tags ?? [],
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
