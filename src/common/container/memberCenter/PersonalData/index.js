import React, { Component } from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../components/layouts/PageLayout'
import styles from './styles.scss'
import { selectFromCookies } from '../../../lib/selector'
import { createStructuredSelector } from 'reselect'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import PanelContainer from '../../../components/utils/PanelContainer'
import PersonalDataForm from '../../../components/forms/user/PersonalDataForm'
import MemberCenterSubNav from '../../../components/utils/SubNavigation/MemberCenterSubNav'

const mapStateToProps = createStructuredSelector({
  user: selectFromCookies('user'),
})

class ShowPage extends Component {
  render() {
    const { user } = this.props
    return (
      <PageLayout subNav={<MemberCenterSubNav activeTab={0}/>}>
        <PanelContainer>
          <Col md={3}>
            <Panel2
              title="memberCenter.avatar"
              underlineClass={styles.hr}
            >
              {<img src={user.get('avatarURL')} className={styles.avatar} />}
            </Panel2>
          </Col>
          <Col md={8}>
            <Panel1
              title="memberCenter.personalData"
              underlineClass={styles.hr}
            >
              <PersonalDataForm
                underlineClass={styles.hr}
                headerClass={styles.header}
              />
            </Panel1>
          </Col>
          <Col md={1}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(mapStateToProps)(ShowPage)
