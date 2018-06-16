import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    style={{
      display: 'block',
      margin: '3em 0 4em 0',
      position: 'relative',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0.45rem 1.0875rem',
      }}
    >
      <h1 
        style={{ 
          float: 'left',
          display: 'inline-block',
          fontSize: '120%',
          fontWeight: 'bold',
          paddingBottom: '0.2em',
          letterSpacing: '0.25em',
          margin: '10px 0',
          borderBottom: '5px solid #222',
          font: 'inherit',
        }}
      >
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
    </div>
  </div>
)

export default Header
