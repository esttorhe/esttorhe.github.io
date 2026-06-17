// ABOUTME: RSS feed endpoint for estebantorr.es using @astrojs/rss.
// ABOUTME: Item shape preserves Hugo permalinks (/:year/:month/:title/) so existing subscribers keep working.

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => +b.data.date - +a.data.date,
  );

  return rss({
    title: 'The mind of Esteban',
    description:
      'Mostly engineering musings from the mind of a Costarrican who transplanted to Berlin.',
    site: context.site ?? 'https://estebantorr.es',
    items: posts.map((post) => {
      const date = new Date(post.data.date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const titleSlug = post.id.replace(/^\d{4}-\d{2}-/, '').replace(/\.mdx?$/, '');
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: date,
        link: `/${year}/${month}/${titleSlug}/`,
        categories: [post.data.category, ...post.data.tags],
      };
    }),
    customData: '<language>en-us</language>',
  });
}
