module.exports = {
  siteMetadata: {
    title: 'NSTorres',
    sitUrl: 'https://estebantorr.es',
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
  ],
}
