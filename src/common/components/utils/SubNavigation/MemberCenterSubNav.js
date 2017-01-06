import React, { PropTypes } from 'react'
import SubNavigation from './DefaultSubNav'

const MemberCenterNav = ({ activeTab }) =>
  <SubNavigation
    activeTab={activeTab}
    tabText={[
      'memberCenter.personalData',
      'memberCenter.personaltripHobbit',
      'memberCenter.tripHistory',
      'memberCenter.editIntro',
    ]}
    tabLink={[
      '/user/me',
      '#',
      '#',
      '#',
    ]}
  />

MemberCenterNav.propTypes = {
  activeTab: PropTypes.number,
}

MemberCenterNav.defaultProps = {
  activeTab: 0,
}

export default MemberCenterNav
