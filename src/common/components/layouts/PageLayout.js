import React, { PropTypes } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Navigation from '../utils/Navigation'
import Navigation2 from '../utils/Navigation2'
import ErrorList from '../utils/ErrorList'

const PageLayout = ({ hasGrid, children, bgColor, src, trip, ...rest }) => (
  <div
    style={{
      height: '100%',
      backgroundColor: bgColor,
      backgroundImage: `url(${src})`,
      backgroundSize: 'contain',
    }}>
    <Navigation />
    {trip ? <Navigation2/> : null}
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
  bgColor: PropTypes.string,
}

PageLayout.defaultProps = {
  hasGrid: true,
  bgColor: '#EFEEED',
}

export default PageLayout
