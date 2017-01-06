import React, { PropTypes } from 'react'
import SubNavigation from './DefaultSubNav'

const CustomSubNav = ({ activeTab }) => (
  <SubNavigation
    activeTab={activeTab}
    tabText={['nav.customize.customize', 'nav.customize.myCustomTrip']}
    tabLink={['/custom/create', '/custom/list']}
  />
)

CustomSubNav.propTypes = {
  activeTab: PropTypes.number,
}

CustomSubNav.defaultProps = {
  activeTab: 0,
}

export default CustomSubNav
