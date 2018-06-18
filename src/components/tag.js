import React from "react";
import Link from "gatsby-link";
const _ = require('lodash');

function TagListItem(props) {
    const value = props.value;
  
    return (
      <li className='article-tag-list-item'>
        <Link to={`/tags/${_.kebabCase(value)}`} key={value}>
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

export default TagsList;