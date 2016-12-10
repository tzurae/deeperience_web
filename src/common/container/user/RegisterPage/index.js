import React, { Component } from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { MsgModal } from '../../../components/utils/Modal'
import PageLayout from '../../../components/layouts/PageLayout'
import RegisterForm from '../../../components/forms/user/RegisterForm'
import styles from './styles.scss'

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowModal: false,
    }
    this.openModal = this._openModal.bind(this)
    this.closeModal = this._closeModal.bind(this)
  }

  _openModal() {
    this.setState({ isShowModal: true })
  }

  _closeModal() {
    this.setState({ isShowModal: false })
  }

  render() {
    return (
      <PageLayout src="/img/homepage/river_dark.jpg">
        <MsgModal
          show={this.state.isShowModal}
          onClose={this.closeModal}
          titleId="register.mailHasSent"
          msgId="register.pleaseReceive"
        />
        <Row>
          <Col md={4} />
          <Col md={4}>
            <RegisterForm
              className={styles.form}
              openModal={this.openModal}
            />
          </Col>
          <Col md={4} />
        </Row>
      </PageLayout>
    )
  }
}

export default RegisterPage
