// ABOUTME: Astro configuration for estebantorr.es personal blog
// ABOUTME: Configures MDX, Tailwind CSS v4, sitemap, and markdown settings

// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://estebantorr.es',
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      // /cv/print/ is the PDF source — keep it out of the sitemap (the public CV is /cv/).
      filter: (page) => !/\/cv\/print\/?$/.test(page),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
