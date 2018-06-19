module.exports = {
  siteMetadata: {
    title: 'NSTorres',
    siteUrl: 'https://estebantorr.es/',
    description: 'Sneak peek of how ~~ObjC~~Swift (😉) looks from the perspective of a person borned & raised in Costa Rica.',
    githubRepo: 'https://github.com/esttorhe/esttorhe.github.io',
    author: 'Esteban Torres'
  },
  plugins: [
    `gatsby-plugin-typescript`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/_posts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages/`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-copy-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              aliases: { sh: "bash" },
            },
          },
        ],
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-twitter`,
  ],
}
