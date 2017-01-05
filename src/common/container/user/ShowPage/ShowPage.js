import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import PageLayout from '../../../components/layouts/PageLayout'
import Text from '../../../components/utils/Text'
import styles from './styles.scss'
import { selectFromCookies, selectFromTab } from '../../../lib/selector'
import { createStructuredSelector } from 'reselect'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import PanelContainer from '../../../components/utils/PanelContainer'
import EditForm from '../../../components/forms/user/EditForm'
import Nav from '../../../components/utils/BsNavbar'

const mapStateToProps = createStructuredSelector({
  user: selectFromCookies('user'),
})

class ShowPage extends Component {
  render() {
    const { user } = this.props
    return (
      <PageLayout>
        <PanelContainer>
          <Col md={1}/>
          <Col md={8}>
            <Panel1
              title="memberCenter.personalData"
              contentDivClass={styles.panel1}
              underlineClass={styles.panel1underline}
            >
              <EditForm />
            </Panel1>
          </Col>
          <Col md={3}>
            <Panel2
              title="memberCenter.avatar"
              underlineClass={styles.hr}
            >
              {<img src={user.get('avatarURL')} className={styles.avatar} />}

            </Panel2>
          </Col>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(mapStateToProps)(ShowPage)
