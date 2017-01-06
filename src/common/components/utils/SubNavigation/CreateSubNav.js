import React, { PropTypes } from 'react'
import SubNavigation from './DefaultSubNav'

const CreateSubNav = ({ activeTab }) => (
  <SubNavigation
    activeTab={activeTab}
    tabText={[
      'nav.trip.createSite',
      'nav.trip.manageSite',
      'nav.trip.createTrip',
      'nav.trip.manageTrip',
      'nav.trip.myOrder',
    ]}
    tabLink={['/site/create', '#', '/trip/create', '#', '/order/list']}
  />
)

CreateSubNav.propTypes = {
  activeTab: PropTypes.number,
}

CreateSubNav.defaultProps = {
  activeTab: 0,
}

export default CreateSubNav
