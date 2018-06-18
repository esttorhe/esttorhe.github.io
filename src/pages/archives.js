import React from "react";
import Posts from '../components/posts';

export default class Archives extends React.Component {
    render() {
        return <Posts posts={this.props.data.allMarkdownRemark} />
    }
}

export const pageQuery = graphql`
    query AllPosts {
        allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fields: { group: { eq: "posts" } } }
    ) 
    {
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
`;