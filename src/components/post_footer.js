import React from "react";
import CategoriesList from "../components/categories";
import TagsList from "../components/tag";

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

export default PostFooter;