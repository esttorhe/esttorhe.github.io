// gatsby-node.js
const path = require('path');
const { match, head, replace, pipe, path: keyPath } = require('ramda');
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
  
    // Using async await. Query will likely be very similar to your pageQuery in index.js
    const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              id
              url
            }
          }
        }
      }
    `);
  
    if (result.errors) {
      console.log(result.errors);
      throw new Error("Things broke, see console output above");
    }
  
    // Create blog posts pages.
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.url,
        component: postTemplate,
        context: {
          // Context will be passed in to the page query as graphql vars
          id: node.id,
        },
      });
    });
  };