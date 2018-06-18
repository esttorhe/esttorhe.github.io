import React from "react";
import Link from "gatsby-link";
const _ = require('lodash');

function CategoriesList(props) {
    const categories = props.categories;
    return (
      <span className='category'>
        Categories:&nbsp;
        {categories.map((category) =>
          <Link to={`/categories/${_.kebabCase(category)}`} key={category}>
            {category}
          </Link>
        )}
      </span>
    );
  }

export default CategoriesList;