import React from "react";
import PropTypes from "prop-types";

// Components
import Link from "gatsby-link";

const Categories = ({ pathContext, data }) => {
  const { category } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } categorized as «${category}»`;

  return (
    <div>
      <h1>{categoryHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { title } = node.frontmatter;
          const { url } = node.url;
          return (
            <li key={url}>
              <Link to={url} style={{ textDecoration: 'none', }}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <Link to="/categories">All categories</Link>
    </div>
  );
};

Categories.propTypes = {
  pathContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default Categories;

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
          }
          url
        }
      }
    }
  }
`;