import React, { Component } from 'react'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import mapDispatchToProps from '../../../lib/mapDispatchToProps'
import * as authActions from '../../../reducers/auth/authActions'
import { MsgModal } from '../../../components/utils/Modal'
import PageLayout from '../../../components/layouts/PageLayout'
import RegisterForm from '../../../components/forms/user/RegisterForm'
import FormNames from '../../../constants/FormNames'
import styles from './styles.scss'

@connect(
  state => ({
    modal: state.getIn(['auth', 'verifyModal']),
    email: state.getIn(['form', FormNames.USER_REGISTER, 'values', 'email']),
    password: state.getIn(['form', FormNames.USER_REGISTER, 'values', 'password']),
    registerError: state.getIn(['auth', 'registerError']),
    registerFetching: state.getIn(['auth', 'registerFetching']),
  }),
  mapDispatchToProps([authActions])
)

class RegisterPage extends Component {
  closeModal() {
    this.props.actions.closeRegisterVerifyModal()
    this.props.actions.login({
      email: this.props.email,
      password: this.props.password,
    })
  }

  render() {
    return (
      <PageLayout src="/img/homepage/river_dark.jpg">
        <MsgModal
          show={this.props.modal}
          onClose={::this.closeModal}
          titleId="register.mailHasSent"
          msgId="register.pleaseReceive"
        />
        <Row>
          <Col md={4} />
          <Col md={4}>
            <RegisterForm
              className={styles.form}
              register={::this.props.actions.register}
              registerError={this.props.registerError}
              fetching={this.props.registerFetching}
            />
          </Col>
          <Col md={4} />
        </Row>
      </PageLayout>
    )
  }
}

export default RegisterPage
