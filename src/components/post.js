import React from "react";
import Link from "gatsby-link";
import PostFooter from '../components/post_footer';
  
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
  
  function Post(props) {
    const node = props.node;
    const internalKey = props.key;
  
    return (
      <article className={'post'}>
        <PostLeftColumn node={node} internalKey={internalKey} />
        <PostHeader title={node.frontmatter.title} url={node.url} key='`{internalKey}``{node.frontmatter.title}`' />
        <div className='entry-content'>
          {node.excerpt}

					<div className='read-more'>
						<p className="article-more-link">
							<Link to={node.url}>Read More</Link>
						</p>
					</div>
        </div>
        <PostFooter categories={node.frontmatter.categories} tags={node.frontmatter.tags} />
        <hr className="article-devider" />
      </article>
    );
  }

export default Post;