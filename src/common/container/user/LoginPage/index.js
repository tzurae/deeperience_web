import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import * as authActions from '../../../reducers/auth/authAction'
import PageLayout from '../../../components/layouts/PageLayout'
import LoginForm from '../../../components/forms/user/LoginForm'
import styles from './styles.scss'

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
  }
}

const LoginPage = props => (
  <PageLayout src="/img/homepage/river_dark.jpg">
    <Row>
      <Col md={4} />
      <Col md={4}>
        <LoginForm
          className={styles.form}
          login={props.actions.login}
        />
      </Col>
      <Col md={4} />
    </Row>
  </PageLayout>
)

export default connect(null, mapDispatchToProps)(LoginPage)
