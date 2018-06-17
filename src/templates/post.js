// src/templates/post.js
import React from "react";
import CommentsSection from '../components/comments/comments_section';

export default class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const githubRepo = 'https://github.com/esttorhe/esttorhe.github.io'

    return (
      <div className="post">
        <h1>{post.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="content"
        />

        <CommentsSection issueNumber={post.frontmatter.issueNumber} url={post.url} githubRepo={githubRepo} />
      </div>
    );
  }
}

// NOTE: The $id var is passed in via context when calling createPage in gatsby-node.js
export const pageQuery = graphql`
  query PostById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        issueNumber
      }
      html
      url
    }
  }
`;