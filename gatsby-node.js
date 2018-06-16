// gatsby-node.js
const path = require('path');
const { match, head, replace, pipe, path: keyPath } = require('ramda');
const _ = require('lodash');
const { GraphQLString } = require("graphql");

const getFilename = pipe(
    keyPath(['fileAbsolutePath']),
    path.basename
  );
  
  // What if two blog posts share a slug though...
  const getSlug = pipe(
    getFilename,
    replace(/^\d\d\d\d-\d\d-\d\d-/, ''), // Strip leading date
    replace(/\.markdown$/, '') // Strip trailing extension
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

// NOTE: I'm using async/await to simplify the code since it's now natively supported
// in Node 8.x. This means that our function will return a promise
exports.createPages = async ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    const postTemplate = path.resolve("./src/templates/post.js");
    const tagTemplate = path.resolve("src/templates/tags.js");
  
    // Using async await. Query will likely be very similar to your pageQuery in index.js
    const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              id
              url
              frontmatter {
                tags
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
  };