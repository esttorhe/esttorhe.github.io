// ABOUTME: Prettier config for the astro-v2 stack.
// ABOUTME: Adds prettier-plugin-astro so `.astro` files format alongside `.ts`, `.mjs`, `.mdx`, `.css`.

/** @type {import('prettier').Config} */
export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
};
