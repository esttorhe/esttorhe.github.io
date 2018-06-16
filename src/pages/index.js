// src/pages/index.js
import React from "react";
import Link from "gatsby-link";

function TagListItem(props) {
  const value = props.value;

  return (
    <li className='article-tag-list-item'>
      <Link to={'/tags/`{value}`'} key={value}>
        {value}
      </Link>
    </li>
  );
}

function TagsList(props) {
  const tags = props.tags;

  return (
    <span className='tags'>
      <ul className='article-tag-list'>
        {tags.map((tag) =>
          <TagListItem value={tag} key={tag}/>
        )}
      </ul>
    </span>
  );
}

function CategoriesList(props) {
  const categories = props.categories;
  return (
    <span className='category'>
      Categories:&nbsp;
      {categories.map((category) =>
        <Link to='/categories/`{category}`' key={category}>
          {category}
        </Link>
      )}
    </span>
  );
}

function PostFooter(props) {
  const categories = props.categories;
  const tags = props.tags;
  
  return (
    <footer className='entry-footer'>
      <div className='entry-meta-footer'>
        <CategoriesList categories={categories} />
        <TagsList tags={tags} />
      </div>
	  </footer>
  );
}

function PostLeftColumn(props) {
  const node = props.node;
  const url = node.url;
  const key = props.internalKey;
  const date = node.frontmatter.date;
  const timeToRead = node.timeToRead;

  return (
    <footer className='entry-meta-header'>
		  <span className='meta-elements date'>
        <Link to={url} key={key} className='article-date' style={{ textDecoration: 'none' }}>
          <time dateTime={date}>{(new Date(date)).toLocaleDateString()}</time>
        </Link>
		  </span>
		  <span className='meta-elements time'>Reading time: {timeToRead} minutes</span>
	  </footer>
  );
}

function PostHeader(props) {
  const url = props.url;
  const title = props.title;
  const key = '`{props.key}``{title}`';

  return (
    <header className='entry-header'>
      <h1 className='entry-title'>
        <Link to={url} key={key} style={{ textDecoration: 'none', }}>
          {title}
        </Link>
      </h1>
    </header>
  );
}

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
          <div key={i}>
            <article className={'post'}>
              <PostLeftColumn node={node} internalKey={i} />
              <PostHeader title={node.frontmatter.title} url={node.url} key='`{i}``{node.frontmatter.title}`' />
              <div className='entry-content'>
                {node.excerpt}
              </div>
              <PostFooter categories={node.frontmatter.categories} tags={node.frontmatter.tags} />
            </article>
          </div>
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