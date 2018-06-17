import React from 'react'
import Link from 'gatsby-link'

const Footer = ({ siteTitle }) => (
    <footer id="footer">
        <h1 className="footer-blog-title">
            <Link to='/' style={{ textDecoration: 'none', }}>{ siteTitle }</Link>
        </h1>
        <span className="copyright">
            © 2018 Esteban Torres <br></br>
            Theme inspired from <a href="http://sanographix.github.io/tumblr/apollo/" target="_blank">Apollo</a> theme, designed by <a href="http://www.sanographix.net/" target="_blank">SANOGRAPHIX.NET</a><br></br>
            Powered by <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby JS</a>
	    </span>
    </footer>
)

export default Footer