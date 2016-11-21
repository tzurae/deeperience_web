import React, { PropTypes } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Navigation from '../utils/Navigation'
import Navigation2 from '../utils/Navigation2'
import ErrorList from '../utils/ErrorList'

const PageLayout = ({ hasGrid, children, bgColor, src, tripTabActive, ...rest }) => (
  <div
    style={{
      minHeight: '100%',
      backgroundColor: bgColor,
      backgroundImage: `url(${src})`,
      backgroundSize: 'contain',
    }}>
    <Navigation />
    {tripTabActive !== 0 && <Navigation2 tripTabActive={tripTabActive}/>}
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
  src: PropTypes.string,
  tripTabActive: PropTypes.number,
},

PageLayout.defaultProps = {
  hasGrid: true,
  bgColor: '#EFEEED',
  src: '',
  tripTabActive: 0,
}

export default PageLayout
