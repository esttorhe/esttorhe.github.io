// import React from "react";
// import PropTypes from "prop-types";

// // Components
// import Link from "gatsby-link";

// const Tags = ({ pathContext, data }) => {
//   const { tag } = pathContext;
//   const { edges, totalCount } = data.allMarkdownRemark;
//   const tagHeader = `${totalCount} post${
//     totalCount === 1 ? "" : "s"
//   } tagged with "${tag}"`;

//   return (
//     <div>
//       <h1>{tagHeader}</h1>
//       <ul>
//         {edges.map(({ node }) => {
//           const { path, title } = node.frontmatter;
//           return (
//             <li key={path}>
//               <Link to={path}>{title}</Link>
//             </li>
//           );
//         })}
//       </ul>
//       {/*
//               This links to a page that does not yet exist.
//               We'll come back to it!
//             */}
//       <Link to="/tags">All tags</Link>
//     </div>
//   );
// };

// Tags.propTypes = {
//   pathContext: PropTypes.shape({
//     tag: PropTypes.string.isRequired,
//   }),
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       totalCount: PropTypes.number.isRequired,
//       edges: PropTypes.arrayOf(
//         PropTypes.shape({
//           node: PropTypes.shape({
//             frontmatter: PropTypes.shape({
//             //   path: PropTypes.string.isRequired,
//               title: PropTypes.string.isRequired,
//             }),
//           }),
//         }).isRequired
//       ),
//     }),
//   }),
// };

// export default Tags;