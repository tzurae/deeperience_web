import React, { PropTypes } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Navigation from '../utils/Navigation'
import Navigation2 from '../utils/Navigation2'
import ErrorList from '../utils/ErrorList'
import Footer from '../utils/Footer'

const PageLayout = ({ hasGrid, children, bgColor, src, tripTabActive, ...rest }) => (
  <div
    style={{
      minHeight: '100%',
      backgroundColor: bgColor,
      backgroundImage: `url(${src})`,
      backgroundSize: 'contain',
      padding: '0',
    }}>
    <Navigation />
    {tripTabActive !== 0 && <Navigation2 tripTabActive={tripTabActive}/>}
    <ErrorList />
    {hasGrid ? (
      <Grid {...rest}>
        {children}
      </Grid>
    ) : children}
    <Footer/>
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
