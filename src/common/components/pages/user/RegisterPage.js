import React, { Component } from 'react'
// import PageHeader from 'react-bootstrap/lib/PageHeader'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import PageLayout from '../../layouts/PageLayout'
import RegisterForm from '../../forms/user/RegisterForm'
// import SocialAuthButtonList from '../../utils/SocialAuthButtonList'
import BackGround from '../../utils/BackGround'

const style = {
  form: {
    marginTop: '55px',
  },
}

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

  renderModal() {
    const { isShowModal } = this.state

    const style = {
      sure: {
        width: '8em',
        color: 'white',
        fontSize: '1.2em',
        marginTop: '40px',
        borderRadius: '50px',
        backgroundColor: '#FF864F',
      },
    }

    return (
      <Modal
        show={isShowModal}
        onHide={this.closeModal}
        bsSize="small"
        aria-labelledby="contained-modal-title-sm"
      >
        <Modal.Body>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '140%' }}> 確認信已送出！ </h3>
            請至信箱收取會員確認信
            <Button
              style={style.sure}
              onClick={this.closeModal}
            >
              確認
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  render(props) {
    return (
      <PageLayout>
        <BackGround src="/img/river_dark.jpg" />
        <Row>
          <Col md={4} />
          <Col md={4}>
            <div style={style.form}>
              <RegisterForm openModal={this.openModal} />
              {this.renderModal()}
            </div>
          </Col>
          <Col md={4} />
          {/*
            <Col md={3}>
              <SocialAuthButtonList />
            </Col>
          */}
        </Row>
      </PageLayout>
    )
  }
}

export default RegisterPage
