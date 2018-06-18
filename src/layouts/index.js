import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import './index.css'

const Layout = ({ children, data }) => (
  <div id='container'>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sneak peek of how ~~ObjC~~Swift (😉) looks from small Costa Rica.' },
        { name: 'keywords', content: 'ios, objc, swift, costa rica, coding' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '90px 1.0875rem 1.45rem',
      }}
    >
      {children()}

    <Footer siteTitle={data.site.siteMetadata.title} />
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
