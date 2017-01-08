import React, { PropTypes } from 'react'
import SubNavigation from './DefaultSubNav'

const MemberCenterNav = ({ activeTab }) =>
  <SubNavigation
    activeTab={activeTab}
    tabText={[
      'memberCenter.personalData',
      'memberCenter.guideIntro',
      'memberCenter.personaltripHobbit',
      'memberCenter.tripHistory',
    ]}
    tabLink={[
      '/user/me',
      '/user/guide',
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
