import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../components/layouts/PageLayout'
import LoginForm from '../../components/forms/user/LoginForm'
// import Text from '../../components/utils/Text'

const style = {
  form: {
    marginTop: '55px',
  },
}

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
        <div style={style.form}>
           <LoginForm />
        </div>
      </Col>
      <Col md={4} />
    </Row>
  </PageLayout>
)

export default LoginPage
