// gatsby-node.js
const path = require('path');
const { match, head, replace, pipe, path: keyPath } = require('ramda');
const _ = require('lodash');
const { GraphQLString } = require("graphql");
const createPaginatedPages = require("gatsby-paginate");

const getFilename = pipe(
    keyPath(['fileAbsolutePath']),
    path.basename
  );
  
  // What if two blog posts share a slug though...
  const getSlug = pipe(
    getFilename,
    replace(/^\d\d\d\d-\d\d-\d\d-/, ''), // Strip leading date
    replace(/\.markdown$/, ''), // Strip trailing extension
    replace(/\.md$/, '') // Strip trailing extension
  );

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name !== "MarkdownRemark") {
    return {};
  }

  return Promise.resolve({
    url: {
      type: GraphQLString,
      resolve: getSlug,
    },
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (_.get(node, 'internal.type') === `MarkdownRemark`) {
    // Get the parent node
    const parent = getNode(_.get(node, 'parent'))

    // Create a field on this node for the "collection" of the parent
    // NOTE: This is necessary so we can filter `allMarkdownRemark` by
    // `collection` otherwise there is no way to filter for only markdown
    // documents of type `post`.
    createNodeField({
      node,
      name: 'group',
      value: _.get(parent, 'sourceInstanceName'),
    });
  }
};

// NOTE: I'm using async/await to simplify the code since it's now natively supported
// in Node 8.x. This means that our function will return a promise
exports.createPages = async ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    const postTemplate = path.resolve("./src/templates/post.js");
    const tagTemplate = path.resolve("src/templates/tags.js");
    const categoryTemplate = path.resolve("src/templates/categories.js");
  
    // Using async await. Query will likely be very similar to your pageQuery in index.js
    const result = await graphql(`
      query {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fields: { group: { eq: "posts" } } }
        ) {
          edges {
            node {
              id
              url
              timeToRead
              excerpt(pruneLength: 280)
              frontmatter {
                title
                date
                categories
                tags
                layout
              }
            }
          }
        }
      }
    `);
  
    if (result.errors) {
      console.log(result.errors);
      throw new Error("Things broke, see console output above");
    }
  
    const posts = result.data.allMarkdownRemark.edges;

    createPaginatedPages({
      edges: posts,
      createPage: createPage,
      pageTemplate: "src/templates/index.js",
      pageLength: 3, // This is optional and defaults to 10 if not used
      pathPrefix: "", // This is optional and defaults to an empty string if not used
      context: {}
    });
    
    // Create blog posts pages.
    posts.forEach(({ node }) => {
      createPage({
        path: node.url,
        component: postTemplate,
        context: {
          // Context will be passed in to the page query as graphql vars
          id: node.id,
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      });
    });

    // Categories pages:
    let categories = [];
    // Iterate through each post, putting all found categories into `categories`
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.categories")) {
        categories = categories.concat(edge.node.frontmatter.categories);
      }
    });
    // Eliminate duplicate categories
    categories = _.uniq(categories);

    // Make category pages
    categories.forEach(category => {
      createPage({
        path: `/categories/${_.kebabCase(category)}/`,
        component: categoryTemplate,
        context: {
          category,
        },
      });
    });
  };