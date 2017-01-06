import React from 'react'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import mapDispatchToProps from '../../../lib/mapDispatchToProps'
import * as authActions from '../../../reducers/auth/authActions'
import PageLayout from '../../../components/layouts/PageLayout'
import LoginForm from '../../../components/forms/user/LoginForm'
import styles from './styles.scss'

@connect(
  state => ({
    loginError: state.getIn(['auth', 'loginError']),
  }),
  mapDispatchToProps([authActions])
)

class LoginPage extends React.Component {
  render() {
    return (
      <PageLayout src="/img/homepage/river_dark.jpg">
        <Row>
          <Col md={4} />
          <Col md={4}>
            <LoginForm
              className={styles.form}
              login={this.props.actions.login}
              loginError={this.props.loginError}
            />
          </Col>
          <Col md={4} />
        </Row>
      </PageLayout>
    )
  }
}

export default LoginPage
