import React, { Component } from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../components/layouts/PageLayout'
import styles from './styles.scss'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import PanelContainer from '../../../components/utils/PanelContainer'
import GuideIntroForm from '../../../components/forms/user/GuideIntroForm'
import MemberCenterSubNav from '../../../components/utils/SubNavigation/MemberCenterSubNav'

@connect(
  state => ({
    avatar: state.getIn(['cookies', 'user', 'avatarURL']),
    selfInfo: state.getIn(['cookies', 'user', 'selfInfo']),
  })
)

class GuideIntroPage extends Component {

  render() {
    const {
      avatar,
      selfInfo,
    } = this.props

    return (
      <PageLayout subNav={<MemberCenterSubNav activeTab={1}/>}>
        <PanelContainer>
          <Col md={3}>
            <Panel2
              title="memberCenter.avatar"
              underlineClass={styles.hr}
            >
              <img src={avatar} className={styles.avatar}/>
            </Panel2>
          </Col>
          <Col md={8}>
            <Panel1
              title="memberCenter.personalData"
              underlineClass={styles.hr}
            >
              <GuideIntroForm selfInfo={selfInfo}/>
            </Panel1>
          </Col>
          <Col md={1}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default GuideIntroPage
