import React, { Component } from "react";
import Link from "gatsby-link";
import Post from '../components/post';

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return null;
  }
};

const IndexPage = ({ data, pathContext }) => {
  const { group, index, first, last, pageCount  } = pathContext;
  const previousUrl = index - 1 == 1 ? "" : (index - 1).toString();
  const nextUrl = (index + 1).toString();

  return (
    <div>
        <h3>Page {index} of {pageCount}</h3>

        <div id='main'>
            {group.map(({ node }, i) => (
                <Post node={node} key={node.id} />
            ))}
        </div>

        <nav id='page-nav'>
            <NavLink test={first} url={previousUrl} text="« PREV" className="extend prev"/>
            <NavLink test={last} url={nextUrl} text="NEXT »" className="extend next"/>
        </nav>
    </div>
  );
};
export default IndexPage;