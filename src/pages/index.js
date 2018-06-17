// src/pages/index.js
import React from "react";
import Post from "../components/post";

export default class BlogIndex extends React.Component {
  render() {
    // Handle graphql errors
    if (this.props.errors && this.props.errors.length) {
      this.props.errors.forEach(({ message }) => {
        console.error(`BlogIndex render errr: ${message}`);
      });
      return <h1>Errors found: Check the console for details</h1>;
    }

    return (
      <div id='main'>
        {this.props.data.posts.edges.map(({ node }, i) => (
          <Post node={node} key={i} />
        ))}
      </div>
    );
  }
}

export const pageQuery = graphql`
  query allMarkdownRemark {
    posts: allMarkdownRemark (
      sort: { fields: [frontmatter___date], order: DESC },
      filter: { frontmatter: { layout: { ne: "post" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            categories
            tags
            layout
          }
          timeToRead
          url
          excerpt
        }
      }
    }
  }
`;