import React, { PropTypes } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Navigation from '../utils/Navigation'
import ErrorList from '../utils/ErrorList'

const PageLayout = ({ hasGrid, children, bgColor, src, ...rest }) => (
  <div
    style={{
      height: '100%',
      backgroundColor: bgColor,
      backgroundImage: `url(${src})`,
      backgroundSize: 'contain',
    }}>
    <Navigation />
    <ErrorList />
    {hasGrid ? (
      <Grid {...rest}>
        {children}
      </Grid>
    ) : children}
  </div>
)

PageLayout.propTypes = {
  hasGrid: PropTypes.bool,
  bgColor: PropTypes.String,
}

PageLayout.defaultProps = {
  hasGrid: true,
  bgColor: '#EFEEED',
}

export default PageLayout
