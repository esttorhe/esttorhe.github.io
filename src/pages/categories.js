import React from "react";
import PropTypes from "prop-types";

// Utilities
import kebabCase from "lodash/kebabCase";

// Components
import Helmet from "react-helmet";
import Link from "gatsby-link";

const CategoriesPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div>
    <Helmet title={title} />
    <div>
      <h1>Categories</h1>
      <ul>
        {group.map(category => (
          <div key={category.fieldValue}>
            <Link to={`/categories/${kebabCase(category.fieldValue)}/`} style={{ textDecoration: 'none', }}>
              {category.fieldValue} ({category.totalCount})
            </Link>
            <ul>
            {category.edges.map((node) =>
              <li key={node.node.frontmatter.title}>
                <Link to={node.node.url} style={{ textDecoration: 'none', }}>
                  {node.node.frontmatter.title}
                </Link>
              </li>
            )}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  </div>
);

CategoriesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default CategoriesPage;

export const pageQuery = graphql`
  query CategoriesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
    ) {
      group(field: frontmatter___categories) {
        fieldValue
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
  }
`;