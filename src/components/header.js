import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
    <div id='header'>
      <h1 className='blog-title'>
        <Link
          to="/"
          style={{
            position: 'relative',
            left: '0.1em',
            padding: '0.4em 0',
            textDecoration: 'none',
            border: '0',
            outline: '0',
            fontWeight: '600',
            letterSpacing: '0.28em',
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      <nav className="nav">
		    <ul>
			    <li><Link to='/tags'>Tags</Link></li>
			    <li><Link to='/categories'>Categories</Link></li>
			    <li><Link to='/archives'>Archives</Link></li>
			    <li><Link to='/talks'>Talks</Link></li>
			    <li><Link to='/about'>About Me</Link></li>
			    {/* <li><Link to="/cv">CV</Link></li> */}
			    <li><Link to='/rss.xml'>Feed</Link></li>
		    </ul>
	    </nav>
  </div>
)

export default Header
