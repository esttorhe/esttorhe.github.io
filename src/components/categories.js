import React from "react";
import Link from "gatsby-link";

function CategoriesList(props) {
    const categories = props.categories;
    return (
      <span className='category'>
        Categories:&nbsp;
        {categories.map((category) =>
          <Link to={`/categories/${category}`} key={category}>
            {category}
          </Link>
        )}
      </span>
    );
  }

export default CategoriesList;