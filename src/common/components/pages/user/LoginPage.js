import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../layouts/PageLayout'
import LoginForm from '../../forms/user/LoginForm'
import BackGround from '../../utils/BackGround'
import Text from '../../widgets/Text'

const LoginPage = ({ location }) => (
  <PageLayout>
    <BackGround src="/img/river_dark.jpg" />
    <Row>
      <Col md={4} />
      <Col md={4}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px', marginTop: '20px' }}>
          <div style={{ fontSize: '38px', marginBottom: '10px' }}> Deeperience </div>
          <div style={{ fontSize: '18px' }}>
            <Text id="login.title" />
          </div>
        </div>
      </Col>
      <Col md={4} />
    </Row>
    <Row>
      <Col md={4} />
      <Col md={4}>
        <LoginForm />
      </Col>
      <Col md={4} />
    </Row>
  </PageLayout>
)

export default LoginPage
