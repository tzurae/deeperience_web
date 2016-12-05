import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../layouts/PageLayout'
import LoginForm from '../../forms/user/LoginForm'
import Text from '../../widgets/Text'

const LoginPage = ({ location }) => (
  <PageLayout src="/img/homepage/river_dark.jpg">
    <Row>
      <Col md={4} />
      <Col md={4} />
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
