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
        ],
      },
    },
    `gatsby-plugin-feed`,
  ],
}
