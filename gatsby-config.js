module.exports = {
  siteMetadata: {
    title: 'NSTorres',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/_posts/`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `pages`,
    //     path: `${__dirname}/content/pages/`,
    //   },
    // },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
  ],
}
